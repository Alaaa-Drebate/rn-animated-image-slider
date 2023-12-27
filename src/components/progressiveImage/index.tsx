import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  type ImageErrorEventData,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

const ProgressiveImage = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const fastImageItem = () => {
    return (
      <Image
        {...props}
        fadeDuration={0}
        onLoadStart={() => {
          setLoading(true);
        }}
        resizeMode={props.resizeMode || 'cover'}
        source={props.source}
        onLoadEnd={() => {
          setLoading(false);
        }}
        onError={(e: NativeSyntheticEvent<ImageErrorEventData>) => {
          console.warn('slider image error :', e?.nativeEvent?.error);
        }}
      />
    );
  };
  return (
    <View style={[styles.container, props.style]}>
      {loading && !props.hideLoader && (
        <View {...props} style={[styles.loadingContainer, props.style]}>
          <ActivityIndicator size={'small'} color={'#fff'} />
        </View>
      )}
      {fastImageItem()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ProgressiveImage;
