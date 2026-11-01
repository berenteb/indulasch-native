import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Glass } from './Glass';
import { useThemeColor } from './Themed';

interface ButtonProps {
  onPress: () => void;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Button({ onPress, leftIcon, rightIcon, style, children }: ButtonProps) {
  const backgroundColor = useThemeColor({}, 'theme');
  const color = 'white';
  const isIconOnly = !children && (!!leftIcon || !!rightIcon);

  return (
    <Glass
      isInteractive
      tintColor={backgroundColor}
      fallbackColor={backgroundColor}
      style={[styles.button, isIconOnly && styles.iconOnly, style]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed, isIconOnly && styles.iconOnlyPressable]}
        accessibilityRole='button'
      >
        {leftIcon && <MaterialIcons name={leftIcon} color={color} size={isIconOnly ? 24 : 25} />}
        {children != null && children !== false && <Text style={[styles.text, { color }]}>{children}</Text>}
        {rightIcon && <MaterialIcons name={rightIcon} color={color} size={isIconOnly ? 24 : 25} />}
      </Pressable>
    </Glass>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 18,
  },
  iconOnly: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  pressable: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  iconOnlyPressable: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '100%',
    height: '100%',
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontFamily: 'OpenSansBold',
    fontSize: 20,
  },
});
