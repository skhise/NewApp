// Importing
import {StyleSheet} from 'react-native';
import COLORS from '../../config/COLORS';
import FONTS from '../../config/FONTS';
import DIMENSIONS from '../../config/DIMENSIONS';
import shadow from '../../components/SHADOW';
import {scale} from 'react-native-size-matters';
const {width} = DIMENSIONS;

// Exporting
export default LEGAL_POLICIES_STYLES = StyleSheet.create({
  navigationLinks: {
    backgroundColor: COLORS.grey,
    flex: 3,
  },
  navigationLinksContainer: {
    marginVertical: scale(15),
    backgroundColor: COLORS.white,
    width: width - scale(30),
    marginHorizontal: scale(15),
    ...shadow(scale(5), COLORS.shadowDark),
  },
});
