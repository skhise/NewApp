// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Exporting
export default HELP_SUPPORT_STYLES = StyleSheet.create({
  contentCotainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    padding: scale(15),
  },
  question: {
    fontFamily: FONTS.families.MontserratMedium,
    fontSize: scale(FONTS.sizes.large),
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  },
  answer: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.xSmall),
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    marginBottom: scale(15),
    textAlign: 'center',
  },
  contentCardContainer: {
    backgroundColor: COLORS.primaryLightest,
    borderRadius: scale(5),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    padding:scale(7),
    width: scale(320),
    marginVertical: scale(7.5),
  },
  contentCardTitle: {
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.large),
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    marginVertical: scale(5),
    fontWeight:"700"
  },
  contentCardInfo: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginBottom:scale(10),
    textAlign: 'center',
  },
  contentCardInfoAddress: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textAlign: 'center',
    fontWeight:'700',
    marginBottom:scale(10),
  },
});
