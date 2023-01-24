// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
const {width} = DIMENSIONS;

// Exporting
export default PAYMENT_STYLES = StyleSheet.create({
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
    flex: 1.5,
    backgroundColor: COLORS.primaryLightest,
    paddingHorizontal: scale(15),
  },
  expiryCvvInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxInlineContainer: {
    alignItems: 'center',
    marginVertical: scale(10),
  },
  totalContainerInline: {
    flexDirection: 'row',
    marginBottom: scale(20),
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  totalLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  totalAmount: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  gatewayContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scale(15),
    padding: scale(15),
    borderRadius: scale(5),
    borderWidth: scale(1),
    alignItems: 'center',
  },
  gatewayContainerDefault: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
  },
  gatewayContainerSelected: {
    backgroundColor: COLORS.primaryLightest,
    borderColor: COLORS.primary,
  },
  radioGatewayImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gatewayImage: {
    width: scale(70),
    height: scale(35),
    marginLeft: scale(7.5),
  },
});
