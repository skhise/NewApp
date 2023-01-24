// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';

// Creating styles
export default ALERT_STYLES = StyleSheet.create({
  alertContenContainer: {
    position: 'relative',
    backgroundColor: COLORS.white,
    borderRadius: scale(20),
    margin: scale(0),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(220),
  },
  lottieViewTrash: {
    width: scale(100),
    height: scale(100),
  },
  alertTitleContainer: {
    alignItems: 'center',
  },
  alertTitle: {
    fontFamily: FONTS.families.MontserratSemiBold,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginBottom: scale(5),
  },
  alertSubTitle: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.xSmall),
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginVertical: scale(15),
  },
  alertModalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: '40%',
    height: scale(35),
    marginHorizontal: scale(5),
    marginVertical: scale(0),
  },
  cancelButton: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  dynamicLottieView: {
    width: scale(100),
    height: scale(100),
  },
  dynamicLottieViewTitle: {
    fontFamily: FONTS.families.MontserratSemiBold,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginTop: scale(10),
  },
});
