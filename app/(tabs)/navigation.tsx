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
import { useQuery, gql } from "@apollo/client";
import { LoadingIcon } from "@/components/LoadingIcon";
import ErrorComponent from "@/components/ErrorComponent";

const GET_SUPERMARKET_INFO = gql`
  query Supermarket($id: Int!) {
    supermarket(id: $id) {
      description
      image
      name
      services
    }
  }
`;

export default function NavigationScreen() {
  const insets = useSafeAreaInsets();
  const { toggleState } = useBackground();
  const [showNewContent, setShowNewContent] = useState(true);
  const iconBackgroundColor = useThemeColor("text");
  const initialContentOpacity = useMemo(() => new Animated.Value(1), []);
  const newContentOpacity = useMemo(() => new Animated.Value(0), []);

  const { loading, error, data } = useQuery(GET_SUPERMARKET_INFO, {
    variables: { id: 1 },
  });

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

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <ErrorComponent type={"error"} error={error} />;
  }

  if (!data?.supermarket) {
    return <ErrorComponent type={"notFound"} />;
  }

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1">
      <ThemedText color="gradient" type="h1" className="py-4 text-center">
        In-Store Navigation
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
            Calculating best{"\n"}supermarket and route
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
                supermarketName={data!.supermarket!.name}
                distance="8.3"
                isAtLocation={false}
                destinationCoords={{ lat: 39.8222, lng: -7.4947 }}
                onStartShoppingPress={() =>
                  router.push({
                    pathname: "/navigation-in-store",
                  })
                }
              />
              <SupermarketCard
                storeName={data?.supermarket?.name ?? "PLACEHOLDER"}
                distance="1.2 km"
                imageSource={{ uri: data?.supermarket?.image }}
                onDetailsPress={() =>
                  router.push({
                    pathname: "/supermarketInfo",
                    params: { id: "1" },
                  })
                }
              />
              <ItemCountCard count={6} label="Total items" />
              <ItemCountCard count={"21.60€"} label="Total price" />
              <SupermarketCard
                storeName="Fastest path"
                distance="~ 7 min"
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
