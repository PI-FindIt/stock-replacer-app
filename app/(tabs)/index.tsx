import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import {
  ChartColumnIncreasing,
  MessageCircleWarning,
  NotebookPen,
  Route,
  Search,
  UserRound,
} from "lucide-react-native";
import { Button } from "@/components/Button";
import { gql, useQuery } from "@apollo/client";
import MenuOption from "@/components/ui/menuOption";

const USER_ID = process.env.EXPO_PUBLIC_USER_ID;

if (!USER_ID) {
  throw new Error(
    "EXPO_PUBLIC_USER_ID is not defined in the environment variables.",
  );
}

export const GET_USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      _id
      first_name
    }
  }
`;

export const GET_PRODUCTS_LIST_ATRIBUTES = gql`
  query SupermarketListsAtributes($userId: String!) {
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
`;

export default function HomeScreen() {
  const router = useRouter();
  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: USER_ID },
  });

  const { data } = useQuery(GET_PRODUCTS_LIST_ATRIBUTES, {
    variables: {
      userId: USER_ID,
    },
  });

  const productCount = data?.user?.actualList?.products?.length || 0;
  const totalProducts =
    data?.user?.actualList?.products?.reduce(
      (total: any, item: { quantity: any }) => total + item.quantity,
      0,
    ) || 0;

  return (
    <SafeAreaView className="pt-4">
      <View className="flex items-end px-4">
        <Button Icon={UserRound} onPress={() => {}} type="secondary" />
      </View>
      <View className="flex w-full items-center gap-6 p-4 pt-10">
        <View className="justify-center self-stretch">
          <ThemedText type="title" color="gradient">
            Hi {userData?.user?.first_name || "there"}!
          </ThemedText>
          <ThemedText type="h3" color="variant">
            A good work day awaits you.
          </ThemedText>
        </View>
      </View>

      <View className="gap-6 p-6">
        <MenuOption
          Icon={MessageCircleWarning}
          text="Stock warnings"
          onPress={() => {
            router.push("/(tabs)/warnings");
          }}
          quantity={true}
          quantityValue={productCount}
        />
        <MenuOption
          Icon={Search}
          text="Search products"
          onPress={() => {
            router.push("/(tabs)/product-search");
          }}
        />
        <MenuOption
          Icon={NotebookPen}
          text="To stock list"
          onPress={() => {
            router.push("/(tabs)/to-stock-list");
          }}
          quantity={true}
          quantityValue={totalProducts}
        />
        <MenuOption
          Icon={Route}
          text="Stock path"
          onPress={() => {
            router.push("/(tabs)/navigation");
          }}
        />
        <MenuOption
          Icon={ChartColumnIncreasing}
          text="Objectives"
          onPress={() => {
            router.push("/objectives");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
