import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Warnings = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 24,
        paddingHorizontal: 8,
      }}
    >
      <Header Title="Stock Warnings" IconLeftLeft={ArrowLeft} />
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <View className="flex-1 items-center justify-center">
          <ThemedText type="title" color="gradient">
            Stock warnings
          </ThemedText>
          <ThemedText type="h3" color="variant">
            No stock warnings available.
          </ThemedText>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Warnings;
