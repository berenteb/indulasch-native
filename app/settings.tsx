import { Stack } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { Content } from '../components/Content';
import { SliderField } from '../components/form/SliderField';
import { SwitchField } from '../components/form/SwitchField';
import { Impressum } from '../components/Impressum';
import { useSettingsContext } from '../components/SettingsContext';
import { useThemeColor } from '../components/Themed';

export default function Settings() {
  const { setRadius, radius, hapticsEnabled, setHapticsEnabled, departuresLimit, setDeparturesLimit } =
    useSettingsContext();
  const textColor = useThemeColor({}, 'primaryText');
  const tint = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'screenBackground');

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Beállítások',
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
          <SliderField
            helperText={`${departuresLimit} db`}
            value={departuresLimit}
            onValueChange={setDeparturesLimit}
            label='Járatok számának korlátja'
            step={1}
            minimumValue={1}
            maximumValue={50}
          />
          <SliderField
            helperText={`${radius}m`}
            value={radius}
            onValueChange={setRadius}
            label='Hatósugár (méter)'
            step={100}
            minimumValue={100}
            maximumValue={2000}
          />
          <SwitchField value={hapticsEnabled} onValueChange={setHapticsEnabled} label='Haptikus visszajelzések' />
        </Content>
        <Impressum />
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
});
