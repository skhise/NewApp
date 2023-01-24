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
import Attendance from '../../screens/Attendance/Attendance';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Constant
const Stack = createNativeStackNavigator();

// Function
function AttendanceStack() {
  // Returning
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
    <Stack.Navigator
      initialRouteName="Attendance"
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
            :()=> (
              <Icon
                name="arrow-back-sharp"
                color={COLORS.white}
                size={scale(20)}
                onPress={() => navigation.goBack()}
              />
            ), // In android default back arrow will be used
      })}>
        <Stack.Screen
        name="Attendance"
        component={Attendance}
        initialParams={{user_id:user.id}}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="My Attendance" />,
        })}
      />
     
     
    </Stack.Navigator>
  );
}

// Exporting
export default AttendanceStack;
