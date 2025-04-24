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

const USER_ID = "68061340cc340e20a65376ea";

export const GET_USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      _id
      first_name
    }
  }
`;

export default function HomeScreen() {
  const router = useRouter();

  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: USER_ID },
  });

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
            Here's to a good day ahead.
          </ThemedText>
        </View>
      </View>

      <View className="gap-6 p-6">
        <MenuOption
          Icon={NotebookPen}
          text="To stock list"
          onPress={() => {
            router.push("/(tabs)/shopping-list");
          }}
        />
        <MenuOption
          Icon={Search}
          text="Search products"
          onPress={() => {
            router.push("/productSearch");
          }}
        />
        <MenuOption Icon={MessageCircleWarning} text="Stock warnings" />
        <MenuOption
          Icon={Route}
          text="Stock path"
          onPress={() => {
            router.push("/(tabs)/navigation");
          }}
        />
        <MenuOption Icon={ChartColumnIncreasing} text="Objectives" />
      </View>
    </SafeAreaView>
  );
}
