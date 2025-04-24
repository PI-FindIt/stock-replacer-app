import { Pressable, View, StyleSheet } from "react-native";
import { Check, ChevronDown, LucideIcon } from "lucide-react-native";
import { LinearGradient } from "../LinearGradient";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import themeConfig from "@/tailwind.config";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ChipProps {
  selected?: boolean;
  label: string;
  hasDropdown?: boolean;
  isClickable?: boolean;
  onPress?: () => void;
  Icon?: LucideIcon;
}

const Chip: React.FC<ChipProps> = ({
  selected: initialSelected = false,
  label,
  hasDropdown = false,
  isClickable = true,
  onPress = () => {},
  Icon,
}) => {
  const [selected, setSelected] = useState(initialSelected);
  const finalColor = useThemeColor("text", selected);

  const Wrapper = selected && isClickable ? LinearGradient : ThemedView;

  const handlePress = () => {
    if (isClickable) {
      setSelected(!selected);
    }
    onPress();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        className="h-fit rounded-full active:opacity-70"
        disabled={!isClickable && !hasDropdown}
      >
        <Wrapper
          className="flex-row items-center justify-center gap-2 rounded-full px-4 py-2"
          direction="45deg"
          style={{
            boxShadow: themeConfig.theme.boxShadow.DEFAULT,
          }}
        >
          {selected && isClickable && (
            <Check color={finalColor} width={20} height={20} />
          )}
          {Icon && <Icon color={finalColor} width={18} height={18} />}
          <ThemedText
            ignoreDarkMode={selected && isClickable}
            style={{ lineHeight: 20 }}
          >
            {label}
          </ThemedText>
          {hasDropdown && (
            <ChevronDown color={finalColor} width={20} height={20} />
          )}
        </Wrapper>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});

export default Chip;
