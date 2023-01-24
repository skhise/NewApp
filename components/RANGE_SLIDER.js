// Importing
import React from 'react';
import {View, Text} from 'react-native';
import RANGE_SLIDER_STYLES from '../styles/components/RANGE_SLIDER_STYLES';

// Functional components

const Thumb = () => {
  return <View style={RANGE_SLIDER_STYLES.rangeSliderThumb} />;
};

const Rail = () => {
  return <View style={RANGE_SLIDER_STYLES.rangeSliderRail} />;
};

const RailSelected = () => {
  return <View style={RANGE_SLIDER_STYLES.rangeSliderRailSelected} />;
};

const Notch = props => {
  return <View style={RANGE_SLIDER_STYLES.rangeSliderNotch} {...props} />;
};

const Label = ({text, ...restProps}) => {
  return (
    <View style={RANGE_SLIDER_STYLES.rangeSliderLabelContainer} {...restProps}>
      <Text style={RANGE_SLIDER_STYLES.rangeSliderLabelValue}>{text}</Text>
    </View>
  );
};

// Exporting
export {Thumb, Rail, RailSelected, Notch, Label};
