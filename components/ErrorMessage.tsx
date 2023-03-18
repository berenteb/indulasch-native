import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Text, useThemeColor } from "./Themed";

interface ErrorMessageProps {
  message: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export function ErrorMessage({ message, iconName }: ErrorMessageProps) {
  const color = useThemeColor({}, "red");
  return (
    <View style={styles.container}>
      <MaterialIcons name={iconName} color={color} size={50} />
      <Text style={[styles.message, { color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    margin: 20,
  },
  message: {
    textAlign: "center",
  },
});
