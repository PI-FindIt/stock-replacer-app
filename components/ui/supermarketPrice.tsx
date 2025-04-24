import { View, Image } from "react-native";
import { PiggyBank } from "lucide-react-native";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";
import { Card } from "../Card";
import { LinearGradient } from "../LinearGradient";
import { Supermarket } from "@/graphql/graphql";

interface SupermarketPriceProps {
  prices: {
    supermarket: Supermarket;
    price: number;
    onSalePrice?: number;
  }[];
}

const SUPERMARKET_LOGO_MAP: Record<string, any> = {
  Mercadona: require("../../assets/images/supermarkets/mercadona.png"),
  Continente: require("../../assets/images/supermarkets/continente.png"),
  Lidl: require("../../assets/images/supermarkets/lidl.png"),
  "Pingo Doce": require("../../assets/images/supermarkets/pingodoce.png"),
  Intermarché: require("../../assets/images/supermarkets/intermarche.png"),
  Auchan: require("../../assets/images/supermarkets/auchan.png"),
  Minipreço: require("../../assets/images/supermarkets/minipreco.png"),
  Aldi: require("../../assets/images/supermarkets/aldi.png"),
};

const SupermarketPrice: React.FC<SupermarketPriceProps> = ({ prices }) => {
  const cheapestPrice = Math.min(...prices.map((p) => p.price));

  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);

  return (
    <View className="gap-3">
      {sortedPrices.map((item) => {
        const isCheapest = item.price === cheapestPrice;
        const logoSource = SUPERMARKET_LOGO_MAP[item.supermarket.name];

        return (
          <Card key={item.supermarket.id} className="p-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 flex-row items-center gap-3">
                {logoSource && (
                  <Image
                    source={logoSource}
                    className="h-8 w-8 rounded-md"
                    resizeMode="contain"
                  />
                )}
                <ThemedText className="flex-shrink">
                  {item.supermarket.name}
                </ThemedText>
              </View>

              <View className="flex-row items-center gap-3">
                {isCheapest && (
                  <LinearGradient type="secondary" className="rounded-full p-2">
                    <ThemedIcon Icon={PiggyBank} color="gradient" size={20} />
                  </LinearGradient>
                )}
                <View className="flex-row items-center">
                  <ThemedText type="h3" color="gradient">
                    {item.price.toFixed(2)}€
                  </ThemedText>
                </View>
              </View>
            </View>
          </Card>
        );
      })}
    </View>
  );
};

export default SupermarketPrice;
