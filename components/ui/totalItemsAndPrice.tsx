import * as React from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";

interface ItemCountCardProps {
  label?: string;
  count?: number | string;
}

const ItemCountCard: React.FC<ItemCountCardProps> = ({
  label = "Total items",
  count = "6",
}) => {
  const itemBackgroundColor = useThemeColor("background");

  return (
    <View
      className="w-full flex-row items-center justify-between rounded-2xl p-4"
      style={{
        backgroundColor: itemBackgroundColor,
        boxShadow: themeConfig.theme.boxShadow.DEFAULT,
      }}
    >
      <View className="flex overflow-hidden">
        <ThemedText type="h3">{label}</ThemedText>
      </View>

      <View className="overflow-hidden">
        <ThemedText type="largest" color="gradient">
          {count}
        </ThemedText>
      </View>
    </View>
  );
};

export default ItemCountCard;
