import Toast, { ToastOptions } from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastProps = ToastOptions & {
  title: string;
  text?: string | Error;
  consoleError?: boolean;
};

export const useToast = () => {
  const insets = useSafeAreaInsets();

  const toast = ({
    title,
    text,
    type = "error",
    consoleError = false,
    ...props
  }: ToastProps) => {
    if (consoleError) {
      console.error("Error:", title, text);
    }

    Toast.show({
      text1: title,
      text2: typeof text === "string" ? text : text?.message,
      type,
      bottomOffset: insets.bottom + 32,
      topOffset: insets.top + 16,
      ...props,
    });
  };

  const toastOnError = (error: Error) => {
    toast({
      title: "Oops! Something went wrong.",
      text: error,
      visibilityTime: 8000,
    });
  };

  return { toast, toastOnError };
};
