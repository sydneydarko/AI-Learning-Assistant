import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { GlassTabBar } from "@/components/ui/GlassTabBar";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? "light"].tint;

  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: tint,
        tabBarInactiveTintColor: "#86868B",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { position: "absolute" },
        tabBarItemStyle: { justifyContent: "center", alignItems: "center" },
        tabBarIconStyle: { marginTop: 2 },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="square.grid.2x2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: "Capture",
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="camera.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Person",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
