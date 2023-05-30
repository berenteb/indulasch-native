import { Platform, StyleSheet, Switch, SwitchProps } from 'react-native';

import { useThemeColor } from '../Themed';
import { FormField } from './FormField';

interface SwitchFieldProps extends SwitchProps {
  label: string;
}

export function SwitchField({ label, ...props }: SwitchFieldProps) {
  const trackColor = useThemeColor({}, 'theme');
  let thumbColor = 'white';
  if (Platform.OS === 'android' && props.value) thumbColor = trackColor;
  return (
    <FormField label={label} style={styles.container}>
      <Switch trackColor={{ true: trackColor }} thumbColor={thumbColor} {...props} />
    </FormField>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
