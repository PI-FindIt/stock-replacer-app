import React from "react";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";
import { View, Pressable } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface MenuOptionProps {
  text: string;
  Icon: LucideIcon;
  onPress?: () => void;
}

export default function MenuOption({
  Icon,
  text,
  onPress,
}: Readonly<MenuOptionProps>) {
  return (
    <Pressable onPress={onPress}>
      <Card className="flex-row">
        <View className="h-12 flex-row items-center gap-5 px-2">
          <Icon size={26} color="black" />
          <ThemedText type="h3">{text}</ThemedText>
        </View>
      </Card>
    </Pressable>
  );
}
