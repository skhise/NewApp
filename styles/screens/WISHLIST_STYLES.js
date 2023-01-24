// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import shadow from '../../components/SHADOW';
import {scale} from 'react-native-size-matters';

// Exporting
export default WISHLIST_STYLES = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.white,
    padding: scale(10),
    height: scale(120),
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
    fontSize: scale(FONTS.sizes.small),
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
  infoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addedDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(125),
    height: scale(35),
    borderColor: COLORS.primary,
    borderWidth: scale(1),
    borderRadius: scale(5),
    borderStyle: 'dashed',
  },
  addedDate: {
    fontSize: scale(FONTS.sizes.xSmall),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.primary,
  },
  buttonWithIcon: {
    width: scale(35),
    height: scale(35),
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
  },
});
