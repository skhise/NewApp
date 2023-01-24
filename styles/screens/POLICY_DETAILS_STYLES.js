// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
import shadow from '../../components/SHADOW';
import {scale} from 'react-native-size-matters';
const {width} = DIMENSIONS;

// Exporting
export default POLICY_DETAILS_STYLES = StyleSheet.create({
  body: {
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    margin: scale(15),
  },
  updatedDate: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.fontDark,
  },
  pointTitle: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    marginVertical: scale(15),
  },
  pointDetails: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
  },
  highlightedText: {
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.primary,
  },
});
