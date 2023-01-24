// Importing
import * as React from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import HomeStack from '../stacks/HomeStack';
import ProductStack from '../stacks/ProductStack';
import MyProfileStack from '../stacks/MyProfileStack';
import CheckoutStack from '../stacks/CheckoutStack';
import LegalStack from '../stacks/LegalStack';
import HelpSupportStack from '../stacks/HelpSupportStack';
import HOME_DRAWER_STYLES from '../../styles/drawers/HOME_DRAWER_STYLES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import MyOrders from '../../screens/MyOrders';
import AttendanceStack from '../stacks/AttendanceStack';
import LeaveStack from '../stacks/LeaveStack';
import VisitStack from '../stacks/VisitStack';

// Constant
const Drawer = createDrawerNavigator();

// Custom drawer content
const CustomDrawerContent = (props) => {
  
  //console.log(islogin);
  return (<View style={HOME_DRAWER_STYLES.drawerContainer}>
    {/* Header */}
    <View style={HOME_DRAWER_STYLES.drawerHeader}>
      <View style={HOME_DRAWER_STYLES.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={GLOBAL_STYLES.responsiveImage}
        />
      </View>
      <View> 
        <Text style={HOME_DRAWER_STYLES.barndName}>{props.user.name ? props.user.name : "IWS"}</Text>
        <Text style={HOME_DRAWER_STYLES.brandSlogan}>
        {props.user.email ? props.user.email : null}
        </Text>
      </View>
    </View>
    {/* Drawer items */}
    <DrawerContentScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
    <View style={HOME_DRAWER_STYLES.drawerFooter}>
      {
        props.islogin ? 
        <DrawerItem
        label="Logout"
        icon={() => (
          <Icon name="log-out-outline" size={scale(20)} color={COLORS.red} />
        )}
        labelStyle={[
          HOME_DRAWER_STYLES.drawerItemLabel,
          HOME_DRAWER_STYLES.labelDanger,
        ]}
        onPress={() => {
          clearToken(props);
          
        } }
      /> : null
      }
      
      <DrawerItem
        label="Close Menu"
        icon={() => (
          <Icon
            name="close-circle-outline"
            size={scale(20)}
            color={COLORS.yellow}
          />
        )}
        labelStyle={[
          HOME_DRAWER_STYLES.drawerItemLabel,
          HOME_DRAWER_STYLES.labelWarning,
        ]}
        onPress={() => props.navigation.closeDrawer()}
      />
    </View>
  </View>);
}

const clearToken = async(props) =>{
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      AsyncStorage.clear();
     // props.navigation.navigate("Home");
      RNRestart.Restart();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
// Main function
function HomeDrawer(){
  
  const [user,setUser] = React.useState(0);
  const [islogin,setIsLogin] = React.useState(false);
  const [isAlive,setIsAlive] = React.useState(true);
  const getUser = async()=>{
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null) {
        let loginUser = JSON.parse(data);  
        console.log("loginUser:"+loginUser.id); 
       if(loginUser.id == 0) {
          setIsLogin(false);
          setUser([]);
        } else {
          setIsLogin(true);
          setUser(loginUser);
        }
        
      } else {
        setIsLogin(false);
        setUser([]);
      }
    }catch(error){
      setIsLogin(false);
      setUser([]);
    }
  } 
  React.useEffect(() => {
    
    getUser();
    return()=>setIsAlive(false);
  },[isAlive]);

  return (
  islogin ?
  <Drawer.Navigator
    initialRouteName="HomeStack"
    screenOptions={() => ({
      headerShown: false,
      drawerActiveTintColor: COLORS.primary,
      drawerActiveBackgroundColor: COLORS.primaryLightest,
      drawerInactiveTintColor: COLORS.fontDark,
      drawerLabelStyle: HOME_DRAWER_STYLES.drawerItemLabel,
      drawerStyle: HOME_DRAWER_STYLES.drawer,
      drawerType: 'slide',
    })}
    drawerContent={props => <CustomDrawerContent {...props} islogin={islogin} user={user} />}>
    <Drawer.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        drawerLabel: 'Home',
        drawerIcon: () => (
          <Icon name="home-outline" color={COLORS.primary} size={scale(20)} />
        ),
      }}
    />
    <Drawer.Screen
      name="AttendanceStack"
      component={AttendanceStack}
      initialParams={user}
      options={{
        drawerLabel: 'My Attendance',
        drawerIcon: () => (
          <Icon name="time-outline" color={COLORS.primary} size={scale(20)} />
        ),
      }}
    />
    <Drawer.Screen
      name="LeaveStack"
      initialParams={user}
      component={LeaveStack}
      options={{
        drawerLabel: 'My Leave',
        drawerIcon: () => (
          <Icon name="calendar-outline" color={COLORS.primary} size={scale(20)} />
        ),
      }}
    />
    <Drawer.Screen
      name="VisitStack"
      component={VisitStack}
      options={{
        drawerLabel: 'My Visits',
        drawerIcon: () => (
          <Icon name="md-shirt-sharp" color={COLORS.primary} size={scale(20)} />
        ),
      }}
    />
    {
      user.role == 2 ?
      <Drawer.Screen
      name="ProductStack"
      component={ProductStack}
      options={{
        drawerLabel: 'All Categories',
        drawerIcon: () => (
          <Icon name="list-outline" color={COLORS.primary} size={scale(20)} />
        ),
      }}
    />
    : null
    }
    
    {
      user.role == 2 ?
      <Drawer.Screen
      name="CheckoutStack"
      component={CheckoutStack}
      options={{
        drawerLabel: 'Shopping Cart',
        drawerIcon: () => (
          <Icon name="cart-outline" color={COLORS.primary} size={scale(20)} />
        ),
      }}
    /> :  null
    }
    

   {
      user.role == 2 ?

   <Drawer.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          drawerLabel: 'My Orders',
          drawerIcon: () => (
            <Icon name="basket" color={COLORS.primary} size={scale(20)} />
          ),
        }}
      />
      :
      null}
   
    
    <Drawer.Screen
      name="HelpSupportStack"
      component={HelpSupportStack}
      options={{
        drawerLabel: 'Help & Support',
        drawerIcon: () => (
          <Icon
            name="help-buoy-outline"
            color={COLORS.primary}
            size={scale(20)}
          />
        ),
      }}
    />
    {/* <Drawer.Screen
      name="LegalStack"
      component={LegalStack}
      options={{
        drawerLabel: 'Legal Policies',
        drawerIcon: () => (
          <Icon
            name="documents-outline"
            color={COLORS.primary}
            size={scale(20)}
          />
        ),
      }}
    /> */}
        <Drawer.Screen
    name="MyProfileStack"
    component={MyProfileStack}
    options={{
      drawerLabel: 'My Profile',
      drawerIcon: () => (
        <Icon name="person-outline" color={COLORS.primary} size={scale(20)} />
      ),
      headerTitle:()=><HeaderTitle title="My Orders" />
    }}
    
  />
      
  </Drawer.Navigator> :

  <Drawer.Navigator
  initialRouteName="HomeStack"
  screenOptions={() => ({
    headerShown: false,
    drawerActiveTintColor: COLORS.primary,
    drawerActiveBackgroundColor: COLORS.primaryLightest,
    drawerInactiveTintColor: COLORS.fontDark,
    drawerLabelStyle: HOME_DRAWER_STYLES.drawerItemLabel,
    drawerStyle: HOME_DRAWER_STYLES.drawer,
    drawerType: 'slide',
  })}
  drawerContent={props => <CustomDrawerContent {...props} islogin={islogin} user={user} />}>
  <Drawer.Screen
    name="HomeStack"
    component={HomeStack}
    options={{
      drawerLabel: 'Home',
      drawerIcon: () => (
        <Icon name="home-outline" color={COLORS.primary} size={scale(20)} />
      ),
    }}
  />
  <Drawer.Screen
    name="ProductStack"
    component={ProductStack}
    options={{
      drawerLabel: 'All Categories',
      drawerIcon: () => (
        <Icon name="list-outline" color={COLORS.primary} size={scale(20)} />
      ),
    }}
  />

   { <Drawer.Screen
    name="CheckoutStack"
    component={CheckoutStack}
    options={{
      drawerLabel: 'Shopping Cart',
      drawerIcon: () => (
        <Icon name="cart-outline" color={COLORS.primary} size={scale(20)} />
      ),
    }}
  /> }
  
  <Drawer.Screen
    name="HelpSupportStack"
    component={HelpSupportStack}
    options={{
      drawerLabel: 'Help & Support',
      drawerIcon: () => (
        <Icon
          name="help-buoy-outline"
          color={COLORS.primary}
          size={scale(20)}
        />
      ),
    }}
  />
  <Drawer.Screen
    name="LegalStack"
    component={LegalStack}
    options={{
      drawerLabel: 'Legal Policies',
      drawerIcon: () => (
        <Icon
          name="documents-outline"
          color={COLORS.primary}
          size={scale(20)}
        />
      ),
    }}
  />
  
    
</Drawer.Navigator>
  );
}

// Exporting
export default HomeDrawer;
