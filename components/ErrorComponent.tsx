import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ArrowLeft, CircleAlert, CircleHelp } from "lucide-react-native";
import { ApolloError } from "@apollo/client";
import Header from "@/components/Header";
import { useNavigation } from "expo-router";

interface ErrorComponentProps {
  type: "error" | "notFound";
  error?: ApolloError;
  canGoBack?: boolean;
}

const ErrorComponent = ({
  type,
  error,
  canGoBack = true,
}: ErrorComponentProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className={"relative flex-1 items-center justify-center"}
    >
      {canGoBack && (
        <View
          className={"absolute left-0 top-0 ps-2"}
          style={{ paddingTop: insets.top }}
        >
          <Header
            IconLeftLeft={ArrowLeft}
            onLeftLeftPress={() => navigation.goBack()}
          />
        </View>
      )}
      <View className="mb-4 items-center">
        <View>
          <ThemedIcon
            Icon={type === "notFound" ? CircleHelp : CircleAlert}
            color={"gradient"}
            size={48}
          />
        </View>
      </View>

      <View>
        <ThemedText color="gradient" type="h1" className="mb-2 text-center">
          Uh-oh!
        </ThemedText>
      </View>

      <ThemedText type="body" color={"variant"} className="text-center">
        {type === "notFound"
          ? "No data available."
          : (error?.message ?? "An error occurred.")}
      </ThemedText>
    </View>
  );
};

export default ErrorComponent;
