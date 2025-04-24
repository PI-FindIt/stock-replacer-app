import { View } from "react-native";
import { FC } from "react";
import { ThemedText } from "./ThemedText";
import { Button } from "./Button";
import { LucideIcon } from "lucide-react-native";

interface HeaderProps {
  IconLeftLeft?: LucideIcon;
  IconLeft?: LucideIcon;
  IconRight?: LucideIcon;
  Title?: string;
  onLeftLeftPress?: () => void;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const Header: FC<HeaderProps> = ({
  IconLeftLeft,
  IconLeft,
  IconRight,
  Title,
  onLeftLeftPress,
  onLeftPress,
  onRightPress,
}) => {
  const hasTitle = !!Title;

  return (
    <View className="w-full flex-row items-center justify-between px-0">
      <View className="flex-row items-center justify-center gap-4">
        {IconLeftLeft && (
          <Button
            type="ghost"
            Icon={IconLeftLeft}
            onPress={onLeftLeftPress ?? (() => {})}
          />
        )}
        {hasTitle && (
          <ThemedText color="gradient" type="h1">
            {Title}
          </ThemedText>
        )}
      </View>
      <View className="flex-row items-center gap-2">
        {IconLeft && (
          <Button
            type="ghost"
            Icon={IconLeft}
            onPress={onLeftPress ?? (() => {})}
          />
        )}
        {IconRight && (
          <Button
            type="ghost"
            Icon={IconRight}
            onPress={onRightPress ?? (() => {})}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
