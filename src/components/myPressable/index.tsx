import React, { useEffect, useRef } from 'react';
import { Pressable, Platform, Animated } from 'react-native';
import type { MyPressableProps } from '../../interfaces/myPressable';

/**
 * A custom pressable component.
 *
 * @component
 *
 * @param {MyPressableProps} props - The pressable component props.
 * @param {StyleProp<ViewStyle>} [props.style] - The style for the pressable component.
 * @param {object} [props.android_ripple] - The ripple effect configuration for Android.
 * @param {React.ReactNode} [props.children] - The child components or elements.
 * @param {boolean} [props.iosOpacityEffect=false] - Enable iOS opacity effect when pressed.
 * @param {StyleProp<ViewStyle>} [props.containerStyle] - The style for the container wrapping the pressable component.
 * @param {number} [props.borderRadius=0] - The border radius for the container.
 * @param {boolean} [props.foreground=false] - Whether the ripple effect should appear as a foreground or background effect on Android.
 * @param {boolean} [props.secondaryRipple=false] - Whether to use the secondary color for the ripple effect.
 * @param {boolean} [props.primaryRipple=false] - Whether to use the primary color for the ripple effect.
 * @param {boolean} [props.disabled=false] - Whether the pressable is disabled.
 * @param {boolean} [props.disabledNoOpacity=false] - Disable the button without an opacity effect.
 * @param {string} [props.backgroundColor='transparent'] - The background color of the pressable.
 * @param {PressableProps} [restOfProps] - Additional props to be passed to the Pressable component.
 *
 * @returns {JSX.Element} The rendered pressable component.
 */
const MyPressable: React.FC<MyPressableProps> = ({
  style,
  android_ripple,
  children,
  iosOpacityEffect = false,
  containerStyle,
  borderRadius = 0,
  foreground = false,
  disabled = false,
  disabledNoOpacity = false,
  backgroundColor = 'transparent',
  ...restOfProps
}: MyPressableProps): JSX.Element => {
  /**
   * Represents the current theme.
   * @type {Theme}
   */
  /**
   * Ref for animation controller.
   * @type {Animated.Value}
   */
  const animationController = useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;

  /**
   * Opacity value for animation.
   * @type {Animated.AnimatedInterpolation}
   */
  const opacity = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  /**
   * Effect to animate the pressable component.
   */
  useEffect(() => {
    Animated.timing(animationController, {
      duration: 200,
      toValue: disabled ? 0 : 1,
      useNativeDriver: true,
    }).start();
  }, [animationController, disabled]);

  return (
    <Animated.View
      style={[
        { borderRadius, overflow: 'hidden' },
        containerStyle,
        { opacity },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          style,
          {
            backgroundColor:
              Platform.OS !== 'android' && pressed
                ? 'rgba(255,255,255,0.3)'
                : backgroundColor,
            opacity:
              iosOpacityEffect && Platform.OS === 'ios' && pressed ? 0.5 : 1,
          },
        ]}
        android_ripple={
          android_ripple || {
            color: 'rgba(255,255,255,0.3)',
            foreground,
          }
        }
        disabled={disabled || disabledNoOpacity}
        {...restOfProps}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default MyPressable;
