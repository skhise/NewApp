// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import shadow from '../../components/SHADOW';
import {scale} from 'react-native-size-matters';

// Exporting
export default NOTIFICATIONS_STYLES = StyleSheet.create({
  contentCotainer: {
    flex: 1,
  },
  notificationContainer: {
    marginHorizontal: scale(15),
    padding: scale(10),
    flexDirection: 'row',
    borderRadius: scale(5),
    marginBottom: scale(15),
    ...shadow(scale(5), COLORS.shadowDark),
  },
  iconContainer: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(35),
  },
  notification: {
    flex: 1,
    paddingLeft: scale(10),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scale(FONTS.sizes.medium),
    fontFamily: FONTS.families.OpenSansSemiBold,
    letterSpacing: scale(0.5),
    marginBottom: scale(3),
    color: COLORS.fontDark,
  },
  message: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
    letterSpacing: scale(0.5),
    marginBottom: scale(10),
    lineHeight: scale(16),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: scale(10),
  },
  time: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.primary,
    letterSpacing: scale(0.5),
  },
});
