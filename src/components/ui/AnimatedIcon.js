import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { COLORS, ICON_SIZES } from '../../design-system/tokens';

const SPRING_CONFIG = { damping: 12, stiffness: 150 };

export function AnimatedIcon({
  icon: IconComponent,
  size = ICON_SIZES.md,
  color = COLORS.textPrimary,
  animation = 'bounce',
  onPress,
  style,
}) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const triggerAnimation = useCallback(() => {
    if (animation === 'bounce') {
      scale.value = withSequence(
        withSpring(1.3, SPRING_CONFIG),
        withSpring(1, SPRING_CONFIG),
      );
    } else if (animation === 'pulse') {
      scale.value = withSequence(
        withTiming(1.15, { duration: 100 }),
        withTiming(0.95, { duration: 100 }),
        withTiming(1, { duration: 100 }),
      );
    } else if (animation === 'shake') {
      rotation.value = withSequence(
        withTiming(-12, { duration: 50 }),
        withTiming(12, { duration: 50 }),
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    } else if (animation === 'flip') {
      rotation.value = withSequence(
        withTiming(180, { duration: 200 }),
        withTiming(360, { duration: 200 }),
      );
      rotation.value = 0;
    }
    onPress?.();
  }, [animation, onPress, scale, rotation]);

  const content = (
    <Animated.View style={[animatedStyle, style]}>
      <IconComponent size={size} color={color} strokeWidth={1.8} />
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={triggerAnimation} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}
