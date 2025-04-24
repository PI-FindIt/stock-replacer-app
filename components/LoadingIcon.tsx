import { useEffect, useMemo } from "react";
import { Animated, Easing } from "react-native";
import { LoaderCircle, LucideProps } from "lucide-react-native";

export function LoadingIcon({
  size = 24,
  color = "white",
  ...props
}: Readonly<LucideProps>) {
  const rotateAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <LoaderCircle size={size} color={color} {...props} />
    </Animated.View>
  );
}
