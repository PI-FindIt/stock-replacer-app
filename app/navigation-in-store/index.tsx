import { InStoreModal } from "@/components/InStoreModal";
import { mockData } from "@/types/dummy/dummy";
import { ImageBackground, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useEffect, useState } from "react";

const NavigationInStore = () => {
  const animatedPosition = useSharedValue<number>(0);
  const allProducts = mockData.flatMap((category) => category.items);
  const [currentProduct, setCurrentProduct] = useState(allProducts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prevProduct: any) => {
        const currentIndex = allProducts.indexOf(prevProduct);
        const newIndex = (currentIndex + 1) % allProducts.length;
        return allProducts[newIndex];
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [allProducts]);

  return (
    <ImageBackground
      source={require("@/assets/images/path.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1">
        <InStoreModal
          animatedPosition={animatedPosition}
          product={currentProduct}
        />
      </View>
    </ImageBackground>
  );
};

export default NavigationInStore;
