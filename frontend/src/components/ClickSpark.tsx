'use client';

import { useRef, useEffect } from 'react';

interface ClickSparkProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: string;
    extraScale?: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
    sparkColor = '#fff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparks = useRef<
        { x: number; y: number; angle: number; startTime: number }[]
    >([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const draw = (timestamp: number) => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

            sparks.current = sparks.current.filter((spark) => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) return false;

                const progress = elapsed / duration;
                const easedProgress = Math.pow(progress, 2); // Simple ease-outish

                const distance = easedProgress * sparkRadius * extraScale + 10; // Start a bit offset
                const lineLength = sparkSize * (1 - progress);

                const x1 = spark.x + Math.cos(spark.angle) * distance;
                const y1 = spark.y + Math.sin(spark.angle) * distance;
                const x2 = spark.x + Math.cos(spark.angle) * (distance + lineLength);
                const y2 = spark.y + Math.sin(spark.angle) * (distance + lineLength);

                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.globalAlpha = 1 - progress;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const now = performance.now();

            for (let i = 0; i < sparkCount; i++) {
                const angle = (Math.PI * 2 * i) / sparkCount;
                sparks.current.push({ x, y, angle, startTime: now });
            }
        };

        // Attach click listener to window so it captures clicks everywhere (but render on canvas)
        // Actually, usually these sit on top with pointer-events: none
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationId);
        };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

export default ClickSpark;
