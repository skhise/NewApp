// Importing
import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

// Functional components

// Screen loader
const ScreenLoader = ({message}) => (
  <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter,GLOBAL_STYLES.transperentBackground]}>
    <View style={[GLOBAL_STYLES.loaderContainer]}>
      {/* Lottie view */}
      <LottieView
        source={require('../assets/lottie/screen-loader.json')}
        loop
        autoPlay
        resizeMode="contain"
      />
    </View>
    <Animatable.Text
      delay={500}
      animation="fadeInUp"
      easing="ease-in-out-sine"
      useNativeDriver={true}
      style={GLOBAL_STYLES.lottieTitle}>
      Please wait...
    </Animatable.Text>
    <Animatable.Text
      delay={1000}
      animation="fadeInUp"
      useNativeDriver={true}
      easing="ease-in-out-sine"
      style={GLOBAL_STYLES.lottieInfo}>
      {message}
    </Animatable.Text>
  </View>
);

// Exporting
export {ScreenLoader};
