import { StyleSheet } from 'react-native';

import { Text, useThemeColor } from '../Themed';

interface TimeTextProps {
  isDelayed: boolean;
  isUnknown: boolean;
  departureText: string;
}

export function TimeText({ isDelayed, departureText, isUnknown }: TimeTextProps) {
  const red = useThemeColor({}, 'red');
  const green = useThemeColor({}, 'green');

  let color = useThemeColor({}, 'secondaryText');
  if (!isUnknown) color = green;
  if (isDelayed) color = red;
  return <Text style={[styles.text, { color }]}>{departureText}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSansBold',
  },
});
