// Importing
import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LegalPolicies from '../../screens/LegalPolicies';
import PolicyDetails from '../../screens/PolicyDetails';
import {HeaderTitle} from '../../components/HEADER_TITLE';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import Leave from '../../screens/Attendance/Leave';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalCart from '../../data/LocalCart';
import NewLeave from '../../screens/Attendance/NewLeave';
import BackgroundLocation from '../../screens/BackgroundLocation';
// Constant
const Stack = createNativeStackNavigator();

// Function
function LeaveStack() {
  // Returning
  const [user,setUser] = React.useState(LocalCart.getUserId());
  const [isAlive,setIsAlive] = React.useState(true);
  React.useEffect(() => {
        setUser(LocalCart.getUserId())
    return()=>setIsAlive(false);
  },[isAlive]);
  return (
    <Stack.Navigator
      initialRouteName="Leave"
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
            :null, // In android default back arrow will be used
      })}>
      <Stack.Screen
        name="Leave"
        component={Leave}
        initialParams={{user_id:user.id}}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="My Leaves" />,
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
            : ()=> (<Icon
              name="arrow-back-sharp"
              color={COLORS.white}
              size={scale(20)}
              onPress={() => navigation.goBack()}
            />),
        })}
      />
      <Stack.Screen
        name="NewLeave"
        component={NewLeave}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="Leave Application" />,
        })}
      />
      
    </Stack.Navigator>
  );
}

// Exporting
export default LeaveStack;
