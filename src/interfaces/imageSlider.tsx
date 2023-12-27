import type { ImageSourcePropType, TextStyle, ViewStyle } from 'react-native';

/**
 * ImageSliderProps is an interface for the properties that can be passed to the ImageSlider component.
 *
 * @interface ImageSliderProps
 * @property {ViewStyle} [containerStyle] - Optional. Styles applied to the container of the image slider.
 * @property {Array<{ source: ImageSourcePropType }>} slides - An array of objects representing the slides. Each object should have a `source` property of type `ImageSourcePropType`.
 * @property {() => void} [onGalleryPress] - Optional. Callback function that is called when the gallery button is pressed.
 * @property {(isMute: boolean) => void} [onMutePress] - Optional. Callback function that is called when the mute button is pressed. The current mute status is passed as an argument.
 * @property {(isPaused: boolean) => void} [onPausePress] - Optional. Callback function that is called when the pause button is pressed. The current pause status is passed as an argument.
 * @property {(isControllersVisible: boolean) => void} [onControllersVisibleChange] - Optional. Callback function that is called when the visibility of the controllers changes. The new visibility status is passed as an argument.
 * @property {string} title - The title displayed on the image slider.
 * @property {TextStyle} [titleStyle] - Optional. Styles applied to the title text.
 * @property {string} [date] - Optional. The date displayed on the image slider.
 * @property {TextStyle} [dateStyle] - Optional. Styles applied to the date text.
 * @property {() => JSX.Element} [controllerComponent] - Optional. A function that returns a JSX element to be used as the controller component.
 * @property {ViewStyle} [slideContainerStyle] - Optional. Styles applied to the container of each slide.
 * @property {ViewStyle} [controllerContainerStyle] - Optional. Styles applied to the container of the controllers.
 * @property {ViewStyle} [controllersStyle] - Optional. Styles applied to the controllers.
 * @property {number} [sliderWidth] - Optional. The width of the slider.
 * @property {number} [sliderHeight] - Optional. The height of the slider.
 * @property {number} [rotateDegree] - Optional. The degree of rotation applied to the slider.
 * @property {number} [slideDuration] - Optional. The duration of each slide transition.
 * @property {number} [sizeIcon] - Optional. The size of the icons.
 */
export interface ImageSliderProps {
  containerStyle?: ViewStyle;
  slides: Array<{ source: ImageSourcePropType }>;
  onGalleryPress?: () => void;
  onMutePress?: (isMute: boolean) => void;
  onPausePress?: (isPaused: boolean) => void;
  onControllersVisibleChange?: (isControllersVisible: boolean) => void;
  title: string;
  titleStyle?: TextStyle;
  date?: string;
  dateStyle?: TextStyle;
  controllerComponent?: () => JSX.Element;
  slideContainerStyle?: ViewStyle;
  controllerContainerStyle?: ViewStyle;
  controllersStyle?: ViewStyle;
  sliderWidth?: number;
  sliderHeight?: number;
  rotateDegree?: number;
  slideDuration?: number;
  sizeIcon?: number;
}
