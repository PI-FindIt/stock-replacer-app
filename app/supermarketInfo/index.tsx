import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import CategorySelector from "@/components/ui/categorySelector";
import { useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Chip from "@/components/ui/chip";
import { Card } from "@/components/Card";
import Animated, { FadeIn } from "react-native-reanimated";
import { SupermarketPropertiesGrid } from "@/components/ui/servicesGrid";
import { useQuery } from "@apollo/client";
import { gql } from "@/graphql";
import { LoadingIcon } from "@/components/LoadingIcon";
import ErrorComponent from "@/components/ErrorComponent";

const GET_SUPERMARKET_INFO = gql(`
  query Supermarket($id: Int!) {
    supermarket(id: $id) {
      description
      image
      name
      services
    }
  }
`);

const SupermarketInfo = () => {
  const { loading, error, data } = useQuery(GET_SUPERMARKET_INFO, {
    variables: { id: 1 },
  });

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const selectorConfigs = [
    {
      id: "productDetail",
      choices: [
        { id: "1", label: "Services" },
        { id: "2", label: "About" },
      ],
    },
  ];
  const [selections, setSelections] = useState<Record<string, string | null>>({
    productDetail: selectorConfigs[0].choices[0].id,
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSelectionChange = (selectorId: string, choiceId: string) => {
    setSelections((prev) => ({
      ...prev,
      [selectorId]: prev[selectorId] === choiceId ? null : choiceId,
    }));
  };

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
    <SafeAreaProvider
      style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
    >
      <View className="flex flex-col gap-2">
        <View className="ps-2">
          <Header
            IconLeftLeft={ArrowLeft}
            onLeftLeftPress={handleBackPress}
            Title={data.supermarket.name}
          />
        </View>
        <View className="p-4">
          <Image
            source={{ uri: data.supermarket.image ?? undefined }}
            className="h-64 w-full rounded-2xl"
          />
          <View className="flex-row items-center justify-center gap-4 pb-8 pt-4">
            <Chip isClickable={false} label="1.2 km away" />
            <Chip isClickable={false} label="Aveiro" />
          </View>

          <CategorySelector
            choices={selectorConfigs[0].choices}
            selectedChoiceId={selections.productDetail}
            onSelect={(choiceId) =>
              handleSelectionChange("productDetail", choiceId)
            }
          />

          {/* SELECTIONS */}
          <View className="mt-4">
            {selections.productDetail === "1" && (
              <Animated.View entering={FadeIn.duration(300).springify()}>
                <View className="w-full flex-row flex-wrap">
                  <SupermarketPropertiesGrid
                    properties={data.supermarket.services ?? []}
                  />
                </View>
              </Animated.View>
            )}

            {selections.productDetail === "2" && (
              <Animated.View entering={FadeIn.duration(300).springify()}>
                <Card>
                  <ThemedText className="px-1 pb-1">
                    {data.supermarket.description}
                  </ThemedText>
                </Card>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default SupermarketInfo;
