// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Exporting
export default HEADER_TITLE_STYLES = StyleSheet.create({
  headerTitle: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.white,
    textTransform: 'capitalize',
    letterSpacing: scale(0.5),
  },
});
