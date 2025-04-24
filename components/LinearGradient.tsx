import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

cssInterop(ExpoLinearGradient, {
  className: "style",
});

interface LinearGradientProps extends ViewProps {
  direction?: "0deg" | "45deg" | "90deg";
  type?: "primary" | "secondary" | "ghost";
}

export const LinearGradient = ({
  direction = "45deg",
  type = "primary",
  ...props
}: LinearGradientProps) => {
  const colorStart = useThemeColor(
    type === "primary" ? "primary" : "primaryVariant",
  );
  const colorEnd = useThemeColor(
    type === "primary" ? "secondary" : "secondaryVariant",
  );

  const end =
    direction === "45deg"
      ? { x: 1, y: 1 }
      : direction === "0deg"
        ? { x: 1, y: 0 }
        : { x: 0, y: 1 };

  return (
    <ExpoLinearGradient
      colors={
        type === "ghost" ? ["#ffffff00", "#ffffff00"] : [colorStart, colorEnd]
      }
      start={{ x: 0, y: 0 }}
      end={end}
      {...props}
    />
  );
};
