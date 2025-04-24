import { useEffect } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

const { width, height } = Dimensions.get("window");

interface BackgroundProps {
  full: boolean;
}

interface Circle {
  color: any;
  animated: boolean;
  width: number;
  height: number;
  top: number;
  left: number;
  hiddenTop?: number;
}

const circles: Circle[] = [
  {
    color: require("@/assets/images/background/pink.png"),
    animated: false,
    width: 640,
    height: 640,
    top: 0.06751,
    left: 0.14678,
  },
  {
    color: require("@/assets/images/background/orange.png"),
    animated: false,
    width: 640,
    height: 640,
    top: 0.96339,
    left: 0.10697,
  },
  {
    color: require("@/assets/images/background/orange.png"),
    animated: false,
    width: 640,
    height: 640,
    top: 0.89817,
    left: 0.9801,
  },
  {
    color: require("@/assets/images/background/pink.png"),
    animated: false,
    width: 640,
    height: 640,
    top: 0.57323,
    left: 0.12438,
  },
  {
    color: require("@/assets/images/background/orange.png"),
    animated: false,
    width: 640,
    height: 640,
    top: 0.3341,
    left: 0.87562,
  },
  {
    color: require("@/assets/images/background/ellipse6.png"),
    animated: true,
    width: 446,
    height: 435,
    top: 0.36041,
    left: 0.32836,
    hiddenTop: 1.17162,
  },
  {
    color: require("@/assets/images/background/ellipse7.png"),
    animated: true,
    width: 466,
    height: 436,
    top: 0.4222,
    left: 0.02736,
    hiddenTop: 1.43936,
  },
  {
    color: require("@/assets/images/background/ellipse8.png"),
    animated: true,
    width: 546,
    height: 535,
    top: 0.73227,
    left: 0.85572,
    hiddenTop: 1.48512,
  },
  {
    color: require("@/assets/images/background/ellipse9.png"),
    animated: true,
    width: 413,
    height: 404,
    top: 0.45995,
    left: 0.68657,
    hiddenTop: 1.32037,
  },
  {
    color: require("@/assets/images/background/ellipse10.png"),
    animated: true,
    width: 461,
    height: 461,
    top: 0.57895,
    left: 0.37313,
    hiddenTop: 1.22197,
  },
  {
    color: require("@/assets/images/background/ellipse11.png"),
    animated: true,
    width: 617,
    height: 596,
    top: 0.92105,
    left: 0.19402,
    hiddenTop: 1.5984,
  },
];

const Background = ({ full }: BackgroundProps) => {
  const color = useColorScheme();
  const circleAnimations = circles.map(
    (circle) => new Animated.Value(height * (circle.hiddenTop ?? circle.top)),
  );

  useEffect(() => {
    circles.forEach((circle, index) => {
      if (!circle.animated) return;
      Animated.timing(circleAnimations[index], {
        toValue:
          height * (full ? circle.top : (circle.hiddenTop ?? circle.top)),
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    });
  }, [circleAnimations, full]);

  return (
    <View
      className={"absolute left-0 top-0 h-full w-full"}
      style={{
        pointerEvents: "none",
        backgroundColor: color === "dark" ? "#000" : "#fff",
      }}
    >
      {circles.map((circle, index) => (
        <Animated.Image
          key={`circle-${circle.color}-${circle.top}-${circle.left}`}
          className={"absolute"}
          source={circle.color}
          style={styles(circle, circleAnimations[index]).circle}
        />
      ))}
    </View>
  );
};

const styles = (circle: Circle, translate: Animated.Value) =>
  StyleSheet.create({
    circle: {
      top: 0,
      left: circle.left * width,
      transform: [
        { translateX: circle.width / -2 },
        { translateY: circle.height / -2 },
        { translateY: translate },
      ],
    },
  });

export default Background;
