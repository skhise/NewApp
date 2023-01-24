// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';

// Exporting
export default SPIN_WHEEL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grey,
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: scale(61),
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
  },
  startButtonText: {
    fontSize: scale(35),
    color: COLORS.white,
    fontFamily: FONTS.families.OpenSansSemiBold,
  },
  modalContentContainer: {
    position: 'relative',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(15),
  },
  congratsLabel: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.fontDark,
    marginTop: scale(10),
  },
  congratsMessage: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
    marginTop: scale(5),
  },
  winningValue: {
    fontSize: scale(40),
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.primary,
    marginHorizontal: scale(7.5),
    bottom: scale(2),
  },
  modalMargin: {margin: scale(10)},
});
