// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
import {scale} from 'react-native-size-matters';
import shadow from '../../components/SHADOW';

const {width} = DIMENSIONS;

// Exporting
export default MAP_STYLES = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contactInfoContainer: {
    position: 'relative',
    bottom: scale(15),
    width: width - scale(30),
    height: scale(200),
    backgroundColor: COLORS.white,
    padding: scale(15),
    borderRadius: scale(5),
    justifyContent: 'space-around',
    ...shadow(scale(10), COLORS.shadowDark),
  },
  sendMailIconContainer: {
    position: 'absolute',
    width: scale(50),
    height: scale(50),
    backgroundColor: COLORS.primary,
    right: scale(12.5),
    top: scale(-25),
    borderRadius: scale(50),
    ...shadow(scale(10), COLORS.shadowDarkest),
  },
  contactInfo: {
    flexDirection: 'row',
  },
  contactInfoTitleDetailsContainer: {
    marginHorizontal: scale(10),
    flex: 1,
  },
  contactInfoTitle: {
    fontFamily: FONTS.families.MontserratMedium,
    fontSize: scale(FONTS.sizes.small),
    color: COLORS.primary,
  },
  contactInfoDetails: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.xSmall),
    color: COLORS.fontDark,
  },

  sendingMailModal: {
    position: 'relative',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(15),
  },
  sendingMailModalTitle: {
    fontSize: scale(FONTS.sizes.large),
    fontFamily: FONTS.families.MontserratSemiBold,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
    textTransform: 'uppercase',
  },
  sendingMailModalInfo: {
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    color: COLORS.fontLight,
    marginBottom: scale(15),
  },
  textareaContainer: {
    height: scale(130),
    paddingLeft: scale(10),
    borderWidth: scale(1),
    borderRadius: scale(5),
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontDark,
    letterSpacing: scale(0.5),
  },
  customButtonStyle: {
    marginVertical: 0,
    marginTop: scale(10),
  },
});
