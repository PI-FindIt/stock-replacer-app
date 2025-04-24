import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GradientPill } from "@/components/GradientPill";
import { Ref, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { ThemedText } from "../ThemedText";
import SearchBar from "./SearchBar";
import { X } from "lucide-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import Background from "../Background";

type BrandBottomSheetProps = {
  readonly bottomSheetRef: Ref<BottomSheet>;
  readonly brands: { readonly name: string }[];
  readonly onBrandSelect: (brand: string) => void;
  readonly backgroundColor: string;
};

export default function BrandBottomSheet({
  bottomSheetRef,
  brands,
  onBrandSelect,
  backgroundColor,
}: BrandBottomSheetProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const itemBackgroundColor = useThemeColor("background");
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={["70%"]}
      enablePanDownToClose={true}
      backgroundComponent={() => <Background full={true} />}
      handleComponent={GradientPill}
      activeOffsetY={[-10, 10]}
      activeOffsetX={[-10, 10]}
      failOffsetX={[-30, 30]}
    >
      <BottomSheetView
        style={{
          flex: 1,
          maxHeight: "100%",
          minHeight: "100%",
        }}
      >
        <View className="p-4" onStartShouldSetResponder={() => true}>
          <View onStartShouldSetResponder={() => true}>
            <SearchBar
              searchQuery={searchTerm}
              setSearchQuery={setSearchTerm}
              placeHolder="Search brands"
              icon={X}
            />
          </View>
        </View>

        <FlatList
          data={filteredBrands}
          numColumns={2}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16, padding: 16 }}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Pressable
                className="flex-col"
                style={{
                  padding: 12,
                  backgroundColor: itemBackgroundColor,
                  boxShadow: themeConfig.theme.boxShadow.DEFAULT,
                  borderRadius: 8,
                }}
                onPress={() => onBrandSelect(item.name)}
              >
                <ThemedText
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-center"
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </ThemedText>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.name}
          scrollEnabled={true}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
