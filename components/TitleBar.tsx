import { StyleSheet, View, ViewProps } from 'react-native';

interface TitleBarProps extends ViewProps {}

export function TitleBar({ style, ...props }: TitleBarProps) {
  return <View style={[styles.container, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});
