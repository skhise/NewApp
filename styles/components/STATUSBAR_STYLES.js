// Importing
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// Creating styles
export default STATUSBAR_STYLES = StyleSheet.create({
  statusBar: {
    height: getStatusBarHeight(),
  },
});
