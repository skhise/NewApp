// Importing
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import RADIO_STYLES from '../styles/components/RADIO_STYLES';

// Functional components

// Boxed radio default
const BoxedRadioDefault = ({
  label,
  customLabelStyle,
  customRadioStyle,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      RADIO_STYLES.boxedRadioButton,
      RADIO_STYLES.boxedRadioButtonDefault,
      GLOBAL_STYLES.xyCenter,
      customRadioStyle,
    ]}
    onPress={onPress}>
    <View
      style={[
        RADIO_STYLES.radioCircle,
        RADIO_STYLES.radioCircleDefault,
        GLOBAL_STYLES.xyCenter,
      ]}>
      <View
        style={[
          RADIO_STYLES.radioCircleCenter,
          RADIO_STYLES.radioCircleCenterDefault,
        ]}></View>
    </View>
    <Text
      style={[
        RADIO_STYLES.boxedRadioButtonLabel,
        RADIO_STYLES.boxedRadioButtonLabelDefault,
        customLabelStyle,
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Boxed radio selected
const BoxedRadioSelected = ({
  label,
  customLabelStyle,
  customRadioStyle,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      RADIO_STYLES.boxedRadioButton,
      RADIO_STYLES.boxedRadioButtonSelected,
      GLOBAL_STYLES.xyCenter,
      {flexDirection: 'row'},
      customRadioStyle,
    ]}
    onPress={onPress}>
    <View
      style={[
        RADIO_STYLES.radioCircle,
        RADIO_STYLES.radioCircleSelected,
        GLOBAL_STYLES.xyCenter,
      ]}>
      <View
        style={[
          RADIO_STYLES.radioCircleCenter,
          RADIO_STYLES.radioCircleCenterSelected,
        ]}></View>
    </View>
    <Text
      style={[
        RADIO_STYLES.boxedRadioButtonLabel,
        RADIO_STYLES.boxedRadioButtonLabelSelected,
        customLabelStyle,
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Circled radio default
const CircledRadioDefault = ({customRadioStyle}) => (
  <View
    style={[
      RADIO_STYLES.radioCircle,
      RADIO_STYLES.radioCircleDefault,
      GLOBAL_STYLES.xyCenter,
      customRadioStyle,
    ]}>
    <View
      style={[
        RADIO_STYLES.radioCircleCenter,
        RADIO_STYLES.radioCircleCenterDefault,
      ]}></View>
  </View>
);

// Circled radio selected
const CircledRadioSelected = ({customRadioStyle}) => (
  <View
    style={[
      RADIO_STYLES.radioCircle,
      RADIO_STYLES.radioCircleSelected,
      GLOBAL_STYLES.xyCenter,
      customRadioStyle,
    ]}>
    <View
      style={[
        RADIO_STYLES.radioCircleCenter,
        RADIO_STYLES.radioCircleCenterSelected,
      ]}></View>
  </View>
);

export {
  BoxedRadioDefault,
  BoxedRadioSelected,
  CircledRadioDefault,
  CircledRadioSelected,
};
