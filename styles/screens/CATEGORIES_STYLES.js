// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
import {scale} from 'react-native-size-matters';

const {width} = DIMENSIONS;

// Exporting
export default CATEGORIES_STYLES = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryBox: {
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: COLORS.white,
    borderRightColor: COLORS.white,
  },
  categoryImage: {
    width: scale(50),
    height: scale(50),
    tintColor: COLORS.primary,
    resizeMode: 'contain',
    marginBottom: scale(10),
  },
  categoryTitle: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    textTransform: 'capitalize',
  },
  categoryTitleCopy: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.fontDark,
    marginTop:scale(10),
    textTransform: 'capitalize',
  },
});
