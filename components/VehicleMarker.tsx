import { StyleSheet, View } from 'react-native';
import { MapMarkerProps, Marker } from 'react-native-maps';

import { Style } from '../types/departures.type';
import { useAnimatedCoordinates } from '../utils/useAnimatedCoordinates';
import { Route } from './departures/Route';
import { useThemeColor } from './Themed';

interface VehicleMarkerProps extends MapMarkerProps {
  routeStyle: Style;
  alert: string[] | undefined;
}

export function VehicleMarker({ routeStyle, alert, coordinate, ...props }: VehicleMarkerProps) {
  const currentCoords = useAnimatedCoordinates(coordinate);
  const backgroundColor = useThemeColor({}, 'contentBackground');

  return (
    <Marker style={styles.marker} centerOffset={{ x: 0, y: -25 }} coordinate={currentCoords} {...props}>
      <View style={[styles.arrow, { backgroundColor: '#' + routeStyle.color }]} />
      <View style={[styles.container, { backgroundColor }]}>
        <Route style={routeStyle} alert={alert} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: { alignItems: 'center', flexDirection: 'column-reverse', paddingBottom: 2 },
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 9,
  },
  arrow: {
    marginTop: -5,
    width: 10,
    height: 10,
    transform: [{ rotate: '45deg' }],
  },
});
