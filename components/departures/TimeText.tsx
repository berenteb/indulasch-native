import { StyleSheet } from 'react-native';

import { Text, useThemeColor } from '../Themed';

interface TimeTextProps {
  isDelayed: boolean;
  departureText: string | undefined;
}

export function TimeText({ isDelayed, departureText }: TimeTextProps) {
  const red = useThemeColor({}, 'red');
  const green = useThemeColor({}, 'green');

  let color = useThemeColor({}, 'secondaryText');
  if (departureText) color = isDelayed ? red : green;
  return <Text style={[styles.text, { color }]}>{departureText ?? 'Volt, nincs'}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSansBold',
  },
});
