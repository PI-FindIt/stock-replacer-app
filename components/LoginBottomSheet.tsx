import { GradientPill } from "@/components/GradientPill";
import Background from "@/components/Background";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Platform, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import AppleIcon from "@/assets/images/brands/apple.svg";
import GoogleIcon from "@/assets/images/brands/google.svg";
import React, { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBackground } from "@/hooks/useBackground";
import { useRouter } from "expo-router";
import { SharedValue } from "react-native-reanimated";

interface LoginBottomSheetProps {
  animatedPosition: SharedValue<number>;
}

interface LoginMethod {
  name: string;
  icon: React.ComponentProps<typeof Button>["Icon"];
  onPress: () => void;
  type: "primary" | "secondary";
}

export const LoginBottomSheet = ({
  animatedPosition,
}: LoginBottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { setState } = useBackground();
  const router = useRouter();

  const navigateToHome = () => {
    setState(false);
    router.push("/(tabs)");
  };

  const methods: LoginMethod[] = [
    {
      name: "Apple",
      icon: AppleIcon,
      onPress: () => navigateToHome(),
      type: Platform.OS === "ios" ? "primary" : "secondary",
    },
    {
      name: "Google",
      icon: GoogleIcon,
      onPress: () => navigateToHome(),
      type: Platform.OS === "android" ? "primary" : "secondary",
    },
  ];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      handleComponent={GradientPill}
      backgroundComponent={() => <Background full={true} />}
      style={{ borderRadius: 32, overflow: "hidden" }}
      animatedPosition={animatedPosition}
    >
      <BottomSheetView
        className={"justify-center gap-8"}
        style={{ paddingBottom: insets.bottom + 32 }}
      >
        <View className={"mt-4 flex items-center gap-1"}>
          <ThemedText type={"h1"}>Get started</ThemedText>
          <ThemedText type={"body"} color={"variant"}>
            by logging in.
          </ThemedText>
        </View>
        <View
          className="flex items-center gap-4"
          style={{
            flexDirection: Platform.OS === "ios" ? "column" : "column-reverse",
          }}
        >
          {methods.map((method) => (
            <Button
              key={method.name}
              type={method.type}
              Icon={method.icon}
              text={`Continue with ${method.name}`}
              onPress={method.onPress}
            />
          ))}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
