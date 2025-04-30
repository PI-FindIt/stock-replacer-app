import Header from "@/components/Header";
import { useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useColorScheme, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { PieChart, BarChart } from "react-native-gifted-charts";
import { ThemedText } from "@/components/ThemedText";

const ObjectivesPage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const color = theme === "dark" ? "white" : "#292d30";

  const pieData = [
    {
      value: 39,
      color: "#FC648D",
      gradientCenterColor: "#FC648D",
      focused: true,
    },
    {
      value: 61,
      color: "#ECEDEE",
      gradientCenterColor: "#ECEDEE",
    },
  ];

  const barData = [
    {
      value: 2400,
      frontColor: color,
      label: "J",
    },
    {
      value: 3000,
      frontColor: color,
      label: "F",
    },
    {
      value: 4000,
      frontColor: color,
      label: "M",
    },
    {
      value: 4900,
      frontColor: color,
      label: "A",
    },
    {
      value: 2800,
      frontColor: color,
      label: "M",
    },
  ];

  return (
    <SafeAreaProvider className="flex-1 px-8">
      <View
        className="flex-1"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View className="gap-8 px-2">
          <Header
            Title="Objectives"
            IconLeftLeft={ArrowLeft}
            onLeftLeftPress={() => navigation.goBack()}
          />

          <View className="gap-6 p-6">
            <View className="flex-row items-center justify-between">
              <ThemedText type="h3">Monthly objectives</ThemedText>
            </View>

            <View className="flex-row items-center gap-4">
              <PieChart
                donut
                radius={80}
                innerRadius={54}
                data={pieData}
                centerLabelComponent={() => (
                  <ThemedText type="h3">39%</ThemedText>
                )}
              />
              <ThemedText>
                You're at 39% of your {"\n"}objectives for the month!
              </ThemedText>
            </View>
          </View>

          <View className="gap-6 p-6">
            <View className="flex-row items-center justify-between">
              <ThemedText type="h3">Annual objectives</ThemedText>
            </View>

            <View className="items-center">
              <BarChart
                data={barData}
                barWidth={32}
                initialSpacing={10}
                spacing={24}
                barBorderRadius={9}
                xAxisType={"dashed"}
                xAxisColor={color}
                yAxisTextStyle={{ color: color }}
                stepValue={1000}
                maxValue={6000}
                noOfSections={6}
                yAxisLabelTexts={["0", "1k", "2k", "3k", "4k", "5k", "6k"]}
                labelWidth={40}
                xAxisLabelTextStyle={{
                  color: color,
                  textAlign: "center",
                }}
                showLine
                lineConfig={{
                  color: "#FC658B",
                  thickness: 3,
                  curved: true,
                  hideDataPoints: true,
                  shiftY: 10,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ObjectivesPage;
