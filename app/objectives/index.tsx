import Header from "@/components/Header";
import { useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { PieChart, BarChart } from "react-native-gifted-charts";
import { ThemedText } from "@/components/ThemedText";

const ObjectivesPage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const pieData = [
    {
      value: 39,
      color: "#292d30",
      gradientCenterColor: "#8d9092",
      focused: true,
    },
    {
      value: 61,
      color: "#f6f7f7",
      gradientCenterColor: "#fff",
    },
  ];

  const barData = [
    { value: 4, label: "JAN", frontColor: "#fff" },
    { value: 6, label: "FEB", frontColor: "#fff" },
    { value: 2, label: "MAR", frontColor: "#fff" },
    { value: 8, label: "APR", frontColor: "#fff" },
    { value: 3, label: "MAY", frontColor: "#fff" },
    { value: 5, label: "JUN", frontColor: "#fff" },
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
        <View className="px-2">
          <Header
            Title="Objectives"
            IconLeftLeft={ArrowLeft}
            onLeftLeftPress={() => navigation.goBack()}
          />

          <View className="gap-4 p-8">
            <View className="flex-row items-center justify-between">
              <ThemedText>Monthly objectives</ThemedText>
              <ArrowLeft className="text-black" size={24} />
            </View>

            <View className="items-center gap-4">
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={80}
                innerRadius={60}
                innerCircleColor="#fff"
                centerLabelComponent={() => <ThemedText>39%</ThemedText>}
              />
              <ThemedText>
                You're at 39% of your objectives for the month!
              </ThemedText>
            </View>
          </View>

          {/* Annual Objectives Section */}
          <View className="gap-4 p-8">
            <View className="flex-row items-center justify-between">
              <ThemedText>Annual objectives</ThemedText>
              <ArrowLeft className="text-black" size={24} />
            </View>

            <View className="items-center">
              <BarChart
                data={barData}
                barWidth={32}
                spacing={21}
                roundedTop
                frontColor="lightgray"
                yAxisThickness={0}
                xAxisThickness={0}
                hideRules
                noOfSections={5}
                maxValue={8}
                yAxisTextStyle={{ color: "#8d9092", fontSize: 9 }}
                xAxisLabelTextStyle={{
                  color: "#8d9092",
                  fontSize: 9,
                  marginTop: 4,
                }}
                initialSpacing={10}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ObjectivesPage;
