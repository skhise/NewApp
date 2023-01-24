// Importing
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import SHIPPING_STYLES from '../styles/screens/SHIPPING_STYLES';
import {scale} from 'react-native-size-matters';
import COLORS from '../config/COLORS';
import DIMENSIONS from '../config/DIMENSIONS';
import {Button} from '../components/BUTTONS';
import ADDRESSES from '../data/ADDRESSES';
import axios, { Axios } from 'axios';
import Server from '../data/Server_Info';
import App_API from '../data/App_API';
import ShowAlert from '../data/ShowAlert';
import {ConfirmationAlert, SnackbarAlert} from '../components/ALERTS';
import {
  BoxedRadioDefault,
  BoxedRadioSelected,
  CircledRadioDefault,
  CircledRadioSelected,
} from '../components/RADIOS';
import {CheckboxChecked, CheckboxUnchecked} from '../components/CHECKBOXES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import CART_ITEMS from '../data/LocalCart';
// Constants
const {width} = DIMENSIONS;
const WIDTH_48_PERCENT = '48%';

// Functional component
const Shipping = ({navigation}) => {
  // Local states
  const [deliveryType, setDeliveryType] = useState('home');
  const [checkboxStatus, setCheckboxStatus] = useState(true);
  const [pickupAddresses, setPickupAddresses] = useState(ADDRESSES);
  const refScrollView = useRef(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [user,setUser] = React.useState([]);
  const [name,setName] = useState("");
  const [contactPerson,setContactPerson] = useState("");
  const [contactNumber,setContactNumber] = useState("");
  const [address,setAddress] = useState("");
  const [areaName,setAreaName] = useState("");
  const [areaCode,setAreaCode] = useState("");
  const [cartItems, setCartItems] = useState(null);
  const [orderVat,setOrderVat] = useState(0);
  const [orderSubTotal,setOrderSubTotal] = useState(0);
  const [orderTotal,setOrderTotal] = useState(0);
  const [loading,setLoading] = useState(false);
  const isFocused = useIsFocused();
  let App_Url = Server.api;

  const GetCart = async()=>{
    try {
      let cart = await CART_ITEMS.getItem();
      if(cart!=null){
        setCartItems(cart);
      }
      const data  = await AsyncStorage.getItem("user");
      if(data!=null) {
        
        let loginUser = JSON.parse(data);  
        setUser(loginUser);
        setName(loginUser.name);
        setContactPerson(loginUser.CCP_Name);
        setContactNumber(loginUser.CCP_Mobile);
        setAddress(loginUser.CST_OfficeAddress);
        setAreaCode("");
        setAreaName("");
       // getProfile(loginUser);
      }
      
    } catch(error) {
      console.log("in error"+error.message);
    }
  }
  useEffect(() => {
    GetCart();
  }, [isAlive])
 
  const PlaceOrder = async() =>{
     try {
      if(name === "" || contactPerson === "" || contactNumber=== "" ||
       address ==="" || areaCode === "" || areaName=== "") {
        ShowAlert.ShowAlert("all * marked input required",COLORS.red);
      } else if(cartItems == null) {
          ShowAlert.ShowAlert("cart details missing",COLORS.red);
      } else {
        let totalVal = 0;
        for (let i = 0; i < cartItems.length; i++) {
          totalVal = parseFloat(cartItems[i].product_price_sell*cartItems[i].product_qty)+parseFloat(totalVal);
        }
        let vatVlaue = (totalVal/100)*10
        let subTotal = totalVal;
        let total = parseFloat(vatVlaue)+parseFloat(totalVal);
        
        let cart ={
                  customerId:user.id,
                  product:cartItems,
                  name:name,
                  contactPerson:contactPerson,
                  contactNumber:contactNumber,
                  address:address,
                  areaName:areaName,
                  areaCode:areaCode,
                  vat:parseFloat(vatVlaue).toFixed(3),
                  total:parseFloat(total).toFixed(3),
                  subTotal:parseFloat(subTotal).toFixed(3)
        };
        console.log(cart);
        try{
          setLoading(true);
          axios.post(App_Url+""+App_API.PlaceOder,cart).then(async(responce)=>{
            setLoading(false);
            if(responce.data.success){
              Alert.alert(
                "Message",
                responce.data.message,
                [
                  { text: "OK", onPress: async() => {
                    await CART_ITEMS.clearCart();
                    GetCart();
                    navigation.navigate('MyOrders');
                  }}
                ]
              );
            } else {
              ShowAlert.ShowAlert(responce.data.message,COLORS.red);  
            }
          }).catch(error=>{
            setLoading(false);
            ShowAlert.ShowAlert(error.message,COLORS.red);
          })
        }catch(error){
          setLoading(false);
          ShowAlert.ShowAlert(error.message,COLORS.red);
        }
      }
     } catch(error){
      setLoading(false);
        ShowAlert.ShowAlert(error.message,COLORS.red);
     }
     
  }

  //   Toggling checkbox
  const _toggleCheckbox = () => {
    setCheckboxStatus(!checkboxStatus);
  };

  // Scrolling scrollview
  const scrollToIndex = index => {
    refScrollView.current.scrollTo({
      x: width * index,
      y: 0,
      animated: true,
    });
  };

  // Toggling delivery type
  const _toggleDeliveryType = param => {
    setDeliveryType(param);
    scrollToIndex(param === 'home' ? 0 : param === 'pickup' ? 1 : 0);
  };

  // Toggling address radio
  const _toggleAddressRadio = param => {
    // Preparing new data
    const newData = [...pickupAddresses];
    // Getting index of new selected radio
    const clickedRadioIndex = pickupAddresses.findIndex(
      item => item.id === param,
    );
    // Getting index of already selected radio
    const selectedRadioIndex = pickupAddresses.findIndex(
      item => item.active === true,
    );
    // Updating already selected radio active status to false
    newData[selectedRadioIndex].active = false;
    // Updating new selected radio active status to true
    newData[clickedRadioIndex].active = true;
    // Updating state
    setPickupAddresses(newData);
  };

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {/* Header */}
      {/* <View style={[SHIPPING_STYLES.header]}>
        {deliveryType === 'home' ? (
          // Boxed radio component
          <BoxedRadioSelected
            label="Home delivery"
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        ) : ( 
          // Boxed radio component
          <BoxedRadioDefault
            label="Home delivery"
            onPress={() => _toggleDeliveryType('home')}
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        )}
        {deliveryType === 'pickup' ? (
          // Boxed radio component
          <BoxedRadioSelected
            label="Local pickup"
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        ) : (
          // Boxed radio component
          <BoxedRadioDefault
            label="Local pickup"
            onPress={() => _toggleDeliveryType('pickup')}
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        )}
      </View> */}

      {/* Body */}
      <View style={SHIPPING_STYLES.body}>
      <ConfirmationAlert
        isVisible={isAlertVisible}
        title="Are sure to clear cart!"
        subTitle="This will remove all your cart items!"
        onPressClose={() => setIsAlertVisible(!isAlertVisible)}
        onPressCancel={() => setIsAlertVisible(!isAlertVisible)}
        onPressDelete={() => setIsAlertVisible(!isAlertVisible)}
        cancelButtonLabel="No"
        confirmButtonLabel="Ok"
      />
      <View style={[GLOBAL_STYLES.xyCenter,GLOBAL_STYLES.marginTop]}>
              <Text style={GLOBAL_STYLES.headerText}>Order shipping address</Text>
              <Text style={GLOBAL_STYLES.infoText}>(all * marked fields required.)</Text>

          </View>
        <ScrollView
          ref={refScrollView}
          horizontal={false}
          showsHorizontalScrollIndicator={false}>
          <View style={SHIPPING_STYLES.scrollViewContentContainer}>
            {/* First & last name input fields */}
            
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Name*</Text>
              <TextInput
                value={name}
                placeholderTextColor={COLORS.fontLight}
                style={GLOBAL_STYLES.textInput}
                onChangeText={setName}
              />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Contact Person Name*</Text>
              <TextInput
                value={contactPerson}
                onChangeText={setContactPerson}
                placeholderTextColor={COLORS.fontLight}
                style={GLOBAL_STYLES.textInput}
              />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Contact number*</Text>
              <TextInput
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholderTextColor={COLORS.fontLight}
                style={GLOBAL_STYLES.textInput}
              />
            </View>
            {/* Address input field */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Address*</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholderTextColor={COLORS.fontLight}
                multiline
                numberOfLines={3}
                style={GLOBAL_STYLES.textInputArea}
              />
            </View>
            {/* City & ZIP code input fields */}
            <View
              style={[
                GLOBAL_STYLES.flexRow,
                SHIPPING_STYLES.dualInputContainer,
              ]}>
              <View style={{width: WIDTH_48_PERCENT}}>
                <View style={GLOBAL_STYLES.inputGroup}>
                  <Text style={GLOBAL_STYLES.inputLabel}>Area Name*</Text>
                  <TextInput
                    value={areaName}
                    onChangeText={setAreaName}
                    placeholderTextColor={COLORS.fontLight}
                    style={GLOBAL_STYLES.textInput}
                  />
                </View>
              </View>
              <View style={{width: WIDTH_48_PERCENT}}>
                <View style={GLOBAL_STYLES.inputGroup}>
                  <Text style={GLOBAL_STYLES.inputLabel}>Area code*</Text>
                  <TextInput
                    value={areaCode}
                    placeholderTextColor={COLORS.fontLight}
                    style={GLOBAL_STYLES.textInput}
                    onChangeText={setAreaCode}
                  />
                </View>
              </View>
            </View>
            
            
          </View>
        </ScrollView>
       
      </View>
 {/* Footer */}
 <View style={[SHIPPING_STYLES.footer, GLOBAL_STYLES.xyCenter]}>
        <Button
          label="Place Order"
          customButtonStyle={GLOBAL_STYLES.marginYNone}
          disabled={loading}
          onPress={() =>{
            //navigation.navigate('Payment');
            PlaceOrder();
        }}
        />
      </View>
      
    </SafeAreaView>
  );
};

// Exporting
export default Shipping;
