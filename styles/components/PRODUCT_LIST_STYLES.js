// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import shadow from '../../components/SHADOW';

// Exporting
export default PRODUCT_LIST_STYLES = StyleSheet.create({
  itemContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    marginBottom: scale(15),
    marginHorizontal: scale(15),
    flexDirection: 'row',
    ...shadow(scale(5), COLORS.shadowDark),
  },
  photoContainer: {
    width: scale(80),
    height: scale(100),
    padding: scale(5),
    backgroundColor: COLORS.grey,
    borderRadius: scale(5),
    position: 'relative',
  },
  itemDetailsContainer: {
    flex: 1,
    paddingLeft: scale(10),
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: scale(FONTS.sizes.mSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    color: COLORS.fontDark,
    textTransform: 'capitalize',
    letterSpacing: scale(0.5),
  },
  ratingStarsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    color: COLORS.yellow,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
