import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

import { useThemeColor } from "./Themed";

export function SettingsButton() {
  const color = useThemeColor({}, "tint");
  const { push } = useRouter();
  return (
    <Pressable onPress={() => push("settings")}>
      <AntDesign name="setting" color={color} size={30} />
    </Pressable>
  );
}
