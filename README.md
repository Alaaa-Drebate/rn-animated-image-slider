# React Native Animated Image Slider

Welcome to our React Native Animated Image Slider! This library is inspired by the beautiful and intuitive design of Apple's Memories app, bringing a touch of elegance to your React Native applications.

Our Animated Image Slider is not just a simple carousel of images. It's a dynamic, interactive, and visually appealing component that enhances the user experience. With smooth transitions and subtle animations, users can easily navigate through their favorite photos or any other content.


**Table of Content**:

- [How it looks](#how-it-looks)
- [Installation](#installation)
- [Example (local)](#example)
- [How to use it](#how-to-use-it)
- [Props](#props)
- [TODO](#todo)

## How it looks

<img src="https://github.com/Alaaa-Drebate/image-resources/blob/main/rn-animated-image-slider.gif?raw=true" width="250">

## Installation

```bash
npm i rn-animated-image-slider --save
```

or

```bash
yarn add rn-animated-image-slider
```

## Example

Take a look into **example** folder

To execute the example using **Expo** run the following command:

```bash
yarn run run:example
```


## How to use it

**Step 1:** Import the `ImageSlider` component:

```javascript
import { ImageSlider } from "rn-animated-image-slider";
```

**Second step:** define the slides

```javascript
const slides = [
  {
    source: {uri: 'https://picsum.photos/id/16/1000/800'},
  },
  {
    source: {uri: 'https://picsum.photos/id/17/1000/800'},
  },
  {
    source: {uri: 'https://picsum.photos/id/18/1000/800'},
  },
];
```
***or pass local image***
```javascript
const actions = [
  {
    source: require('@/assets/image1.png'),
  },
  {
    source: require('@/assets/image2.png'),
  },
  {
    source: require('@/assets/image3.png'),
  },
];
```
**Third step:** use it
```javascript
<View style={styles.container}>
  <Text style={styles.example}>Animated Slider example</Text>
  <ImageSlider
          slides={slides}
          title={'Slider title'}
          date={new Date().toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
          onGalleryPress={() => console.log('gallery Pressed')}
          onControllersVisibleChange={isVisible =>
                  console.log(`isController visible ${isVisible}`)
          }
          onMutePress={() => console.log('on mute press')}
          onPausePress={() => console.log('on pause press')}
  />
</View>
```


## Props

### `containerStyle: ViewStyle`

- **Default:** `undefind`

  Optional styling for the container of the image slider.


### `slides: Array<{ source: ImageSourcePropType }>`

- **Required**

  An array of objects representing the images to be displayed in the slider. Each object should contain a source property which is of type ImageSourcePropType.

### `onGalleryPress: () => void`

- **Default:** `undefined`

  Callback function to be executed when the gallery button is pressed.

### `onMutePress: (isMute: boolean) => void`

- **Default:** `undefined`

  Callback function to be executed when the mute button is pressed. The function receives a boolean indicating whether the slider is currently muted.

### `onPausePress: (isPaused: boolean) => void`

- **Default:** `undefined`

  Callback function to be executed when the pause button is pressed. The function receives a boolean indicating whether the slider is currently paused.

### `onControllersVisibleChange: (isControllersVisible: boolean) => void`

- **Default:** `undefined`

  Callback function to be executed when the visibility of the controllers changes.
  - `@param` *isControllersVisible*: boolean indicating whether the controllers are currently visible

### `title: string`

- **Required:**

  The title to be displayed above the image slider.

### `titleStyle: TextStyle`

- **Default:** `undefined`

  Optional styling for the title.

### `date: string`

- **Default:** `undefined`

  The date to be displayed below the image slider.

### `dateStyle: TextStyle`

- **Default:** `undefined`

  Optional styling for the date.

### `controllerComponent: () => JSX.Element`

- **Default:** `undefined`

  Optional custom component to be used as the controller.

### `slideContainerStyle: ViewStyle`

- **Default:** `undefined`

  Optional styling for the container of each slide.

### `controllerContainerStyle: ViewStyle`

- **Default:** `#undefined`

  Optional styling for the container of the controller.

### `controllersStyle: ViewStyle`

- **Default:** `undefined`

  Optional styling for the controllers.

### `sliderWidth: number`

- **Default:** `Dimensions.get('window').width`

  Optional width for the slider.

### `sliderHeight: number`

- **Default:** `Dimensions.get('window').height`

  Optional height for the slider.

### `rotateDegree: number`

- **Default:** `Math.PI`

  Optional rotateDegree is a constant that represents the degree of rotation for the slides.
  It is set to Math.PI radians, which is approximately 3.14159 degrees.

### `slideDuration: number`

- **Default:** `6000`

  Optional duration for each slide transition in ms.

### `sizeIcon: number`

- **Default:** `33`

  Optional size for the icons.

## TODO

- [x] first implementation
- [x] example
- [x] migrate to TypeScript
- [ ] Enable swipe functionality for sliding..
