import { TouchableOpacity } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { colorScheme } from "nativewind";
import themeColors from "@/tailwind.config";
import { ThemedText } from "@/components/ThemedText";
import React from "react";

interface ListTitleProps {
  title: string;
  isCollapsed: boolean;
  toggleCollapse: (title: string) => void;
}

const ListTitle: React.FC<ListTitleProps> = ({
  title,
  isCollapsed,
  toggleCollapse,
}) => {
  const iconColor =
    colorScheme.get() === "dark"
      ? themeColors.theme.colors.white
      : themeColors.theme.colors.black;

  return (
    <TouchableOpacity
      onPress={() => toggleCollapse(title)}
      className="flex-row items-center justify-between px-4"
    >
      <ThemedText type={"h3"}>{title}</ThemedText>
      {isCollapsed ? (
        <ChevronDown color={iconColor} size={24} />
      ) : (
        <ChevronUp color={iconColor} size={24} />
      )}
    </TouchableOpacity>
  );
};

export default ListTitle;
