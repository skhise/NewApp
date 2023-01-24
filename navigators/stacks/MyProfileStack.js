// Importing
import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProfile from '../../screens/MyProfile';
import PersonalDetails from '../../screens/PersonalDetails';
import MyOrders from '../../screens/MyOrders';
import Order from '../../screens/Order';
import Invoice from '../../screens/Invoice';
import Wishlist from '../../screens/Wishlist';
import Addresses from '../../screens/Addresses';
import Notifications from '../../screens/Notifications';
import MyCoupons from '../../screens/MyCoupons';
import Product from '../../screens/Product';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderTitle} from '../../components/HEADER_TITLE';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';

// Constant
const Stack = createNativeStackNavigator();

// Function
function MyProfileStack() {
  // Returning
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={({navigation}) => ({
        headerTintColor: Platform.OS === 'android' ? COLORS.white : null, // Overriding tint color for default back arrow icon in android only. For iOS, a custom back arrow icon will be used.
        headerTitleAlign: Platform.OS === 'android' ? 'center' : null, // Aligning title center for android only. For iOS, the title is always set to the center by default.
        headerStyle: GLOBAL_STYLES.stackedScreenHeader,
        headerLeft:
          Platform.OS === 'ios'
            ? () => (
                <Icon
                  name="arrow-back-sharp"
                  color={COLORS.white}
                  size={scale(20)}
                  onPress={() => navigation.goBack()}
                />
              )
            : null, // In android default back arrow will be used
      })}>
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={({navigation})=>({
          headerTitle: () => <HeaderTitle title="My Profile" />,
          headerTintColor: Platform.OS === 'android' ? COLORS.white : null,
          headerLeft:
          Platform.OS === 'ios'
            ? () => (
                <Icon
                  name="arrow-back-sharp"
                  color={COLORS.white}
                  size={scale(20)}
                  onPress={() => navigation.goBack()}
                />
              )
            :()=> (<Icon
              name="arrow-back-sharp"
              color={COLORS.white}
              size={scale(20)}
              onPress={() => navigation.goBack()}
            />),
        })}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={({navigation})=>({
          headerTitle: () => <HeaderTitle title="Personal Details" />,
          headerTintColor: Platform.OS === 'android' ? COLORS.white : null,
        })}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{headerTitle: () => <HeaderTitle title="My Orders" />}}
      />
      {/* <Stack.Screen
        name="Order"
        component={Order}
        options={{headerTitle: () => <HeaderTitle title="Order Details" />}}
      /> */}
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{headerTitle: () => <HeaderTitle title="Invoice" />}}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{headerTitle: () => <HeaderTitle title="My Wishlist" />}}
      />
      <Stack.Screen
        name="MyCoupons"
        component={MyCoupons}
        options={{headerTitle: () => <HeaderTitle title="My Coupons" />}}
      />
      <Stack.Screen
        name="Addresses"
        component={Addresses}
        options={{headerTitle: () => <HeaderTitle title="Address Book" />}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerTitle: () => <HeaderTitle title="Notifications" />}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerTitle: () => <HeaderTitle title="Product Details" />}}
      />
    </Stack.Navigator>
  );
}

// Exporting
export default MyProfileStack;
