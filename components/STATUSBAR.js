// Importing
import React from 'react';
import {View, StatusBar} from 'react-native';
import STATUSBAR_STYLES from '../styles/components/STATUSBAR_STYLES';

// Custom statusbar
const CustomStatusBar = ({backgroundColor, ...props}) => (
  <View style={[STATUSBAR_STYLES.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

// Exporting
export default CustomStatusBar;
