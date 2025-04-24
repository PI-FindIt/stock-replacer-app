import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "@/components/LinearGradient";

interface GradientCircleProps {
  text: string;
  size?: number;
}

const GradientCircle = ({ text, size = 50 }: GradientCircleProps) => {
  const backgroundColor = useThemeColor("background");

  return (
    <LinearGradient
      style={[
        styles(backgroundColor).gradientBorder,
        { width: size, height: size, borderRadius: size },
      ]}
    >
      <View
        style={[
          styles(backgroundColor).innerCircle,
          { width: size - 3.7, height: size - 3.1, borderRadius: size },
        ]}
      >
        <ThemedText type="h3" color="gradient">
          {text}
        </ThemedText>
      </View>
    </LinearGradient>
  );
};

const styles = (backgroundColor: string) =>
  StyleSheet.create({
    gradientBorder: {
      justifyContent: "center",
      alignItems: "center",
      padding: 3,
    },
    innerCircle: {
      backgroundColor: backgroundColor,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default GradientCircle;
