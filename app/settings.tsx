import { BackButton } from '../components/BackButton';
import { Content } from '../components/Content';
import { SliderField } from '../components/form/SliderField';
import { SwitchField } from '../components/form/SwitchField';
import { Impressum } from '../components/Impressum';
import { Screen } from '../components/Screen';
import { ScreenTitle } from '../components/ScreenTitle';
import { useSettingsContext } from '../components/SettingsContext';
import { TitleBar } from '../components/TitleBar';

export default function Settings() {
  const { setRadius, radius, hapticsEnabled, setHapticsEnabled } = useSettingsContext();
  return (
    <Screen>
      <TitleBar>
        <BackButton />
      </TitleBar>
      <ScreenTitle>Beállítások</ScreenTitle>
      <Content>
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
    </Screen>
  );
}
