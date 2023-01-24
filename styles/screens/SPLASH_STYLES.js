// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Exporting
export default SPLASH_STYLES = StyleSheet.create({
  imageBackground: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    opacity: 0.60,
    left: 0,
    top: 0,
  },
  contentCotainer: {
    flex: 1,
    padding: scale(15),
  },
  logoContainer: {
    width: scale(150),
    height: scale(150),
    marginBottom: scale(7.5),
    padding: scale(30),
  },
  logoContainerCopy: {
    width: scale(200),
    height: scale(200),
    marginBottom: scale(7.5),
  },
  brandName: {
    fontSize: scale(FONTS.sizes.xLarge),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  },
  slogan: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.MontserratMedium,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    textTransform: 'uppercase',
    marginBottom: scale(90),
    textAlign:'center',
    lineHeight: scale(22),
  },
});
