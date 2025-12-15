'use client';

import { useEffect, useRef } from 'react';
import {
    Scene,
    OrthographicCamera,
    WebGLRenderer,
    PlaneGeometry,
    Mesh,
    ShaderMaterial,
    Vector3,
    Vector2,
    Clock
} from 'three';

const vertexShader = `
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0 * 0.7; // Reduced brightness
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0 * 0.7; // Reduced brightness

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.3; // Reduced global intensity from 0.5 to 0.3
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;

type WavePosition = {
    x: number;
    y: number;
    rotate: number;
};

type FloatingLinesProps = {
    linesGradient?: string[];
    enabledWaves?: Array<'top' | 'middle' | 'bottom'>;
    lineCount?: number | number[];
    lineDistance?: number | number[];
    topWavePosition?: WavePosition;
    middleWavePosition?: WavePosition;
    bottomWavePosition?: WavePosition;
    animationSpeed?: number;
    interactive?: boolean;
    bendRadius?: number;
    bendStrength?: number;
    mouseDamping?: number;
    parallax?: boolean;
    parallaxStrength?: number;
    mixBlendMode?: React.CSSProperties['mixBlendMode'];
};

function hexToVec3(hex: string): Vector3 {
    let value = hex.trim();

    if (value.startsWith('#')) {
        value = value.slice(1);
    }

    let r = 255;
    let g = 255;
    let b = 255;

    if (value.length === 3) {
        r = parseInt(value[0] + value[0], 16);
        g = parseInt(value[1] + value[1], 16);
        b = parseInt(value[2] + value[2], 16);
    } else if (value.length === 6) {
        r = parseInt(value.slice(0, 2), 16);
        g = parseInt(value.slice(2, 4), 16);
        b = parseInt(value.slice(4, 6), 16);
    }

    return new Vector3(r / 255, g / 255, b / 255);
}

export default function FloatingLines({
    linesGradient,
    enabledWaves = ['top', 'middle', 'bottom'],
    lineCount = [6],
    lineDistance = [5],
    topWavePosition,
    middleWavePosition,
    bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
    animationSpeed = 1,
    interactive = true,
    bendRadius = 5.0,
    bendStrength = -0.5,
    mouseDamping = 0.05,
    parallax = true,
    parallaxStrength = 0.2,
    mixBlendMode = 'screen'
}: FloatingLinesProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const uniformsRef = useRef<any>(null);

    // Interaction refs
    const targetMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
    const currentMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
    const targetInfluenceRef = useRef<number>(0);
    const currentInfluenceRef = useRef<number>(0);
    const targetParallaxRef = useRef<Vector2>(new Vector2(0, 0));
    const currentParallaxRef = useRef<Vector2>(new Vector2(0, 0));

    // Color transition refs
    const currentGradientRef = useRef<Vector3[]>(
        Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(0, 0, 0))
    );
    const targetGradientRef = useRef<Vector3[]>(
        Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(0, 0, 0))
    );

    // Update targets on prop change
    useEffect(() => {
        if (linesGradient && linesGradient.length > 0) {
            linesGradient.slice(0, MAX_GRADIENT_STOPS).forEach((hex, i) => {
                const color = hexToVec3(hex);
                targetGradientRef.current[i].set(color.x, color.y, color.z);
                // First run: copy immediately
                if (currentGradientRef.current[i].lengthSq() === 0) {
                    currentGradientRef.current[i].copy(targetGradientRef.current[i]);
                }
            });
            if (uniformsRef.current) {
                uniformsRef.current.lineGradientCount.value = linesGradient.slice(0, MAX_GRADIENT_STOPS).length;
            }
        }
    }, [linesGradient]);

    // Independent Uniform Updates (speed, count, etc)
    useEffect(() => {
        if (!uniformsRef.current) return;
        const u = uniformsRef.current;

        const getCnt = (type: string) => {
            if (typeof lineCount === 'number') return lineCount;
            if (!enabledWaves.includes(type as any)) return 0;
            return lineCount[enabledWaves.indexOf(type as any)] ?? 6;
        }
        const getDist = (type: string) => {
            if (typeof lineDistance === 'number') return lineDistance;
            if (!enabledWaves.includes(type as any)) return 0.1;
            return (lineDistance[enabledWaves.indexOf(type as any)] ?? 0.1) * 0.01;
        }

        u.topLineCount.value = getCnt('top');
        u.middleLineCount.value = getCnt('middle');
        u.bottomLineCount.value = getCnt('bottom');

        u.topLineDistance.value = getDist('top');
        u.middleLineDistance.value = getDist('middle');
        u.bottomLineDistance.value = getDist('bottom');

        u.animationSpeed.value = animationSpeed;
        u.bendStrength.value = bendStrength;
        u.bendRadius.value = bendRadius;

        if (topWavePosition) u.topWavePosition.value.set(topWavePosition.x, topWavePosition.y, topWavePosition.rotate);
        if (middleWavePosition) u.middleWavePosition.value.set(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate);
        if (bottomWavePosition) u.bottomWavePosition.value.set(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate);

    }, [enabledWaves, lineCount, lineDistance, animationSpeed, bendStrength, bendRadius, topWavePosition, middleWavePosition, bottomWavePosition]);


    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        camera.position.z = 1;

        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new Vector3(1, 1, 1) },
            animationSpeed: { value: animationSpeed },
            enableTop: { value: enabledWaves.includes('top') },
            enableMiddle: { value: enabledWaves.includes('middle') },
            enableBottom: { value: enabledWaves.includes('bottom') },
            topLineCount: { value: 0 },
            middleLineCount: { value: 0 },
            bottomLineCount: { value: 0 },
            topLineDistance: { value: 0.01 },
            middleLineDistance: { value: 0.01 },
            bottomLineDistance: { value: 0.01 },
            topWavePosition: { value: new Vector3(topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4) },
            middleWavePosition: { value: new Vector3(middleWavePosition?.x ?? 5.0, middleWavePosition?.y ?? 0.0, middleWavePosition?.rotate ?? 0.2) },
            bottomWavePosition: { value: new Vector3(bottomWavePosition?.x ?? 2.0, bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4) },
            iMouse: { value: new Vector2(-1000, -1000) },
            interactive: { value: interactive },
            bendRadius: { value: bendRadius },
            bendStrength: { value: bendStrength },
            bendInfluence: { value: 0 },
            parallax: { value: parallax },
            parallaxStrength: { value: parallaxStrength },
            parallaxOffset: { value: new Vector2(0, 0) },
            lineGradient: { value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(0, 0, 0)) },
            lineGradientCount: { value: 0 }
        };
        uniformsRef.current = uniforms;

        const material = new ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
        });

        const geometry = new PlaneGeometry(2, 2);
        const mesh = new Mesh(geometry, material);
        scene.add(mesh);

        const clock = new Clock();

        let resizeRaf = 0;
        let lastWidth = 0;
        let lastHeight = 0;

        const applySize = () => {
            resizeRaf = 0;
            if (!containerRef.current || !rendererRef.current) return;
            const width = containerRef.current.clientWidth || 1;
            const height = containerRef.current.clientHeight || 1;
            if (width === lastWidth && height === lastHeight) return;
            lastWidth = width;
            lastHeight = height;
            rendererRef.current.setSize(width, height, false);
            uniforms.iResolution.value.set(rendererRef.current.domElement.width, rendererRef.current.domElement.height, 1);
        };

        const scheduleSize = () => {
            if (resizeRaf) return;
            resizeRaf = requestAnimationFrame(applySize);
        };

        applySize();

        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleSize) : null;
        if (ro && containerRef.current) ro.observe(containerRef.current);

        const handlePointerMove = (event: PointerEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const dpr = renderer.getPixelRatio();
            targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
            targetInfluenceRef.current = 1.0;
            if (parallax) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                targetParallaxRef.current.set(((x - centerX) / rect.width) * parallaxStrength, (-(y - centerY) / rect.height) * parallaxStrength);
            }
        };

        const handlePointerLeave = () => {
            targetInfluenceRef.current = 0.0;
        };

        if (interactive) {
            renderer.domElement.addEventListener('pointermove', handlePointerMove);
            renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
        }

        let raf = 0;
        const renderLoop = () => {
            uniforms.iTime.value = clock.getElapsedTime();

            // Smooth Colors
            const lerpFactor = 0.03;
            for (let i = 0; i < MAX_GRADIENT_STOPS; i++) {
                currentGradientRef.current[i].lerp(targetGradientRef.current[i], lerpFactor);
                uniforms.lineGradient.value[i].copy(currentGradientRef.current[i]);
            }
            // Update lineGradientCount from a logical place if needed, here we assume it's stable or updated via effect
            // Actually, we should update count too but usually it's constant per array length
            // We'll keep it simple: if gradient array changes length, we update count in Effect

            // Interaction
            if (interactive) {
                currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
                uniforms.iMouse.value.copy(currentMouseRef.current);
                currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
                uniforms.bendInfluence.value = currentInfluenceRef.current;
            }
            if (parallax) {
                currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
                uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
            }

            renderer.render(scene, camera);
            raf = requestAnimationFrame(renderLoop);
        };
        renderLoop();

        return () => {
            cancelAnimationFrame(raf);
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            if (ro && containerRef.current) ro.disconnect();
            if (interactive) {
                renderer.domElement.removeEventListener('pointermove', handlePointerMove);
                renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (renderer.domElement.parentElement) {
                renderer.domElement.parentElement.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden floating-lines-container"
            style={{
                mixBlendMode: mixBlendMode
            }}
        />
    );
}
