// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
const {width} = DIMENSIONS;

// Exporting
export default SHIPPING_STYLES = StyleSheet.create({
  header: {
    flex: 0.75,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.grey,
    paddingHorizontal: scale(15),
  },
  body: {
    flex: 4,
    backgroundColor: COLORS.white,
  },
  scrollViewContentContainer: {
    width: width,
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  footer: {
    flex: 0.75,
    backgroundColor: COLORS.primaryLightest,
    paddingHorizontal: scale(15),
  },
  dualInputContainer: {
    justifyContent: 'space-between',
  },
  checkboxInlineContainer: {
    alignItems: 'center',
    marginVertical: scale(10),
  },
  checkboxLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scale(15),
    padding: scale(15),
    borderRadius: scale(5),
    borderWidth: scale(1),
    alignItems: 'center',
  },
  addressContainerDefault: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
  },
  addressContainerSelected: {
    backgroundColor: COLORS.primaryLightest,
    borderColor: COLORS.primary,
  },
  city: {
    fontFamily: FONTS.families.MontserratMedium,
    fontSize: scale(FONTS.sizes.medium),
    letterSpacing: scale(0.5),
    marginLeft: scale(7.5),
  },
  cityDefault: {
    color: COLORS.fontDark,
  },
  citySelected: {
    color: COLORS.primary,
  },
  address: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    marginLeft: scale(7.5),
  },
  addressDefault: {
    color: COLORS.fontLight,
  },
  addressSelected: {
    color: COLORS.primary,
  },
});
