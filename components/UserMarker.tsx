import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { MapMarkerProps, Marker } from 'react-native-maps';

import { useThemeColor } from './Themed';

export function UserMarker(props: MapMarkerProps) {
  const backgroundColor = useThemeColor({}, 'theme');

  return (
    <Marker {...props}>
      <View style={[styles.container, { backgroundColor }]}>
        <MaterialIcons name='person' size={20} color='white' />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 200,
    padding: 2,
  },
});
