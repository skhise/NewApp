// Importing
import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from '../../screens/Cart';
import Shipping from '../../screens/Shipping';
import Payment from '../../screens/Payment';
import PaymentSuccess from '../../screens/PaymentSuccess';
import PaymentFailed from '../../screens/PaymentFailed';
import COLORS from '../../config/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import {HeaderTitle} from '../../components/HEADER_TITLE';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import CART_ITEMS from '../../data/LocalCart';

// Constant
const Stack = createNativeStackNavigator();

// Function
function CheckoutStack() {
  // Returning
  return (
    <Stack.Navigator
      initialRouteName="Cart"
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
        name="Cart"
        component={Cart}
        options={({navigation})=>({
          headerTitle: () => <HeaderTitle title="Shopping Cart" />,
          headerTintColor: Platform.OS === 'android' ? COLORS.white : null,
          headerShown:false,
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
        name="Shipping"
        component={Shipping}
        options={{
          headerTitle: () => <HeaderTitle title="Shipping" />,
          

        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerTitle: () => <HeaderTitle title="Payment" />,
        }}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          headerTitle: () => <HeaderTitle title="Payment Success" />,
        }}
      />
      <Stack.Screen
        name="PaymentFailed"
        component={PaymentFailed}
        options={{
          headerTitle: () => <HeaderTitle title="Payment Failed" />,
        }}
      />
    </Stack.Navigator>
  );
}

// Exporting
export default CheckoutStack;
