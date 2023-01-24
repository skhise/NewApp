// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';

// Constants
const THUMB_RADIUS = 12;

// Exporting
export default RANGE_SLIDER_STYLES = StyleSheet.create({
  rangeSliderThumb: {
    width: scale(THUMB_RADIUS * 2),
    height: scale(THUMB_RADIUS * 2),
    borderRadius: scale(THUMB_RADIUS),
    borderWidth: scale(2),
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  rangeSliderRail: {
    flex: 1,
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: COLORS.grey,
  },
  rangeSliderRailSelected: {
    height: scale(4),
    backgroundColor: COLORS.primary,
    borderRadius: scale(2),
  },
  rangeSliderNotch: {
    width: scale(8),
    height: scale(8),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primary,
    borderLeftWidth: scale(4),
    borderRightWidth: scale(4),
    borderTopWidth: scale(8),
  },
  rangeSliderLabelContainer: {
    alignItems: 'center',
    padding: scale(8),
    backgroundColor: COLORS.primary,
    borderRadius: scale(4),
  },
  rangeSliderLabelValue: {
    fontSize: scale(FONTS.sizes.medium),
    color: COLORS.white,
    fontFamily: FONTS.families.OpenSansSemiBold,
  },
});
