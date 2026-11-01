import { BlurView } from 'expo-blur';
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable, type GlassViewProps } from 'expo-glass-effect';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useThemeColor } from './Themed';

export function canUseLiquidGlass() {
  return Platform.OS === 'ios' && isLiquidGlassAvailable() && isGlassEffectAPIAvailable();
}

export type GlassProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isInteractive?: boolean;
  tintColor?: GlassViewProps['tintColor'];
  glassEffectStyle?: GlassViewProps['glassEffectStyle'];
  /** Used when Liquid Glass / blur cannot render. Defaults to content background. */
  fallbackColor?: string;
  fallback?: 'blur' | 'solid';
};

export function Glass({
  children,
  style,
  isInteractive = false,
  tintColor,
  glassEffectStyle = 'regular',
  fallbackColor,
  fallback = 'solid',
}: GlassProps) {
  const [reduceTransparency, setReduceTransparency] = useState(false);
  const contentBackground = useThemeColor({}, 'contentBackground');
  const solidColor = fallbackColor ?? contentBackground;

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceTransparencyEnabled().then((enabled) => {
      if (mounted) setReduceTransparency(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener('reduceTransparencyChanged', setReduceTransparency);
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  if (canUseLiquidGlass() && !reduceTransparency) {
    return (
      <GlassView style={style} isInteractive={isInteractive} tintColor={tintColor} glassEffectStyle={glassEffectStyle}>
        {children}
      </GlassView>
    );
  }

  // Android BlurView materials often render as a muddy gray; keep frost blur on iOS only.
  if (fallback === 'blur' && Platform.OS === 'ios' && !reduceTransparency) {
    return (
      <BlurView intensity={95} tint='systemThickMaterial' style={[styles.blur, style]}>
        {children}
      </BlurView>
    );
  }

  return <View style={[{ backgroundColor: solidColor }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  blur: {
    overflow: 'hidden',
  },
});
