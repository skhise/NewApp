// Importing
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TicketDetailsOther from './TicketDetailsOther';
import History from './History';
import Others from './Others';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import NoInternet from './NoInternet';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constant
const Tab = createBottomTabNavigator();

function TopTab() {
  const [user,setUser] = React.useState(0);
  const [islogin,setIsLogin] = React.useState(false);
  const [isAlive,setIsAlive] = React.useState(true);

  React.useEffect( async() => {
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null){
        let loginUser = JSON.parse(data);  
        console.log("loginUser:"+loginUser.id); 
       if(loginUser.id == 0){
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
    
    return()=>setIsAlive(false);
  },[isAlive]);

  return (
    
    <Tab.Navigator
      initialRouteName="TicketDetailsOther"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'TicketDetailsOther') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'lock-open' : 'lock-open-outline';
          } else if (route.name === 'Other') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }
              // Returning
          return <Icon name={iconName} size={scale(size)} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primaryLightest,
        tabBarInactiveTintColor: COLORS.darkGrey,
        tabBarShowLabel: false,
      })}>
        <Tab.Screen name="TicketDetailsOther" component={TicketDetailsOther} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Other" component={Others} />
    </Tab.Navigator> 
  );
  
}

// Exporting
export default TopTab;
