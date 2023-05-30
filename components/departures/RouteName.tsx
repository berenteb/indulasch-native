import { StyleSheet, View } from 'react-native';

import { Style } from '../../types/departures.type';
import { Text } from '../Themed';

interface RouteNameProps {
  style: Style;
}

export function RouteName({ style: { color, icon } }: RouteNameProps) {
  return (
    <View
      style={[
        styles.routeName,
        {
          backgroundColor: '#' + color,
        },
        icon.type !== 'BOX' ? { minWidth: 30, borderRadius: 300 } : undefined,
      ]}
    >
      <Text style={[styles.routeText, { color: '#' + icon.textColor }]}>{icon.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  routeName: {
    minWidth: 60,
    minHeight: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 21,
  },
});
