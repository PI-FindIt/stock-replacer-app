import React from "react";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";
import { View, Pressable } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { colorScheme } from "nativewind";
import themeColors from "@/tailwind.config";
import GradientCircle from "../GradientCircle";

interface MenuOptionProps {
  text: string;
  Icon: LucideIcon;
  quantity?: boolean;
  onPress?: () => void;
}

export default function MenuOption({
  Icon,
  text,
  onPress,
  quantity = false,
}: Readonly<MenuOptionProps>) {
  const iconColor =
    colorScheme.get() === "dark"
      ? themeColors.theme.colors.white
      : themeColors.theme.colors.black;

  return (
    <Pressable onPress={onPress}>
      <Card className="flex-row">
        <View className="h-12 flex-row items-center gap-5 px-2">
          <Icon size={26} color={iconColor} />
          <ThemedText type="h3">{text}</ThemedText>
          {quantity && (
            <View className="ml-auto flex-row items-end">
              <GradientCircle text={"9"} />
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
