// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
import shadow from '../../components/SHADOW';
import {scale} from 'react-native-size-matters';
const {width} = DIMENSIONS;

// Exporting
export default MY_PROFILE_STYLES = StyleSheet.create({
  headerBackground: {
    flex: 1,
    
  },
  profilePhotoContainer: {
    width: scale(100),
    height: scale(100),
    backgroundColor: COLORS.grey,
    position: 'relative',
    borderRadius: scale(100),
    overflow: 'hidden',
  },
  cameraContainer: {
    width: scale(40),
    height: scale(40),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: scale(0),
    bottom: scale(0),
    borderRadius: scale(20),
  },
  profileNameLabel: {
    fontFamily: FONTS.families.MontserratMedium,
    fontSize: scale(FONTS.sizes.xLarge),
    letterSpacing: scale(0.5),
    color: COLORS.black,
    marginVertical: scale(7.5),
  },
  profileNameLabelCopy: {
    fontFamily: FONTS.families.MontserratMedium,
    fontSize: scale(FONTS.sizes.large),
    letterSpacing: scale(0.5),
    color: COLORS.black,
    marginVertical: scale(7.5),
  },
  profileEmailContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: scale(7.5),
    paddingHorizontal: scale(15),
    borderRadius: scale(50),
  },
  profileEmailLabel: {
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.xSmall),
    letterSpacing: scale(0.5),
    color: COLORS.white,
  },
  navigationLinks: {
    backgroundColor: COLORS.grey,
    flex: 3.25,
  },
  navigationLinksContainer: {
    marginVertical: scale(15),
    backgroundColor: COLORS.white,
    width: width - scale(30),
    marginHorizontal: scale(15),
    ...shadow(scale(5), COLORS.shadowDark),
  },
});
