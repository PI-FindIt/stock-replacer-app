import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GradientPill } from "@/components/GradientPill";
import { Ref, useMemo } from "react";
import { FlatList, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import Background from "../Background";

type NutriScoreBottomSheetProps = {
  readonly bottomSheetRef: Ref<BottomSheet>;
  readonly onFilterSelect: (option: string) => void;
  readonly filterOptions: readonly string[];
  readonly backgroundColor: string;
};

export default function NutriScoreBottomSheet({
  bottomSheetRef,
  onFilterSelect,
  filterOptions,
  backgroundColor,
}: NutriScoreBottomSheetProps) {
  const itemBackgroundColor = useThemeColor("background");

  const options = useMemo(() => {
    const baseOptions = filterOptions.filter(
      (option) => option !== "NOT_APPLICABLE" && option !== "UNKNOWN",
    );

    const hasSpecialOptions = filterOptions.some(
      (option) => option === "NOT_APPLICABLE" || option === "UNKNOWN",
    );

    return [
      { value: "All", display: "All" },
      ...baseOptions.map((option) => ({ value: option, display: option })),
      ...(hasSpecialOptions ? [{ value: "NONE", display: "None" }] : []),
    ];
  }, [filterOptions]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={["40%"]}
      enablePanDownToClose={true}
      backgroundComponent={() => <Background full={true} />}
      handleComponent={GradientPill}
    >
      <BottomSheetView className="flex-1 p-4 pb-8">
        <FlatList
          data={options}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12, padding: 8, paddingBottom: 16 }}
          renderItem={({ item }) => (
            <Pressable
              className="flex-1 items-center justify-center rounded-lg"
              style={{
                padding: 14,
                backgroundColor: itemBackgroundColor,
                boxShadow: themeConfig.theme.boxShadow.DEFAULT,
                borderRadius: 8,
              }}
              onPress={() =>
                item.value === "NONE"
                  ? onFilterSelect("NOT_APPLICABLE")
                  : onFilterSelect(item.value)
              }
            >
              <ThemedText className="text-center">{item.display}</ThemedText>
            </Pressable>
          )}
          keyExtractor={(item) => item.value}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
