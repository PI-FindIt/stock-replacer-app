import { View } from "react-native";
import FindItLogo from "@/assets/images/Symbol.svg";
import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "@/components/LinearGradient";
import { useBackground } from "@/hooks/useBackground";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LoginBottomSheet } from "@/components/LoginBottomSheet";

const LoginPage: React.FC = () => {
  const { setState } = useBackground();
  const animatedPosition = useSharedValue<number>(0);

  useEffect(() => {
    setState(true);
  }, [setState]);

  const style = useAnimatedStyle(
    () => ({
      height: animatedPosition.get(),
    }),
    [animatedPosition],
  );

  return (
    <LinearGradient className="flex-1">
      <Animated.View
        className="flex flex-col items-center justify-center gap-8"
        style={style}
      >
        <FindItLogo width={96} height={96} />
        <View className="flex flex-col items-center gap-2">
          <ThemedText type="title" ignoreDarkMode={true}>
            FindIt Sock Replace
          </ThemedText>
          <ThemedText type="h3" color={"variant"} ignoreDarkMode={true}>
            Shopping easier.
          </ThemedText>
        </View>
      </Animated.View>
      <LoginBottomSheet animatedPosition={animatedPosition} />
    </LinearGradient>
  );
};

export default LoginPage;
