import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { Glass } from './Glass';
import { useThemeColor } from './Themed';

export function SettingsButton() {
  const color = useThemeColor({}, 'tint');
  const { push } = useRouter();
  return (
    <Glass isInteractive style={styles.glass}>
      <Pressable
        onPress={() => push('settings')}
        style={styles.pressable}
        accessibilityRole='button'
        accessibilityLabel='Beállítások'
      >
        <AntDesign name='setting' color={color} size={22} />
      </Pressable>
    </Glass>
  );
}

const styles = StyleSheet.create({
  glass: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  pressable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
