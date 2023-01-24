// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import shadow from '../../components/SHADOW';

// Exporting
export default MY_ORDERS_STYLES = StyleSheet.create({
  orderContainer: {
    backgroundColor: COLORS.white,
    elevation:20,
    marginHorizontal: scale(15),
    marginBottom: scale(15),
    borderRadius: scale(5),
    padding: scale(10),
    ...shadow(scale(5), COLORS.shadowDark),
  },
  orderId: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.primary,
    letterSpacing: scale(0.5),
  },
  destinations: {
    flexDirection: 'row',
    marginVertical: scale(10),
    justifyContent: 'space-between',
  },
  date: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
    letterSpacing: scale(0.5),
  },
  destination: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
  },
  orderItemContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.primaryDark,
    marginTop:scale(5)
  },
  item: {
    flexDirection: 'row',
  },
  itemImageContainer: {
    width: scale(75),
    height: scale(75),
    backgroundColor: COLORS.grey,
    marginRight: scale(10),
    padding: scale(5),
    borderRadius: scale(5),
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  },
  itemShortDetails: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
  },
  itemPrice: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    alignSelf: 'flex-end',
  },
  statusContainer: {
    marginTop: scale(10),
  },
  statusCirclesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  statusCircleContainer: {
    alignItems: 'center',
  },
  statusCircle: {
    width: scale(31),
    height: scale(31),
    borderRadius: scale(31),
    borderWidth: scale(1),
    borderColor: COLORS.white,
  },
  statusCircleDefault: {
    backgroundColor: COLORS.grey,
  },
  statusCircleActive: {
    backgroundColor: COLORS.primary,
  },
  statusCircleReject: {
    backgroundColor: COLORS.red,
  },
  statusCircleMiddle: {
    width: scale(12),
    height: scale(12),
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
  },
  statusTitle: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    marginTop: scale(5),
  },
  statusTitleDefault: {
    color: COLORS.fontLight,
  },
  statusTitleActive: {
    color: COLORS.fontDark,
    fontFamily: FONTS.families.OpenSansSemiBold,
  },
  horizontalbarDefault: {
    position: 'absolute',
    height: scale(1),
    backgroundColor: COLORS.grey,
    zIndex: -1,
    width: '85%',
    top: scale(15),
    alignSelf: 'center',
  },
});
