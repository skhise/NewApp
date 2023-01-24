// Importing
import React, {useState,useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import COLORS from '../config/COLORS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import MY_ORDERS_STYLES from '../styles/screens/MY_ORDERS_STYLES';
import ORDERS from '../data/ORDERS';
import * as Animatable from 'react-native-animatable';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { HeaderTitle } from '../components/HEADER_TITLE';
import Server from '../data/Server_Info';
import App_API from '../data/App_API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAB from 'react-native-fab';
import { ScreenLoader } from '../components/LOADERS';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

// Functional component
const MyOrders = ({navigation}) => {
  // Local states
  const [orders, setOrders] = useState([]);
  const HEADER_HEIGHT = scale(0);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_HEIGHT],
  });
  const [Loading,setLoading] = useState(false);
  const [user,setUser] = useState({});
  let App_Url = Server.api;
  const isFocused = useIsFocused();
  const GetUser =async()=>{
    const data  = await AsyncStorage.getItem("user");
    if(data!=null) {
      let loginUser = JSON.parse(data);  
      setUser(loginUser);
      setOrders([]);
      FetchOders(loginUser.id);
     // getProfile(loginUser);
    }
  }
  useEffect(() => {
    GetUser();
    
  }, [isFocused])
  const FetchOders = (id) =>{
    try{
        setLoading(true);
        fetch(App_Url+App_API.GetOrders+'?id='+id)
        .then((response) => response.json())
        .then((json)=>{
          setLoading(false);
          setOrders(json.orders);
        })
        .catch((error) => {
          setLoading(false);
          ShowAlert.ShowAlert(error.message,COLORS.red);
        });
    } catch(error){
      setLoading(true);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    }

  }
  // Returning
  
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      
      <Animated.View
            style={[
              HOME_STYLES.header,
              {
                transform: [
                  {
                    translateY: translateY,
                  },
                ],
              },
            ]}>
            <View style={{flexDirection: 'row',marginTop:10}}>
              <View style={[HOME_STYLES.headerLeft, GLOBAL_STYLES.xCenter]}>
                {/* Menu icon */}
                <Icon
                  name="arrow-back-sharp"
                  color={COLORS.white}
                  size={scale(20)}
                  onPress={() => navigation.navigate("CustomerContract")}
                />
                
              </View>
              <HeaderTitle title="Order List" />
              <View style={HOME_STYLES.headerRight}></View>
            </View>
          </Animated.View>
          {
            Loading ?
            <ScreenLoader message="Loading Products..."/>
            :
            <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
                {orders.length === 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <Animatable.View
            delay={500}
            animation="fadeInDown"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/sad-face.json')}
              loop
              autoPlay
              resizeMode="cover"
            />
          </Animatable.View>
          <Animatable.Text
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieTitle}>
            No Orders!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any Orders for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView
        style={[{marginTop:70}]}
         bounces={false}
          showsVerticalScrollIndicator={false}>
          {orders.map((order, index) => (
            <Pressable
              key={index}
              style={[
                MY_ORDERS_STYLES.orderContainer,
                {marginTop: index === 0 ? scale(15) : 0},
              ]}
              onPress={() => navigation.navigate('Order',{orderId:order.id})}>
              {/* Order ID */}
              <Text style={MY_ORDERS_STYLES.orderId}>ID - {order.id}</Text>
              {/* Destinations */}
              <View style={MY_ORDERS_STYLES.destinations}>
                <View style={{alignItems: 'flex-start'}}>
                  <Text style={MY_ORDERS_STYLES.destination}>{order.CustomerName}</Text>
                  <Text style={MY_ORDERS_STYLES.date}>{order.createdat}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                <Text style={MY_ORDERS_STYLES.destination}>
                    Total Amount
                  </Text>
                  <Text style={MY_ORDERS_STYLES.date}>
                  DHB: {parseFloat(order.Order_Amount).toFixed(3)}
                  </Text>
                  
                </View>
              </View>
              {/* Order item container */}
              <View style={MY_ORDERS_STYLES.orderItemContainer}>
                <View style={MY_ORDERS_STYLES.item}>
                  <View style={MY_ORDERS_STYLES.itemInfo}>
                    <View>
                      <Text style={MY_ORDERS_STYLES.itemTitle}>
                      {order.Order_ContactPerson}
                      </Text>
                      <Text style={MY_ORDERS_STYLES.itemShortDetails}>
                      {order.Order_Contact}
                      </Text>
                    </View>
                    <Text style={MY_ORDERS_STYLES.itemShortDetails}>
                    {order.AreaName} , {order.AreaCode}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Order status progress */}
              <View style={[MY_ORDERS_STYLES.statusContainer]}>
                {order.Order_Status == 0 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Rejected
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Delivered
                      </Text>
                    </View>
                  </View>
                ) : order.Order_Status ==1 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Rejected
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Delivered
                      </Text>
                    </View>
                  </View>
                ) : order.Order_Status ==2 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Delivered
                      </Text>
                    </View>
                  </View>
                ) : order.Order_Status ==3 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleReject,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="close-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Rejected
                      </Text>
                    </View>
                    {/* <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Delivered
                      </Text>
                    </View> */}
                  </View>
                ) : null}
                {/* Horizontal line */}
                <View style={MY_ORDERS_STYLES.horizontalbarDefault}></View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
            </View>
          }
      
      <FAB
      buttonColor={COLORS.primary} 
      iconTextColor="#FFFFFF" 
      onClickAction={() => {FetchOders(user.id);}}
       visible={true}
        iconTextComponent={<Icon name="reload-circle" size={35}/>} />
    </SafeAreaView>
  );
};

// Exporting
export default MyOrders;
