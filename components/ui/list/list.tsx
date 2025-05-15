import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { ImageOff, LucideIcon } from "lucide-react-native";
import { ThemedText } from "../../ThemedText";
import { LinearGradient } from "@/components/LinearGradient";
import { ThemedIcon } from "@/components/ThemedIcon";
import themeConfig from "@/tailwind.config";
import { ThemedView } from "@/components/ThemedView";
import { Product } from "@/graphql/graphql";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Button } from "@/components/Button";
import GradientCircle from "@/components/GradientCircle";

interface ListProps {
  items: (Partial<Product> & {
    listQuantity?: number;
    cheapestPrice?: number | null;
    supermarketId?: number;
  })[];
  icon?: LucideIcon;
  stroke?: boolean;
  glow?: boolean;
  quantityCircle?: boolean;
  onIconPress?: (item: Partial<Product>) => void;
  onPress?: (item: Partial<Product>) => void;
}

const ItemSeparator = () => <View className={"h-4"} />;

const List = ({
  items,
  icon: Icon,
  stroke = false,
  glow = false,
  quantityCircle = false,
  onIconPress,
  onPress = () => {},
}: ListProps) => {
  const grey = useThemeColor("secondaryVariant");

  return (
    <FlatList
      ItemSeparatorComponent={ItemSeparator}
      data={items}
      style={{ paddingHorizontal: 16 }}
      keyExtractor={(item) => item.ean ?? ""}
      renderItem={({ item }) => {
        const ListItemWrapper = stroke ? LinearGradient : View;

        return (
          <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8}>
            <ListItemWrapper
              direction="0deg"
              className={stroke ? "rounded-3xl p-0.5" : ""}
              style={{
                boxShadow:
                  themeConfig.theme.boxShadow[glow ? "glow" : "DEFAULT"],
                borderRadius: 24,
              }}
            >
              <ThemedView className={"flex flex-col rounded-[20px] p-4"}>
                <View className="flex-row items-center">
                  {item.images?.[0] ? (
                    <Image
                      source={{
                        uri: item.images[0],
                      }}
                      className="h-20 w-20 rounded-xl"
                      resizeMode="contain"
                    />
                  ) : (
                    <View
                      className="h-20 w-20 items-center justify-center rounded-xl"
                      style={{ backgroundColor: grey }}
                    >
                      <ThemedIcon Icon={ImageOff} size={42} />
                    </View>
                  )}

                  <View className="flex-1 pl-4">
                    <ThemedText type={"h3"}>
                      {item.name && item.name.length > 28
                        ? item.name.substring(0, 28) + "..."
                        : item.name}
                    </ThemedText>
                    <ThemedText>{item.quantity}</ThemedText>
                  </View>

                  {Icon ? (
                    <TouchableOpacity onPress={() => onIconPress?.(item)}>
                      <View className="flex pl-4">
                        <ThemedIcon Icon={Icon} color="gradient" />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View className="pl-4">
                      {quantityCircle ? (
                        <GradientCircle
                          text={item.listQuantity?.toString() ?? "0"}
                        />
                      ) : (
                        <Button text="Replace" onPress={() => {}}></Button>
                      )}
                    </View>
                  )}
                </View>
              </ThemedView>
            </ListItemWrapper>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default List;
