import { StyleSheet } from "react-native";
import { Text, TextProps } from "./Themed";

interface ScreenTitleProps extends TextProps {}

export function ScreenTitle({
  style,
  numberOfLines,
  ...props
}: ScreenTitleProps) {
  return (
    <Text
      style={[styles.text, style]}
      numberOfLines={numberOfLines ?? 1}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: "OpenSansBold",
    margin: 10,
  },
});
