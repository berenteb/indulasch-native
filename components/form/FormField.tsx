import { StyleSheet, View, ViewProps } from "react-native";
import { Text } from "../Themed";

interface FormFieldProps extends ViewProps {
  label: string;
}

export function FormField({
  label,
  children,
  style,
  ...props
}: FormFieldProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <Text>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    alignItems: "flex-start",
  },
});
