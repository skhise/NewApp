// Importing
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  PermissionsAndroid,
  DeviceEventEmitter,
  ToastAndroid,
  Alert,
} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import HOME_STYLES from '../styles/screens/HOME_STYLES';
import Swiper from 'react-native-swiper';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import HOME_SLIDERS from '../data/HOME_SLIDERS';
import SweetAlert from 'react-native-sweet-alert';
import Animated, {interpolateNode} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import {SnackbarAlert} from '../components/ALERTS';
import {ScreenLoader} from '../components/LOADERS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Server from '../data/Server_Info';
import FAB from 'react-native-fab';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import PRODUCT_STYLES from '../styles/screens/PRODUCT_STYLES';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import App_API from '../data/App_API';
import {Button} from 'react-native-paper';
import TopHeader from './TopHeader';
import { MenuProvider } from 'react-native-popup-menu';
// Functional component
const AttendancePanel = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  // Header slide up & down animation configs
  const HEADER_HEIGHT = scale(55);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  const fetchData = async() =>{
    try {
        setIsLoading(true);
      const data  = await AsyncStorage.getItem("user");
     if(data!=null) {
        let loginUser = JSON.parse(data); 
        setUser(loginUser);
      }
      setIsLoading(false);
    } catch(error){
        setIsLoading(false);
      SweetAlert.ShowAlert("Connection Error!",COLORS.red);
    }
  } 
  useEffect(() => {
    fetchData();
  }, [isFocused]);

  return (
    <>
      <MenuProvider>
      <TopHeader navigation={navigation} title={'Attendance Panel'} />
      {isLoading ? (
        <ScreenLoader message="Your App is being loaded." />
      ) : (
        <View style={HOME_STYLES.innerContainerCopy}>
        <View>
          {/*user attendance*/}
          <View style={HOME_STYLES.featuresContainerCopy}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Attendance', {
                  title: 'My Attendance',
                  user_id: user.id,
                });
              }}>
              <View
                style={[
                  HOME_STYLES.featureIconContainer,
                  {marginLeft: 30},
                ]}>
                <View style={HOME_STYLES.circleLogoViewCopy}>
                  <Text style={HOME_STYLES.iconText}>A</Text>
                </View>
                <Text style={HOME_STYLES.featureIconLabel}>Attendance</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MarkPunch', {
                  title: 'Mark Punch',
                  user_id: user.id,
                });
              }}>
              <View
                style={[
                  HOME_STYLES.featureIconContainer,
                  {marginRight: 30},
                ]}>
                <View style={HOME_STYLES.circleLogoViewCopy}>
                  <Text style={HOME_STYLES.iconText}>MP</Text>
                </View>
                <Text style={HOME_STYLES.featureIconLabel}>Mark Punch</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Features */}
          <View style={HOME_STYLES.featuresContainer}>
            <View style={HOME_STYLES.featureIconContainer}>
              <Image
                source={require('../assets/images/secure-payment.png')}
                style={HOME_STYLES.featureIconImage}
              />
              <Text style={HOME_STYLES.featureIconLabel}>
                Secure payment
              </Text>
            </View>
            <View style={HOME_STYLES.featureIconContainer}>
              <Image
                source={require('../assets/images/fast-delivery.png')}
                style={HOME_STYLES.featureIconImage}
              />
              <Text style={HOME_STYLES.featureIconLabel}>
                Fast delivery
              </Text>
            </View>
            <View style={HOME_STYLES.featureIconContainer}>
              <Image
                source={require('../assets/images/quick-install.png')}
                style={HOME_STYLES.featureIconImage}
              />
              <Text style={HOME_STYLES.featureIconLabel}>
                Quick Install
              </Text>
            </View>
          </View>
        </View>
      </View>
      )}
      </MenuProvider>
      
    </>
  );
};

// Exporting
export default AttendancePanel;
