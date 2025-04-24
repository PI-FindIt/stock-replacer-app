import { ThemedView } from "@/components/ThemedView";
import type { ViewProps } from "react-native";

export const Card = (props: ViewProps) => (
  <ThemedView {...props} className={"rounded-2xl p-4"} />
);
