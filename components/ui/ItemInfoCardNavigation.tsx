import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import { Product } from "@/types/Product";

interface InfoCardProps {
  product: Product;
}

const InfoCard: React.FC<InfoCardProps> = ({ product }) => {
  const itemBackgroundColor = useThemeColor("background");

  return (
    <View
      className="flex w-full items-center justify-center rounded-2xl p-4"
      style={{
        backgroundColor: itemBackgroundColor,
        boxShadow: themeConfig.theme.boxShadow.DEFAULT,
      }}
    >
      <ThemedText type="h3">{product.name} </ThemedText>
      <ThemedText type="body">Next item on the list</ThemedText>
    </View>
  );
};

export default InfoCard;
