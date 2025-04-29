import React from "react";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";
import { View, Pressable, useColorScheme } from "react-native";
import { LucideIcon } from "lucide-react-native";
import GradientCircle from "../GradientCircle";

interface MenuOptionProps {
  text: string;
  Icon: LucideIcon;
  quantity?: boolean;
  quantityValue?: number;
  onPress?: () => void;
}

export default function MenuOption({
  Icon,
  text,
  onPress,
  quantity = false,
  quantityValue = 0,
}: Readonly<MenuOptionProps>) {
  const theme = useColorScheme();
  const iconColor = theme === "dark" ? "white" : "black";

  return (
    <Pressable onPress={onPress}>
      <Card className="flex-row">
        <View className="h-12 flex-row items-center gap-5 px-2">
          <Icon size={26} color={iconColor} />
          <ThemedText type="h3">{text}</ThemedText>
          {quantity && (
            <View className="ml-auto flex-row items-end py-4">
              <GradientCircle text={String(quantityValue)} />
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
