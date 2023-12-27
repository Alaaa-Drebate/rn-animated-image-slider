import type {PressableProps, StyleProp, ViewStyle} from 'react-native';

export interface MyPressableProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  iosOpacityEffect?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  foreground?: boolean;
  secondaryRipple?: boolean;
  disabled?: boolean;
  disabledNoOpacity?: boolean;
  primaryRipple?: boolean;
  backgroundColor?: string;
}
