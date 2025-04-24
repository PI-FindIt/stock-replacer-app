import { FlatList, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";

const NutritionalCard = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => (
  <Card>
    <View>
      <ThemedText type="h3" color="gradient">
        {typeof value === "number" ? value.toFixed(1) : value}
      </ThemedText>
      <ThemedText>{label}</ThemedText>
    </View>
  </Card>
);

type NutritionalInfo = {
  energy?: number;
  fat?: number;
  carbohydrates?: number;
  sugars?: number;
  proteins?: number;
  salt?: number;
};

export const NutritionalInfoGrid = ({ info }: { info: NutritionalInfo }) => {
  const nutritionItems = [
    {
      key: "calories",
      value: Math.round(info.energy ?? 0),
      label: "Calories",
      unit: "kcal",
    },
    { key: "fat", value: Math.round(info.fat ?? 0), label: "Fat", unit: "g" },
    {
      key: "carbs",
      value: Math.round(info.carbohydrates ?? 0),
      label: "Carbohydrates",
      unit: "g",
    },
    {
      key: "sugar",
      value: Math.round(info.sugars ?? 0),
      label: "Sugars",
      unit: "g",
    },
    {
      key: "protein",
      value: Math.round(info.proteins ?? 0),
      label: "Protein",
      unit: "g",
    },
    {
      key: "salt",
      value: Math.round(info.salt ?? 0),
      label: "Salt",
      unit: "g",
    },
  ];

  return (
    <FlatList
      data={nutritionItems}
      numColumns={2}
      columnWrapperStyle={{ gap: 8 }}
      contentContainerStyle={{ gap: 8 }}
      className={"overflow-visible"}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <NutritionalCard
            value={item.value + " " + item.unit}
            label={item.label}
          />
        </View>
      )}
      keyExtractor={(item) => item.key}
      scrollEnabled={false}
    />
  );
};
