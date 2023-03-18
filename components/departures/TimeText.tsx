import { StyleSheet } from "react-native";
import { Text, useThemeColor } from "../Themed";

interface TimeTextProps {
  isDelayed: boolean;
  departureText: string;
}

export function TimeText({ isDelayed, departureText }: TimeTextProps) {
  const red = useThemeColor({}, "red");
  const green = useThemeColor({}, "green");
  return (
    <Text style={[styles.text, { color: isDelayed ? red : green }]}>
      {departureText}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "OpenSansBold",
  },
});
