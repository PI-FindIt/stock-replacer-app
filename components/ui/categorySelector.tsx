import { TouchableOpacity, Animated, Easing } from "react-native";
import { LinearGradient } from "../LinearGradient";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import themeConfig from "@/tailwind.config";
import { Choice } from "./categorySelectorTypes";
import { useEffect, useMemo } from "react";

type CategorySelectorProps = {
  choices: Choice[];
  selectedChoiceId: string | null;
  onSelect: (id: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  choices,
  selectedChoiceId,
  onSelect,
}) => {
  const bgColor = useThemeColor("background");
  const textColor = useThemeColor("text");

  const animationValues = useMemo(
    () => choices.map(() => new Animated.Value(0)),
    [choices],
  );

  useEffect(() => {
    choices.forEach((choice, index) => {
      const isSelected = choice.id === selectedChoiceId;
      Animated.timing(animationValues[index], {
        toValue: isSelected ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  }, [selectedChoiceId, choices, animationValues]);

  return (
    <ThemedView
      className="flex-row items-center self-stretch overflow-hidden rounded-full"
      style={{
        backgroundColor: bgColor,
        boxShadow: themeConfig.theme.boxShadow.DEFAULT,
      }}
    >
      {choices.map((choice, index) => {
        const isSelected = choice.id === selectedChoiceId;
        const Wrapper = isSelected ? LinearGradient : ThemedView;

        const scale = animationValues[index].interpolate({
          inputRange: [0, 0.9],
          outputRange: [0.9, 1.0],
        });

        const translateX = animationValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1], // do not translate X (ing Ping)
        });

        return (
          <TouchableOpacity
            key={choice.id}
            className="flex-1"
            onPress={() => onSelect(choice.id)}
            activeOpacity={0.8}
          >
            <Animated.View
              style={{
                transform: [{ translateX }, { scale }],
              }}
            >
              <Wrapper
                className="flex-row items-center justify-center rounded-full py-3"
                direction="45deg"
                noShadow={true}
                type={isSelected ? "primary" : undefined}
              >
                <ThemedText
                  type={isSelected ? "bodyBold" : "body"}
                  ignoreDarkMode={isSelected}
                  style={isSelected ? undefined : { color: textColor }}
                >
                  {choice.label}
                </ThemedText>
              </Wrapper>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
};

export default CategorySelector;
