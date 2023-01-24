// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';

// Exporting
export default FAQ_STYLES = StyleSheet.create({
  accordiancontainer: {
    marginHorizontal: scale(15),
    marginBottom: scale(15),
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: scale(10),
    marginTop: scale(15),
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
  question: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.MontserratSemiBold,
    letterSpacing: scale(0.5),
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  content: {
    backgroundColor: COLORS.white,
    padding: scale(10),
    flex: 1,
  },
  answer: {
    fontSize: scale(FONTS.sizes.small),
    fontFamily: FONTS.families.OpenSansRegular,
    color: COLORS.fontLight,
    textAlign: 'justify',
  },
});
