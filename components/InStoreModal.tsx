import { GradientPill } from "@/components/GradientPill";
import Background from "@/components/Background";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import * as Progress from "react-native-progress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedValue } from "react-native-reanimated";
import DirectionsCard from "./ui/directionsNavigationCard";
import InfoCard from "./ui/ItemInfoCardNavigation";
import LinearGradientMask from "./LinearGradientMask";
import { Button } from "./Button";
import { Clock4, X } from "lucide-react-native";
import { useEffect, useState, useRef } from "react";
import { Product } from "@/types/Product";

interface InStoreModalProps {
  animatedPosition: SharedValue<number>;
  product: Product;
}

const BackgroundComponent = () => <Background full={true} />;

export const InStoreModal = ({
  animatedPosition,
  product,
}: InStoreModalProps) => {
  const insets = useSafeAreaInsets();
  const [currentView, setCurrentView] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (currentView === 1) {
      let startTime: number;
      let animationFrame: number;
      const duration = 10000;

      const animateProgress = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        setProgress(newProgress);

        if (elapsed < duration) {
          animationFrame = requestAnimationFrame(animateProgress);
        } else {
          setCurrentView(0);
        }
      };

      animationFrame = requestAnimationFrame(animateProgress);

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    } else {
      setProgress(0);
    }
  }, [currentView]);

  useEffect(() => {
    if (currentView === 0) {
      animationRef.current = setTimeout(() => {
        setCurrentView(1);
      }, 10000);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [currentView]);

  const renderView = () => {
    if (currentView === 0) {
      return (
        <View className="flex w-full items-center gap-6 px-6">
          <ThemedText type={"h2"} color="gradient" className="text-center">
            Go to{" "}
            {typeof product.category === "string"
              ? product.category
              : product.category.name || "unknown"}{" "}
            aisle
          </ThemedText>
          <DirectionsCard
            action="Turn right"
            context="at the end"
            direction="right"
          />
          <InfoCard product={product} />
        </View>
      );
    } else {
      const secondsLeft = Math.ceil(10 * (1 - progress));
      return (
        <View className="flex w-full items-center gap-6 px-6">
          <ThemedText type={"h2"} color="gradient" className="text-center">
            Pick {product.name}
          </ThemedText>
          <View className="h-32 w-32 rounded-lg">
            <Image
              source={{ uri: product.image }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          <DirectionsCard
            action="Look"
            context="at your left side"
            direction="left"
          />
          <View className="w-full flex-col items-center gap-1">
            <LinearGradientMask>
              <Progress.Bar
                progress={progress}
                height={10}
                width={370}
                color="white"
                unfilledColor="rgba(255,255,255,0.2)"
                borderWidth={0}
                borderRadius={999}
              />
            </LinearGradientMask>
            <ThemedText type="extraSmall" className="pt-1">
              {product.name} will be auto-checked in {secondsLeft} second
              {secondsLeft !== 1 ? "s" : ""}.
            </ThemedText>
            <View className="flex-row gap-4 py-4">
              <Button
                onPress={() => {}}
                Icon={X}
                text="No stock"
                type="secondary"
              />
              <Button
                onPress={() => {}}
                Icon={Clock4}
                text="Wait a bit"
                type="secondary"
              />
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <BottomSheet
      backgroundComponent={BackgroundComponent}
      handleComponent={GradientPill}
      style={{ borderRadius: 32, overflow: "hidden" }}
      animatedPosition={animatedPosition}
    >
      <BottomSheetView
        className="items-center justify-center"
        style={{ paddingBottom: insets.bottom + 32 }}
      >
        {renderView()}
      </BottomSheetView>
    </BottomSheet>
  );
};
