import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageSlider } from 'rn-animated-image-slide';
const SLIDES = [
  {
    source: { uri: 'https://picsum.photos/id/16/1000/800' },
  },
  {
    source: { uri: 'https://picsum.photos/id/17/1000/800' },
  },
  {
    source: { uri: 'https://picsum.photos/id/18/1000/800' },
  },
  {
    source: { uri: 'https://picsum.photos/id/19/1000/800' },
  },
  {
    source: { uri: 'https://picsum.photos/id/20/1000/800' },
  },
  {
    source: { uri: 'https://picsum.photos/id/21/1000/800' },
  },
  {
    source: { uri: 'https://picsum.photos/id/22/1000/800' },
  },
];
/**
 * This is a functional component named `App` that returns a JSX element.
 * The returned JSX element consists of a View container that wraps around an ImageSlider component.
 *
 * @returns {JSX.Element} Returns a JSX element representing the App component.
 */
const App = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <ImageSlider
        /**
         * The title prop sets the title of the ImageSlider.
         * In this case, the title is set to 'slider title'.
         */
        title={'Slider title'}
        /**
         * The date prop sets the date to be displayed below the ImageSlider.
         * Here, the current date is formatted to 'day month year' format and passed as a prop.
         */
        date={new Date().toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
        /**
         * The onGalleryPress prop is a callback function that gets triggered when the gallery button is pressed.
         * In this case, it logs 'gallery Pressed' to the console.
         */
        onGalleryPress={() => console.log('gallery Pressed')}
        /**
         * The onControllersVisibleChange prop is a callback function that gets triggered when the visibility of the controllers changes.
         * It logs whether the controllers are currently visible.
         */
        onControllersVisibleChange={(isVisible) =>
          console.log(`isController visible ${isVisible}`)
        }
        /**
         * The onMutePress prop is a callback function that gets triggered when the mute button is pressed.
         * In this case, it logs 'on mute press' to the console.
         */
        onMutePress={() => console.log('on mute press')}
        /**
         * The onPausePress prop is a callback function that gets triggered when the pause button is pressed.
         * In this case, it logs 'on pause press' to the console.
         */
        onPausePress={() => console.log('on pause press')}
        /**
         * The slides prop is an array of objects representing the images to be displayed in the slider.
         * Here, it is set to the SLIDES constant.
         */
        slides={SLIDES}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  /**
   * The container style is applied to the View container.
   * Here, it is set to take up the full available space (flex: 1).
   */
  container: {
    flex: 1,
  },
});

export default App;
