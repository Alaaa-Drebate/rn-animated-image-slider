import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Animated as NativeAnimated,
  Dimensions,
  type DimensionValue,
  Easing,
  FlatList, Image,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import MyPressable from '../myPressable';
import ProgressiveImage from '../progressiveImage';
import type { ImageSliderProps } from 'rn-animated-image-slide';

/**
 * ROTATE_DEGREE is a constant that represents the degree of rotation for the slides.
 * It is set to Math.PI radians, which is approximately 3.14159 degrees.
 */
const ROTATE_DEGREE = Math.PI;

const primary = '#fff';
/**
 * ImageSlider is a functional component that renders an image slider.
 * It takes in several props defined by the ImageSliderProps interface.
 *
 * @component
 * @param {ImageSliderProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered ImageSlider component.
 */
const ImageSlider: React.FC<ImageSliderProps> = ({
  containerStyle,
  slides,
  onGalleryPress,
  onControllersVisibleChange,
  onMutePress,
  onPausePress,
  title,
  titleStyle,
  date,
  dateStyle,
  controllerComponent,
  slideContainerStyle,
  controllerContainerStyle,
  controllersStyle,
  sliderWidth,
  sliderHeight,
  rotateDegree,
  slideDuration,
  sizeIcon,
}: ImageSliderProps): JSX.Element => {
  /**
   * useState is a hook that returns a stateful value and a function to update it.
   *
   * @returns {[number, function]} The current index and a function to update it.
   */
  const [index, setIndex] = useState(1);

  /**
   * useState is a hook that returns a stateful value and a function to update it.
   *
   * @returns {[boolean, function]} The current pause state and a function to update it.
   */
  const [isPaused, setIsPaused] = useState(false);

  /**
   * useState is a hook that returns a stateful value and a function to update it.
   *
   * @returns {[boolean, function]} The current mute state and a function to update it.
   */
  const [isMute, setIsMute] = useState(false);

  /**
   * useState is a hook that returns a stateful value and a function to update it.
   *
   * @returns {[boolean, function]} The current visibility state of the controllers and a function to update it.
   */
  const [isControllersVisible, setIsControllersVisible] = useState(false);

  /**
   * useRef is a hook that returns a mutable ref object whose .current property is initialized with the passed argument (initialValue).
   *
   * @returns {React.RefObject<NativeAnimated.Value>} A reference to the timer value.
   */
  const timer = useRef(new NativeAnimated.Value(0));

  /**
   * useRef is a hook that returns a mutable ref object whose .current property is initialized with the passed argument (initialValue).
   *
   * @returns {React.RefObject<NativeAnimated.CompositeAnimation | null>} A reference to the animation.
   */
  const controllerAnimation = useRef(
    new Animated.Value(isControllersVisible ? 1 : 0)
  ).current;
  const controllerImagesAnimation = useRef(
    new Animated.Value(isControllersVisible ? 1 : 0)
  ).current;
  const animation = useRef<NativeAnimated.CompositeAnimation | null>(null);
  /**
   * useMemo is a hook that returns a memoized value. It only recomputes the memoized value when one of the dependencies has changed.
   * This optimization helps to avoid expensive calculations on every render.
   *
   * @param {function} callback - The function that will be used to compute the memoized value.
   * @param {Array} dependencies - The list of dependencies for the memoized value. The memoized value will only be recomputed when one of these dependencies changes.
   *
   * @returns {Object} An object containing the memoized values for opacities, scales, and rotates.
   */
  const { opacities, scales, rotates } = useMemo(
    () => ({
      /**
       * opacities is an array of animated values that represent the opacity of each slide.
       * The opacity of the current slide is animated from 0 to 1 over 3 seconds, while the opacity of the previous slide is animated from 1 to 0 over 3 seconds.
       * The opacity of all other slides is 0.
       */
      opacities: slides.map((_: any, idx: number) => {
        const prevIndex = index > 0 ? index - 1 : slides.length - 1;
        if (idx === prevIndex) {
          return timer.current.interpolate({
            inputRange: [0, 3],
            outputRange: [1, 0],
          });
        }
        if (idx === index) {
          return timer.current.interpolate({
            inputRange: [0, 3],
            outputRange: [0, 1],
          });
        }
        return 0;
      }),
      /**
       * scales is an array of animated values that represent the scale of each slide.
       * The scale of the current slide is animated from 1 to 1.05 to 1.1 over 6 seconds.
       * The scale of all other slides is 1.1.
       */
      scales: slides.map((_: any, idx: number) => {
        if (idx === index) {
          return timer.current.interpolate({
            inputRange: [0, 3, 6],
            outputRange: [1, 1.05, 1.1],
            extrapolate: 'clamp',
          });
        }
        return 1.1;
      }),
      /**
       * rotates is an array of animated values that represent the rotation of each slide.
       * The rotation of the current slide is animated from 0 to -ROTATE_DEGREE or ROTATE_DEGREE over 3 seconds, depending on whether the slide index is even or odd.
       * The rotation of all other slides is -ROTATE_DEGREE or ROTATE_DEGREE, depending on whether the slide index is even or odd.
       */
      rotates: slides.map((_: any, idx: number) => {
        if (idx === index) {
          return timer.current.interpolate({
            inputRange: [3, 6],
            outputRange: [
              '0deg',
              idx % 2 === 0 ? '-' + rotateDegree + 'deg' : rotateDegree + 'deg',
            ],
            extrapolate: 'clamp',
          });
        }
        return idx % 2 === 0
          ? '-' + rotateDegree + 'deg'
          : rotateDegree + 'deg';
      }),
    }),
    [index]
  );
  /**
   * next is a function that is called when the animation finishes.
   * It resets the timer value to 0 and increments the index.
   *
   * @param {boolean} finished - A boolean indicating whether the animation has finished.
   */
  const next = (finished: boolean) => {
    if (finished) {
      timer.current.setValue(0);
      setIndex((prev) => (prev + 1) % slides.length);
    }
  };

  /**
   * useEffect is a hook that performs side effects in function components.
   * This useEffect hook starts the animation when the component mounts.
   */
  useEffect(() => {
    animation.current = NativeAnimated.timing(timer.current, {
      duration: slideDuration,
      toValue: 8,
      delay: 0,
      useNativeDriver: true,
    });
  }, []);

  /**
   * useEffect is a hook that performs side effects in function components.
   * This useEffect hook starts the animation when the index changes and the animation is not paused.
   */
  useEffect(() => {
    if (!isPaused) {
      animation?.current?.start(({ finished }) => next(finished));
    }
  }, [index]);

  /**
   * useEffect is a hook that performs side effects in function components.
   * This useEffect hook stops the animation when the animation is paused.
   */
  useEffect(() => {
    if (onPausePress) {
      onPausePress(isPaused);
    }
    if (isPaused) {
      animation?.current?.stop();
    }
  }, [isPaused]);

  /**
   * pauseHandler is a function that toggles the pause state of the animation.
   * If the animation is paused, it starts the animation.
   */
  const pauseHandler = () => {
    setIsPaused((prev) => {
      if (prev) {
        animation?.current?.start(({ finished }) => next(finished));
      }
      return !prev;
    });
  };

  /**
   * snapToIndex is a function that snaps the animation to a specific index.
   * It resets the timer value to 0 and sets the index to the specified index.
   *
   * @param {number} idx - The index to snap to.
   */
  const snapToIndex = (idx: number) => {
    timer.current.setValue(0);
    if (!isPaused) {
      pauseHandler();
    }
    if ((idx % slides.length) + 1 === index) {
      return;
    }
    timer.current.setValue(0);
    setIndex((idx % slides.length) + 1);
  };
  /**
   * _renderItem is a function that renders each item in the list.
   * It returns an Animated.View component that contains an Image component.
   * The Animated.View component is animated with a fade-in effect from the right.
   * The Image component displays the image from the item's URL.
   * The ItemContainer component is pressed, it calls the snapToIndex function with the current index.
   *
   * @param {Object} param0 - An object containing the item and index.
   * @param {any} param0.item - The item to be rendered.
   * @param {number} param0.index - The index of the item.
   *
   * @returns {JSX.Element} The rendered item.
   */
  const _renderItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }): JSX.Element => {
    return (
      <MyPressable
        containerStyle={styles(sliderWidth, sliderHeight).itemContainer}
        iosOpacityEffect
        foreground
        onPress={() => snapToIndex(index)}
      >
        <ProgressiveImage style={styles().imageItem} source={item.source} />
      </MyPressable>
    );
  };
  /**
   * onMuteHandler is a function that toggles the mute state of the audio.
   * If the onMutePress prop is provided, it calls the onMutePress function with the new mute state.
   * It then toggles the isMute state.
   */
  const onMuteHandler = () => {
    if (onMutePress) {
      onMutePress(!isMute);
    }
    setIsMute((prev) => !prev);
  };

  /**
   * onViewPress is a function that toggles the visibility of the controllers.
   * If the onControllersVisibleChange prop is provided, it calls the onControllersVisibleChange function with the new visibility state.
   * It then toggles the isControllersVisible state.
   */
  const onViewPress = () => {
    startControllerAnimation();
    if (onControllersVisibleChange) {
      onControllersVisibleChange(!isControllersVisible);
    }
    setIsControllersVisible((prev) => !prev);
  };
  const startControllerAnimation = () => {
    const config = {
      duration: 400,
      toValue: isControllersVisible ? 0 : 1,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    };
    Animated.timing(controllerAnimation, config).start((finished) => {
      if (finished) {
        startControllerImagesAnimation();
      }
    });
  };
  const startControllerImagesAnimation = () => {
    const config = {
      duration: 300,
      toValue: isControllersVisible ? 0 : 1,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    };
    Animated.timing(controllerImagesAnimation, config).start();
  };
  const controllersAnimatedStyle = {
    transform: [
      {
        translateY: controllerAnimation.interpolate({
          inputRange: [0, 1],
          //@ts-ignore
          outputRange: [sliderHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const controllersImagesStyle = {
    transform: [
      {
        translateX: controllerImagesAnimation.interpolate({
          inputRange: [0, 1],
          //@ts-ignore
          outputRange: [sliderWidth, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  /**
   * This is the main return statement of the component.
   * It returns a Container component that contains the slides and the controllers.
   *
   * @returns {JSX.Element} The main component.
   */
  return (
    <View style={[styles(sliderWidth, sliderHeight).container, containerStyle]}>
      {slides.map((slide: any, i: number) => {
        const prevIndex = index > 0 ? index - 1 : slides.length - 1;
        if (i !== index && i !== prevIndex) {
          return null;
        }
        return (
          <View
            style={[styles().slideContainer, slideContainerStyle]}
            onTouchStart={onViewPress}
            key={i}
          >
            <Animated.View
              //@ts-ignore
              style={{
                opacity: opacities[i],
                transform: [
                  {
                    scale: scales[i],
                  },
                  {
                    rotate: rotates[i],
                  },
                ],
              }}
            >
              <ProgressiveImage
                blurRadius={3}
                resizeMode={'cover'}
                source={slide?.source}
                style={styles(sliderWidth, sliderHeight).imageBackground}
                hideLoader
              />
              <ProgressiveImage
                style={styles(sliderWidth, sliderHeight).image}
                resizeMode={'contain'}
                source={slide?.source}
              />
            </Animated.View>
          </View>
        );
      })}
      <Animated.View
        style={[
          styles().bottomContainer,
          controllersAnimatedStyle,
          controllersStyle,
        ]}
      >
        {!!title && (
          <Text
            style={[
              styles().title,
              !date && {
                paddingBottom: '2%',
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}
        {!!date && <Text style={[styles().date, dateStyle]}>{date}</Text>}
        <Animated.View style={controllersImagesStyle}>
          <FlatList
            horizontal
            data={slides}
            renderItem={_renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: '10%',
            }}
          />
        </Animated.View>

        {controllerComponent ? (
          controllerComponent()
        ) : (
          <View
            style={[
              styles(sliderWidth, sliderHeight, sizeIcon).controllerContainer,
              controllerContainerStyle,
            ]}
          >
            <TouchableOpacity
              onPress={onMuteHandler}
              style={styles(sliderWidth, sliderHeight, sizeIcon).icon}>
              <Image
                style={styles().imageItem}
                source={
                  isMute
                    ? require('../../assets/images/unmute.png')
                    : require('../../assets/images/mute.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pauseHandler}
              style={[
                styles(sliderWidth, sliderHeight, sizeIcon).icon,
                {
                  height: (sizeIcon||33) * 1.3,
                },
              ]}>
              <Image
                style={styles().imageItem}
                source={
                  isPaused
                    ? require('../../assets/images/play.png')
                    : require('../../assets/images/pause.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onGalleryPress}
              style={styles(sliderWidth, sliderHeight, sizeIcon).icon}>
              <Image
                style={styles().imageItem}
                source={require('../../assets/images/gallery.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
};
const styles = (
  sliderWidth?: DimensionValue,
  sliderHeight?: DimensionValue,
  sizeIcon?: number
) =>
  StyleSheet.create({
    container: {
      width: sliderWidth || Dimensions.get('window').width,
      height: sliderHeight || Dimensions.get('window').height,
    },
    slideContainer: {
      position: 'absolute',
    },
    imageBackground: {
      width: sliderWidth || Dimensions.get('window').width,
      height: sliderHeight || Dimensions.get('window').height,
    },
    image: {
      width: sliderWidth || Dimensions.get('window').width,
      height: sliderHeight || Dimensions.get('window').height,
      position: 'absolute',
    },
    imageItem: {
      width: '100%',
      height: '100%',
    },
    bottomContainer: {
      width: '100%',
      zIndex: 99,
      position: 'absolute',
      bottom: '5%',
    },
    title: {
      width: '90%',
      fontSize: 17,
      fontWeight: 'bold',
      color: primary,
      paddingBottom: '0.5%',
      paddingLeft: '10%',
    },
    date: {
      width: '90%',
      fontSize: 14,
      color: primary,
      paddingBottom: '2%',
      paddingLeft: '10%',
    },
    controllerContainer: {
      width: (sizeIcon || 33) * 4.5,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingTop: '5%',
    },
    itemContainer: {
      marginRight: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: primary,
      width: typeof sliderWidth === 'number' ? sliderWidth / 7 : 65,
      aspectRatio: 0.9,
    },
    icon: {
      height: sizeIcon,
      aspectRatio: 1,
      opacity: 0.7,
    },
  });
ImageSlider.defaultProps = {
  slides: [],
  onMutePress: undefined,
  onGalleryPress: undefined,
  sliderWidth: Dimensions.get('window').width,
  sliderHeight: Dimensions.get('window').height,
  rotateDegree: ROTATE_DEGREE,
  slideDuration: 6000,
  sizeIcon: 33,
};

export default ImageSlider;
