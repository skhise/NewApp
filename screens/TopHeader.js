import React, {useState, useRef, useEffect} from 'react';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Animated, {interpolateNode} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import COLORS from '../config/COLORS';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
//import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import Server from '../data/Server_Info';
import axios from 'axios';
import App_API from '../data/App_API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HOME_STYLES from '../styles/screens/HOME_STYLES';
import Geolocation from 'react-native-geolocation-service';
import {SnackbarAlert} from '../components/ALERTS';
const TopHeader = ({navigation, title}) => {
  
  let App_Url = Server.api;
  const [NotificationData, setNotificationData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [locationService, setLocationService] = useState(false);
  const [currentLocationLat, setCurrentLocationLat] =useState(null);
  const [currentLocationLng, setCurrentLocationLng] =useState(null);
  const [user ,setUser] = useState(null);
  function GetCurrentLocation(){
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude+","+position.coords.longitude);
        setCurrentLocationLat(position.coords.latitude);
        setCurrentLocationLng(position.coords.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}
  // useEffect(async () => {
  //   const data = await AsyncStorage.getItem('user');
  //   let loginUser = JSON.parse(data);
  //   setUser(loginUser);
  //   const userId = loginUser.id;
  //   BackgroundGeolocation.configure({
  //     desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  //     stationaryRadius: 50,
  //     distanceFilter: 50,
  //     notificationTitle: 'Background tracking',
  //     notificationText: 'enabled',
  //     debug: false,
  //     startOnBoot: true,
  //     stopOnTerminate: false,
  //     locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
  //     interval: 10000,
  //     fastestInterval: 5000,
  //     activitiesInterval: 10000,
  //     stopOnStillActivity: false,
  //     url:
  //       App_Url +
  //       '' +
  //       App_API.UpdateLocation +
  //       '?lastlong=' +
  //       currentLocationLng +
  //       '&lastlang=' +
  //       currentLocationLat +
  //       '&User_ID=' +
  //       userId,
  //     syncUrl:
  //       App_Url +
  //       '' +
  //       App_API.UpdateLocation +
  //       '?lastlong=' +
  //       currentLocationLng +
  //       '&lastlang=' +
  //       currentLocationLat +
  //       '&User_ID=' +
  //       userId,
  //     Number: 1,
  //     maxLocations: 1,
  //     httpHeaders: {
  //       'Content-Type': 'application/json',
  //       body: {
  //         lat: '@latitude',
  //         lon: '@longitude',
  //         lastlong: '@latitude',
  //         lastlang: '@longitude',
  //         full_address: 'bar',
  //         area_code: '',
  //         User_ID: userId,
  //       },
  //     },
  //     // customize post properties
  //     postTemplate: {
  //       lat: currentLocationLat,
  //       lon: currentLocationLng,
  //       lastlong: currentLocationLng,
  //       lastlang: currentLocationLat,
  //       full_address: 'bar',
  //       area_code: '',
  //       User_ID: userId, // you can also add your own properties
  //     },
  //   });
  //   BackgroundGeolocation.getCurrentLocation(location => {
  //     setCurrentLocationLng(location.longitude);
  //     setCurrentLocationLat(location.latitude);
  //     //Actions.sendLocation(location);
  //   });
  //   BackgroundGeolocation.on('location', async location => {
  //     // handle your locations here
  //     // to perform long running operation on iOS
  //     // you need to create background task
  //     console.log(location);
  //     setCurrentLocationLat(location.latitude);
  //     setCurrentLocationLng(location.longitude);
  //     BackgroundGeolocation.startTask(async taskKey => {
  //       // execute long running task
  //       // eg. ajax post location
  //       // IMPORTANT: task has to be ended by endTask
  //     });
  //   });

  //   BackgroundGeolocation.on('stationary', stationaryLocation => {
  //     // handle stationary locations here
  //     console.log('onstationarylocation');
  //     //setCurrentLocation(stationaryLocation);
  //     //Actions.sendLocation(stationaryLocation);
  //   });
  //   BackgroundGeolocation.on('error', error => {
  //     console.log('[ERROR] BackgroundGeolocation error:', error);
  //   });

  //   BackgroundGeolocation.on('start', () => {
  //     console.log('[INFO] BackgroundGeolocation service has been started');
  //   });

  //   BackgroundGeolocation.on('stop', () => {
  //     console.log('[INFO] BackgroundGeolocation service has been stopped');
  //   });

  //   BackgroundGeolocation.on('authorization', status => {
  //     console.log(
  //       '[INFO] BackgroundGeolocation authorization status: ' + status,
  //     );
  //     if (status !== BackgroundGeolocation.AUTHORIZED) {
  //       // we need to set delay or otherwise alert may not be shown
  //       setTimeout(
  //         () =>
  //           Alert.alert(
  //             'App requires location tracking permission',
  //             'Would you like to open app settings?',
  //             [
  //               {
  //                 text: 'Yes',
  //                 onPress: () => BackgroundGeolocation.showAppSettings(),
  //               },
  //               {
  //                 text: 'No',
  //                 onPress: () => console.log('No Pressed'),
  //                 style: 'cancel',
  //               },
  //             ],
  //           ),
  //         1000,
  //       );
  //     }
  //   });

  //   BackgroundGeolocation.on('background', () => {
  //     console.log('[INFO] App is in background');
  //   });

  //   BackgroundGeolocation.on('foreground', () => {
  //     console.log('[INFO] App is in foreground');
  //   });
  //   BackgroundGeolocation.getLocations(function (locations) {
  //     console.log(locations);
  //   });

  //   BackgroundGeolocation.on('abort_requested', () => {
  //     console.log('[INFO] Server responded with 285 Updates Not Required');

  //     // Here we can decide whether we want stop the updates or not.
  //     // If you've configured the server to return 285, then it means the server does not require further update.
  //     // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
  //     // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
  //   });

  //   BackgroundGeolocation.on('http_authorization', () => {
  //     console.log('[INFO] App needs to authorize the http requests');
  //   });

  //   BackgroundGeolocation.checkStatus(status => {
  //     console.log(
  //       '[INFO] BackgroundGeolocation service is running',
  //       status.isRunning,
  //     );
  //     console.log(
  //       '[INFO] BackgroundGeolocation services enabled',
  //       status.locationServicesEnabled,
  //     );
  //     console.log(
  //       '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
  //     );

  //     // you don't need to check status before start (this is just the example)
  //     if (!status.isRunning) {
  //       BackgroundGeolocation.start();
  //       MarkUserOnline(1); //triggers start on start event4
  //       GetCurrentLocation();
  //     }
  //   });
  // }, []);
  const StopBackGroundLocation = () => {
    BackgroundGeolocation.checkStatus(status => {
      if (status.isRunning) {
        setLocationService(false);
        BackgroundGeolocation.stop(); //triggers start on start event
        SnackbarAlert(
          'Location service has been stopped!',
          COLORS.white,
          COLORS.green,
          'Got it',
          COLORS.white,
        );
        MarkUserOnline(0);
      }
    });
  };
  const StartBackGroundLocation = () => {
    BackgroundGeolocation.checkStatus(status => {
      if (!status.isRunning) {
        setLocationService(true);
        BackgroundGeolocation.start(); //triggers start on start event
        SnackbarAlert(
          'Location service has been started!',
          COLORS.white,
          COLORS.green,
          'Got it',
          COLORS.white,
        );
        MarkUserOnline(1);
        GetCurrentLocation();
      }
    });
  };
  const MarkUserOnline = async status => {
    try {
      GetCurrentLocation();
      const data = await AsyncStorage.getItem('user');
      let loginUser = JSON.parse(data);
      fetch(
        App_Url +
          'markOnlineOffline?User_ID=' +
          loginUser.id +
          '&status=' +
          status +
          '&last_long=' +
          currentLocationLng +
          '&last_lang=' +
          currentLocationLat,
      )
        .then(response => response.json())
        .then(json => {
          console.log('markuseronline:' + json.message);
        })
        .catch(error => {
          console.log('markuseronline:' + error.message);
        });
    } catch (error) {
      console.log('markuseronline:' + error.message);
    }
  };
  return (
  
    <Animated.View style={[HOME_STYLES.header]}>
        <View style={{flexDirection: 'row'}}>
          <View style={[HOME_STYLES.headerLeft, GLOBAL_STYLES.xCenter]}>
            {/* Menu icon */}
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <IonIcon
                name="menu-outline"
                size={scale(30)}
                color={COLORS.white}
              />
            </TouchableOpacity>
            {/* Header logo */}
            <View style={HOME_STYLES.circleLogoView}>
              <Image
                source={require('../assets/images/logo.png')}
                style={GLOBAL_STYLES.responsiveImage}
              />
            </View>
            <Text style={HOME_STYLES.headerText}>{title}</Text>
          </View>
          <View style={HOME_STYLES.headerRight}>
            {/* Mic icon */}
            <TouchableOpacity
              style={HOME_STYLES.micIconContainer}
              onPress={() =>
                navigation.navigate('Notification', {
                  Notification: NotificationData,
                  user_id: user.id,
                })
              }>
              {notificationCount ? (
                <View
                  style={[
                    PRODUCT_STYLES.headerIconContainerCopy,
                    GLOBAL_STYLES.xyCenter,
                  ]}>
                  <Text style={PRODUCT_STYLES.officeDiscount}>
                    {notificationCount}
                  </Text>
                </View>
              ) : null}
              <IonIcon
                name="notifications"
                size={scale(25)}
                color={COLORS.white}
              />
            </TouchableOpacity>
            {/* Context menu */}
            {/* <Menu style={{display:'none'}}>
            
              
              <MenuTrigger
                children={
                  <IonIcon
                    name="ellipsis-vertical"
                    size={scale(25)}
                    color={COLORS.white}
                  />
                }
                
              />
              
              <MenuOptions
                customStyles={{
                  optionsContainer: HOME_STYLES.menuOptions,
                  
                }}
                >
                
                <MenuOption
                  customStyles={{
                    optionWrapper: HOME_STYLES.menuOptionWrapper,
                    optionText: HOME_STYLES.menuOptionText,
                  }}
                  text={
                    locationService
                      ? 'Stop Background Location'
                      : 'Start Background Location'
                  }
                  onSelect={() => {
                    locationService
                      ? StopBackGroundLocation()
                      :  StartBackGroundLocation();
                  }}
                />
              </MenuOptions>
            </Menu> */}
          </View>
        </View>
      </Animated.View>
  );
};

export default TopHeader;
