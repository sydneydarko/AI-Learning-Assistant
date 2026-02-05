import { spacing } from "@/src/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

// Circular Progress Component
function CircularProgress({ percentage, size = 80, strokeWidth = 8, color, label, sublabel }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.progressContainer}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={color} stopOpacity="1" />
              <Stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </LinearGradient>
          </Defs>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2A2A2C"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#grad-${color})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View style={[styles.progressTextContainer, { width: size, height: size }]}>
          <Text style={styles.progressPercentage}>{label}</Text>
        </View>
      </View>
      <Text style={styles.progressLabel}>{sublabel}</Text>
    </View>
  );
}


export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Calculate proper bottom padding
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 8;
  const tabBarTotalHeight = spacing.tabBarHeight + bottomPadding + 20;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarTotalHeight }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.avatar}>
              <Ionicons name="person-circle" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.greetingText}>Welcome Sydney!</Text>
          <Text style={styles.titleText}>Welcome Back!</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <CircularProgress
            percentage={73}
            size={90}
            strokeWidth={10}
            color="#84CC16"
            label="73%"
            sublabel="Today's Learning Progress"
          />
          <CircularProgress
            percentage={57}
            size={90}
            strokeWidth={10}
            color="#22C55E"
            label="4/7h"
            sublabel="Total Learning Hours"
          />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2A2A2C",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2A2A2C",
    justifyContent: "center",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 32,
    paddingVertical: 16,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  progressLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
    textAlign: "center",
    maxWidth: 100,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  classCard: {
    flex: 1,
    borderRadius: 30,
    padding: 20,
    minHeight: 240,
    position: "relative",
  },
  classCardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  classIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  classTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 24,
  },
  classStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 16,
  },
  statCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  statText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  studyProgressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  studyProgressLeft: {
    justifyContent: "center",
  },
  studyProgressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    lineHeight: 18,
  },
  studyProgressChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
    flex: 1,
    height: 40,
  },
  progressDot: {
    width: 6,
    borderRadius: 3,
  },
  studyProgressPercentage: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
});
