import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
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
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height !== contentHeight) setContentHeight(height);
  };

  return (
    // Anchor at the view centre. A matching spacer below the pin makes that centre
    // land on the tip, which works the same on Apple Maps and Google Maps.
    <Marker coordinate={currentCoords} anchor={{ x: 0.5, y: 0.5 }} {...props}>
      <View collapsable={false} style={styles.marker}>
        <View onLayout={onLayout} style={styles.content}>
          <View style={[styles.arrow, { backgroundColor }]} />
          <View style={[styles.container, { backgroundColor }]}>
            <Route style={routeStyle} alert={alert} />
          </View>
        </View>
        <View style={{ height: contentHeight }} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 5,
  },
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 9,
    zIndex: 1,
  },
  arrow: {
    position: 'absolute',
    bottom: 1,
    width: 10,
    height: 10,
    transform: [{ rotate: '45deg' }],
    zIndex: 0,
  },
});
