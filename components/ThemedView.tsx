import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import config from "@/tailwind.config";

type ThemedViewProps = ViewProps & {
  noShadow?: boolean;
};

export function ThemedView({
  style,
  noShadow = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor("background");

  return (
    <View
      style={[
        {
          backgroundColor,
          boxShadow: noShadow ? undefined : config.theme.boxShadow.DEFAULT,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
