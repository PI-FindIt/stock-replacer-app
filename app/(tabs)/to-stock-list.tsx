import { useMemo, useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EllipsisVertical, Route, Search } from "lucide-react-native";
import ListTitle from "@/components/ui/list/listTitle";
import List from "@/components/ui/list/list";
import { useFocusEffect, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Header from "@/components/Header";
import themeConfig from "@/tailwind.config";
import { useThemeColor } from "@/hooks/useThemeColor";
import { gql, useQuery } from "@apollo/client";
import LinearGradientMask from "@/components/LinearGradientMask";
import { Skeleton } from "moti/skeleton";

const USER_ID = "68109cfe9179b71ba1cccb41";

export const GET_PRODUCTS_LIST = gql`
  query SupermarketLists($userId: String!) {
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

export const CREATE_LIST = gql`
  mutation CreateList($userId: String!) {
    createList(userId: $userId) {
      _id
      products {
        product {
          name
        }
      }
    }
  }
`;

const ListScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const itemBackgroundColor = useThemeColor("background");
  const iconBackgroundColor = useThemeColor("text");
  const [searchQuery] = useState("");
  const [hasActiveList, setHasActiveList] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const backgroundColor = useThemeColor("background");
  const theme = backgroundColor === "#ffffff" ? "light" : "dark";

  const { error, data, loading, refetch } = useQuery(GET_PRODUCTS_LIST, {
    variables: {
      userId: USER_ID,
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  useEffect(() => {
    if (data?.user?.actualList) {
      setHasActiveList(true);
    } else {
      setHasActiveList(false);
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowSkeleton(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(false);
      setInitialLoading(false);
    }
  }, [loading]);

  const groupedData = useMemo(() => {
    if (!data?.user?.actualList?.products) return [];

    const grouped: Record<string, any[]> = {};

    data.user.actualList.products.forEach((listProduct: any) => {
      const product = listProduct.product;
      const category = product.categoryName ?? "Outros";

      const cheapestSupermarket = product.supermarkets?.reduce(
        (prev: any, curr: any) => (prev.price < curr.price ? prev : curr),
        { price: Infinity },
      );

      const cheapestPrice =
        cheapestSupermarket?.price !== Infinity
          ? cheapestSupermarket.price
          : null;

      if (!grouped[category]) grouped[category] = [];

      grouped[category].push({
        ...product,
        listQuantity: listProduct.quantity,
        cheapestPrice: cheapestPrice,
      });
    });

    return Object.entries(grouped).map(([title, items]) => ({
      title,
      items: items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }));
  }, [data, searchQuery]);

  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleCollapse = (title: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  if (initialLoading ?? (loading && showSkeleton)) {
    return (
      <View style={{ paddingTop: insets.top }} className="flex-1 px-4 pt-16">
        <View className="gap-8 pt-16">
          {[1, 2, 3, 4, 5].map((category) => (
            <View key={category} className="gap-4">
              <Skeleton
                width="60%"
                height={24}
                radius={24}
                backgroundColor={backgroundColor}
                colorMode={theme}
              />

              <View className="gap-3">
                {[1, 4, 8].map((product) => (
                  <Skeleton
                    key={product}
                    width="100%"
                    height={80}
                    radius={24}
                    backgroundColor={backgroundColor}
                    colorMode={theme}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (error)
    return (
      <View className="h-full w-full items-center justify-center">
        <ThemedText>Error: {error.message}</ThemedText>
      </View>
    );

  if (!initialLoading && !loading && !hasActiveList) {
    return (
      <View
        style={{ paddingTop: insets.top }}
        className="flex flex-1 items-center justify-center"
      >
        <ThemedText color="gradient" type="h1" className="text-center">
          To Stock List
        </ThemedText>
        <View className="flex-1 items-center justify-center gap-4">
          <LinearGradientMask>
            <Route width={64} height={64} color="white" />
          </LinearGradientMask>
          <ThemedText type="body" className="text-center">
            No products to replace
          </ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 90 }}>
      <View className="px-4 pb-4">
        <Header Title="To Stock List" />
      </View>

      {hasActiveList && (
        <View className="mb-4 px-4">
          <TouchableOpacity
            className="w-full flex-row items-center gap-3 self-center rounded-2xl p-4"
            style={{
              backgroundColor: itemBackgroundColor,
              boxShadow: themeConfig.theme.boxShadow.DEFAULT,
            }}
            onPress={() => router.push("/(tabs)/product-search")}
          >
            <Search size={24} color={iconBackgroundColor} />
            <ThemedText>Search Products</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {groupedData.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ThemedText type="body" className="text-center">
            Search new products.
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={groupedData}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ gap: 32, paddingBottom: insets.bottom + 96 }}
          renderItem={({ item: category }) => {
            const categoryTitle = category.title
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            return (
              <View key={categoryTitle} className="gap-3">
                <ListTitle
                  title={categoryTitle}
                  isCollapsed={collapsedSections[categoryTitle]}
                  toggleCollapse={toggleCollapse}
                />
                {!collapsedSections[categoryTitle] && (
                  <List
                    items={category.items}
                    icon={EllipsisVertical}
                    onIconPress={(item) =>
                      router.push({
                        pathname: "/productInfo",
                        params: { id: item.ean },
                      })
                    }
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default ListScreen;
