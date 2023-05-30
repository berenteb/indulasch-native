import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, ViewProps } from 'react-native';

import { useThemeColor } from './Themed';

interface ButtonProps extends ViewProps {
  onPress: () => void;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
}

export function Button({ onPress, leftIcon, rightIcon, style, children, ...props }: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const backgroundColor = useThemeColor({}, 'theme');
  const color = 'white';
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[styles.button, { backgroundColor, opacity: pressed ? 0.8 : 1 }, style]}
      {...props}
    >
      {leftIcon && <MaterialIcons name={leftIcon} color={color} size={25} />}
      <Text style={[styles.text, { color }]}>{children}</Text>
      {rightIcon && <MaterialIcons name={rightIcon} color={color} size={25} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  text: {
    fontFamily: 'OpenSansBold',
    fontSize: 20,
  },
});
