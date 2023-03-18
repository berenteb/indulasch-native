import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useThemeColor } from "./Themed";

export function BackButton() {
  const color = useThemeColor({}, "tint");
  const { back } = useRouter();
  return (
    <Pressable onPress={back}>
      <View style={styles.container}>
        <AntDesign name="left" color={color} size={30} />
        <Text style={{ color: color }}>Vissza</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
