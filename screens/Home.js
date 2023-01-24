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
import CART_ITEMS from '../data/LocalCart';
import SweetAlert from 'react-native-sweet-alert';
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
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
// Functional component
const Home = ({props,navigation}) => { 
  // Local states
  let App_Url = Server.api;
  let App_Root = Server.root;
  const [isLoading, setIsLoading] = useState(true);
  const [homeSliderPhotos, setHomeSliderPhotos] = useState(HOME_SLIDERS);
  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [categories, setCategories] = useState(CATEGORIES_HOME);
  const [offerBanners, setOfferBanners] = useState(OFFER_BANNERS);
  const [brands, setBrands] = useState(BRANDS);
  const [feedbacks, setFeedbacks] = useState(FEEDBACKS);
  const [isAlive, setIsAlive] = useState(true);
  const [user,setUser] = React.useState([]);
  const [islogin,setIsLogin] = React.useState(false);
  const [cartCount,setCartCount] = React.useState(0);
  const isFocused = useIsFocused();
  var RNFS = require('react-native-fs');

  // Header slide up & down animation configs
  const HEADER_HEIGHT = scale(0);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_HEIGHT],
  });
  async function checkFile (filepath){
    
    let exists = await RNFS.exists(filepath);
    console.log(filepath+"--"+exists);
    return exists;
  }
   const MainLoad =async()=>{
    let count = await CART_ITEMS.getItemCount();
      setCartCount(count);
      fetch(App_Url+'GetStoreProductsBestPlanApp')
    .then((response) => response.json())
    .then((json)=>{
      //console.log(json);
      setIsLoading(false);
      setPlans(json.storeproducts);
    })
    .catch((error) => {
      setIsLoading(false);
      showAlert("Connection Error!");
      
    });
    fetch(App_Url+'GetStoreProductsBestOfferApp')
    .then((response) => response.json())
    .then((json)=>{
      setIsLoading(false);
      setProducts(json.storeproducts);
    })
    .catch((error) => {
      setIsLoading(false);
      showAlert(error.message);
     
    });
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null){
        let loginUser = JSON.parse(data);  
       if(loginUser.id == 0){
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

  useEffect(() => {
    MainLoad();
}, [isFocused]);
  


  useEffect(() => {
    fetch(App_Url+'getCategoryListApp')
    .then((response) => response.json())
    .then((json)=>{
      setCategories(json);
    })
    .catch((error) => {
      setIsLoading(false);
      showAlert("Connection Error!");
    });
    
  }, [isFocused])

  const showAlert = (message)=>{
    SweetAlert.showAlertWithOptions({
      title: 'Alert',
      subTitle: message,
      confirmButtonTitle: 'OK',
      confirmButtonColor: '#000',
      otherButtonColor: '#dedede',
      style: 'error',
      cancellable: true
    },
      callback => console.log('callback'));
  };
  // Checking
  if (isLoading) {
    // Returning
    return <ScreenLoader message="Your App is being loaded." />;
  }

  // Toggling heart icon
  const _toggleHeartIcon = itemID => {
    // Copy products
    const newProducts = [...products];
    // Getting index of selected item
    const index = products.findIndex(item => item.id === itemID);
    // Checking
    if (newProducts[index].addedInWishlist) {
      newProducts[index].addedInWishlist = false;
      SnackbarAlert(
        'Item removed from wishlist.',
        COLORS.white,
        COLORS.red,
        'Got it',
        COLORS.white,
      );
    } else {
      newProducts[index].addedInWishlist = true;
      SnackbarAlert(
        'Item added to wishlist.',
        COLORS.white,
        COLORS.green,
        'Got it',
        COLORS.white,
      );
    }
    // Updating state
    setProducts(newProducts);
  };
  const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

  // Returning
  return (
    <MenuProvider>
      <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
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
              </View>
              <View style={HOME_STYLES.headerRight}>
                {/* Mic icon */}
                 <TouchableOpacity style={HOME_STYLES.micIconContainer}
                onPress={() =>{
                  navigation.navigate('Cart', {title: "Shopping Cart"})
                }}
                >
                  { <View  style={[
              PRODUCT_STYLES.headerIconContainerCopy,
              GLOBAL_STYLES.xyCenter,
            ]}>
                    <Text style={PRODUCT_STYLES.officeDiscount}>{cartCount}</Text>
                  </View>}
                  { <IonIcon name="cart" size={scale(25)} color={COLORS.white} /> }
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
         <View style={HOME_STYLES.contentContainer}>
          
          {/* Scrollview */}
          <Animated.ScrollView
            bounces={false}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: SCROLL_Y}}}],
              {useNativeDriver: false},
            )}>
            {/* Main carousel slider container */}
            
            <View style={HOME_STYLES.mainSlider}>
              {/* Main carousel slider */}
              <Swiper
                style={HOME_STYLES.swiper}
                autoplay
                autoplayTimeout={5}
                loop
                paginationStyle={HOME_STYLES.swiperPagination}
                dot={<View style={HOME_STYLES.dotDefault} />}
                activeDot={<View style={HOME_STYLES.dotActive} />}>
                {homeSliderPhotos.map((item, index) => (
                  <View key={index} style={HOME_STYLES.slide}>
                    <Image
                      source={item.photo}
                      style={GLOBAL_STYLES.responsiveImage}
                    />
                  </View>
                ))}
              </Swiper> 
            </View>
            <View style={HOME_STYLES.innerContainer}>
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
              {/* Section heading - Popular categories */}
              <View style={HOME_STYLES.sectionHeadingContainer}>
                <Text style={HOME_STYLES.sectionHeading}>
                  <Text style={HOME_STYLES.sectionHeadingBold}>Popular</Text>{' '}
                  categories
                </Text>
              </View>
              {/* Nested product scrollview container - Categories */}
              <View>
                {/* Nested product scrollview in Horizontal mode */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={false}
                  bounces={false}>
                  {categories.map((item, index) => {
                    return (
                      <Pressable
                        style={[
                          HOME_STYLES.categoryImageContainer,
                          { 
                            marginRight:
                              index === categories.length - 1 ? 0 : scale(10),
                          },
                        ]}
                        key={item.id}
                        onPress={() =>
                          navigation.navigate('ListProducts', {
                            title: item.name,
                            id:item.id
                          })
                        }>
                        {/* Category image */}
                        {
                          item.image == ""
                          ?
                          <Image
                          source={require('../assets/images/default_image.jpg')}
                          style={GLOBAL_STYLES.responsiveImage}
                        />
                          :
                          checkFile(App_Root+item.image) ?

                          <Image
                          source={{uri:`${App_Root+item.image}`}}
                          style={GLOBAL_STYLES.responsiveImage}
                        />
                        :
                        <Image
                          source={require('../assets/images/default_image.jpg')}
                          style={GLOBAL_STYLES.responsiveImage}
                        />
                        }
                        
                        {/* Category label */}
                        <View style={HOME_STYLES.categoryTitleContainer}>
                          <Text style={HOME_STYLES.categoryTitle}>
                            {item.name}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
              {/* Section heading - New arrivals */}
             
              {/* Nested product scrollview container - New arrivals */}
              
              {/* Spin & win banner */}
             
              {/* Section heading - Best sellers */}
             {
             products.length !=0 ?
             <View>
              <View
                style={[
                  HOME_STYLES.sectionHeadingContainer,
                  HOME_STYLES.sectionHeadingContainerMarginTop,
                ]}>
                <Text style={HOME_STYLES.sectionHeading}>
                  <Text style={HOME_STYLES.sectionHeadingBold}>Best</Text>{' '}
                  offers
                </Text>
              </View>
              <View>
                {/* Nested product scrollview in Horizontal mode */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={false}
                  bounces={false}
                  style={[{marginBottom:50}]}>
                  {products.map((item, index) => {
                    return (
                      <View
                        style={[
                          HOME_STYLES.productCardContainer,
                          {
                            marginRight:
                              index === products.length - 1 ? 0 : scale(10),
                          },
                        ]}
                        key={item.id}>
                        <ProductCard
                          id={item.id}
                          badgeLabel={'Best Offer'}
                          addedInWishlist={item.addedInWishlist}
                          photo={item.product_image_url != null ?{uri:`${App_Root+item.product_image_url}`} :require('../assets/images/default_image.jpg')}
                          title={item.product_name}
                          price={item.is_offer_active==1 ? item.product_offer_price : item.product_price_sell}
                          onPressHeart={() =>navigation.navigate('NewInquiry',{product:item.product_name})}
                          onPressAdd={ async() => {
                            try {
                              let price = item.is_offer_active==1 ? item.product_offer_price : item.product_price_sell;
                              let p = {
                                id:item.id,
                                product_image_url:item.product_image_url,
                                product_name:item.product_name,
                                product_price_sell:price,
                                product_qty:1
                              };
                            let isadd =  await CART_ITEMS.AddItem(p);
                            if(isadd){
                              SnackbarAlert(
                                'An item added to cart.',
                                COLORS.white,
                                COLORS.green,
                              )
                              setCartCount(await CART_ITEMS.getItemCount());
                            } else {
                              ShowAlert.ShowAlert("Add to cart failed",COLORS.red); 
                            }
                          
                            }catch(error){
                              ShowAlert.ShowAlert("Add to cart failed",COLORS.red);
                            }
                          }}
                          onPressItem={() => navigation.navigate('Product',{itemId:item.id,product:item})}
                          shadowValue={0}
                          customCardStyle={HOME_STYLES.customCardStyle}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              </View>
            : null  
            }
              {
                plans.length !=0 ?
                <View>
                    <View
                style={[
                  HOME_STYLES.sectionHeadingContainer,
                  HOME_STYLES.sectionHeadingContainerMarginTop,
                ]}>
                <Text style={HOME_STYLES.sectionHeading}>
                  <Text style={HOME_STYLES.sectionHeadingBold}>Best</Text>{' '}
                  Plans
                </Text>
              </View>
              <View>
                
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={false}
                  bounces={false}
                  style={[{marginBottom:50}]}>
                  {plans.map((item, index) => {
                    return (
                      <View
                        style={[
                          HOME_STYLES.productCardContainer,
                          {
                            marginRight:
                              index === plans.length - 1 ? 0 : scale(10),
                          },
                        ]}
                        key={item.id}>
                        <ProductCard
                          id={item.id}
                          badgeLabel={'Best Plan'}
                          addedInWishlist={item.addedInWishlist}
                          photo={item.product_image_url == null ?{uri:`${item.product_image_url}`} :require('../assets/images/default_image.jpg')}
                          title={item.product_name}
                          price={item.is_offer_active==1 ? item.product_offer_price : item.product_price_sell}
                          onPressHeart={() => _toggleHeartIcon(item.id)}
                          onPressAdd={() => navigation.navigate('NewInquiry',{user_id:0})}
                          onPressItem={() => navigation.navigate('Product',{itemId:item.id,product:item})}
                          shadowValue={0}
                          customCardStyle={HOME_STYLES.customCardStyle}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
                </View>
                
              : null
                
              }
              
              {/* Section heading - Limited offers */}
              {/* <View
                style={[
                  HOME_STYLES.sectionHeadingContainer,
                  HOME_STYLES.sectionHeadingContainerMarginTop,
                ]}>
                <Text style={HOME_STYLES.sectionHeading}>
                  <Text style={HOME_STYLES.sectionHeadingBold}>Limited</Text>{' '}
                  offers
                </Text>
              </View> */}
              {/* Nested product scrollview container - Limited offers */}
              {/* <View>
                
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={false}
                  bounces={false}>
                  {offerBanners.map((item, index) => {
                    return (
                      <Pressable
                        style={[
                          HOME_STYLES.offerImageContainer,
                          {
                            marginRight:
                              index === offerBanners.length - 1 ? 0 : scale(10),
                          },
                        ]}
                        key={item.id}
                        onPress={() =>
                          navigation.navigate('ListProducts', {
                            title: item.offer,
                          })
                        }>
                      
                        <Image
                          source={item.image}
                          style={GLOBAL_STYLES.responsiveImage}
                        />
                        <View style={HOME_STYLES.offerLabelContainer}>
                          <Text style={HOME_STYLES.offerLabel}>
                            {item.offer}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View> */}
              {/* Section heading - Top brands */}
              
              {/* Section heading - Customers feedback */}
              
              {/* Section heading - Bill payments */}
              {/* Icons container */}
            </View>
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
};

// Exporting
export default Home;
