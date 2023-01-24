// Importing
import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import BUTTON_STYLES from '../styles/components/BUTTON_STYLES';
import Icon from 'react-native-vector-icons/Ionicons';

// Functional components

// Button
const Button = ({label, customLabelStyle, customButtonStyle, onPress,disabled}) => (
  <TouchableOpacity
    style={disabled ? [BUTTON_STYLES.button, customButtonStyle,{opacity:0.5}] : [BUTTON_STYLES.button, customButtonStyle]}
    disabled={disabled}
    onPress={disabled ? null : onPress}
    >
    
    {disabled ? <ActivityIndicator size="large" color="#fff" /> : <Text style={[BUTTON_STYLES.buttonLabel, customLabelStyle]}>{label}</Text>} 
    
  </TouchableOpacity>
);

// Button with icon
const ButtonWithIcon = ({
  iconName,
  iconSize,
  iconColor,
  customButtonStyle,
  onPress,
}) => (
  <TouchableOpacity
    style={[BUTTON_STYLES.button, customButtonStyle]}
    onPress={onPress}>
    <Icon name={iconName} size={iconSize} color={iconColor} />
  </TouchableOpacity>
);

// Exporting
export {Button, ButtonWithIcon};
