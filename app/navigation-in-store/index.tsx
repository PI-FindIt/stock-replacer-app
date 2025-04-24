import { ImageBackground, View } from "react-native";

const NavigationInStore = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/path.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1"></View>
    </ImageBackground>
  );
};

export default NavigationInStore;
