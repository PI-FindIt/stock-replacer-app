import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CircleHelp, LucideIcon } from "lucide-react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { HapticTab } from "@/components/HapticTab";
import themeColors from "@/tailwind.config";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "./LinearGradient";
import { ThemedIcon } from "@/components/ThemedIcon";

export default function TabBar({
  navigation,
  descriptors,
  state,
}: Readonly<BottomTabBarProps>) {
  const { buildHref } = useLinkBuilder();

  return (
    <View
      className={
        "bottom-safe-offset-4 absolute left-1/2 -translate-x-1/2 rounded-full"
      }
      style={{ boxShadow: themeColors.theme.boxShadow.lg }}
    >
      <LinearGradient direction={"0deg"} className={"rounded-full p-0.5"}>
        <ThemedView className={"flex flex-row gap-3 rounded-full p-2.5"}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;
            const Icon = (options.tabBarIcon as LucideIcon) ?? CircleHelp;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <HapticTab
                key={route.key}
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <LinearGradient
                  type={isFocused ? "primary" : "ghost"}
                  className={"rounded-full p-2"}
                >
                  <ThemedIcon
                    Icon={Icon}
                    size={24}
                    ignoreDarkMode={isFocused}
                  />
                </LinearGradient>
              </HapticTab>
            );
          })}
        </ThemedView>
      </LinearGradient>
    </View>
  );
}
