import { colors, spacing } from "@/src/theme/tokens";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const tabBarTotalHeight =
    spacing.tabBarHeight +
    spacing.tabBarBottom +
    (insets.bottom > 0 ? insets.bottom : spacing.tabBarBottom);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: tabBarTotalHeight + 20 }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Coming soon...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: "#9CA3AF",
  },
});
