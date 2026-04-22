'use client'

import { memo, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface DiagramNode {
  id: string
  title: string
  tagline: string
  category: 'hub' | 'flagship' | 'collector' | 'enricher' | 'processor'
  x: number
  y: number
  radius: number
}

interface DiagramEdge {
  from: string
  to: string
  kind: 'primary' | 'secondary' | 'peer'
}

// Radial constellation around a single flagship hub ("Investigation Model").
// Coordinates are in a 1000x1000 viewBox so the diagram stays square and scales
// cleanly on every screen.
const CENTER = { x: 500, y: 520 }
const RADIUS = 300

const polar = (angleDeg: number, radius = RADIUS) => ({
  x: CENTER.x + radius * Math.sin((angleDeg * Math.PI) / 180),
  y: CENTER.y - radius * Math.cos((angleDeg * Math.PI) / 180),
})

const nodes: DiagramNode[] = [
  { id: 'investigation', title: 'Investigation Model', tagline: 'Unified CTI Hub', category: 'hub', x: CENTER.x, y: CENTER.y, radius: 68 },
  { id: 'traceon', title: 'TraceOn', tagline: 'Telegram Intelligence', category: 'flagship', ...polar(0), radius: 54 },
  { id: 'forums', title: 'Forums Monitor', tagline: 'Dark + Surface Web', category: 'collector', ...polar(45), radius: 44 },
  { id: 'cvss', title: 'CVSS Enricher', tagline: 'OpenCTI', category: 'enricher', ...polar(90), radius: 40 },
  { id: 'tgmonitor', title: 'Tg-Monitor', tagline: 'Carding Feeds', category: 'collector', ...polar(135), radius: 44 },
  { id: 'sqlizer', title: 'SQLizer', tagline: 'Leak-Dump Parser', category: 'processor', ...polar(180), radius: 40 },
  { id: 'zoneh', title: 'Zone-H', tagline: 'Defacement Archive', category: 'collector', ...polar(225), radius: 36 },
  { id: 'tag', title: 'TA-Groups Enricher', tagline: 'OpenCTI', category: 'enricher', ...polar(270), radius: 40 },
  { id: 'socializer', title: 'Socializer', tagline: 'Social Intel', category: 'collector', ...polar(315), radius: 44 },
]

const edges: DiagramEdge[] = [
  { from: 'traceon', to: 'investigation', kind: 'primary' },
  { from: 'forums', to: 'investigation', kind: 'primary' },
  { from: 'tgmonitor', to: 'investigation', kind: 'primary' },
  { from: 'socializer', to: 'investigation', kind: 'primary' },
  { from: 'zoneh', to: 'investigation', kind: 'secondary' },
  { from: 'sqlizer', to: 'investigation', kind: 'primary' },
  { from: 'cvss', to: 'investigation', kind: 'secondary' },
  { from: 'tag', to: 'investigation', kind: 'secondary' },
  { from: 'traceon', to: 'tgmonitor', kind: 'peer' },
  { from: 'traceon', to: 'forums', kind: 'peer' },
  { from: 'cvss', to: 'tag', kind: 'peer' },
  { from: 'forums', to: 'sqlizer', kind: 'peer' },
]

const categoryStyles: Record<DiagramNode['category'], { fill: string; stroke: string; glow: string }> = {
  hub: { fill: 'url(#hubGrad)', stroke: '#a78bfa', glow: '#a78bfa' },
  flagship: { fill: 'url(#flagshipGrad)', stroke: '#f472b6', glow: '#f472b6' },
  collector: { fill: 'rgba(139,92,246,0.12)', stroke: '#8b5cf6', glow: '#8b5cf6' },
  enricher: { fill: 'rgba(34,211,238,0.12)', stroke: '#22d3ee', glow: '#22d3ee' },
  processor: { fill: 'rgba(16,185,129,0.12)', stroke: '#10b981', glow: '#10b981' },
}

const edgeStyles: Record<DiagramEdge['kind'], { stroke: string; strokeWidth: number; dasharray: string; opacity: number }> = {
  primary: { stroke: '#a78bfa', strokeWidth: 1.75, dasharray: '0', opacity: 0.65 },
  secondary: { stroke: '#22d3ee', strokeWidth: 1.25, dasharray: '4 6', opacity: 0.5 },
  peer: { stroke: '#f472b6', strokeWidth: 1, dasharray: '2 6', opacity: 0.35 },
}

// Pick 3 primary edges to run pulses on (instead of all 7) so we keep the "data flowing"
// feel without 7 concurrent infinite animations.
const PULSE_EDGE_IDS = ['traceon-investigation', 'forums-investigation', 'sqlizer-investigation']

export default function ThreatIntelDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.2, margin: '0px 0px -10% 0px' })
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = inView && !prefersReducedMotion

  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [])

  // Precompute which edges and nodes should be highlighted for the active hover.
  const highlight = useMemo(() => {
    if (!activeNode) return null
    const connectedNodes = new Set<string>([activeNode])
    edges.forEach((e) => {
      if (e.from === activeNode) connectedNodes.add(e.to)
      if (e.to === activeNode) connectedNodes.add(e.from)
    })
    return connectedNodes
  }, [activeNode])

  return (
    <section id="threat-intel" className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08),_transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/20 pb-8"
        >
          <div>
            <span className="text-primary-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary-500" />
              Constellation
            </span>
            <h2 className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white">
              THREAT INTEL<br />GRAPH
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            How the threat-intelligence projects feed into a single investigative surface — collectors, enrichers, and processors converging on the <span className="text-white font-medium">Investigation Model</span> hub.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 text-[11px] md:text-xs font-mono uppercase tracking-wider text-gray-400">
          <LegendItem color="#a78bfa" label="Hub" />
          <LegendItem color="#f472b6" label="Flagship" />
          <LegendItem color="#8b5cf6" label="Collector" />
          <LegendItem color="#22d3ee" label="Enricher" />
          <LegendItem color="#10b981" label="Processor" />
        </div>

        <div
          ref={containerRef}
          className="relative w-full max-w-[640px] lg:max-w-[720px] mx-auto rounded-2xl border border-white/10 bg-white/[0.015] backdrop-blur-sm overflow-hidden"
          style={{ contain: 'layout paint' }}
        >
          <svg
            viewBox="0 0 1000 1000"
            className="w-full h-auto block"
            role="img"
            aria-label="Threat intelligence project constellation"
          >
            <defs>
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.25" />
              </radialGradient>
              <radialGradient id="flagshipGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#ec4899" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#831843" stopOpacity="0.2" />
              </radialGradient>
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="1000" height="1000" fill="url(#gridPattern)" />

            {/* Orbit rings (static) */}
            <circle cx={CENTER.x} cy={CENTER.y} r={RADIUS} fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx={CENTER.x} cy={CENTER.y} r={RADIUS - 90} fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth="1" strokeDasharray="2 8" />

            {/* Edges */}
            {edges.map((edge, i) => {
              const a = nodeById.get(edge.from)!
              const b = nodeById.get(edge.to)!
              const style = edgeStyles[edge.kind]
              const isHighlighted = !highlight || highlight.has(edge.from) && highlight.has(edge.to)
              return (
                <line
                  key={`edge-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.dasharray}
                  strokeLinecap="round"
                  opacity={isHighlighted ? style.opacity : 0.08}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              )
            })}

            {/* Pulse group (only animates when in view, limited to 3 edges) */}
            {shouldAnimate && edges
              .filter((e) => PULSE_EDGE_IDS.includes(`${e.from}-${e.to}`))
              .map((edge, i) => {
                const a = nodeById.get(edge.from)!
                const b = nodeById.get(edge.to)!
                return <EdgePulse key={`pulse-${i}`} from={a} to={b} delay={i * 1.0} />
              })}

            {/* Nodes */}
            {nodes.map((node) => (
              <NodeCircle
                key={node.id}
                node={node}
                isActive={activeNode === node.id}
                isDimmed={highlight !== null && !highlight.has(node.id)}
                shouldPulse={shouldAnimate && (node.category === 'hub' || node.category === 'flagship')}
                onEnter={() => setActiveNode(node.id)}
                onLeave={() => setActiveNode(null)}
              />
            ))}
          </svg>
        </div>

        <p className="mt-6 text-xs md:text-sm text-gray-500 font-mono text-center">
          hover / focus any node to isolate its connections
        </p>
      </div>
    </section>
  )
}

// Pulse that traverses an edge using a single GPU-accelerated transform
// rather than animating SVG cx/cy attributes.
const EdgePulse = memo(function EdgePulse({
  from,
  to,
  delay,
}: {
  from: DiagramNode
  to: DiagramNode
  delay: number
}) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{
        x: [0, dx],
        y: [0, dy],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        repeatDelay: 0.4,
        delay,
        ease: 'easeInOut',
        times: [0, 0.15, 0.85, 1],
      }}
      style={{ willChange: 'transform' }}
    >
      <circle cx={from.x} cy={from.y} r={3} fill="#c4b5fd" />
    </motion.g>
  )
})

interface NodeCircleProps {
  node: DiagramNode
  isActive: boolean
  isDimmed: boolean
  shouldPulse: boolean
  onEnter: () => void
  onLeave: () => void
}

const NodeCircle = memo(function NodeCircle({
  node,
  isActive,
  isDimmed,
  shouldPulse,
  onEnter,
  onLeave,
}: NodeCircleProps) {
  const style = categoryStyles[node.category]

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      animate={{ opacity: isDimmed ? 0.35 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      style={{ cursor: 'pointer' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
    >
      {/* Pulsing halo — only for hub + flagship, and only when in-view */}
      {shouldPulse && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={node.radius + 6}
          fill="none"
          stroke={style.glow}
          strokeWidth={1}
          opacity={0.25}
          animate={{
            r: [node.radius + 6, node.radius + 14, node.radius + 6],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {/* Active highlight ring */}
      {isActive && (
        <circle
          cx={node.x}
          cy={node.y}
          r={node.radius + 10}
          fill="none"
          stroke={style.glow}
          strokeWidth={1.5}
          opacity={0.8}
        />
      )}
      {/* Main circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.radius}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={node.category === 'hub' ? 2 : 1.25}
        filter="url(#nodeGlow)"
      />
      {/* Inner accent for the hub */}
      {node.category === 'hub' && (
        <circle cx={node.x} cy={node.y} r={node.radius - 14} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="3 4" />
      )}
      {/* Label */}
      {node.category === 'hub' ? (
        <text
          x={node.x}
          y={node.y - 4}
          textAnchor="middle"
          className="select-none"
          fill="#ffffff"
          fontSize={17}
          fontWeight={700}
          style={{ fontFamily: 'inherit', letterSpacing: '-0.02em' }}
        >
          <tspan x={node.x} dy="0">Investigation</tspan>
          <tspan x={node.x} dy="19">Model</tspan>
        </text>
      ) : (
        <text
          x={node.x}
          y={node.y - node.radius - 14}
          textAnchor="middle"
          className="select-none"
          fill="#e5e7eb"
          fontSize={17}
          fontWeight={700}
          style={{ fontFamily: 'inherit', letterSpacing: '-0.02em' }}
        >
          {node.title}
        </text>
      )}
      {node.category !== 'hub' && (
        <text
          x={node.x}
          y={node.y - node.radius - 32}
          textAnchor="middle"
          className="select-none"
          fill="#9ca3af"
          fontSize={12}
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          {node.tagline}
        </text>
      )}
    </motion.g>
  )
})

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <span>{label}</span>
    </div>
  )
}
