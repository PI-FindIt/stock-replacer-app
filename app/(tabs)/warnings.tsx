import Header from "@/components/Header";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useCallback, useMemo } from "react";
import { useColorScheme, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import List from "@/components/ui/list/list";
import { Skeleton } from "moti/skeleton";
import { ThemedText } from "@/components/ThemedText";
import { gql, useQuery } from "@apollo/client";
import { useThemeColor } from "@/hooks/useThemeColor";

const USER_ID = process.env.EXPO_PUBLIC_USER_ID;

export const GET_PRODUCTS_LIST_WARNING = gql`
  query SupermarketListsWarnings($userId: String!) {
    user(id: $userId) {
      actualList {
        _id
        products {
          product {
            ean
            name
            genericName
            quantity
            images
            categoryName
            brandName
            supermarkets {
              price
              supermarket {
                id
              }
            }
          }
          quantity
        }
      }
    }
  }
`;

const Warnings = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const backgroundColor = useThemeColor("background");
  const theme = useColorScheme();

  const { data, loading, refetch } = useQuery(GET_PRODUCTS_LIST_WARNING, {
    variables: {
      userId: USER_ID,
    },
  });

  const products = useMemo(() => {
    return (
      data?.user?.actualList?.products?.map((listProduct: any) => ({
        ...listProduct.product,
        listQuantity: listProduct.quantity,
      })) || []
    );
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (loading) {
    return (
      <View style={{ paddingTop: insets.top }} className="flex-1 px-4">
        <Header
          Title="Stock Warnings"
          IconLeftLeft={ArrowLeft}
          onLeftLeftPress={() => navigation.goBack()}
        />
        <View className="gap-4 pt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Skeleton
              key={item}
              width="100%"
              height={80}
              radius={24}
              backgroundColor={backgroundColor}
              colorMode={theme ?? "light"}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaProvider
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 24,
        gap: 24,
        flex: 1,
      }}
    >
      <View className="px-2">
        <Header
          Title="Stock Warnings"
          IconLeftLeft={ArrowLeft}
          onLeftLeftPress={() => navigation.goBack()}
        />
      </View>

      {products.length === 0 ? (
        <View className="flex-1 items-center justify-center pb-24">
          <ThemedText type="body" className="text-center">
            {"Stay tuned - no stock" + "\n" + "updates for now."}
          </ThemedText>
        </View>
      ) : (
        <List
          items={products}
          onPress={(item) =>
            router.push({
              pathname: "/productInfo",
              params: { id: item.ean },
            })
          }
        />
      )}
    </SafeAreaProvider>
  );
};

export default Warnings;
