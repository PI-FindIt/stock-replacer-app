import { TextInput, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { ArrowLeft, LucideIcon } from "lucide-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import themeConfig from "@/tailwind.config";
import { Button } from "@/components/Button";
import { forwardRef } from "react";
import { SvgProps } from "react-native-svg";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeHolder?: string;
  icon?: LucideIcon | React.FC<SvgProps>;
  autoFocus?: boolean;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(
  (
    {
      searchQuery,
      setSearchQuery,
      placeHolder = "Search products",
      icon = ArrowLeft,
      autoFocus = false,
    },
    ref,
  ) => {
    const onChangeSearch = (query: string) => setSearchQuery(query);
    const navigation = useNavigation();
    const handleBackPress = () => {
      navigation.goBack();
    };

    const itemBackgroundColor = useThemeColor("background");
    const placeholderColor = useThemeColor("textVariant");
    const inputTextColor = useThemeColor("text");

    return (
      <Pressable
        className="w-full flex-row items-center gap-1 self-center rounded-2xl px-1"
        style={{
          backgroundColor: itemBackgroundColor,
          boxShadow: themeConfig.theme.boxShadow.DEFAULT,
        }}
        onPress={() => {
          // @ts-ignore IT AS TO BE DONE
          ref?.current?.focus();
        }}
      >
        <Button
          onPress={handleBackPress}
          Icon={icon as LucideIcon}
          type={"ghost"}
        />
        <TextInput
          placeholder={placeHolder}
          value={searchQuery}
          ref={ref}
          onChangeText={onChangeSearch}
          placeholderTextColor={placeholderColor}
          className={"flex-1 py-4"}
          style={{
            color: inputTextColor,
            fontFamily: "Raleway_400Regular",
            fontSize: 16,
          }}
          autoFocus={autoFocus}
          onFocus={() => {
            // @ts-ignore
            ref?.current?.focus();
          }}
        />
      </Pressable>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
