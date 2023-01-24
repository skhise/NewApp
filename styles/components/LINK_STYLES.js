// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import {scale} from 'react-native-size-matters';

// Creating styles
export default LINK_STYLES = StyleSheet.create({
  screenNavLink: {
    height: scale(55),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.grey,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenNavLinkLabel: {
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    marginVertical: scale(10),
    color: COLORS.fontDark,
    marginLeft: scale(15),
  },
});
