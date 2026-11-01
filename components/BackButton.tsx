import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { Glass } from './Glass';
import { Text, useThemeColor } from './Themed';

export function BackButton() {
  const color = useThemeColor({}, 'tint');
  const { back } = useRouter();
  return (
    <Glass isInteractive style={styles.glass}>
      <Pressable onPress={() => back()} style={styles.pressable} accessibilityRole='button' accessibilityLabel='Vissza'>
        <AntDesign name='left' color={color} size={22} />
        <Text style={{ color }}>Vissza</Text>
      </Pressable>
    </Glass>
  );
}

const styles = StyleSheet.create({
  glass: {
    borderRadius: 22,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
