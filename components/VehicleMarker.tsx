import { StyleSheet, View } from 'react-native';
import { MapMarkerProps, Marker } from 'react-native-maps';

import { Style } from '../types/departures.type';
import { Route } from './departures/Route';
import { useThemeColor } from './Themed';

interface VehicleMarkerProps extends MapMarkerProps {
  routeStyle: Style;
  alert: string[] | undefined;
}

export function VehicleMarker({ routeStyle, alert, ...props }: VehicleMarkerProps) {
  const backgroundColor = useThemeColor({}, 'contentBackground');

  return (
    <Marker {...props}>
      <View style={[styles.container, { backgroundColor }]}>
        <Route style={routeStyle} alert={alert} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 9,
  },
});
