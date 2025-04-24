import { useThemeColor } from "@/hooks/useThemeColor";
import { LucideIcon, LucideProps } from "lucide-react-native";
import LinearGradientMask from "@/components/LinearGradientMask";
import { SvgProps } from "react-native-svg";
import React from "react";

export type ThemedTextProps = LucideProps & {
  Icon: LucideIcon | React.FC<SvgProps>;
  color?: "default" | "variant" | "gradient";
  ignoreDarkMode?: boolean;
};

export function ThemedIcon({
  Icon,
  color = "default",
  ignoreDarkMode,
  ...props
}: ThemedTextProps) {
  const finalColor = useThemeColor(
    color !== "variant" ? "text" : "textVariant",
    ignoreDarkMode,
  );

  const iconElement = <Icon color={finalColor} {...props} />;

  if (color === "gradient") {
    return <LinearGradientMask>{iconElement}</LinearGradientMask>;
  }

  return iconElement;
}
