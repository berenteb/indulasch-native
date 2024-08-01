import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Field } from '../components/departures/Field';
import { ErrorMessage } from '../components/ErrorMessage';
import { useLocationContext } from '../components/LocationContext';
import { Logo } from '../components/Logo';
import { Screen } from '../components/Screen';
import { SettingsButton } from '../components/SettingsButton';
import { Text, useThemeColor, View } from '../components/Themed';
import { TitleBar } from '../components/TitleBar';
import { useDepartures } from '../network/useDepartures';

export default function Index() {
  const { granted } = useLocationContext();
  const backgroundColor = useThemeColor({}, 'homeBackground');
  const { bottom } = useSafeAreaInsets();
  const { data, isLoading, refetch, isError } = useDepartures();
  return (
    <Screen style={{ backgroundColor }}>
      <TitleBar>
        <Logo width={222} height={40} />
        <SettingsButton />
      </TitleBar>
      <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
        <View
          style={[
            styles.content,
            {
              paddingBottom: bottom + 10,
            },
          ]}
        >
          {!granted && (
            <ErrorMessage
              message='Engedélyezned kell a helymeghatározást az eszköz beállításaiban!'
              iconName='location-off'
            />
          )}
          {isError && <ErrorMessage message='Nem sikerült lekérdezni az indulásokat.' iconName='error' />}
          {data?.departures.map((d, i) => <Field departure={d} key={i} />)}
          {data?.departures.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 50 }}>Nincsenek indulások a közelben.</Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
});
