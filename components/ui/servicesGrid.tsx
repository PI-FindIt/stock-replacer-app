import { FlatList, View } from "react-native";
import { Card } from "@/components/Card";
import {
  Coffee,
  Fuel,
  Newspaper,
  ScanBarcode,
  Stethoscope,
  Utensils,
} from "lucide-react-native";
import { ThemedText } from "../ThemedText";
import LinearGradientMask from "../LinearGradientMask";
import { SupermarketServices } from "@/graphql/graphql";
import React from "react";

type PropertyItem = {
  key: string;
  icon?: React.ReactElement;
  label: string;
};

const PropertyIconCard = ({
  icon,
  label,
}: {
  icon: React.ReactElement;
  label: string;
}) => (
  <Card className="flex-1">
    <View className="flex-row items-center gap-3">
      <LinearGradientMask>{icon}</LinearGradientMask>
      <View className="flex-1 justify-center">
        <ThemedText className="text-base">{label}</ThemedText>
      </View>
    </View>
  </Card>
);

export const SupermarketPropertiesGrid = ({
  properties,
}: {
  properties: SupermarketServices[];
}) => {
  const propertyMap: Record<SupermarketServices, PropertyItem> = {
    [SupermarketServices.Pharmacy]: {
      key: "pharmacy",
      icon: <Stethoscope size={20} color="#000" />,
      label: "Pharmacy",
    },
    [SupermarketServices.SelfKiosk]: {
      key: "self-checkout",
      icon: <ScanBarcode size={20} color="#000" />,
      label: "Self Checkout",
    },
    [SupermarketServices.Coffee]: {
      key: "coffee",
      icon: <Coffee size={20} color="#000" />,
      label: "Coffee",
    },
    [SupermarketServices.Restaurant]: {
      key: "restaurant",
      icon: <Utensils size={20} color="#000" />,
      label: "Restaurant",
    },
    [SupermarketServices.Newsstand]: {
      key: "newsstand",
      icon: <Newspaper size={20} color="#000" />,
      label: "News stand",
    },
    [SupermarketServices.GasStation]: {
      key: "gas-station",
      icon: <Fuel size={20} color="#000" />,
      label: "Gas Station",
    },
  };

  let propertyItems = properties.map((prop) => propertyMap[prop]);

  return (
    <View className="w-full">
      <FlatList
        data={propertyItems}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
        contentContainerStyle={{ gap: 8, flexGrow: 1 }}
        className="w-full overflow-visible"
        renderItem={({ item }) =>
          item.key !== "placeholder" ? (
            <View className="flex-1">
              <PropertyIconCard
                icon={item.icon ?? <View />}
                label={item.label}
              />
            </View>
          ) : (
            <View className="flex-1" />
          )
        }
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
      />
    </View>
  );
};
