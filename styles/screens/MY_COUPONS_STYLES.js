// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';
import shadow from '../../components/SHADOW';

// Exporting
export default MY_COUPONS_STYLES = StyleSheet.create({
  contentCotainer: {
    flex: 1,
  },
  couponContainer: {
    position: 'relative',
    marginHorizontal: scale(15),
    height: scale(128),
    marginBottom: scale(15),
    ...shadow(scale(5), COLORS.shadowDark),
  },
  couponDetails: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandImageConainer: {
    width: scale(50),
    height: scale(50),
    left: scale(35),
  },
  couponInfoContainer: {
    flex: 0.75,
    left: scale(45),
    paddingHorizontal: scale(15),
    height: scale(100),
    justifyContent: 'space-evenly',
  },
  brandName: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'uppercase',
  },
  offerLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  codeDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  code: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
  },
  date: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.pink,
  },
});
