/**
 * Theme: Luma design system (re-export from src/theme for compatibility).
 * Primary #0066CC, Accent #5E5CE6, Background #F5F5F7, Surface #FFFFFF.
 */

import { colors } from "@/src/theme/tokens";

const tintColorLight = colors.primary;
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: colors.text.main,
    background: colors.background,
    tint: tintColorLight,
    icon: colors.text.sub,
    tabIconDefault: colors.text.sub,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = {
  sans: "System",
  serif: "Georgia",
  mono: "Menlo",
  rounded: "System",
};
