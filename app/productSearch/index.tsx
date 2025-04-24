import List from "@/components/ui/list/list";
import SearchBar from "@/components/ui/SearchBar";
import { useState, useEffect, useRef } from "react";
import { View, ScrollView, Modal } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Info } from "lucide-react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Chip from "@/components/ui/chip";
import { NutriScore } from "@/graphql/graphql";
import BottomSheet from "@gorhom/bottom-sheet";
import { useThemeColor } from "@/hooks/useThemeColor";
import NutriScoreBottomSheet from "@/components/ui/optionsBottomSheet";
import BrandBottomSheet from "@/components/ui/brandBottomSheet";
import { ThemedText } from "@/components/ThemedText";
import { Skeleton } from "moti/skeleton";

const USER_ID = "68061340cc340e20a65376ea";

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

export const ADD_PRODUCT_TO_LIST = gql`
  mutation UpsertProductFromList($models: [ListProductInput!]!) {
    upsertProductFromList(models: $models) {
      product {
        ean
      }
    }
  }
`;

const Search = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();
  const searchRef = useRef<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedNutriScore, setSelectedNutriScore] =
    useState<NutriScore | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const brandBottomSheetRef = useRef<BottomSheet>(null);
  const { data: brandsData } = useQuery(GET_BRANDS, {
    variables: { name: "" },
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const c = useThemeColor("background");
  const theme = c === "#ffffff" ? "light" : "dark";

  const brands = brandsData?.brands ?? [];

  const handleBrandPress = () => {
    brandBottomSheetRef.current?.expand();
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
    brandBottomSheetRef.current?.close();
    setDebouncedQuery((prev) => (prev === "" ? " " : ""));
    setTimeout(() => setDebouncedQuery(searchQuery), 10);
  };

  const [addProductToList] = useMutation(ADD_PRODUCT_TO_LIST, {
    onError: (error) => console.error("Error adding product"),
    onCompleted: (data) => console.log("Product added"),
  });

  const { data: listData } = useQuery(GET_PRODUCTS_LIST, {
    variables: { userId: USER_ID },
  });

  const handleAddProduct = (productEan: string, productName: string) => {
    setAddedProductName(productName);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.push("/shopping-list");
    }, 1000);
    addProductToList({
      variables: {
        models: [
          {
            id_composite: {
              listId: listData?.user?.actualList?._id,
              productEan: productEan,
            },
            quantity: 1,
            supermarket_id: 1,
            status: "ACTIVE",
          },
        ],
      },
    });
  };

  useFocusEffect(() => {
    const timer = setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filterOptions = {
    nutriScore: Object.values(NutriScore).filter(
      (val) => typeof val === "string",
    ) as string[],
  };

  const { loading, data } = useQuery(GET_FILTERED_PRODUCTS, {
    variables: {
      searchTerm: debouncedQuery ? `%${debouncedQuery}%` : "%%",
      nutriScoreFilter: selectedNutriScore
        ? { op: "EQ", value: selectedNutriScore }
        : null,
      brandFilter: selectedBrand
        ? { op: "ILIKE", value: `%${selectedBrand}%` }
        : null,
    },
    skip: !debouncedQuery,
  });

  const products = data?.products ?? [];
  const backgroundColor = useThemeColor("background");

  const handleFilterSelect = (option: string) => {
    setSelectedNutriScore(option === "All" ? null : (option as NutriScore));
    bottomSheetRef.current?.close();
  };

  const handleNutriScorePress = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaProvider
      style={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 24,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <View className={"flex flex-col gap-4 pb-20"}>
          <View className="px-4">
            <SearchBar
              ref={searchRef}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </View>
          <Modal
            visible={showSuccessModal}
            transparent={true}
            animationType="fade"
          >
            <View
              className="flex-1 items-center justify-center rounded-xl p-6 shadow-lg"
              style={{ backgroundColor: backgroundColor }}
            >
              <ThemedText type="h3" className="text-center">
                {addedProductName} added to your list!
              </ThemedText>
            </View>
          </Modal>
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
                  setDebouncedQuery((prev) => (prev === "" ? " " : ""));
                  setTimeout(() => setDebouncedQuery(searchQuery), 10);
                } else {
                  handleBrandPress();
                }
              }}
            />
            <Chip
              label={
                selectedNutriScore
                  ? `Score: ${selectedNutriScore}`
                  : "NutriScore"
              }
              hasDropdown={true}
              selected={!!selectedNutriScore}
              onPress={handleNutriScorePress}
            />
          </ScrollView>
          {loading ? (
            <View className="px-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <View
                  key={item}
                  className="mb-4 flex-row items-center justify-between rounded-2xl p-4"
                  style={{ backgroundColor }}
                >
                  <View className="flex-row items-center gap-4">
                    <Skeleton
                      width={64}
                      height={64}
                      radius={12}
                      backgroundColor={backgroundColor}
                      colorMode={theme}
                    />
                    <View className="gap-2">
                      <Skeleton
                        width={150}
                        height={20}
                        radius={4}
                        backgroundColor={backgroundColor}
                        colorMode={theme}
                      />
                      <Skeleton
                        width={100}
                        height={16}
                        radius={4}
                        backgroundColor={backgroundColor}
                        colorMode={theme}
                      />
                    </View>
                  </View>
                  <Skeleton
                    width={24}
                    height={24}
                    radius={12}
                    backgroundColor={backgroundColor}
                    colorMode={theme}
                  />
                </View>
              ))}
            </View>
          ) : (
            <List
              items={products}
              expanded={false}
              icon={Info}
              onIconPress={(item) =>
                router.push({
                  pathname: "/productInfo",
                  params: { id: item.ean },
                })
              }
              onPress={(item) => {
                handleAddProduct(item.ean ?? "", item.name ?? "");
              }}
            />
          )}
        </View>
      </View>

      <NutriScoreBottomSheet
        bottomSheetRef={bottomSheetRef}
        onFilterSelect={handleFilterSelect}
        filterOptions={filterOptions.nutriScore}
        backgroundColor={backgroundColor}
      />

      <BrandBottomSheet
        bottomSheetRef={brandBottomSheetRef}
        brands={brands}
        onBrandSelect={handleBrandSelect}
        backgroundColor={backgroundColor}
      />
    </SafeAreaProvider>
  );
};

export default Search;
