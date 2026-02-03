/**
 * Luma design tokens (Focus & Trust).
 * Single source of truth for colors and typography.
 * Use with StyleSheet or pass to Tailwind via tailwind.config.js.
 *
 * Animation rules (documented):
 * - Library -> Detail: shared element transition (later).
 * - Capture -> Editor: light shimmer then morph; no spinners.
 * - Touch: activeOpacity 0.7 or scale(0.96) spring.
 */

export const colors = {
  primary: "#0066CC",
  accent: "#5E5CE6",
  background: "#F5F5F7",
  surface: "#FFFFFF",
  text: {
    main: "#1D1D1F",
    sub: "#86868B",
  },
  glass: "rgba(255,255,255,0.85)",
  warning: "#FF9500",
};

export const typography = {
  h1: { fontSize: 32, fontWeight: "700", letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: "600", letterSpacing: -0.3 },
  body: { fontSize: 17, lineHeight: 24, fontWeight: "400" },
  mono: { fontSize: 14, lineHeight: 20, fontWeight: "400" },
};

export const spacing = {
  tabBarBottom: 16,
  tabBarHorizontal: 20,
  tabBarHeight: 68,
  cardRadius: 24,
};
