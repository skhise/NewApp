// Importing
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import COLORS from '../../config/COLORS';
import DIMENSIONS from '../../config/DIMENSIONS';
import FONTS from '../../config/FONTS';

// Constants
const {width} = DIMENSIONS;

// Exporting
export default INVOICE_STYLES = StyleSheet.create({
  invoiceContainer: {
    backgroundColor: COLORS.white,
    width: width - scale(30),
    padding: scale(15),
    borderWidth: scale(1),
    borderColor: COLORS.borderGrey,
    borderRadius: scale(5),
    alignSelf: 'center',
    marginVertical: scale(15),
  },
  logoContainer: {
    alignSelf: 'center',
    width: scale(60),
    height: scale(60),
  },
  dateTime: {
    alignSelf: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.xSmall),
    letterSpacing: scale(0.5),
    marginVertical: scale(15),
  },
  orderIdContainer: {
    position: 'relative',
    borderWidth: scale(1),
    borderRadius: scale(5),
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    padding: scale(10),
    marginBottom: scale(15),
  },
  orderId: {
    alignSelf: 'center',
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
  },
  invoiceDetailsRow: {
    flexDirection: 'row',
    marginVertical: scale(3),
  },
  rowTitle: {
    color: COLORS.fontDark,
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    flex: 1,
  },
  rowTitleValue: {
    color: COLORS.fontDark,
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
    flex: 2,
    textAlign: 'right',
  },
  divider: {
    height: scale(1),
    backgroundColor: COLORS.borderGrey,
    marginVertical: scale(15),
  },
  itemsTable: {},
  itemsTableHeading: {
    flexDirection: 'row',
    backgroundColor: COLORS.grey,
    padding: scale(7.5),
  },
  itemsTableHeadingColumnTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.families.OpenSansSemiBold,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
  },
  itemsTableDataRow: {
    flexDirection: 'row',
    padding: scale(7.5),
  },
  itemsTableDataRowColumnTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.families.OpenSansRegular,
    fontSize: scale(FONTS.sizes.small),
    letterSpacing: scale(0.5),
  },
});
