// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import shadow from '../../components/SHADOW';

// Exporting
export default ADDRESSES_STYLES = StyleSheet.create({
  addressContainer: {
    backgroundColor: 'white',
    marginHorizontal: scale(15),
    padding: scale(10),
    borderRadius: scale(5),
    marginBottom: scale(15),
    height: scale(145),
    justifyContent: 'space-between',
    ...shadow(scale(5), COLORS.shadowDark),
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTypeTitle: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    marginHorizontal: scale(10),
    color: COLORS.fontDark,
  },
  statusContainer: {
    backgroundColor: COLORS.borderGrey,
    paddingHorizontal: scale(12.5),
    height: scale(25),
    borderRadius: scale(25),
  },
  statusContainerInfo: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: scale(12.5),
    height: scale(25),
    borderRadius: scale(25),
    color:COLORS.white
  },
  statusLabelInfo: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  statusContainerSuccess: {
    backgroundColor: COLORS.green,
    paddingHorizontal: scale(12.5),
    height: scale(25),
    borderRadius: scale(25),
  },
  statusLabel: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  name: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    alignSelf: 'flex-end',
  },
  contactDetails: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    alignSelf: 'flex-end',
  },
  address: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
  },
});
