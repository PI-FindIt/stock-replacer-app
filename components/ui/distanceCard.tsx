import * as React from "react";
import { Linking, Platform, View } from "react-native";
import { Navigation, Play } from "lucide-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import { ThemedText } from "../ThemedText";
import { Button } from "../Button";

type DistanceCardProps = {
  supermarketName: string;
  distance: string;
  isAtLocation: boolean;
  destinationCoords?: { lat: number; lng: number };
  onStartShoppingPress?: () => void;
};

const DistanceCardSet = ({
  supermarketName = "Mercadona",
  distance = "1.2km",
  isAtLocation = false,
  destinationCoords = { lat: 39.8222, lng: -7.4947 },
  onStartShoppingPress = () => {},
}: DistanceCardProps) => {
  const [atLocation, setAtLocation] = React.useState(isAtLocation);
  const itemBackgroundColor = useThemeColor("background");

  const handleNavigatePress = () => {
    setAtLocation(true);
    const { lat, lng } = destinationCoords;

    if (Platform.OS === "ios") {
      Linking.openURL(`https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`);
    } else {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
      );
    }
  };

  return (
    <View>
      {!atLocation ? (
        <View
          className="items-center self-stretch rounded-2xl pb-1 pt-4"
          style={{
            backgroundColor: itemBackgroundColor,
            boxShadow: themeConfig.theme.boxShadow.DEFAULT,
          }}
        >
          <View className="mb-3 flex-row flex-wrap items-baseline justify-center px-4">
            <ThemedText type="h3">FindIt recommends </ThemedText>
            <ThemedText type="h3" color="gradient">
              {supermarketName}
            </ThemedText>
            <ThemedText type="h3"> supermarket ({distance} away).</ThemedText>
          </View>
          <View className="mb-4">
            <Button
              onPress={handleNavigatePress}
              Icon={Navigation}
              text="Take me there"
            />
          </View>
        </View>
      ) : (
        <View
          className="items-center self-stretch rounded-2xl pb-1 pt-4"
          style={{
            backgroundColor: itemBackgroundColor,
            boxShadow: themeConfig.theme.boxShadow.DEFAULT,
          }}
        >
          <View className="mb-3 flex-row flex-wrap items-baseline justify-center px-4">
            <ThemedText type="h3">Looks like you've arrived at </ThemedText>
            <ThemedText type="h3" color="gradient">
              {supermarketName}
            </ThemedText>
            <ThemedText type="h3"> (0.1 km away).</ThemedText>
          </View>
          <View className="mb-4">
            <Button
              onPress={onStartShoppingPress}
              Icon={Play}
              text="Start shopping"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DistanceCardSet;
