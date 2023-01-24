// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';

// Exporting
export default PRODUCT_CARD_STYLES = StyleSheet.create({
  itemContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: scale(12.5),
    paddingVertical: scale(2.5),
    borderRadius: scale(25),
    maxHeight: scale(25),
    backgroundColor: COLORS.primaryLightest,
  },
  badgeLabel: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.primary,
    textTransform: 'capitalize',
    letterSpacing: scale(0.5),
  },
  photoContainer: {
    width: '100%',
    height: scale(130),
    alignSelf: 'center',
    padding: scale(15),
  },
  itemTitle: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    textTransform: 'capitalize',
    letterSpacing: scale(0.5),
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    marginVertical: scale(5),
  },
  starIcon: {
    color: COLORS.yellow,
  },
  itemPrice: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.primary,
    letterSpacing: scale(0.5),
  },
  addButton: {
    width: scale(60),
    height: scale(30),
    backgroundColor: COLORS.primary,
    borderRadius: scale(30),
  },
  EnquiryButton: {
    width: scale(30),
    height: scale(30),
    backgroundColor: COLORS.orange,
    borderRadius: scale(30),
    borderColor: COLORS.orange,
  },
});
