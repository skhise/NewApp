// Importing
import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from '../../screens/Categories';
import GridProducts from '../../screens/GridProducts';
import ListProducts from '../../screens/ListProducts';
import Product from '../../screens/Product';
import ProductReviews from '../../screens/ProductReviews';
import COLORS from '../../config/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import {HeaderTitle} from '../../components/HEADER_TITLE';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';

// Constant
const Stack = createNativeStackNavigator();

// Function
function ProductStack() {
  // Returning
  return (
    <Stack.Navigator
      initialRouteName="Categories"
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
        name="Categories"
        component={Categories}
        
        options={({navigation})=>({
          headerTitle: () => <HeaderTitle title="All Categories" />,
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
        name="GridProducts"
        component={GridProducts}
        options={({route, navigation}) => ({
          headerTitle: () => <HeaderTitle title={route.params.title} />,
          headerShown:false,
          headerRight: () => (
            <Icon
              name="list-outline"
              color={COLORS.white}
              size={scale(20)}
              onPress={() =>
                navigation.navigate('ListProducts', {title: route.params.title,id:route.params.id})
              }
            />
          ),
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
    </Stack.Navigator>
  );
}

// Exporting
export default ProductStack;
