import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Glass } from './Glass';
import { useThemeColor } from './Themed';

interface ContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Content({ style, children }: ContentProps) {
  const backgroundColor = useThemeColor({}, 'contentBackground');
  return (
    <Glass style={[styles.container, style]} fallbackColor={backgroundColor}>
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
