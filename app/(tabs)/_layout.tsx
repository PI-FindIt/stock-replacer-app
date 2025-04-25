import { Tabs } from "expo-router";
import {
  Home,
  MessageCircleWarning,
  NotebookPen,
  Route,
  Search,
} from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import React from "react";
import TabBar from "@/components/TabBar";

const HomeIcon = ({ color }: { color: string }) => <Home color={color} />;
const NotebookPenIcon = ({ color }: { color: string }) => (
  <NotebookPen color={color} />
);
const WarningIcon = ({ color }: { color: string }) => (
  <MessageCircleWarning color={color} />
);
const RouteIcon = ({ color }: { color: string }) => <Route color={color} />;

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="warnings"
        options={{
          title: "Warnings",
          tabBarIcon: WarningIcon,
        }}
      />
      <Tabs.Screen
        name="product-search"
        options={{
          title: "productSearch",
          tabBarIcon: Search,
        }}
      />
      <Tabs.Screen
        name="to-stock-list"
        options={{
          title: "To Stock List",
          tabBarIcon: NotebookPenIcon,
        }}
      />
      <Tabs.Screen
        name="navigation"
        options={{
          title: "Navigation",
          tabBarIcon: RouteIcon,
        }}
      />
    </Tabs>
  );
}
