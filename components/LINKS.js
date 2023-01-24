// Importing
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import LINK_STYLES from '../styles/components/LINK_STYLES';
import Icon from 'react-native-vector-icons/Feather';

// Functional components

// Screen navigation link with left & right icons
const LinkWithLeftRightIcons = ({
  iconLeft,
  iconLeftColor,
  iconLeftSize,
  title,
  iconRight,
  iconRightColor,
  iconRightSize,
  onPress,
}) => (
  <View>
    <TouchableOpacity style={LINK_STYLES.screenNavLink} onPress={onPress}>
      <View style={LINK_STYLES.iconLabelContainer}>
        <Icon name={iconLeft} size={iconLeftSize} color={iconLeftColor} />
        <Text style={LINK_STYLES.screenNavLinkLabel}>{title}</Text>
      </View>
      <Icon name={iconRight} size={iconRightSize} color={iconRightColor} />
    </TouchableOpacity>
  </View>
);

// Exporting
export {LinkWithLeftRightIcons};
