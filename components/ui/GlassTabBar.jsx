import { spacing } from "@/src/theme/tokens";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function GlassTabBar(props) {
  const insets = useSafeAreaInsets();
  // Use proper bottom inset with fallback to 8px padding for devices without notch
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 8;
  const totalHeight = spacing.tabBarHeight + bottomPadding;

  return (
    <View
      style={[
        styles.container,
        {
          bottom: 0,
          left: 0,
          right: 0,
          height: totalHeight,
          paddingBottom: bottomPadding,
        },
      ]}
      pointerEvents="box-none"
    >
      <BottomTabBar 
        {...props} 
        style={[
          styles.tabBar,
          { height: spacing.tabBarHeight }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#1C1C1E",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  tabBar: {
    position: "relative",
    left: 0,
    right: 0,
    backgroundColor: "#1C1C1E",
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 20,
  },
});
