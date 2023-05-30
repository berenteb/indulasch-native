import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View, ViewProps } from './Themed';

export function Screen({ style, ...props }: ViewProps) {
  const { top } = useSafeAreaInsets();

  return <View style={[{ paddingTop: top, width: '100%', flex: 1 }, style]} {...props} />;
}
