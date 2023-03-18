import Slider, { SliderProps } from "@react-native-community/slider";
import { Platform, StyleSheet } from "react-native";
import { Text, useThemeColor } from "../Themed";
import { FormField } from "./FormField";

interface SliderFieldProps extends SliderProps {
  label: string;
  helperText?: string;
}

export function SliderField({
  label,
  style,
  helperText,
  ...props
}: SliderFieldProps) {
  const trackColor = useThemeColor({}, "theme");
  const thumbColor = Platform.OS === "android" ? trackColor : "white";
  return (
    <FormField label={label}>
      <Slider
        style={[styles.slider, style]}
        minimumTrackTintColor={trackColor}
        thumbTintColor={thumbColor}
        {...props}
      />
      {helperText && <Text style={{ color: "gray" }}>{helperText}</Text>}
    </FormField>
  );
}

const styles = StyleSheet.create({
  slider: {
    width: "100%",
  },
});
