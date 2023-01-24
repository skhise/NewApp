// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import shadow from '../../components/SHADOW';

// Exporting
export default MY_ORDERS_STYLES = StyleSheet.create({
  sectionContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: scale(15),
    marginTop: scale(5),
    marginBottom: scale(15),
    borderRadius: scale(5),
    padding: scale(10),
    ...shadow(scale(5), COLORS.shadowDark),
  },
  sectionContainerMarginTop: {
    marginTop: scale(80),
  },
  sectionContainerMarginTicket: {
    marginTop: scale(20)
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
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
  },
  orderItemContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.grey,
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
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  },
  itemShortDetails: {
    fontSize: scale(FONTS.sizes.xSmall),
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
  sectionTitle: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
    marginBottom: scale(20),
  },
  starContainer: {
    marginTop: scale(5),
  },
  ratingLabel: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.MontserratMedium,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    alignSelf: 'center',
    marginTop: scale(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.grey,
  },
  rowStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.grey,
    marginTop:scale(10)
  },
  rowTitle: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    padding:scale(5),
    textTransform: 'capitalize',
    
  },
  rowTitleCopy: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
    flex:1,
  },
  rowTitleAccessory: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    textTransform: 'capitalize',
    textAlign:'left'

  },
  rowValue: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    justifyContent:'space-around',
    padding:5,
  },
  rowValueLabel: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  
  },
  rowValueLink: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.blue,
    textAlign:'right'
  
  },
  rowValueHeader: {
    fontSize: scale(FONTS.sizes.xxSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    padding:scale(5),
    color: COLORS.fontDark,
    textAlign:'left',
    flex:0.5,
  },
  rowValueCopy: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    padding:scale(5),
    color: COLORS.fontDark,
    textAlign:'left',
    flex:1,
  },
  rowValueTotalAmount: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    padding:scale(5),
    color: COLORS.black,
    textAlign:'left'
  },
  rowValueFlex: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textAlign:'right',
    flex:1
  },
  paymentModeCheckmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMode: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.green,
    marginRight: scale(5),
  },
  paymentModePending: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.red,
    marginRight: scale(5),
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customButtonStyleCancel: {
    width: '48%',
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
    color:COLORS.white
  },
  customButtonStyleInvoice: {
    width: '48%',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  customButtonStyleLong: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  customButtonStyleInvoiceFieldReport: {
    width: '100%',
    backgroundColor: COLORS.yellow,
    borderColor: COLORS.yellow,
  },
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
  textareaContainer: {
    height: scale(130),
    paddingLeft: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.darkGrey,
    borderRadius: scale(5),
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
  },
  question: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    marginTop: scale(10),
    marginBottom: scale(5),
  },
  customButton: {
    marginVertical: 0,
    marginTop: scale(10),
  },
});
