import { colors } from "@/src/theme/tokens";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export function ScanOverlay({ visible, duration = 1500, onComplete }) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = -100;
      opacity.value = 1;
      translateY.value = withTiming(1000, { duration }, (finished) => {
        if (finished && onComplete) onComplete();
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, duration, onComplete, translateY, opacity]);

  const animatedBar = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedContainer = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, animatedContainer]} pointerEvents="none">
      <Animated.View style={[styles.bar, animatedBar]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    position: "absolute",
    width: "90%",
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
});
