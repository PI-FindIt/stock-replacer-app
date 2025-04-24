import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Chip from "@/components/ui/chip";
import {
  ChartColumn,
  EllipsisVertical,
  NotebookPen,
  Plus,
  Route,
  UserRound,
} from "lucide-react-native";
import { Button } from "@/components/Button";
import { gql, useQuery, useMutation } from "@apollo/client";
import List from "@/components/ui/list/list";

const USER_ID = "68061340cc340e20a65376ea";
const TORTILHA_EAN = "8410076482655";
const BUTTER_EAN = "5601883000016";
const CHEESE_EAN = "5601771028122";

export const GET_USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      _id
      first_name
    }
  }
`;

export const GET_USER_LIST = gql`
  query SupermarketLists($userId: String!) {
    user(id: $userId) {
      supermarketLists {
        _id
        status
      }
    }
  }
`;

export const GET_TORTILHA_PRODUCTS = gql`
  query Product($ean: String!) {
    product(ean: $ean) {
      brandName
      ean
      name
      quantity
      images
    }
  }
`;

export const ADD_TORTILHA_PRODUCTS = gql`
  mutation UpsertProductFromList($models: [ListProductInput!]!) {
    upsertProductFromList(models: $models) {
      product {
        ean
        name
        quantity
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

export default function HomeScreen() {
  const [upsertProduct] = useMutation(ADD_TORTILHA_PRODUCTS);
  const [createList] = useMutation(CREATE_LIST);
  const router = useRouter();

  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: USER_ID },
  });

  const { data: tortilha } = useQuery(GET_TORTILHA_PRODUCTS, {
    variables: { ean: TORTILHA_EAN },
  });

  const { data: butter } = useQuery(GET_TORTILHA_PRODUCTS, {
    variables: { ean: BUTTER_EAN },
  });

  const { data: cheese } = useQuery(GET_TORTILHA_PRODUCTS, {
    variables: { ean: CHEESE_EAN },
  });

  const { data: userListData } = useQuery(GET_USER_LIST, {
    variables: { userId: USER_ID },
  });

  const activeList = userListData?.user?.supermarketLists?.find(
    (list: { status: string }) => list.status === "ACTIVE",
  );

  const products = [tortilha, butter, cheese]
    .filter((item) => item?.product)
    .map((item) => ({
      ean: item.product.ean,
      name: item.product.name,
      brandName: item.product.brandName,
      unit: item.product.quantity,
      images: item.product.images,
    }));

  const handleAddToList = async () => {
    try {
      let listId = activeList?._id;

      if (!listId) {
        const result = await createList({
          variables: { userId: USER_ID },
        });
        listId = result.data.createList._id;
      }

      await upsertProduct({
        variables: {
          models: [
            {
              id_composite: {
                listId: listId,
                productEan: TORTILHA_EAN,
              },
              quantity: 1,
              status: "ACTIVE",
              supermarket_id: 1,
            },
            {
              id_composite: {
                listId: listId,
                productEan: CHEESE_EAN,
              },
              quantity: 1,
              status: "ACTIVE",
              supermarket_id: 1,
            },
            {
              id_composite: {
                listId: listId,
                productEan: BUTTER_EAN,
              },
              quantity: 1,
              status: "ACTIVE",
              supermarket_id: 1,
            },
          ],
        },
      });
      router.push("/shopping-list");
    } catch (error) {
      console.error("Error in handleAddToList:", error);
    }
  };

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
            Feeling like shopping today?
          </ThemedText>
        </View>

        <ScrollView
          className="flex self-stretch"
          style={{ overflow: "visible" }}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 12,
            overflow: "visible",
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable onPress={() => router.push("/shopping-list")}>
            <Chip
              label="Check your list"
              Icon={NotebookPen}
              isClickable={false}
            />
          </Pressable>
          <Pressable onPress={() => router.push("/navigation")}>
            <Chip label="Go shopping" Icon={Route} isClickable={false} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Chip
              label="Check your list"
              Icon={ChartColumn}
              isClickable={false}
            />
          </Pressable>
        </ScrollView>

        <View className="items-center justify-center gap-4 self-stretch pt-8">
          <View className="gap-1 self-stretch">
            <View className="flex-row items-center justify-between self-stretch">
              <ThemedText type="h3">In the mood for a quesadilla?</ThemedText>
            </View>
            <View className="flex-row items-center justify-between">
              <ThemedText type="body" color="variant">
                Add these items to your shopping list
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
      <View className="flex w-full">
        <List
          items={products}
          expanded={false}
          icon={EllipsisVertical}
          onIconPress={(item) =>
            router.push({
              pathname: "/productInfo",
              params: { id: item.ean },
            })
          }
        />
        <View className="items-center pt-4">
          <Button
            onPress={handleAddToList}
            text="Add to list"
            type="secondary"
            Icon={Plus}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
