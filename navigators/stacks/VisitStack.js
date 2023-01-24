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
import VisitList from '../../screens/MyVisit/VisitList';
import NewVisit from '../../screens/MyVisit/NewVisit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalCart from '../../data/LocalCart';
// Constant
const Stack = createNativeStackNavigator();

// Function
function LeaveStack({route}) {
  // Returning
  return (
    <Stack.Navigator
      initialRouteName="VisitList"
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
        name="VisitList"
        component={VisitList}
         options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title="My Visits" />,
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
        name="NewVisit"
        component={NewVisit}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle title="New Visit" />,
        })}
      />
    </Stack.Navigator>
  );
}

// Exporting
export default LeaveStack;
