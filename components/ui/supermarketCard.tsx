import { View, Image } from "react-native";
import { ThemedText } from "../ThemedText";
import { Button } from "../Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "@/components/LinearGradient";
import themeConfig from "@/tailwind.config";

interface ListItemProps {
  storeName: string;
  distance: string;
  imageSource: any;
  button?: boolean;
  stroke?: boolean;
  onDetailsPress?: () => void;
}

const SupermarketCard: React.FC<ListItemProps> = ({
  storeName = "Mercadona Aveiro",
  distance = "1.2 km",
  button = true,
  stroke = false,
  imageSource = require("../../assets/images/supermarkets/mercadona_actual.png"),
  onDetailsPress = () => {},
}) => {
  const itemBackgroundColor = useThemeColor("background");

  return (
    <View
      className="items-center gap-4 rounded-2xl p-4"
      style={{
        backgroundColor: itemBackgroundColor,
        boxShadow: themeConfig.theme.boxShadow.DEFAULT,
      }}
    >
      <View className="w-full flex-row items-center justify-between">
        <View className="gap-1">
          <ThemedText type="h3">{storeName}</ThemedText>
          <ThemedText>{distance}</ThemedText>
        </View>
        {button && (
          <Button onPress={onDetailsPress} text="Details" type="secondary" />
        )}
      </View>

      {stroke ? (
        <LinearGradient className="w-full rounded-xl p-0.5">
          <View
            className="overflow-hidden rounded-xl"
            style={{ backgroundColor: itemBackgroundColor }}
          >
            <Image
              source={imageSource}
              resizeMode="cover"
              className="h-64 w-full"
            />
          </View>
        </LinearGradient>
      ) : (
        <Image
          source={imageSource}
          resizeMode="cover"
          className="h-64 w-full rounded-xl"
        />
      )}
    </View>
  );
};

export default SupermarketCard;
