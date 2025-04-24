/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import config from "@/tailwind.config";

export const Colors = {
  light: {
    text: config.theme.colors.text.DEFAULT,
    textVariant: config.theme.colors.textVariant.DEFAULT,
    background: config.theme.colors.background.DEFAULT,
    primary: config.theme.colors.primary,
    primaryVariant: config.theme.colors.primaryVariant.DEFAULT,
    secondary: config.theme.colors.secondary,
    secondaryVariant: config.theme.colors.secondaryVariant.DEFAULT,
  },
  dark: {
    text: config.theme.colors.text.dark,
    textVariant: config.theme.colors.textVariant.dark,
    background: config.theme.colors.background.dark,
    primary: config.theme.colors.primary,
    primaryVariant: config.theme.colors.primaryVariant.dark,
    secondary: config.theme.colors.secondary,
    secondaryVariant: config.theme.colors.secondaryVariant.dark,
  },
};
