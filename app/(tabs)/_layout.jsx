import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { spacing } from "@/src/theme/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 8;
  const totalHeight = spacing.tabBarHeight + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#86868B",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { 
          position: "absolute",
          backgroundColor: "#1C1C1E",
          borderTopWidth: 0.5,
          borderTopColor: "rgba(255,255,255,0.1)",
          height: totalHeight,
          paddingBottom: bottomPadding,
          paddingHorizontal: 10,
        },
        tabBarItemStyle: { 
          justifyContent: "center", 
          alignItems: "center",
          flex: 1,
          paddingTop: 25,
        },
        tabBarIconStyle: { 
          marginTop: 0,
          marginBottom: 0,
          flex: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: "Capture",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Person",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
