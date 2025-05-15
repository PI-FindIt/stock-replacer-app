import DistanceCardSet from "@/components/ui/distanceCard";
import { ThemedText } from "@/components/ThemedText";
import SupermarketCard from "@/components/ui/supermarketCard";
import { useBackground } from "@/hooks/useBackground";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Sparkles } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Animated, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ItemCountCard from "@/components/ui/totalItemsAndPrice";
import { router } from "expo-router";
import Path from "@/assets/images/path.png";
import { gql } from "@/graphql/gql";
import { useQuery } from "@apollo/client";

export const GET_PRODUCTS_LIST_TOTAL = gql(`
  query SupermarketListsTotal($userId: String!) {
    user(id: $userId) {
      actualList {
        products {
          product {
            ean
          }
          quantity
        }
      }
    }
  }
`);

const USER_ID = process.env.EXPO_PUBLIC_USER_ID || "default_user_id";

export default function NavigationScreen() {
  const insets = useSafeAreaInsets();
  const { toggleState } = useBackground();
  const [showNewContent, setShowNewContent] = useState(true);
  const iconBackgroundColor = useThemeColor("text");
  const initialContentOpacity = useMemo(() => new Animated.Value(1), []);
  const newContentOpacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    toggleState();

    const timer1 = setTimeout(() => {
      toggleState();
    }, 2500);

    const timer2 = setTimeout(() => {
      setShowNewContent(true);
      Animated.sequence([
        Animated.timing(initialContentOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(newContentOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      initialContentOpacity.removeAllListeners();
      newContentOpacity.removeAllListeners();
    };
  }, [initialContentOpacity, newContentOpacity, toggleState]);

  const { data } = useQuery(GET_PRODUCTS_LIST_TOTAL, {
    variables: { userId: USER_ID },
  });

  const { totalItems, totalCategories, estimatedTime } = useMemo(() => {
    if (!data?.user?.actualList?.products) {
      return { totalItems: 0, totalCategories: 0, estimatedTime: 0 };
    }

    const products = data.user.actualList.products;

    const totalItems = products.reduce(
      (sum: number, item: any) => sum + (item.quantity || 0),
      0,
    );

    const uniqueEANs = new Set(
      products.map((item: any) => item.product?.ean).filter(Boolean),
    );
    const totalCategories = uniqueEANs.size;

    const estimatedTime = totalCategories * 11;

    return { totalItems, totalCategories, estimatedTime };
  }, [data]);

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1">
      <ThemedText color="gradient" type="h1" className="py-4 text-center">
        Replace path
      </ThemedText>

      <View className="flex-1">
        <Animated.View
          style={{
            opacity: initialContentOpacity,
            position: showNewContent ? "absolute" : "relative",
          }}
          className="h-full w-full items-center justify-center gap-4"
        >
          <Sparkles color={iconBackgroundColor} width={64} height={64} />
          <ThemedText type="body" className="text-center">
            Calculating best{"\n"}route
          </ThemedText>
        </Animated.View>

        <Animated.View
          style={{ opacity: newContentOpacity }}
          className={`h-full w-full ${showNewContent ? "flex" : "hidden"}`}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex flex-col gap-8 p-4">
              <DistanceCardSet
                estimatedTime={estimatedTime}
                totalCategories={totalCategories}
                totalProducts={totalItems}
                onStartShoppingPress={() =>
                  router.push({
                    pathname: "/navigation-in-store",
                  })
                }
              />
              <ItemCountCard count={totalItems} label="Total items" />
              <ItemCountCard count={totalCategories} label="Total categories" />
              <SupermarketCard
                storeName="Fastest path"
                distance={`~ ${estimatedTime} minutes`}
                imageSource={Path}
                button={false}
                stroke={true}
              />
              <View className="p-4" />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}
