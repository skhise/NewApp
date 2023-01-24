// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';

// Exporting
export default CHECKBOX_STYLES = StyleSheet.create({
  checkbox: {
    width: scale(25),
    height: scale(25),
    marginRight: scale(7.5),
    borderRadius: scale(3),
    borderWidth: scale(1),
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxUnchecked: {
    backgroundColor: COLORS.darkGrey,
    borderColor: COLORS.darkGrey,
  },
});
