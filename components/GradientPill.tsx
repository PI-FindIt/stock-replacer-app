import { View } from "react-native";
import { LinearGradient } from "@/components/LinearGradient";
import React from "react";

export function GradientPill() {
  return (
    <View className="items-center py-4">
      <LinearGradient className={"h-1 w-12 rounded-full"} />
    </View>
  );
}
