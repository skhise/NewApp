// Importing
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import HomeEngineer from '../../screens/HomeEngineer';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import NoInternet from '../../screens/NoInternet';
import CustomerContract from '../../screens/CustomerContract';
import AttendancePanel from '../../screens/AttendancePanel';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constant
const Tab = createBottomTabNavigator();

function HomeTab() {
  const [user,setUser] = React.useState(0);
  const [islogin,setIsLogin] = React.useState(false);
  const [isAlive,setIsAlive] = React.useState(true);
  const [visible,setVisible] = React.useState(false);
  const getUser = async() =>{
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null){
        let loginUser = JSON.parse(data);  
       if(loginUser.id == 0){
          setIsLogin(false);
          setVisible(true);
          setUser([]);
        } else {
          setVisible(true);
          setIsLogin(true);
          setUser(loginUser);
        }
        
      } else {
        setVisible(true);
        setIsLogin(false);
        setUser([]);
      }
    }catch(error){
      setVisible(true);
      setIsLogin(false);
      setUser([]);
    }
  }
  React.useEffect(() => {
    getUser();
    return()=>setIsAlive(false);
  },[isAlive]);

  return (
    visible ?
    islogin == false ?  
    <Tab.Navigator
      initialRouteName="SignIn"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'basket' : 'basket-outline';
          } else if (route.name === 'SignIn') {
            iconName = focused ? 'lock-open' : 'lock-open-outline';
          } else if (route.name === 'SignUp') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }
           else if (route.name === 'NoInternet') {
            iconName = focused ? 'settings' : 'settings';
          }
          // Returning
          return <Icon name={iconName} size={scale(size)} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primaryLightest,
        tabBarInactiveTintColor: COLORS.darkGrey,
        tabBarShowLabel: false,
      })}>
        {/* <Tab.Screen name="Home" component={Home} /> */}
        <Tab.Screen name="SignIn" component={SignIn} />
        {/* <Tab.Screen name="SignUp" component={SignUp} />
        <Tab.Screen name="NoInternet" component={NoInternet} />  */}
    </Tab.Navigator> 
    :
    user.role == 2 ?
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
            
          } else if (route.name === 'SignIn') {
            iconName = focused ? 'lock-open' : 'lock-open-outline';
          } else if (route.name === 'SignUp') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }
           else if (route.name === 'NoInternet') {
            iconName = focused ? 'settings' : 'settings';
          }
          else if (route.name === 'CustomerContract') {
            iconName = focused ? 'basket' : 'basket-outline';
          }
          // Returning
          return <Icon name={iconName} size={scale(size)} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primaryLightest,
        tabBarInactiveTintColor: COLORS.darkGrey,
        tabBarShowLabel: false,
      })}>
       <Tab.Group>
            <Tab.Screen name="CustomerContract" component={Home} />
            <Tab.Screen name="Home" component={CustomerContract} />
            {/* <Tab.Screen name="NoInternet" component={NoInternet} />  */}
          </Tab.Group>
        
    </Tab.Navigator> 
    :
    user.role == 3 ?
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }
           else if (route.name === 'NoInternet') {
            iconName = focused ? 'settings' : 'settings';
          }
          else if (route.name === 'AttendancePanel') {
            iconName = focused ? 'md-calendar-sharp' : 'md-calendar-sharp';
          }
          else if (route.name === 'CustomerContract') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }
          // Returning
          return <Icon name={iconName} size={scale(size)} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primaryLightest,
        tabBarInactiveTintColor: COLORS.darkGrey,
        tabBarShowLabel: false,
      })}>
        <Tab.Group>
            <Tab.Screen name="Home" component={HomeEngineer} />
            <Tab.Screen name="AttendancePanel" component={AttendancePanel} /> 
            <Tab.Screen name="NoInternet" component={NoInternet} /> 
          </Tab.Group>
    </Tab.Navigator> 
    : 
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'basket' : 'basket-outline';
          } else if (route.name === 'SignIn') {
            iconName = focused ? 'lock-open' : 'lock-open-outline';
          } else if (route.name === 'SignUp') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }
           else if (route.name === 'NoInternet') {
            iconName = focused ? 'settings' : 'settings';
          }
         
          // Returning
          return <Icon name={iconName} size={scale(size)} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primaryLightest,
        tabBarInactiveTintColor: COLORS.darkGrey,
        tabBarShowLabel: false,
      })}>
         <Tab.Group>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="NoInternet" component={NoInternet} /> 
          </Tab.Group>
        
    </Tab.Navigator> 
    :
    null
  );
  
}

// Exporting
export default HomeTab;
