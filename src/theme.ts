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
    top:    '#252f3f', // dark blue/gray
    front:  '#1e293b',
    side:   '#0f172a',
    border: '#334155',
    glow:   'transparent',
    text:   '#cbd5e1',
  },
  active: {
    top:    '#0ea5e9', // cyan/blue
    front:  '#0284c7',
    side:   '#0369a1',
    border: '#38bdf8',
    glow:   'rgba(14, 165, 233, 0.25)',
    text:   '#ffffff',
  },
  compare: {
    top:    '#f59e0b', // amber
    front:  '#d97706',
    side:   '#b45309',
    border: '#fbbf24',
    glow:   'rgba(245, 158, 11, 0.25)',
    text:   '#ffffff',
  },
  success: {
    top:    '#10b981', // green
    front:  '#059669',
    side:   '#047857',
    border: '#34d399',
    glow:   'rgba(16, 185, 129, 0.2)',
    text:   '#ffffff',
  },
  warning: {
    top:    '#ef4444', // red/warning
    front:  '#dc2626',
    side:   '#b91c1c',
    border: '#f87171',
    glow:   'rgba(239, 68, 68, 0.25)',
    text:   '#ffffff',
  },
  visited: {
    top:    '#1e3a5f',
    front:  '#0f2340',
    side:   '#0b1a30',
    border: '#2563eb',
    glow:   'rgba(37,99,235,0.1)',
    text:   '#93c5fd',
  },
}

// ── Legacy-compatible theme object ───────────────────────────
export const theme = {
  colors: {
    // Base Canvas
    background: '#0a0a0c',
    videoBackground: '#050507',
    panelBackground: '#111114',
    panelBorder: '#1e1e22',

    // Typography
    textPrimary: '#e8e8ec',
    textSecondary: '#8888a0',
    textMuted: '#505068',

    // Semantic States (legacy access)
    neutral: { bg: surfaces.neutral.front, border: surfaces.neutral.border },
    active:  { bg: surfaces.active.front,  border: surfaces.active.border },
    compare: { bg: surfaces.compare.front, border: surfaces.compare.border },
    success: { bg: surfaces.success.front, border: surfaces.success.border },
    warning: { bg: surfaces.warning.front, border: surfaces.warning.border },

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
  borderRadius: number = 6,
) {
  const s = surfaces[state]
  const blockDepth = Math.max(3, depthLevel * 0.6)

  return {
    position: 'relative' as const,
    width: `${width}px`,
    height: `${height}px`,
    transformStyle: 'preserve-3d' as const,
    transform: `translateZ(${depthLevel}px)`,
    transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
    // Top face styling on main element
    background: `linear-gradient(180deg, ${s.top} 0%, ${s.front} 100%)`,
    border: `1.5px solid ${s.border}`,
    borderRadius: `${borderRadius}px`,
    boxShadow: [
      `inset 0 1px 0 ${lighting.primary.topHighlight}`,
      `0 ${blockDepth}px 0 ${s.side}`,
      `0 ${blockDepth + 2}px ${blockDepth + 6}px rgba(0,0,0,0.55)`,
      s.glow !== 'transparent' ? `0 0 ${depthLevel + 8}px ${s.glow}` : '',
    ].filter(Boolean).join(', '),
    color: s.text,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums' as const,
  }
}
