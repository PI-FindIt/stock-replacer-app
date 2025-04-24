import * as React from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react-native";
import { Button } from "../Button";

interface DirectionsCardProps {
  action?: string;
  context?: string;
  direction?: "right" | "left" | "front" | "back";
}

const DirectionsCard: React.FC<DirectionsCardProps> = ({
  action = "Turn right",
  context = "at the end",
  direction = "right",
}) => {
  const itemBackgroundColor = useThemeColor("background");

  const directionIcons = {
    right: ArrowRight,
    left: ArrowLeft,
    front: ChevronsUp,
    back: ChevronsDown,
  };

  const DirectionIcon = directionIcons[direction];

  return (
    <View
      className="w-full flex-row items-center justify-center gap-4 rounded-2xl p-4"
      style={{
        backgroundColor: itemBackgroundColor,
        boxShadow: themeConfig.theme.boxShadow.DEFAULT,
      }}
    >
      <Button Icon={DirectionIcon} onPress={() => {}} />
      <ThemedText type="h3">{`${action} ${context}`}</ThemedText>
    </View>
  );
};

export default DirectionsCard;
