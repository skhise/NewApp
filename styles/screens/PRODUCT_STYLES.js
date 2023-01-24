// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const thumbnailBoxSize = 60;
const thumbnailXSpacing = 5;

// Getting window width & height from dimensions
const {width} = DIMENSIONS;
// Exporting
export default PRODUCT_STYLES = StyleSheet.create({
  flatlistContainer: {
    position: 'relative',
    flex: 1,
    marginTop:scale(60)
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  officeDiscount:{
      color:Colors.white,
      fontWeight:"700"
  },
  headerIconContainer: {
    width: scale(40),
    height: scale(40),
    backgroundColor: COLORS.primary,
    borderRadius: scale(40),
    marginRight: scale(10),
    marginTop: scale(10),
  },
  offerIconContainer: {
    width: scale(40),
    height: scale(40),
    backgroundColor: COLORS.red,
    borderRadius: scale(40),
    marginRight: scale(10),
    marginTop: scale(10),
    zIndex:1,
    shadowOpacity:1,
    shadowColor:COLORS.grey
  },
  headerIconContainerCopy: {
    backgroundColor: COLORS.red,
    borderRadius: scale(40),
    marginLeft: scale(14),
    justifyContent:'center',
    alignItems:'center',
    top:-10,
    marginTop:0,
    width:scale(20),
    height:scale(20),
    zIndex:20,
    position:'absolute'
    
  },
  largeImageContainer: {
    width: width,
    height: '100%',
    padding: scale(20),
  },
  thumbnailFlatlist: {position: 'absolute', bottom: thumbnailBoxSize / 4},
  thumbnailImageContainer: {
    width: scale(60),
    height: scale(60),
    padding: scale(5),
    marginHorizontal: thumbnailXSpacing,
    borderWidth: scale(1),
    borderStyle: 'solid',
    borderRadius: scale(5),
    backgroundColor: COLORS.white,
  },
  detailsContainer: {
    flex: 1.3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
  },
  fewDetailsContainer: {
    flex: 1,
    padding: scale(15),
    justifyContent: 'space-between',
  },
  productTitleOfferPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  productOffer: {
    backgroundColor:'#FFF0CE',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight:10
    
  },
  productTitleOffer: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    paddingTop:10,
    marginLeft:10,
    textTransform: 'capitalize',
    
  },
  productTitleOfferPriceMargin: {
    marginBottom: scale(30),
  },
  productTitleContainer: {
    flex: 2,
  },
  productTitle: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  offerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  offer: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.MontserratMedium,
    letterSpacing: scale(0.5),

    color: COLORS.pink,
    alignSelf: 'flex-end',
    textTransform: 'capitalize',
  },
  price: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    alignSelf: 'flex-end',
  },
  sectionContainer: {},
  sectionTitle: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    textTransform: 'capitalize',
  },
  optionsContainer: {
    marginTop: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  optionSizeDefault: {
    borderRadius: scale(40),
    borderWidth: scale(1),
    borderColor: COLORS.grey,
    width: scale(35),
    height: scale(35),
  },
  optionSizeSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.grey,
  },
  optionSizeLabelDefault: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  },
  optionSizeLabelSelected: {
    color: COLORS.primary,
  },
  optionColor: {
    width: scale(35),
    height: scale(35),
    backgroundColor: COLORS.grey,
    borderRadius: scale(40),
  },
  addToCartButtonMargin: {
    marginRight: scale(15),
  },
  buttonWithIcon: {
    width: scale(40),
    height: scale(40),
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: scale(15),
    backgroundColor: COLORS.white,
  },
  overallRatingContainer: {
    marginBottom: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey,
    padding: scale(15),
    borderRadius: scale(5),
  },
  overallRatingValue: {
    fontSize: scale(FONTS.sizes.xLarge),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
  },
  ratingThresholdValue: {
    color: COLORS.darkGrey,
  },
  overallRatingStarsContainerMargin: {
    marginVertical: scale(7.5),
  },
  eachStarRatingContainer: {
    marginBottom: scale(30),
  },
  ratingCount: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  seeAllReviewsMargin: {
    marginTop: scale(7.5),
  },
  seeAllReviews: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingValueCount: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0, 0.5),
    color: COLORS.fontLight,
  },
  ratingBarBackground: {
    width: '75%',
    height: scale(10),
    backgroundColor: COLORS.grey,
    borderRadius: scale(20),
    position: 'relative',
  },
  ratingBarForground: {
    position: 'absolute',
    height: '100%',
    left: 0,
    top: 0,
    borderRadius: scale(20),
  },
  fiveStarRatingBar: {
    width: '75%',
    backgroundColor: COLORS.green,
  },
  fourStarRatingBar: {
    width: '55%',
    backgroundColor: COLORS.purple,
  },
  threeStarRatingBar: {
    width: '35%',
    backgroundColor: COLORS.yellow,
  },
  twoStarRatingBar: {
    width: '45%',
    backgroundColor: COLORS.darkGrey,
  },
  oneStarRatingBar: {
    width: '10%',
    backgroundColor: COLORS.red,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginVertical: scale(15),
    paddingHorizontal: scale(15),
    paddingTop: scale(15),
    paddingBottom: scale(7.5),
    borderRadius: scale(5),
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(7.5),
  },
  listTitle: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginLeft: scale(15),
    textTransform: 'capitalize',
  },
});
