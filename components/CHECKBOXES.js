// Importing
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import CHECKBOX_STYLES from '../styles/components/CHECKBOX_STYLES';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';

// Functional components

// Checkbox unchecked
const CheckboxUnchecked = ({onPress, customCheckboxStyle}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      CHECKBOX_STYLES.checkbox,
      CHECKBOX_STYLES.checkboxUnchecked,
      GLOBAL_STYLES.xyCenter,
      customCheckboxStyle,
    ]}>
      <Icon name="checkmark" size={scale(20)} color={COLORS.white} />
    </TouchableOpacity>
);

// Checkbox checked
const CheckboxChecked = ({onPress, customCheckboxStyle}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      CHECKBOX_STYLES.checkbox,
      CHECKBOX_STYLES.checkboxChecked,
      GLOBAL_STYLES.xyCenter,
      customCheckboxStyle,
    ]}>
    <Icon name="checkmark" size={scale(20)} color={COLORS.white} />
  </TouchableOpacity>
);

// Exporting
export {CheckboxUnchecked, CheckboxChecked};
