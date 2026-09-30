// ═══════════════════════════════════════════════════════════════
// VISUAL ALGORITHMS STUDIO — 3D THEME SYSTEM
// Premium motion-design aesthetic with centralized lighting,
// depth levels, and physical surface tokens.
// ═══════════════════════════════════════════════════════════════

// ── Depth Levels ─────────────────────────────────────────────
// Standardized elevation stages used across all primitives.
// depth0 = resting   depth4 = hero/final
export const depth = {
  d0: 0,
  d1: 4,
  d2: 8,
  d3: 14,
  d4: 20,
} as const

// ── Lighting ─────────────────────────────────────────────────
// Single virtual top-left light source for consistency.
export const lighting = {
  primary: {
    angle: 315,            // degrees, top-left
    topHighlight: 'rgba(255,255,255,0.18)',
    leftHighlight: 'rgba(255,255,255,0.08)',
    bottomShadow: 'rgba(0,0,0,0.65)',
    rightShadow: 'rgba(0,0,0,0.35)',
  },
  ambient: 'rgba(255,255,255,0.04)',
  // 3D block face darkening (side / bottom faces)
  sideFaceDarken: 0.35,
  bottomFaceDarken: 0.55,
} as const

// ── Semantic Surface System ──────────────────────────────────
// Each state defines: top face, front face, side face, border,
// glow, and text colors for 3D block rendering.
export type SurfaceState = 'neutral' | 'active' | 'compare' | 'success' | 'warning' | 'visited'

export const surfaces: Record<SurfaceState, {
  top: string
  front: string
  side: string
  border: string
  glow: string
  text: string
}> = {
  neutral: {
    top:    '#475569',
    front:  '#334155',
    side:   '#1e293b',
    border: '#64748b',
    glow:   'transparent',
    text:   '#f1f5f9',
  },
  active: {
    top:    '#0ea5e9',
    front:  '#0284c7',
    side:   '#0369a1',
    border: '#38bdf8',
    glow:   'rgba(14, 165, 233, 0.5)',
    text:   '#ffffff',
  },
  compare: {
    top:    '#f59e0b',
    front:  '#d97706',
    side:   '#b45309',
    border: '#fbbf24',
    glow:   'rgba(245, 158, 11, 0.5)',
    text:   '#ffffff',
  },
  success: {
    top:    '#10b981',
    front:  '#059669',
    side:   '#047857',
    border: '#34d399',
    glow:   'rgba(16, 185, 129, 0.5)',
    text:   '#ffffff',
  },
  warning: {
    top:    '#ef4444',
    front:  '#dc2626',
    side:   '#b91c1c',
    border: '#f87171',
    glow:   'rgba(239, 68, 68, 0.5)',
    text:   '#ffffff',
  },
  visited: {
    top:    '#3b82f6',
    front:  '#2563eb',
    side:   '#1d4ed8',
    border: '#60a5fa',
    glow:   'rgba(37, 99, 235, 0.2)',
    text:   'rgba(255, 255, 255, 0.85)',
  },
}

// ── Legacy-compatible theme object ───────────────────────────
export const theme = {
  colors: {
    // Base Canvas (Deep space glass background)
    background: '#09090b',
    videoBackground: 'transparent',
    panelBackground: 'rgba(20, 20, 25, 0.4)',
    panelBorder: 'rgba(255, 255, 255, 0.08)',

    // Typography
    textPrimary: '#e8e8ec',
    textSecondary: '#8888a0',
    textMuted: '#505068',

    // Semantic States (legacy access)
    neutral: { bg: '#334155', border: '#64748b' },
    active:  { bg: '#0284c7',  border: '#38bdf8' },
    compare: { bg: '#d97706', border: '#fbbf24' },
    success: { bg: '#059669', border: '#34d399' },
    warning: { bg: '#dc2626', border: '#f87171' },

    // Pointers and Edges
    pointer: '#38bdf8',
    edge: '#3a3a50',

    // Syntax Highlighting
    syntax: {
      keyword: '#c678dd',
      string: '#98c379',
      number: '#d19a66',
      function: '#61afef',
      operator: '#56b6c2',
      comment: '#5c6370',
      punctuation: '#abb2bf',
      identifier: '#e06c75',
    },
  },
  shadows: {
    panel: `0 ${depth.d2}px ${depth.d3}px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
    panelInner: 'none',
    element: `0 ${depth.d1}px ${depth.d2}px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)`,
    active: `0 ${depth.d2}px ${depth.d3}px rgba(59,130,246,0.25), 0 ${depth.d1}px ${depth.d2}px rgba(0,0,0,0.6)`,
    compare: `0 ${depth.d2}px ${depth.d3}px rgba(168,85,247,0.25), 0 ${depth.d1}px ${depth.d2}px rgba(0,0,0,0.6)`,
    success: `0 ${depth.d2}px ${depth.d3}px rgba(16,185,129,0.25), 0 ${depth.d1}px ${depth.d2}px rgba(0,0,0,0.6)`,
    pointer: `0 2px 6px rgba(0,0,0,0.6)`,
    linkedList: `0 ${depth.d1}px ${depth.d2}px rgba(0,0,0,0.6)`,
    svg: {
      element: 'url(#shadow-element)',
      active: 'url(#shadow-active)',
      success: 'url(#shadow-success)',
    },
  },
  perspective: {
    container: 800,   // px — the 3D perspective distance
    tiltX: 2,         // degrees — subtle X tilt for depth
  },
  animation: {
    durationShort: 0.15,
    durationMedium: 0.35,
    durationLong: 0.6,
    ease: 'power2.out',
    easeBack: 'back.out(1.4)',
  },
}

// ── Helper to select surface by semantic state ───────────────
export function getSurface(state: SurfaceState) {
  return surfaces[state]
}

export function getSemanticColors(state: 'neutral' | 'active' | 'compare' | 'success' | 'warning' = 'neutral') {
  return theme.colors[state]
}

// ── 3D block CSS generator ───────────────────────────────────
// Produces inline styles for a physical 3D block (used by Array, Stack, etc.)
export function block3dStyle(
  state: SurfaceState,
  depthLevel: number,
  width: number,
  height: number,
  borderRadius: number = 8, // slightly more rounded for glass
) {
  const s = surfaces[state]
  const blockDepth = Math.max(3, depthLevel * 0.6)

  return {
    position: 'relative' as const,
    width: `${width}px`,
    height: `${height}px`,
    transformStyle: 'preserve-3d' as const,
    transform: `translateZ(${depthLevel}px)`,
    transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, background 0.4s ease',
    // Glassmorphism core styling
    background: `linear-gradient(135deg, ${s.top} 0%, ${s.front} 100%)`,
    backdropFilter: 'blur(16px) saturate(120%)',
    WebkitBackdropFilter: 'blur(16px) saturate(120%)',
    border: `1.5px solid ${s.border}`,
    borderRadius: `${borderRadius}px`,
    boxShadow: [
      `inset 0 1px 1px rgba(255, 255, 255, 0.25)`, // Inner top highlight
      `inset 0 -1px 1px rgba(0, 0, 0, 0.2)`, // Inner bottom shadow
      `0 ${blockDepth}px 0 ${s.side}`, // 3D Extrusion
      `0 ${blockDepth + 4}px ${blockDepth + 12}px rgba(0,0,0,0.5)`, // Drop shadow
      s.glow !== 'transparent' ? `0 0 ${depthLevel + 15}px ${s.glow}` : '', // Outer glow
    ].filter(Boolean).join(', '),
    color: s.text,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums' as const,
    textShadow: '0 2px 4px rgba(0,0,0,0.4)', // Crisp text on glass
  }
}
