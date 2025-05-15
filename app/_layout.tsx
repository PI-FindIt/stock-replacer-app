import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../global.css";
import { BackgroundProvider } from "@/components/BackgroundProvider";
import type { Theme } from "@react-navigation/native/src/types";
import { fonts } from "@react-navigation/native/src/theming/fonts";
import {
  Raleway_300Light,
  Raleway_300Light_Italic,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_500Medium,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
} from "@expo-google-fonts/raleway";
import {
  WorkSans_600SemiBold,
  WorkSans_600SemiBold_Italic,
  WorkSans_700Bold,
  WorkSans_700Bold_Italic,
  WorkSans_800ExtraBold,
  WorkSans_800ExtraBold_Italic,
} from "@expo-google-fonts/work-sans";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SystemBars } from "react-native-edge-to-edge";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "@/components/Toast";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Raleway_300Light: Raleway_300Light,
    Raleway_300Light_Italic: Raleway_300Light_Italic,
    Raleway_400Regular: Raleway_400Regular,
    Raleway_400Regular_Italic: Raleway_400Regular_Italic,
    Raleway_500Medium: Raleway_500Medium,
    Raleway_500Medium_Italic: Raleway_500Medium_Italic,
    Raleway_600SemiBold: Raleway_600SemiBold,
    Raleway_600SemiBold_Italic: Raleway_600SemiBold_Italic,
    Raleway_700Bold: Raleway_700Bold,
    Raleway_700Bold_Italic: Raleway_700Bold_Italic,
    WorkSans_600SemiBold: WorkSans_600SemiBold,
    WorkSans_600SemiBold_Italic: WorkSans_600SemiBold_Italic,
    WorkSans_700Bold: WorkSans_700Bold,
    WorkSans_700Bold_Italic: WorkSans_700Bold_Italic,
    WorkSans_800ExtraBold: WorkSans_800ExtraBold,
    WorkSans_800ExtraBold_Italic: WorkSans_800ExtraBold_Italic,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const DefaultTheme: Theme = {
    dark: false,
    colors: {
      primary: "rgb(0, 122, 255)",
      background: "rgb(242, 242, 242, 0.0)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(216, 216, 216)",
      notification: "rgb(255, 59, 48)",
    },
    fonts,
  };

  const DarkTheme: Theme = {
    dark: true,
    colors: {
      primary: "rgb(10, 132, 255)",
      background: "rgb(1, 1, 1, 0.0)",
      card: "rgb(18, 18, 18)",
      text: "rgb(229, 229, 231)",
      border: "rgb(39, 39, 41)",
      notification: "rgb(255, 69, 58)",
    },
    fonts,
  };

  if (__DEV__) {
    loadDevMessages();
    loadErrorMessages();
  }

  if (!process.env.EXPO_PUBLIC_API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not defined. Check your .env file");
  }

  if (!process.env.EXPO_PUBLIC_CDN_URL) {
    throw new Error("EXPO_PUBLIC_CDN_URL is not defined. Check your .env file");
  }

  const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <BackgroundProvider>
                <Stack
                  screenOptions={{
                    animation: "fade",
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="login/index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="productInfo/index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="supermarketInfo/index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="navigation-in-store/index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="objectives/index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <SystemBars style="auto" />
                <Toast />
              </BackgroundProvider>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ApolloProvider>
  );
}
