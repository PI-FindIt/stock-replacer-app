import Header from "@/components/Header";
import Chip from "@/components/ui/chip";
import NutriScoreBottomSheet from "@/components/ui/optionsBottomSheet";
import { NutriScore } from "@/graphql/graphql";
import { useThemeColor } from "@/hooks/useThemeColor";
import { gql } from "@apollo/client";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const GET_PRODUCTS_LIST = gql`
  query SupermarketLists($userId: String!) {
    user(id: $userId) {
      actualList {
        _id
      }
    }
  }
`;

export const GET_FILTERED_PRODUCTS = gql`
  query SearchProducts(
    $searchTerm: String!
    $nutriScoreFilter: NutriScoreFilter
    $brandFilter: StrFilter
  ) {
    products(
      filters: {
        name: { op: ILIKE, value: $searchTerm }
        nutriScore: $nutriScoreFilter
        brandName: $brandFilter
      }
    ) {
      ean
      name
      brandName
      genericName
      quantity
      images
      categoryName
      nutriScore
    }
  }
`;

export const GET_BRANDS = gql`
  query Brands($name: String!) {
    brands(name: $name) {
      name
    }
  }
`;

const Warnings = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedNutriScore, setSelectedNutriScore] =
    useState<NutriScore | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const backgroundColor = useThemeColor("background");

  const handleFilterSelect = (option: string) => {
    setSelectedNutriScore(option === "All" ? null : (option as NutriScore));
    bottomSheetRef.current?.close();
  };

  const filterOptions = {
    nutriScore: Object.values(NutriScore).filter(
      (val) => typeof val === "string",
    ) as string[],
  };

  return (
    <SafeAreaProvider
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 24,
        paddingHorizontal: 8,
        gap: 14,
      }}
    >
      <Header
        Title="Stock Warnings"
        IconLeftLeft={ArrowLeft}
        onLeftLeftPress={() => navigation.goBack()}
      />
      <View className="flex flex-col gap-4 pb-20">
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex overflow-visible px-4"
          contentContainerStyle={{
            columnGap: 8,
          }}
        >
          <Chip
            label={selectedBrand ?? "Brand"}
            hasDropdown={true}
            selected={!!selectedBrand}
            onPress={() => {
              if (selectedBrand) {
                setSelectedBrand(null);
              }
            }}
          />
          <Chip
            label={
              selectedNutriScore ? `Score: ${selectedNutriScore}` : "NutriScore"
            }
            hasDropdown={true}
            selected={!!selectedNutriScore}
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}
          />
        </ScrollView>
        {/* <View className="flex-1 items-center justify-center">
          <ThemedText type="h1" color="gradient">
            Stock warnings
          </ThemedText>
          <ThemedText type="h3" color="variant">
            No stock warnings available.
          </ThemedText>
        </View> */}
      </View>

      <NutriScoreBottomSheet
        bottomSheetRef={bottomSheetRef}
        onFilterSelect={handleFilterSelect}
        filterOptions={filterOptions.nutriScore}
        backgroundColor={backgroundColor}
      />

      {/* <BrandBottomSheet
        bottomSheetRef={brandBottomSheetRef}
        brands={brands}
        onBrandSelect={handleBrandSelect}
        backgroundColor={backgroundColor}
      /> */}
    </SafeAreaProvider>
  );
};

export default Warnings;
