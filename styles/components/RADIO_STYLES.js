// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Exporting
export default RADIO_STYLES = StyleSheet.create({
  boxedRadioButton: {
    minHeight: scale(40),
    borderRadius: scale(5),
    backgroundColor: COLORS.white,
    borderWidth: scale(1),
    flexDirection: 'row',
  },
  boxedRadioButtonDefault: {
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
  },
  boxedRadioButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLightest,
  },
  boxedRadioButtonLabel: {
    marginHorizontal: scale(7.5),
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
  },
  boxedRadioButtonLabelDefault: {
    color: COLORS.fontDark,
  },
  boxedRadioButtonLabelSelected: {
    color: COLORS.primary,
  },
  radioCircle: {
    width: scale(20),
    height: scale(20),
    borderWidth: scale(1),
    borderRadius: scale(20),
  },
  radioCircleDefault: {
    borderColor: COLORS.fontDark,
  },
  radioCircleSelected: {
    borderColor: COLORS.primary,
  },
  radioCircleCenter: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(10),
  },
  radioCircleCenterDefault: {
    backgroundColor: COLORS.white,
  },
  radioCircleCenterSelected: {
    backgroundColor: COLORS.primary,
  },
});
