import { colors, spacing } from "@/src/theme/tokens";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function GlassTabBar(props) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom > 0 ? insets.bottom : 0;

  return (
    <View
      style={[
        styles.container,
        {
          bottom: spacing.tabBarBottom,
          left: spacing.tabBarHorizontal,
          right: spacing.tabBarHorizontal,
          height: spacing.tabBarHeight,
          paddingBottom,
        },
      ]}
      pointerEvents="box-none"
    >
      <BlurView intensity={85} tint="light" style={StyleSheet.absoluteFill} />
      <BottomTabBar {...props} style={styles.tabBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: Platform.OS === "android" ? colors.glass : "transparent",
  },
  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});
