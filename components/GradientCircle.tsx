import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "@/components/LinearGradient";

interface GradientCircleProps {
  text: string;
  size?: number;
}

const GradientCircle = ({ text, size = 50 }: GradientCircleProps) => {
  const isPill = text.length > 2;
  const theme = useColorScheme();

  const containerWidth = isPill
    ? Math.max(size, size + (text.length - 2) * 10)
    : size;

  return (
    <LinearGradient
      style={[
        styles.gradientBorder,
        {
          width: containerWidth,
          height: size,
          borderRadius: isPill ? size / 2 : size,
        },
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          {
            width: containerWidth - 4,
            height: size - 4,
            borderRadius: isPill ? size / 2 : size,
          },
        ]}
      >
        <ThemedText
          type="h3"
          style={{ color: theme === "light" ? "white" : "black" }}
        >
          {text}
        </ThemedText>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GradientCircle;
