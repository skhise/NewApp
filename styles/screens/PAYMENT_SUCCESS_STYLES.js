// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Exporting
export default PAYMENT_STYLES = StyleSheet.create({
  contentCotainer: {
    flex: 1,
    padding: scale(15),
  },
  lottieViewContainer: {
    width: scale(150),
    height: scale(150),
    marginBottom: scale(7.5),
  },
  title: {
    fontSize: scale(FONTS.sizes.xLarge),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginBottom: scale(10),
  },
  info: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textAlign: 'center',
    marginBottom: scale(10),
  },
  orderNumber: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
  },
  buttonsContainer: {
    flex: 1.5,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    paddingHorizontal: scale(15),
  },
  highlightedText: {
    fontFamily: FONTS.families.OpenSansSemiBold,
  },
});
