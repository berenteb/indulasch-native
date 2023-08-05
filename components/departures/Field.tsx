import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Departure } from '../../types/departures.type';
import { useThemeColor } from '../Themed';
import { Headsign } from './Headsign';
import { Route } from './Route';
import { TimeText } from './TimeText';

interface FieldProps {
  departure: Departure;
}

export function Field({ departure }: FieldProps) {
  const backgroundColor = useThemeColor({}, 'contentBackground');
  const router = useRouter();
  const { style, headsign, alert, departureText, isDelayed } = departure;
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: 'details',
          params: { departureTripId: departure.tripId },
        });
      }}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <Route style={style} alert={alert} />
        <Headsign headsign={headsign} />
        <TimeText departureText={departureText} isDelayed={isDelayed} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 9,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    gap: 20,
  },
});
