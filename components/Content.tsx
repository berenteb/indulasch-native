import { StyleSheet, useColorScheme, type StyleProp, type ViewStyle } from 'react-native';

import { Glass } from './Glass';
import { useThemeColor } from './Themed';

interface ContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Content({ style, children }: ContentProps) {
  const backgroundColor = useThemeColor({}, 'contentBackground');
  const scheme = useColorScheme() ?? 'light';
  const frostTint = scheme === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.72)';
  return (
    <Glass
      style={[styles.container, style]}
      tintColor={frostTint}
      glassEffectStyle='regular'
      fallback='solid'
      fallbackColor={backgroundColor}
    >
      {children}
    </Glass>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 16,
    gap: 20,
  },
});
