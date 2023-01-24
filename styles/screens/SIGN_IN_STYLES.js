// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Exporting
export default SIGN_IN_STYLES = StyleSheet.create({
  passwordResetModal: {
    position: 'relative',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(15),
  },
  passwordResetModalTitle: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textTransform: 'uppercase',
  },
  passwordResetModalInfo: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    marginBottom: scale(15),
  },
  questionContainerMargin: {
    marginBottom: scale(7.5),
  },
  modalMargin: {
    margin: scale(10),
  },
  buttonMargin: {
    marginVertical: 0,
    marginTop: scale(5),
  },
});
