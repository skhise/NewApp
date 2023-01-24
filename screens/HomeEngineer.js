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
import IonIcon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import HOME_SLIDERS from '../data/HOME_SLIDERS';
import SweetAlert from 'react-native-sweet-alert';
import Animated, {interpolateNode} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
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

// Functional component
const HomeEngineer = ({navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [isLoading, setIsLoading] = useState(false);
  const [newTicket, setNewTicket] = useState(0);
  const [openTicket, setOpenTicket] = useState(0);
  const [closedTicket, setClosedTicket] = useState(0);
  const [pendingTicket, setPendingTicket] = useState(0);
  const [resolvedTicket, setResolvedTicket] = useState(0);
  const [NotificationData, setNotificationData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [user, setUser] = React.useState([]);
  const [locationService, setLocationService] = useState(true);
  const [currentLocationLat, setCurrentLocationLat] = useState(null);
  const [currentLocationLng, setCurrentLocationLng] = useState(null);
  const isFocused = useIsFocused();
  // Header slide up & down animation configs
  const HEADER_HEIGHT = scale(55);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  useEffect(() => {
    GetCurrentLocation();
    FetchDataFromServer();
  }, [isFocused]);
  const FetchDataFromServer = () => {
    fetchData();
    MarkUserOnline(1);
  };

  function GetCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude + ',' + position.coords.longitude);
        setCurrentLocationLat(position.coords.latitude);
        setCurrentLocationLng(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  const MarkUserOnline = async(status) => {
    try {
      GetCurrentLocation();
      const data = await AsyncStorage.getItem('user');
      let loginUser = JSON.parse(data);
      axios.get(App_Url+'markOnlineOffline',{params:{
        User_ID:loginUser.id,
        status:status ,
        last_long:currentLocationLng,
        last_lang:currentLocationLat
      }})
      .then((json)=>{
      })
      .catch((error) => {
        console.log('markuseronline:' + error.message);
      });
    } catch (error) {
      console.log('markuseronline:' + error.message);
    }
  };
  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      if (data != null) {
        let loginUser = JSON.parse(data);
        setUser(loginUser);
        fetch(App_Url + 'engineerDashboard?id=' + loginUser.id)
          .then(response => response.json())
          .then(json => {
            console.log('json' + json);
            setNewTicket(json.newTicket);
            setOpenTicket(json.openTicket);
            setPendingTicket(json.pendingTicket);
            setResolvedTicket(json.resolvedTicket);
            setClosedTicket(json.closedTicket);
          })
          .catch(error => {
            SweetAlert.ShowAlert('Connection Error!', COLORS.red);
          });
      }
    } catch (error) {
      SweetAlert.ShowAlert('Connection Error!', COLORS.red);
    }
  };
  const fetchDataReload = async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem('user');
      if (data != null) {
        let loginUser = JSON.parse(data);
        // console.log("id:"+loginUser.id);
        setUser(loginUser);
        fetch(App_Url + 'engineerDashboard?id=' + loginUser.id)
          .then(response => response.json())
          .then(json => {
            setIsLoading(false);
            setNewTicket(json.newTicket);
            setOpenTicket(json.openTicket);
            setPendingTicket(json.pendingTicket);
            setResolvedTicket(json.resolvedTicket);
            setClosedTicket(json.closedTicket);
          })
          .catch(error => {
            setIsLoading(false);
            SweetAlert.ShowAlert('Connection Error!', COLORS.red);
          });
      }
    } catch (error) {
      setIsLoading(false);
      SweetAlert.ShowAlert('Connection Error!', COLORS.red);
    }
  };
  return (
    <MenuProvider>
      <TopHeader navigation={navigation} title={'Employee Panel'}/>
      <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
        <View style={HOME_STYLES.contentContainer}>
          {/* Header */}

          {/* Scrollview */}
          {isLoading ? (
            <ScreenLoader message="Your App is being loaded." />
          ) : (
            <Animated.ScrollView
              bounces={false}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: SCROLL_Y}}}],
                {useNativeDriver: true},
              )}>
              {/* Main carousel slider container */}
              <View style={HOME_STYLES.mainSliderEng}>
                {/* Main carousel slider */}
              </View>
              <View style={HOME_STYLES.innerContainer}>
                {/*user profile*/}
                <View>
                  <View style={HOME_STYLES.featuresContainerCopy}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('TicketList', {
                          title: 'New Tickets',
                          ticketType: 2,
                          user_id: user.id,
                        });
                      }}>
                      <View
                        style={[
                          HOME_STYLES.featureIconContainer,
                          {marginLeft: 30},
                        ]}>
                        <View style={HOME_STYLES.circleLogoViewCopy}>
                          <Text style={HOME_STYLES.iconText}>{newTicket}</Text>
                        </View>
                        <Text style={HOME_STYLES.featureIconLabel}>
                          New Tickets
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('TicketList', {
                          title: 'Open Tickets',
                          ticketType: 3,
                          user_id: user.id,
                        });
                      }}>
                      <View
                        style={[
                          HOME_STYLES.featureIconContainer,
                          {marginRight: 30},
                        ]}>
                        <View style={HOME_STYLES.circleLogoViewCopy}>
                          <Text style={HOME_STYLES.iconText}>{openTicket}</Text>
                        </View>
                        <Text style={HOME_STYLES.featureIconLabel}>
                          Open Tickets
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={HOME_STYLES.featuresContainerCopy}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('TicketList', {
                          title: 'Pending Tickets',
                          ticketType: 4,
                          user_id: user.id,
                        });
                      }}>
                      <View
                        style={[
                          HOME_STYLES.featureIconContainer,
                          {marginLeft: 30},
                        ]}>
                        <View
                          style={[
                            HOME_STYLES.circleLogoViewCopy,
                            {backgroundColor: COLORS.orange},
                          ]}>
                          <Text style={HOME_STYLES.iconText}>
                            {pendingTicket}
                          </Text>
                        </View>
                        <Text style={HOME_STYLES.featureIconLabel}>
                          Pending Tickets
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('TicketList', {
                          title: 'Resolved Tickets',
                          ticketType: 5,
                          user_id: user.id,
                        });
                      }}>
                      <View
                        style={[
                          HOME_STYLES.featureIconContainer,
                          {marginRight: 30},
                        ]}>
                        <View
                          style={[
                            HOME_STYLES.circleLogoViewCopy,
                            {backgroundColor: COLORS.green},
                          ]}>
                          <Text style={HOME_STYLES.iconText}>
                            {resolvedTicket}
                          </Text>
                        </View>
                        <Text style={HOME_STYLES.featureIconLabel}>
                          Resolved Tickets
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={HOME_STYLES.featuresContainerCopy}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('TicketList', {
                          title: 'Closed Tickets',
                          ticketType: 6,
                          user_id: user.id,
                        });
                      }}>
                      <View
                        style={[
                          HOME_STYLES.featureIconContainer,
                          {marginLeft: 30},
                        ]}>
                        <View style={HOME_STYLES.circleLogoViewCopy}>
                          <Text style={HOME_STYLES.iconText}>
                            {closedTicket}
                          </Text>
                        </View>
                        <Text style={HOME_STYLES.featureIconLabel}>
                          Closed Tickets
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('HelpSupport')}>
                      <View
                        style={[
                          HOME_STYLES.featureIconContainer,
                          {marginRight: 40},
                        ]}>
                        <View style={HOME_STYLES.circleLogoViewCopy}>
                          <Text style={HOME_STYLES.iconText}>{'H'}</Text>
                        </View>
                        <Text style={HOME_STYLES.featureIconLabel}>
                          Get Help
                        </Text>
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
            </Animated.ScrollView>
          )}
        </View>
        <FAB
          buttonColor={COLORS.primaryDark}
          iconTextColor={COLORS.white}
          onClickAction={() => {
            fetchDataReload();
          }}
          visible={true}
          iconTextComponent={<Icon name="reload-circle" size={100} />}
        />
      </SafeAreaView>
    </MenuProvider>
  );
};

// Exporting
export default HomeEngineer;
