import { StyleSheet } from "react-native";
import { Text, TextProps } from "../Themed";

interface HeadsignProps extends TextProps {
  headsign: string;
}

export function Headsign({ headsign, style, ...props }: HeadsignProps) {
  return (
    <Text numberOfLines={1} style={[styles.headsign, style]} {...props}>
      {headsign}
    </Text>
  );
}

const styles = StyleSheet.create({
  headsign: {
    flex: 1,
    textAlign: "center",
  },
});
