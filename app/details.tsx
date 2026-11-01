import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Content } from '../components/Content';
import { Headsign } from '../components/departures/Headsign';
import { Route } from '../components/departures/Route';
import { TimeText } from '../components/departures/TimeText';
import { Text, useThemeColor } from '../components/Themed';
import { VehicleMap } from '../components/VehicleMap';
import { useDepartures } from '../network/useDepartures';
import { useTripDetails } from '../network/useTripDetails';

export default function Details() {
  const textColor = useThemeColor({}, 'primaryText');
  const tint = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'screenBackground');
  const router = useRouter();
  const params = useLocalSearchParams();
  const departures = useDepartures();
  const tripDetails = useTripDetails(
    Array.isArray(params.departureTripId) ? params.departureTripId[0] : params.departureTripId
  );

  const selectedDeparture = useMemo(() => {
    return departures.data?.departures.find((d) => d.tripId === params.departureTripId);
  }, [params.departureTripId]);

  const departureText = departures.data?.departures.find((d) => d.tripId === params.departureTripId)?.departureText;

  if (!selectedDeparture) {
    router.back();
    return null;
  }
  const { style, isDelayed, headsign, alert } = selectedDeparture;
  const vehicle = tripDetails.data?.entry?.vehicle;
  const location = vehicle?.location;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Részletek',
          headerLargeTitleEnabled: true,
          headerTintColor: tint,
          headerTitleStyle: { color: textColor },
          headerLargeTitleStyle: { color: textColor },
          headerBackTitle: 'Vissza',
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={[styles.scroll, { backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Content>
          <View style={styles.horizontal}>
            <Route style={style} />
            <TimeText isDelayed={isDelayed} departureText={departureText} />
          </View>
          <Headsign headsign={headsign} style={styles.headsign} />
          {!!alert && alert.length > 0 && (
            <View style={styles.alertsContainer}>
              <View style={styles.alertsTitleContainer}>
                <MaterialIcons name='error' size={20} color='orange' />
                <Text style={styles.alertsTitle}>Figyelmeztetések</Text>
              </View>
              {alert.map((a, i) => (
                <Text style={styles.alertItem} key={i}>
                  {a}
                </Text>
              ))}
            </View>
          )}
        </Content>
        {location && (
          <Content style={{ height: 300 }}>
            <VehicleMap
              vehiclePosition={{ latitude: location.lat, longitude: location.lon }}
              vehicle={{ style, alert }}
            />
          </Content>
        )}
        {vehicle && (
          <Content>
            <View style={styles.horizontal}>
              <Text>{vehicle.label}</Text>
              <MaterialIcons
                name={vehicle.wheelchairAccessible ? 'accessible' : 'not-accessible'}
                size={25}
                color={textColor}
              />
            </View>
          </Content>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headsign: {
    textAlign: 'left',
    flex: 0,
  },
  alertsContainer: {
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  alertsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  alertsTitle: {
    color: 'orange',
  },
  alertItem: {},
});
