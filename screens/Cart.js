// Importing
import React, {useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button, ButtonWithIcon} from '../components/BUTTONS';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import CART_STYLES from '../styles/screens/CART_STYLES';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import CART_ITEMS from '../data/LocalCart';
import {ConfirmationAlert, SnackbarAlert} from '../components/ALERTS';
import SweetAlert from 'react-native-sweet-alert';
import BUTTON_STYLES from '../styles/components/BUTTON_STYLES';
import Animated, { interpolateNode } from 'react-native-reanimated';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HeaderTitle } from '../components/HEADER_TITLE';
import {useRoute, NavigationContainer, useIsFocused,CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowAlert from '../data/ShowAlert'
import Server_Info from '../data/Server_Info';

// Functional component
const Cart = ({navigation}) => {
  // Local states
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [subTotal, setsubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [selectedItemID, setSelectedItemID] = useState(null);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [dynamicLottieView, setDynamicLottieView] = useState(null);
  const [dynamicLottieViewTitle, setDynamicLottieViewTitle] = useState(null);
  const [isCloseVisible, setIsCloseVisible] = useState(false);
  const [isAlertVisibleCart, setIsAlertVisibleCart] = useState(false);
  const [loop, setLoop] = useState(true);
  const [cartCount,setCartCount] = React.useState(0);
  const HEADER_HEIGHT = scale(0);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_HEIGHT],
  });
  const isFocused = useIsFocused();
  // Removing cart item
  const _removeCartItem = (item) => {
    // Updating states
    setIsItemDeleted(true);
    setDynamicLottieView(require('../assets/lottie/timer.json'));
    setDynamicLottieViewTitle('Wait while deleting...');
    setLoop(true);
    setIsCloseVisible(false);
    // Delete
    setTimeout(async() => {
      // Duplicating cart data
      await CART_ITEMS.DeleteItem(item);
      setCartItems(await CART_ITEMS.getItem());
      setDynamicLottieView(require('../assets/lottie/checkmark.json'));
      setDynamicLottieViewTitle('An item deleted successfully.');

      setLoop(false);
      setIsCloseVisible(true);
    }, 3000);
  };

  const ClearCart = async() =>{
      await CART_ITEMS.clearCart();
      setCartItems([]);
      setIsAlertVisibleCart(false);
  }

  // Showing delete confirmation alert
  const _showConfirmationAlert = itemID => {
    // Updating states
    setIsAlertVisible(!isAlertVisible);
    setSelectedItemID(itemID);
    setIsItemDeleted(false);
  };
  const GetCart = async() =>{
    let cart = await CART_ITEMS.getItem();
    
    if(cart!=null){
      setCartItems(cart);
    }
  }
  useEffect(() => {
    GetCart();
  }, [isFocused])
  // Returning

  useEffect(() => {
    total();
  }, [cartItems]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalVal = parseFloat(cartItems[i].product_price_sell*cartItems[i].product_qty)+parseFloat(totalVal);
    }
    let vatVlaue = (totalVal/100)*10
    setsubTotal(totalVal)
    setVat(vatVlaue);
    totalVal = parseFloat(vatVlaue)+parseFloat(totalVal);
    setCartTotal(totalVal);
  };
  function showAlert(message){
    SweetAlert.showAlertWithOptions({
      title: 'Info',
      subTitle: message,
      confirmButtonTitle: 'OK',
      confirmButtonColor: '#000',
      otherButtonColor: '#dedede',
      style: 'success',
      cancellable: true
    },
      callback => console.log('callback'));
  };
  const onChangeQual= async (item,type) => {
     if (type) {
     await CART_ITEMS.AddItem(item);
     setCartItems(await CART_ITEMS.getItem());
    } else if (type==false) {
        await  CART_ITEMS.RemoveItem(item);
        setCartItems(await CART_ITEMS.getItem());
    }
    }
     
  
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
                  onPress={async() =>{
                    const data  = await AsyncStorage.getItem("user");
                    if(data == null) {
                      navigation.navigate("Home")
                    } else {
                      navigation.navigate("CustomerContract")
                    }
                    
                  }} 
                />
                
              </View>
              <HeaderTitle title="Shopping Cart" />
              <View style={HOME_STYLES.headerRight}>
                {/* Mic icon */}
                 <TouchableOpacity style={HOME_STYLES.micIconContainer}
                onPress={() => {
                  setIsAlertVisibleCart(!isAlertVisibleCart);
                }}
                >
                  { <IonIcon name="trash-bin-outline" size={scale(25)} color={COLORS.white} /> }
                </TouchableOpacity>
                {/* Context menu */}
              </View>
            </View>
          </Animated.View>
      {cartItems.length === 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <View style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/empty-cart.json')}
              loop
              autoPlay
              resizeMode="cover"
            />
          </View>
          <Animatable.Text  
            delay={500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieTitle}>
            Empty Cart!
          </Animatable.Text>
          <Animatable.Text
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            Oh snap! Seems, your shopping cart is empty. {'\n'}Add a few items
            to make me Happy :)
          </Animatable.Text>
        </View>
      ) : (
        <>
          <View style={GLOBAL_STYLES.flexTwoContainer}>
            <Animatable.View
              animation="fadeInDown"
              easing="ease-in-out-back"
              useNativeDriver={true}
              style={CART_STYLES.contentCotainer}>
              {/* Scrollview starts */}
              <View style={[CART_STYLES.cartTotalRow, {borderBottomWidth: 0}]}>
                <Text style={[
                  CART_STYLES.cartHeader,
                  GLOBAL_STYLES.xyCenter]}></Text>
                <ButtonWithIcon
                  iconName="trash-bin-outline"
                  iconSize={25}
                  iconColor={COLORS.white}
                  style={CART_STYLES.cartTotalRowValuePay}
                  customButtonStyle={[
                    GLOBAL_STYLES.marginYNone,
                    BUTTON_STYLES.buttonwarningSmall,
                    GLOBAL_STYLES.formTitleContainer,

                  ]}
                  onPress={ async()=> {
                    await CART_ITEMS.clearCart();
                    let ca = await CART_ITEMS.getItem();
                    if(ca!=null) {
                      setCartItems(ca);
                    } else {
                      setCartItems([]);
                    }
                    
                  }}
                />
              </View>
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                {cartItems.map((item, index) => {
                  return(<View
                    key={index}
                    style={[
                      CART_STYLES.itemContainer,
                      {marginTop: index === 0 ? scale(15) : 0},
                    ]}>
                    <View style={CART_STYLES.itemPhotoContainer}>
                      <Image
                        source={item.product_image_url != null ? {uri:`${Server_Info.root+item.product_image_url}`} :require('../assets/images/default_image.jpg')}
                        style={GLOBAL_STYLES.responsiveImage}
                      />
                      
                    </View>
                    <View style={CART_STYLES.itemInfo}>
                      <View>
                        <Text style={CART_STYLES.itemTitle}>{item.product_name}</Text>
                        <Text style={CART_STYLES.itemPrice}>
                          {item.product_price_sell} X {item.product_qty}
                        </Text>
                        <Text style={CART_STYLES.itemQtylabel}>
                          Quantity
                        </Text>
                      </View>
                      <View style={CART_STYLES.infoFooter}>
                        <View style={CART_STYLES.qty}>
                          <TouchableOpacity
                          onPress={()=>{
                            onChangeQual(item,true)
                          }}
                          >
                            <Icon
                              name="add-outline"
                              size={scale(20)}
                              style={CART_STYLES.qtyUpdateIcon}
                            />
                          </TouchableOpacity>
                          <Text style={CART_STYLES.qtyCount}>{item.product_qty}</Text>
                          <TouchableOpacity
                           onPress={()=>{
                            onChangeQual(item,false)
                          }}
                          >
                            <Icon
                              name="remove-outline"
                              size={scale(20)}
                              style={CART_STYLES.qtyUpdateIcon}
                            />
                          </TouchableOpacity>
                        </View>
                        <ButtonWithIcon
                          iconName="trash-outline"
                          iconSize={scale(20)}
                          iconColor={COLORS.primary}
                          customButtonStyle={[
                            GLOBAL_STYLES.marginYNone,
                            CART_STYLES.buttonWithIcon,
                          ]}
                          onPress={() => _showConfirmationAlert(item)}
                        />
                      </View>
                    </View>
                  </View>)
                  
                        })}
              </ScrollView>
              {/* Scrollview ends */}
            </Animatable.View>
          </View>
          {/* Cart info */}
          <Animatable.View
            animation="fadeInUp"
            easing="ease-in-out-back"
            useNativeDriver={true}
            style={[CART_STYLES.cartInfo]}>
            <View style={CART_STYLES.cartTotalContainer}>
              <View style={CART_STYLES.cartTotalRow}>
                <Text style={CART_STYLES.cartTotalRowTitle}>Subtotal</Text>
                <Text style={CART_STYLES.cartTotalRowValue}>{parseFloat(subTotal).toFixed(3)}</Text>
              </View>
              <View style={CART_STYLES.cartTotalRow}>
                <Text style={CART_STYLES.cartTotalRowTitle}>Vat</Text>
                <Text style={CART_STYLES.cartTotalRowValue}>{parseFloat(vat).toFixed(3)}</Text>
              </View>
              <View style={[CART_STYLES.cartTotalRow, {borderBottomWidth: 0}]}>
                <Text style={CART_STYLES.cartTotalRowTitle}>Total Payble</Text>
                <Text style={CART_STYLES.cartTotalRowValuePay}>{parseFloat(cartTotal).toFixed(3)}</Text>
              </View>
            </View>
            {/* Button component */}
            <Button
              label="Checkout"
              customButtonStyle={GLOBAL_STYLES.marginYNone}
              onPress={async()=>{
                const data  = await AsyncStorage.getItem("user");
                if(data == null){
                  ShowAlert.ShowAlert("Login to your account.",COLORS.red);
                } else {
                  navigation.navigate("Shipping");
                }
                
                
              }}
            />
            {/*onPress={() => navigation.navigate('Shipping')}*/}
          </Animatable.View>
        </>
      )}
      {/* Delete confirmation Modal */}
      <ConfirmationAlert
        isVisible={isAlertVisible}
        title="You are about to delete an item!"
        subTitle="Are you sure to delete?"
        onPressClose={() => setIsAlertVisible(!isAlertVisible)}
        onPressCancel={() => setIsAlertVisible(!isAlertVisible)}
        onPressDelete={() => _removeCartItem(selectedItemID)}
        isItemDeleted={isItemDeleted}
        isCloseVisible={isCloseVisible}
        dynamicLottieView={dynamicLottieView}
        loop={loop}
        dynamicLottieViewTitle={dynamicLottieViewTitle}
        cancelButtonLabel="No"
        confirmButtonLabel="Yes"
      />
      <ConfirmationAlert
        isVisible={isAlertVisibleCart}
        title="Are sure to clear cart!"
        subTitle="This will remove all your cart items!"
        onPressClose={() => setIsAlertVisibleCart(!isAlertVisibleCart)}
        onPressCancel={() => setIsAlertVisibleCart(!isAlertVisibleCart)}
        onPressDelete={() => {ClearCart()}}
        cancelButtonLabel="No"
        confirmButtonLabel="Yes"
      />
    </SafeAreaView>
  );
};

// Exporting
export default Cart;
