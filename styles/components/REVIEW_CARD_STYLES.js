// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';
import shadow from '../../components/SHADOW';

// Exporting
export default REVIEW_CARD_STYLES = StyleSheet.create({
  reviewContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: scale(15),
    marginBottom: scale(15),
    borderRadius: scale(5),
    padding: scale(10),
    ...shadow(scale(5), COLORS.shadowDark),
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overallRating: {
    fontSize: scale(FONTS.sizes.xLarge),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.primary,
    letterSpacing: scale(0.5),
    marginRight: scale(10),
  },
  ratingStarsContainer: {flexDirection: 'row'},
  starIcon: {
    color: COLORS.yellow,
  },
  reviewAge: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
    letterSpacing: scale(0.5),
  },
  reviewTitle: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    marginVertical: scale(7.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  review: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
    letterSpacing: scale(0.5),
    lineHeight: scale(16),
    marginBottom: scale(15),
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(3),
  },
  reviewerImage: {
    width: scale(40),
    height: scale(40),
    backgroundColor: COLORS.grey,
    borderRadius: scale(40),
    overflow: 'hidden',
    marginRight: scale(10),
  },
  reviewerName: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
  },
  reviewerDesignation: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.primary,
    letterSpacing: scale(0.5),
    textTransform: 'capitalize',
  },
});
