import { Dimensions, View } from "react-native";
import theme from "@/tailwind.config";
import { ThemedIcon } from "@/components/ThemedIcon";
import { BadgeCheck, CircleX, Info, LucideIcon } from "lucide-react-native";
import ToastUpstream, {
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface BaseToastParams extends ToastConfigParams<any> {
  icon: LucideIcon;
}

const BaseToast = ({ icon: Icon, text1, text2 }: BaseToastParams) => {
  return (
    <ThemedView
      className={"flex-row items-center gap-4 rounded-2xl p-4"}
      style={{
        width: Dimensions.get("window").width - 32,
        boxShadow: theme.theme.boxShadow.lg,
      }}
    >
      <ThemedIcon Icon={Icon} size={32} color={"gradient"} />
      <View className={"flex-1"}>
        <ThemedText type={"h3"}>{text1}</ThemedText>
        <ThemedText type={"small"} color={"variant"}>
          {text2}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const Toast = () => {
  const toastConfig: ToastConfig = {
    success: (props) => <BaseToast icon={BadgeCheck} {...props} />, // NOSONAR
    info: (props) => <BaseToast icon={Info} {...props} />, // NOSONAR
    error: (props) => <BaseToast icon={CircleX} {...props} />, // NOSONAR
  };

  return <ToastUpstream config={toastConfig} />;
};

export default Toast;
