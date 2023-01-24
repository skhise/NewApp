// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import shadow from '../../components/SHADOW';
import {scale} from 'react-native-size-matters';

// Exporting
export default PAYMENT_STYLES = StyleSheet.create({
  contentCotainer: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    padding: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(15),
    marginBottom: scale(15),
    flexDirection: 'row',
    ...shadow(scale(5), COLORS.shadowDark),
  },
  itemPhotoContainer: {
    width: scale(80),
    height: scale(100),
    backgroundColor: COLORS.grey,
    borderRadius: scale(5),
    padding: scale(10),
  },
  itemInfo: {
    flex: 1,
    paddingLeft: scale(10),
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginBottom: scale(2.5),
  },
  itemPrice: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
  },
  itemQtylabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
  },
  infoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scale(100),
    height: scale(35),
    paddingHorizontal: scale(10),
    borderColor: COLORS.primary,
    borderWidth: scale(1),
    borderRadius: scale(5),
    borderStyle: 'dashed',
  },
  qtyUpdateIcon: {
    color: COLORS.primary,
  },
  qtyCount: {
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.medium),
    color: COLORS.fontDark,
  },
  buttonWithIcon: {
    width: scale(35),
    height: scale(35),
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
  },
  cartInfo: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(15),
    justifyContent: 'space-evenly',
    
  },
  codeApplyContainer: {
    width: '100%',
    height: scale(40),
    position: 'relative',
  },
  codeTextInput: {
    flex: 1,
    borderRadius: scale(5),
    paddingLeft: scale(10),
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    borderWidth: scale(1),
    borderColor: COLORS.grey,
  },
  cartTotalContainer: {
    width: '100%',
  },
  cartTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(7.5),
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.grey,
  },
  cartTotalRowTitle: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  cartHeader: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textAlignVertical:'center',
    textAlign:'center',
    textTransform: 'capitalize',
  },
  cartTotalRowValue: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
  },
  cartTotalRowValuePay: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.white,
    paddingLeft:scale(15),
    paddingRight:scale(15),
    paddingBottom:scale(5),
    paddingTop:scale(5),
    borderRadius:5,
    backgroundColor:COLORS.green
  },
});
