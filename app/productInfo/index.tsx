import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ArrowLeft, ImageOff } from "lucide-react-native";
import { useMemo } from "react";
import { Image, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Chip from "@/components/ui/chip";
import { Card } from "@/components/Card";
import SupermarketPrice from "@/components/ui/supermarketPrice";
import { LogoSVG } from "./logosvg";
import { gql, useQuery } from "@apollo/client";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedIcon } from "@/components/ThemedIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

const GET_PRODUCT = gql`
  query GetProduct($ean: String!) {
    product(ean: $ean) {
      ean
      name
      genericName
      nutrition
      nutriScore
      ingredients
      quantity
      images
      categoryName
      keywords
      brandName
      supermarkets {
        price
        supermarket {
          id
          name
          image
        }
      }
    }
  }
`;

const ProductInfo = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      ean: id as string,
    },
  });

  const product = useMemo(() => {
    if (!data?.product) return null;

    return {
      ...data.product,
      image: data.product.images?.[0],
      nutritionalInfo: {
        nutriscore: data.product.nutriScore,
        calories: data.product.nutrition?.energy,
      },
      price: data.product.supermarkets.map(
        (s: { supermarket: { name: any; image: any }; price: any }) => ({
          supermarket: s.supermarket.name,
          price: s.price,
          image: s.supermarket.image,
        }),
      ),
      description: data.product.ingredients ?? "No description available",
    };
  }, [data]);

  const grey = useThemeColor("secondaryVariant");

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaProvider
        style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
      >
        <View className="flex flex-col gap-4 px-4">
          <Header IconLeftLeft={ArrowLeft} onLeftLeftPress={handleBackPress} />
        </View>
      </SafeAreaProvider>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider
        style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
      >
        <View className="flex flex-col gap-4 px-4">
          <Header IconLeftLeft={ArrowLeft} onLeftLeftPress={handleBackPress} />
          <ThemedText>Error: {error.message}</ThemedText>
        </View>
      </SafeAreaProvider>
    );
  }

  if (!product) {
    return (
      <SafeAreaProvider
        style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
      >
        <View className="flex flex-col gap-4 px-4">
          <Header IconLeftLeft={ArrowLeft} onLeftLeftPress={handleBackPress} />
          <ThemedText>Product not found</ThemedText>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider
      style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
    >
      <View className="flex flex-col px-4">
        <Header IconLeftLeft={ArrowLeft} onLeftLeftPress={handleBackPress} />
        <View className="-z-10 -mt-8 flex-col items-center justify-center gap-2">
          {product.images[0] ? (
            <Image
              source={{ uri: product.images[0] }}
              className="h-32 w-32"
              resizeMode="contain"
            />
          ) : (
            <View
              style={{
                backgroundColor: grey,
              }}
              className="h-32 w-32 items-center justify-center rounded-xl p-2"
            >
              <ThemedIcon Icon={ImageOff} size={46} />
            </View>
          )}
          <View className="items-center">
            <ThemedText color="gradient" type="h1" className="text-center">
              {product.name}
            </ThemedText>
            <ThemedText type="h3">
              {product.brandName
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (char: string) => char.toUpperCase())}
            </ThemedText>
          </View>
          <View className="w-full flex-row items-center justify-center gap-4 pb-6">
            <LogoSVG
              name={product.nutritionalInfo.nutriscore}
              width={74}
              height={74}
            />
            <View className="flex-row flex-wrap gap-4">
              {product.quantity && (
                <Chip
                  isClickable={false}
                  label={product.quantity?.substring(0, 11)}
                />
              )}
              {product.nutritionalInfo.calories && (
                <Chip
                  isClickable={false}
                  label={`${product.nutritionalInfo.calories} kcal`}
                />
              )}
            </View>
          </View>
        </View>

        <View className="mt-6 gap-4">
          <ScrollView
            style={{ height: "80%" }}
            showsVerticalScrollIndicator={false}
          >
            <SupermarketPrice prices={product.supermarkets} />
          </ScrollView>

          <Card>
            {product.description !== "No description available" &&
            product.genericName !== "" ? (
              <ThemedText className="px-1 pb-1">
                {product.genericName} INGREDIENTS: {product.description}
              </ThemedText>
            ) : (
              <ThemedText className="px-1 pb-1">
                {product.description === ""
                  ? "No description available."
                  : product.description}
              </ThemedText>
            )}
          </Card>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ProductInfo;
