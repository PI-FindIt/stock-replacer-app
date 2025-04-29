import * as React from "react";
import { View } from "react-native";
import { Play } from "lucide-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import { ThemedText } from "../ThemedText";
import { Button } from "../Button";

type DistanceCardProps = {
  onStartShoppingPress?: () => void;
};

const DistanceCardSet = ({
  onStartShoppingPress = () => {},
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
            Replace 322 product of 7 categories. Estimated time of 23 minutes.
          </ThemedText>
        </View>
        <View className="mb-4">
          <Button
            onPress={onStartShoppingPress}
            Icon={Play}
            text="Start shopping"
          />
        </View>
      </View>
    </View>
  );
};

export default DistanceCardSet;
