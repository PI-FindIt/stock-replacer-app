import * as React from "react";
import { View } from "react-native";
import { Play } from "lucide-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import { ThemedText } from "../ThemedText";
import { Button } from "../Button";

type DistanceCardProps = {
  onStartShoppingPress?: () => void;
  totalProducts?: number;
  totalCategories?: number;
  estimatedTime?: number;
};

const DistanceCardSet = ({
  onStartShoppingPress = () => {},
  totalProducts,
  totalCategories,
  estimatedTime,
}: DistanceCardProps) => {
  const itemBackgroundColor = useThemeColor("background");

  return (
    <View>
      <View
        className="items-center rounded-2xl pb-1 pt-4"
        style={{
          backgroundColor: itemBackgroundColor,
          boxShadow: themeConfig.theme.boxShadow.DEFAULT,
        }}
      >
        <View className="p-3 pt-0">
          <ThemedText type="h3" className="text-center">
            Replace {totalProducts} products of {totalCategories} categories.
            Estimated time of {estimatedTime} minutes.
          </ThemedText>
        </View>
        <View className="mb-4">
          <Button
            onPress={onStartShoppingPress}
            Icon={Play}
            text="Start replacing"
          />
        </View>
      </View>
    </View>
  );
};

export default DistanceCardSet;
