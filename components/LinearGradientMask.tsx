import { View } from "react-native";
import { LinearGradient } from "@/components/LinearGradient";
import MaskedView from "@react-native-masked-view/masked-view";

interface LinearGradientMaskProps {
  children: React.ReactElement;
}

const LinearGradientMask = ({ children }: LinearGradientMaskProps) => {
  return (
    <MaskedView className={"relative"} maskElement={children}>
      <View className={"pointer-events-none opacity-0"} pointerEvents={"none"}>
        {children}
      </View>
      <LinearGradient className={"absolute bottom-0 left-0 h-full w-full"} />
    </MaskedView>
  );
};

export default LinearGradientMask;
