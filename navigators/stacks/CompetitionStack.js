// Importing
import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpinWheel from '../../screens/SpinWheel';
import {HeaderTitle} from '../../components/HEADER_TITLE';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';

// Constant
const Stack = createNativeStackNavigator();

// Function
function CompetitionStack() {
  // Returning
  return (
    <Stack.Navigator
      initialRouteName="SpinWheel"
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
        name="SpinWheel"
        component={SpinWheel}
        options={() => ({
          headerTitle: () => <HeaderTitle title="Spin & Win" />,
        })}
      />
    </Stack.Navigator>
  );
}

// Exporting
export default CompetitionStack;
