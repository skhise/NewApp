// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Exporting
export default HOME_DRAWER_STYLES = StyleSheet.create({
  drawer: {
    width: scale(290),
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  drawerHeader: {
    height: scale(100),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    width: scale(50),
    height: scale(50),
    backgroundColor: COLORS.white,
    marginHorizontal: scale(10),
    borderRadius: scale(25),
    padding: scale(5),
  },
  barndName: {
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.white,
    fontSize: scale(FONTS.sizes.medium),
    letterSpacing: scale(0.5),
  },
  brandSlogan: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.MontserratMedium,
    letterSpacing: scale(0.5),
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  drawerFooter: {
    backgroundColor: COLORS.primaryLightest,
  },
  drawerItemLabel: {
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
  },
  labelDanger: {
    color: COLORS.red,
  },
  labelWarning: {
    color: COLORS.yellow,
  },
});
