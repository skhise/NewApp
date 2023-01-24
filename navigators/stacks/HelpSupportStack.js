// Importing
import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactUs from '../../screens/ContactUs';
import Faq from '../../screens/Faq';
import HelpSupport from '../../screens/HelpSupport';
import {HeaderTitle} from '../../components/HEADER_TITLE';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';

// Constant
const Stack = createNativeStackNavigator();

// Function
function HelpSupportStack() {
  // Returning
  return (
    <Stack.Navigator
      initialRouteName="HelpSupport"
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
        name="HelpSupport"
        component={HelpSupport}
        options={({navigation})=>({
          headerTitle: () => <HeaderTitle title="Help & Support" />,
          headerTintColor: Platform.OS === 'android' ? COLORS.white : null,
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
        name="ContactUs"
        component={ContactUs}
        options={() => ({
          headerTitle: () => <HeaderTitle title="Contact Us" />,
        })}
      />
      <Stack.Screen
        name="Faq"
        component={Faq}
        options={() => ({
          headerTitle: () => <HeaderTitle title="FAQs" />,
        })}
      />
    </Stack.Navigator>
  );
}

// Exporting
export default HelpSupportStack;
