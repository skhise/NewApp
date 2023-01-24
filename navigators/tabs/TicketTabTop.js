// Importing
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Tickets/HomeDetails';
import Action from '../../screens/Tickets/ActionDetails';
import FieldReport from '../../screens/Tickets/FieldReport';
import Accessory from '../../screens/Tickets/Accessory';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
} from 'react-native';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import FONTS from '../../config/FONTS';
// Constant
const Tab = createBottomTabNavigator();

function TicketTabTop({route,navigation}) {
  

  return (
    <Tab.Navigator
      initialRouteName="HomeDetails"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let tabName;
          if (route.name === 'HomeDetails') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
            tabName="Info";
          } else if (route.name === 'ActionDetails') {
            iconName = focused ? 'refresh-circle' : 'refresh-circle-outline';
            tabName="Action";
          } else if (route.name === 'FieldReport') {
            iconName = focused ? 'document-text' : 'document-text-outline';
            tabName="Field Report";
          }
          else if (route.name === 'Accessory') {
            iconName = focused ? 'document-attach' : 'document-attach-outline';
            tabName="Accessory";
          }
          // Returning
          return <View style={[GLOBAL_STYLES.xCenter]}><Icon name={iconName} size={scale(size)} color={color} style={GLOBAL_STYLES.tabIcon}/><Text style={GLOBAL_STYLES.tabLabel}>{tabName}</Text></View>
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primaryLightest,
        tabBarInactiveTintColor: COLORS.darkGrey,
        tabBarShowLabel: false,
      })}>
        <Tab.Screen name="HomeDetails" component={Home} 
        initialParams={{userId:route.params.userId,id:route.params.id,ticketType:route.params.ticketType,title:route.params.title}}/>
        <Tab.Screen name="ActionDetails" component={Action}
        initialParams={{userId:route.params.userId,id:route.params.id,ticketType:route.params.ticketType,title:route.params.title}}/>
        <Tab.Screen name="Accessory" component={Accessory}
        initialParams={{userId:route.params.userId,id:route.params.id,ticketType:route.params.ticketType,title:route.params.title}} />
        <Tab.Screen name="FieldReport" component={FieldReport}
        initialParams={{userId:route.params.userId,id:route.params.id,ticketType:route.params.ticketType,title:route.params.title}} />
    </Tab.Navigator> 
  
  );
  
}

// Exporting
export default TicketTabTop;
