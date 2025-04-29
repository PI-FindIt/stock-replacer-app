import * as Haptics from "expo-haptics";
import { GestureResponderEvent, Pressable } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { LinearGradient } from "@/components/LinearGradient";
import { LoadingIcon } from "@/components/LoadingIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIcon } from "@/components/ThemedIcon";
import React from "react";
import { SvgProps } from "react-native-svg";

interface ButtonProps {
  type?: "primary" | "secondary" | "ghost";
  Icon?: LucideIcon | React.FC<SvgProps>;
  text?: string;
  textStyle?: "h1" | "h2" | "h3" | "bodyBold";
  onPress: (event?: GestureResponderEvent) => void;
  haptic?: boolean;
  loading?: boolean;
}

interface ButtonWithTextProps extends ButtonProps {
  text: string;
}

interface ButtonWithIconProps extends ButtonProps {
  Icon: LucideIcon;
}

export function Button({
  type = "primary",
  Icon,
  text,
  onPress,
  haptic,
  loading,
  textStyle = "bodyBold",
}: ButtonWithTextProps | ButtonWithIconProps) {
  const FinalIcon = loading ? (LoadingIcon as LucideIcon) : Icon;
  return (
    <Pressable
      onPressIn={() => {
        if (haptic && process.env.EXPO_OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch((e) => {
            console.error("Error while playing haptics on button", e);
          });
        }
      }}
      disabled={loading}
      onPress={!loading ? onPress : undefined}
      className={"transition-opacity active:opacity-70"}
    >
      <LinearGradient
        className={"flex w-auto flex-row items-center gap-2 self-start"}
        type={type}
        style={{
          opacity: loading ? 0.7 : 1,
          paddingVertical: text ? 10 : 8,
          paddingRight: text ? 16 : 8,
          paddingLeft: text ? (FinalIcon ? 12 : 16) : 8,
          borderRadius: text ? 8 : 999,
        }}
      >
        {FinalIcon && (
          <ThemedIcon
            Icon={FinalIcon}
            size={text ? 20 : 24}
            width={text ? 20 : 24}
            height={text ? 20 : 24}
            color={type === "primary" ? "default" : "gradient"}
            ignoreDarkMode={type === "primary"}
          />
        )}
        {text && (
          <ThemedText
            type={textStyle}
            ignoreDarkMode={type === "primary"}
            color={type === "primary" ? "default" : "gradient"}
          >
            {text}
          </ThemedText>
        )}
      </LinearGradient>
    </Pressable>
  );
}
