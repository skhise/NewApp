// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../config/COLORS';
import FONTS from '../config/FONTS';
import DIMENSIONS from '../config/DIMENSIONS';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// Constants
const {width} = DIMENSIONS;

// Exporting
export default GLOBAL_STYLES = StyleSheet.create({
  zindex:{
    zIndex:1000
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.grey,
    flexDirection:'column'
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexOneContainer: {
    flex: 1,
  },
  flexTwoContainer: {
    flex: 2,
  },
  loaderContainer: {
    width: scale(75),
    height: scale(75),
    margin: scale(30),
  },
  stackedScreenHeader: {
    backgroundColor: COLORS.primary,
  },
  xCenter: {
    alignItems: 'center',
  },
  yCenter: {
    justifyContent: 'center',
  },
  xyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBackground: {
    backgroundColor:COLORS.green
  },
  transperentBackground: {
    
  },
  expiryBackground: {
    backgroundColor:COLORS.red
  },
  inProgressBackground: {
    backgroundColor:COLORS.orange
  },
  marginTop:{
    marginTop:15
  },
  marginTNone: {
    marginTop: 0,
  },
  marginBNone: {
    marginBottom: 0,
  },
  marginLNone: {
    marginLeft: 0,
  },
  marginRNone: {
    marginRight: 0,
  },
  marginYNone: {
    marginVertical: 0,
  },
  marginXNone: {
    marginHorizontal: 0,
  },
  marginXYNone: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  paddingNone: {
    padding: 0,
  },
  policyPadding:{
    margin:scale(10),
    justifyContent:'center'
    
  },
  authFormLogoFlexArea: {
    flex: 1.25,
  },
  authFormLogoContainer: {
    width: scale(85),
    height: scale(85),
  },
  responsiveImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  authFormFlexArea: {
    flex: 5,
  },
  authFormContainer: {
    flex: 1,
    padding: scale(15),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  formTitleContainer: {
    marginBottom: scale(30),
  },
  authFormTitle: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textTransform: 'uppercase',
  },
  authFormTitleLine: {
    width: scale(40),
    height: scale(3),
    backgroundColor: COLORS.primary,
    marginTop: scale(7.5),
  },
  inputGroup: {
    marginBottom: scale(10),
  },
  inputGroup1: {
    marginBottom: scale(50),
  },
  inputLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
    marginBottom: scale(5),
  },
  inputLabelAttendance: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
    margin: scale(5),
    flexDirection:'row'
  },
  headerText: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
  },
  headerTextMedium: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
  },
  headerTextMediumRed: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.red,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
  },
  infoText: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.red,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
    marginBottom: scale(15),
  },
  tabLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    marginBottom: scale(10),
  },
  tabIcon: {
    marginTop: scale(10),
  },
  textInput: {
    width: '100%',
    height: scale(40),
    paddingLeft: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.darkGrey,
    borderRadius: scale(5),
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textAlignVertical:"center"
    
  },
  autoComplete: {
    width: '100%',
    height: scale(40),
    borderWidth: scale(1),
    borderColor: COLORS.darkGrey,
    borderRadius: scale(5),
    backgroundColor:COLORS.white,
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    
  },
  dropdowInput: {
    width: '100%',
    height: scale(40),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(5),
    fontSize: scale(FONTS.sizes.small),
    color: COLORS.darkGrey,
    letterSpacing: scale(0.5),
    
  },
  textInputArea: {
    width: '100%',
    paddingLeft: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(5),
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    textAlignVertical: 'top',
    letterSpacing: scale(0.5),
    paddingTop:10
  },
  textInputCopy: {
    width: '100%',
    paddingLeft: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    height:scale(35),
    borderRadius: scale(5), 
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    textAlignVertical: 'top',
    letterSpacing: scale(0.5),
  },
  textInputCopySmall: {
    width: '30%',
    paddingLeft: scale(10),
    height:scale(30),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(5),
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    textAlignVertical: 'center',
    letterSpacing: scale(0.5),
  },
  textInputCopySmallFlex: {
    width: '90%',
    paddingLeft: scale(10),
    height:scale(30),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(5),
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    textAlignVertical: 'center',
    letterSpacing: scale(0.5),
  },
  textInputTotalAmount: {
    width: '40%',
    paddingLeft: scale(10),
    height:scale(40),
    borderWidth: scale(2),
    borderColor: COLORS.green,
    borderRadius: scale(5),
    fontFamily: FONTS.families.OpenSansRegular,
    textAlignVertical: 'center',
    letterSpacing: scale(0.5),
  },
  textInputCopySmallPP: {
    width: '40%',
    paddingLeft: scale(10),
    height:scale(30),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(5),
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    textAlignVertical: 'center',
    letterSpacing: scale(0.5),
  },
  inputEyeIcon: {
    position: 'absolute',
    right: scale(7.5),
    top: scale(7.5),
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  question: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
    letterSpacing: scale(0.5),
    marginRight: scale(5),
  },
  actionLink: {
    color: COLORS.primary,
    fontFamily: FONTS.families.OpenSansSemiBold,
  },
  lottieViewContainer: {
    width: scale(150),
    height: scale(150),
  },
  lottieTitle: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginBottom: scale(10),
  },
  lottieInfo: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textAlign: 'center',
  },
  modalCloseIconContainer: {
    width: scale(30),
    height: scale(30),
    backgroundColor: COLORS.primaryLightest,
    position: 'absolute',
    right: scale(7.5),
    top: scale(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(30),
  },
  borderDark: {
    borderColor: COLORS.darkGrey,
  },
  border: {
    borderColor: COLORS.darkGrey,
    borderWidth:1
  },
  scrollviewContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  positionRelative: {
    position: 'relative',
  },
  productsFilterIconContainer: {
    width: width - scale(30),
    marginTop: scale(15),
    marginLeft: scale(15),
  },
  productsFilterIcon: {
    width: scale(70),
    height: scale(35),
    backgroundColor: COLORS.white,
    borderRadius: scale(4),
    alignSelf: 'flex-end',
    borderWidth: scale(1),
    borderColor: COLORS.primary,
  },
  rbSheetWrapper: {
    backgroundColor: COLORS.backdropColor,
  },
  rbSheetDraggableIcon: {
    backgroundColor: COLORS.primary,
    marginVertical: scale(30),
  },
  rbSheetContentContainer: {
    marginHorizontal: scale(15),
    flex: 1,
  },
  rbSheetContentTitleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(35),
    marginHorizontal: scale(15),
  },
  rbSheetContentTitle: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.MontserratMedium,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  rbSheetSectionTitleContainer: {
    backgroundColor: COLORS.primaryLightest,
    paddingVertical: scale(15),
    paddingHorizontal: scale(15),
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: COLORS.borderGrey,
  },
  rbSheetSectionTitle: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  productsFilterSortOptionsContainer: {
    marginHorizontal: scale(15),
  },
  sortOptionRow: {
    paddingVertical: scale(15),
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.borderGrey,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortOptionLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    marginLeft: scale(10),
  },
  rangeSliderContainer: {
    margin: scale(15),
  },
  rangeSliderLabel: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    marginBottom: scale(15),
  },
  priceRangeValue: {
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
  },
  brandsFilterContainer: {
    marginHorizontal: scale(15),
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: scale(7.5),
  },
  brandOptionContainer: {
    padding: scale(10),
    borderWidth: scale(1),
    borderRadius: scale(50),
    marginVertical: scale(7.5),
  },
  brandOptionContainerDefault: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderGrey,
  },
  brandOptionContainerActive: {
    backgroundColor: COLORS.primaryLightest,
    borderColor: COLORS.primary,
  },
  brandOptionLabel: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
  },
  brandOptionLabelDefault: {
    color: COLORS.fontDark,
  },
  brandOptionLabelActive: {
    color: COLORS.primary,
  },
  applyFilterButton: {
    width: scale(150),
    height: scale(35),
  },
  iconButton: {
    width: '10%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(5),
    backgroundColor: COLORS.primary,
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    color:COLORS.white,
  },
  Button: {
    width: '40%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(5),
    backgroundColor: COLORS.primary,
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    color:COLORS.white,
  },
  ButtonApply: {
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(5),
    backgroundColor: COLORS.primary,
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    color:COLORS.white,
  },
  infoBox: {
    flex:1,
    height: scale(50),
    borderWidth: 1,
    borderColor: COLORS.primary,
    margin: scale(15),
    backgroundColor: COLORS.white,
    backgroundColor:COLORS.primaryDark,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    fontSize:FONTS.sizes.large
  },
});
