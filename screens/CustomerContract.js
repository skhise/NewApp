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
} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import HOME_STYLES from '../styles/screens/HOME_STYLES';
import Swiper from 'react-native-swiper';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import {ProductCard} from '../components/CARDS';
import CountDown from 'react-native-countdown-component';
import PRODUCTS from '../data/PRODUCTS';
import CATEGORIES_HOME from '../data/CATEGORIES_HOME';
import OFFER_BANNERS from '../data/OFFER_BANNERS';
import BRANDS from '../data/BRANDS';
import FEEDBACKS from '../data/FEEDBACKS';
import HOME_SLIDERS from '../data/HOME_SLIDERS';
import Animated, {interpolateNode} from 'react-native-reanimated';
import CART_ITEMS from '../data/CART_ITEMS';
import SweetAlert from 'react-native-sweet-alert';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
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
import PRODUCT_STYLES from '../styles/screens/PRODUCT_STYLES';
import Server from '../data/Server_Info';
// Functional component
const Home = ({props,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [isLoading, setIsLoading] = useState(false);
  const [homeSliderPhotos, setHomeSliderPhotos] = useState(HOME_SLIDERS);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(CATEGORIES_HOME);
  const [offerBanners, setOfferBanners] = useState(OFFER_BANNERS);
  const [brands, setBrands] = useState(BRANDS);
  const [feedbacks, setFeedbacks] = useState(FEEDBACKS);
  const [isAlive, setIsAlive] = useState(true);
  const [user,setUser] = React.useState([]);
  const [islogin,setIsLogin] = React.useState(false);
  const [cartCount,setCartCount] = React.useState(0);
  // Header slide up & down animation configs
  const HEADER_HEIGHT = scale(55);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  const isFocused = useIsFocused();
 
  React.useEffect(() => {
    fetchme();
  }, [isFocused]);
const fetchme=()=>{
  fetchData();
}
  const fetchData = async() => {
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null) {
        let loginUser = JSON.parse(data);  
        setUser(loginUser);
      }
    
      
    } catch(error){
      console.log("in error");
    }
  }
  // Returning
  return (
    <MenuProvider
    skipInstanceCheck
    >
      <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
        <View style={HOME_STYLES.contentContainer}>
          {/* Header */}
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
                <Text
                  style={HOME_STYLES.headerText}>
                    Customer Panel
                  </Text>
              </View>
              <View style={HOME_STYLES.headerRight}>
                {/* Mic icon */}
                <TouchableOpacity 
                onPress={() => navigation.navigate('Notification')}
                style={HOME_STYLES.micIconContainer}>
                  <IonIcon name="notifications" size={scale(25)} color={COLORS.white} />
                </TouchableOpacity>
                {/* Context menu */}
              </View>
            </View>
          </Animated.View>
          {/* Scrollview */}
          <Animated.ScrollView
            bounces={false}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: SCROLL_Y}}}],
              {useNativeDriver: true},
            )}>
            {/* Main carousel slider container */}
            
            <View style={[HOME_STYLES.innerContainer,{marginTop:50}]}>
              <View
                style={[
                  HOME_STYLES.sectionHeadingContainer,
                  HOME_STYLES.sectionHeadingContainerMarginTop,
                ]}>
               
              </View>
              {/* Icons container */}
              <View
              style={[
                {flexDirection:'row',alignItems:'center',alignContent:'center',
                justifyContent:'center'},
              ]}
              >
              <View
                style={[
                  HOME_STYLES.billPayIconsContainerCopy,
                  {marginBottom: scale(25)},
                ]}>
                <View
                  style={[
                    HOME_STYLES.iconLabelContainer,
                    GLOBAL_STYLES.xyCenter,
                    {flex:1}
                  ]}>
                  <TouchableOpacity
                    style={[HOME_STYLES.iconContainer, GLOBAL_STYLES.xyCenter]}
                    onPress={() => navigation.navigate('CustomerTicketList', {title:'Active Service List',user_id:user.id,request:0})}>
                    <Image
                      source={require('../assets/images/app_image/ServiceList.png')}
                      style={HOME_STYLES.icon}
                    />
                  </TouchableOpacity>
                  {/* Icon label */}
                  <Text style={HOME_STYLES.iconLabelCopyCC}>Active Service List</Text>
                </View>
                
                
              </View>
              <View
                style={[
                  HOME_STYLES.billPayIconsContainerCopy,
                  {marginBottom: scale(25)},
                ]}>
                <View
                  style={[
                    HOME_STYLES.iconLabelContainer,
                    GLOBAL_STYLES.xyCenter,
                    {flex:1}
                  ]}>
                  <TouchableOpacity
                    style={[HOME_STYLES.iconContainer, GLOBAL_STYLES.xyCenter]}
                    onPress={() => navigation.navigate('CustomerTicketList', {title:'Closed Service List',user_id:user.id,request:1})}>
                    <Icon
                        name="md-bookmark"
                        size={scale(35)}
                        
                      />
                  </TouchableOpacity>
                  {/* Icon label */}
                  <Text style={HOME_STYLES.iconLabelCopyCC}>Closed Service List</Text>
                </View>
                
                
              </View>
              </View>
              <View
                style={[
                  HOME_STYLES.billPayIconsContainer,
                  {marginBottom: scale(25)},
                ]}>
               
               <View
                  style={[
                    HOME_STYLES.iconLabelContainer,
                    GLOBAL_STYLES.xyCenter,
                    {marginLeft:30}
                  ]}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('ContractList', {user_id:user.id})}
                    style={[HOME_STYLES.iconContainer, GLOBAL_STYLES.xyCenter]}>
                      <Icon
                        name="md-document"
                        size={scale(35)}
                        
                      />

                    
                  </TouchableOpacity>
                  {/* Icon label */}
                  <Text style={HOME_STYLES.iconLabelCopyCC}>Amc Contract</Text>
                </View>
                <View
                  style={[
                    HOME_STYLES.iconLabelContainer,
                    GLOBAL_STYLES.xyCenter,
                    {marginRight:30}
                  ]}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('NewRequest', {user_id:user.id})}
                    style={[HOME_STYLES.iconContainer, GLOBAL_STYLES.xyCenter]}>
                    <Image
                      source={require('../assets/images/app_image/NewRequest.png')}
                      style={HOME_STYLES.icon}
                    />
                  </TouchableOpacity>
                  {/* Icon label */}
                  <Text style={HOME_STYLES.iconLabelCopyCC}>Request Service</Text>
                </View>
              </View>
              
              <View
                style={[
                  HOME_STYLES.billPayIconsContainer,
                  {marginBottom: scale(25)},
                ]}>
                
                <View
                  style={[
                    HOME_STYLES.iconLabelContainer,
                    GLOBAL_STYLES.xyCenter,
                    {marginLeft:30}
                  ]}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('NewInquiry',{user_id:user.id})}
                    style={[HOME_STYLES.iconContainer, GLOBAL_STYLES.xyCenter]}>
                    <Image
                      source={require('../assets/images/app_image/NewEnquiry.png')}
                      style={HOME_STYLES.icon}
                    />
                  </TouchableOpacity>
                  {/* Icon label */}
                  <Text style={HOME_STYLES.iconLabelCopyCC}>NEW Enquiry</Text>
                </View>
                <View
                  style={[
                    HOME_STYLES.iconLabelContainer,
                    GLOBAL_STYLES.xyCenter,
                    {marginRight:30}
                  ]}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('HelpSupport')}
                    style={[HOME_STYLES.iconContainer, GLOBAL_STYLES.xyCenter]}>
                    <Image
                      source={require('../assets/images/app_image/Help.png')}
                      style={HOME_STYLES.icon}
                    />
                  </TouchableOpacity>
                  {/* Icon label */}
                  <Text style={HOME_STYLES.iconLabelCopyCC}>Help & Support</Text>
                </View>
              </View>
             
            </View>
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
};

// Exporting
export default Home;
