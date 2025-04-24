import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import LinearGradientMask from "@/components/LinearGradientMask";

export type ThemedTextProps = TextProps & {
  type?:
    | "title"
    | "largest"
    | "h1"
    | "h2"
    | "h3"
    | "body"
    | "bodyBold"
    | "small"
    | "extraSmall";
  color?: "default" | "variant" | "gradient";
  ignoreDarkMode?: boolean;
};

export function ThemedText({
  style,
  type = "body",
  color = "default",
  ignoreDarkMode,
  ...props
}: ThemedTextProps) {
  const finalColor = useThemeColor(
    color === "variant" ? "textVariant" : "text",
    ignoreDarkMode,
  );

  const textElement = (
    <Text
      style={[
        { color: finalColor },
        type === "title" ? styles.title : undefined,
        type === "largest" ? styles.Largest : undefined,
        type === "h1" ? styles.H1 : undefined,
        type === "h2" ? styles.H2 : undefined,
        type === "h3" ? styles.H3 : undefined,
        type === "body" ? styles.body : undefined,
        type === "bodyBold" ? styles.bodyBold : undefined,
        type === "small" ? styles.small : undefined,
        type === "extraSmall" ? styles.extraSmall : undefined,
        style,
      ]}
      {...props}
    />
  );

  return color === "gradient" ? (
    <LinearGradientMask>{textElement}</LinearGradientMask>
  ) : (
    textElement
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontFamily: "WorkSans_800ExtraBold",
  },
  Largest: {
    fontSize: 36,
    fontFamily: "WorkSans_800ExtraBold",
  },
  H1: {
    fontSize: 28,
    fontFamily: "WorkSans_800ExtraBold",
  },
  H2: {
    fontSize: 24,
    fontFamily: "WorkSans_700Bold",
  },
  H3: {
    fontSize: 20,
    fontFamily: "WorkSans_600SemiBold",
  },
  body: {
    fontSize: 16,
    fontFamily: "Raleway_400Regular",
  },
  bodyBold: {
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  small: {
    fontSize: 14,
    fontFamily: "Raleway_300Light",
  },
  extraSmall: {
    fontSize: 12,
    fontFamily: "Raleway_300Light",
  },
});

export { styles };
