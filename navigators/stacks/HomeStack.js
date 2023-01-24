// Importing
import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from '../tabs/HomeTab';
import TicketTabTop from '../tabs/TicketTabTop';
import TicketTabCustomer from '../tabs/TicketTabCustomer';
import Categories from '../../screens/Categories';
import GridProducts from '../../screens/GridProducts';
import ListProducts from '../../screens/ListProducts';
import Product from '../../screens/Product';
import ProductReviews from '../../screens/ProductReviews';
import TicketList from '../../screens/TicketList';
import CustomerTicketList from '../../screens/CustomerTickets/CustomerTicketList';
import ContractDetails from '../../screens/CustomerTickets/CustomerContractDetails';
import CustomerTicketDetails from '../../screens/CustomerTickets/CustomerTicketDetails';
import CustomerContractDetails from '../../screens/CustomerTickets/CustomerContractDetails';
import NewInquiry from '../../screens/CustomerTickets/NewInquiry';
import ServiceInvoice from '../../screens/CustomerTickets/ServiceInvoiceList';
import NewRequest from '../../screens/CustomerTickets/NewRequest';
import ContractList from '../../screens/CustomerTickets/CustomerContractList';
import TicketDetails from '../../screens/TicketDetails';
import TicketDetailsOther from '../../screens/TicketDetailsOther';
import TicketDetailsNew from '../../screens/TicketDetailsNew';
import Notification from '../../screens/Notification';
import TopTab from '../../screens/TopTab';
// import SpinWheel from '../../screens/SpinWheel';
import COLORS from '../../config/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import {HeaderTitle} from '../../components/HEADER_TITLE';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import Service from '../../screens/Service';
import ContactUs from '../../screens/ContactUs';
import HelpSupport from '../../screens/HelpSupport';
import Order from '../../screens/Order'
import Invoice from '../../screens/Invoice';
import Cart from '../../screens/Cart';
import Shipping from '../../screens/Shipping';
import Attendance from '../../screens/Attendance/Attendance';
import MarkPunch from '../../screens/Attendance/MarkPunch';

// Constant
const Stack = createNativeStackNavigator();

// Function
function HomeStack() {
  // Returning
  return (
    <Stack.Navigator
      initialRouteName="HomeTab"
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
            :null // In android default back arrow will be used
            
      })}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerTitle: () => <HeaderTitle title="All Categories" />,
        }}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="My Attendance" />,
        })}
      />
     
      <Stack.Screen
        name="GridProducts"
        component={GridProducts}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title={route.params.title} />,
          headerRight: () => (
            <Icon
              name="list-outline"
              color={COLORS.white}
              size={scale(20)}
              onPress={() =>
                navigation.navigate('ListProducts', {title: route.params.title})
              }
            />
          ),
        })}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupport}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Help & Support" />,
        })}
      />

      <Stack.Screen
        name="ListProducts"
        component={ListProducts}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title={route.params.title} />,
          headerShown:false
        })}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerTitle: () => <HeaderTitle title="Order Details" />,
      headerShown:false}}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{headerTitle: () => <HeaderTitle title="Invoice" />}}
      />
      <Stack.Screen
        name="TicketList"
        component={TicketList}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title={route.params.title} />,
        })}
      />
      <Stack.Screen
        name="CustomerTicketList"
        component={CustomerTicketList}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title={route.params.title} />,
        })}
      />
      <Stack.Screen
        name="CustomerContractDetails"
        component={CustomerContractDetails}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Contract Details" />,
          headerRight: () => (
            <Icon
              name="home"
              color={COLORS.white}
              size={scale(20)}
              onPress={() =>
                navigation.navigate('Home', {title: route.params.title})
              }
            />
          ),
        })}
      />
      
       <Stack.Screen
        name="CustomerTicketDetails"
        component={CustomerTicketDetails}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Service Details" />,
          headerRight: () => (
            <Icon
              name="home"
              color={COLORS.white}
              size={scale(20)}
              onPress={() =>
                navigation.navigate('Home', {title: route.params.title})
              }
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewInquiry"
        component={NewInquiry}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="New Enquiry" />,
        })}
      />
      
      <Stack.Screen
        name="MarkPunch"
        component={MarkPunch}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Mark Punch" />,
        })}
      />
      
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Notification" />,
        })}
      />


      <Stack.Screen
        name="NewRequest"
        component={NewRequest}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="New Request" />,
        })}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={() => ({
          headerTitle: () => <HeaderTitle title="Contact Us" />,
        })}
      />
       <Stack.Screen
        name="TicketDetails"
        component={TicketDetails}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Ticket Details" />,
          headerRight: () => (
            <Icon
              name="home"
              color={COLORS.white}
              size={scale(20)}
              onPress={() =>
                navigation.navigate('Home', {title: route.params.title})
              }
            />
          ),
        })}
      />
       <Stack.Screen
        name="TicketTabTop"
        component={TicketTabTop}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Ticket Details" />,
          headerRight: () => (
            <Icon
              name="home"
              color={COLORS.white}
              size={scale(20)}
              onPress={() =>
                navigation.navigate('Home', {title: route.params.title})
              }
            />
          ),
        })}
      />
      {/* <Stack.Screen
        name="TicketTabCustomer"
        component={TicketTabCustomer}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Ticket Details" />,
          headerRight: () => (
            <Icon
              name="home"
              color={COLORS.white}
              size={scale(20)}
              onPress={() =>
                navigation.navigate('Home', {title: route.params.title})
              }
            />
          ),
        })}
      /> */}
      <Stack.Screen
        name="TicketDetailsOther"
        component={TicketDetailsOther}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Ticket Details" />,
        })}
      />
      <Stack.Screen
        name="TicketDetailsNew"
        component={TicketDetailsNew}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Ticket Details" />,
        })}
      />
      <Stack.Screen
        name="ServiceInvoice"
        component={ServiceInvoice}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Service Invoice" />,
        })}
      />
      <Stack.Screen
        name="ContractDetails"
        component={ContractDetails}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Contract Details" />,
        })}
      />
       <Stack.Screen
        name="ContractList"
        component={ContractList}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Amc Contract List" />,
        })}
      />
      
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerTitle: () => <HeaderTitle title="Product Details" />,headerShown:false}}
      />
      <Stack.Screen
        name="ProductReviews"
        component={ProductReviews}
        options={{
          headerTitle: () => <HeaderTitle title="Product Reviews" />,
        }}
      />
      {/* <Stack.Screen
        name="SpinWheel"
        component={SpinWheel}
        options={{
          headerTitle: () => <HeaderTitle title="Spin & Win" />,
        }}
      /> */}
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
     
    </Stack.Navigator>
  );
}

// Exporting
export default HomeStack;
