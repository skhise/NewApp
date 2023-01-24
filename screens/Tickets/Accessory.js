// Importing
import React, {useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput, 
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../config/COLORS';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from '../../components/BUTTONS';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import * as Animatable from 'react-native-animatable';
import {ScreenLoader} from '../../components/LOADERS';
import {SnackbarAlert} from '../../components/ALERTS';

import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// Functional component
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Server from '../../data/Server_Info';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
const Accessory = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [rating, setRating] = useState(0);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [ticket,setTicket] = useState([]);
  const [accessoryList,setAccessoryList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { width } = Dimensions.get("window");
  const [isModalVisibleRContracted, setModalVisibleRContracted] = useState(false);
  const [isModalVisibleRNonContracted, setModalVisibleRNonContracted] = useState(false);
  const [actionNote,setActionNote] = useState("");
  const [selectedStatus,setSelectedStatus] = useState(0);

  const [ContractedProduct,setContractedProduct] = useState(null);
  const [NonContractedProduct,setNonContractedProduct] = useState(null);
  
  const [ContractedProductList,setContractedProductList] = useState([]);
  const [NonContractedProductList,setNonContractedProductList] = useState([]);

  const [ContractedAccessory,setContractedAccessory] = useState(null);
  const [NonContractedAccessory,setNonContractedAccessory] = useState(null);

  const [ContractedAccessoryList,setContractedAccessoryList] = useState([]);
  const [NonContractedAccessoryList,setNonContractedAccessoryList] = useState([]);
  const [TotalQuantity,setTotalQuantity] = useState("");
  const [Quantity,setQuantity] = useState("");
  const [Price,setPrice] = useState("");

  const [PaymentStatus,setPaymentStatus] = useState("");
  const [PaymentStatusList,setPaymentStatusList] = useState([{id:1,title:"Paid"},{id:0,title:"UnPaid"}]);
  const isFocused = useIsFocused();
  

  useEffect(() => {
      GetTicketsDetails();
      
  }, [isFocused])

  const GetTicketsDetails = async () => {
    
    try {
      const user_id =route.params.userId;
      const id = route.params.id;
      setLoading(true);
      axios.get(App_Url+'GetServiceTicketById',{
        params:{
          userId:user_id,
          id:id
        }
      })
          .then(json => {
            setLoading(false);
            if(json.data.success){
              json = json.data;
              console.log(json.ticket.accessory);
              setTicket(json.ticket);
              setAccessoryList(json.ticket.accessory);
            } else {
              setTicket(null);
              showAlert(json.data.message, COLORS.red);
            }
            
          }).catch(error => {
            setLoading(false);
            showAlert(error.message, COLORS.red);
          });
      } catch (error) {
        setLoading(false);
        showAlert(error.message, COLORS.red);
      }
  }
  const getContractedProduct = () => {
    try{
      setIsSubmitting(true);
    axios.get(App_Url+'GetContractProductListApp',{
      params:{
        Contract_ID:ticket.contract_id
      }
    })
        .then(json => {
          setIsSubmitting(false);
          if(json.data.success){
            json = json.data;
            setContractedProductList(json.product); 
            setModalVisibleRContracted(true);
          } else {
            showAlert("Server Error:"+json.data.message, COLORS.red);
          }
          
        }).catch(error => {
          setIsSubmitting(false);
          showAlert(error.message, COLORS.red);
        });
    } catch (error) {
      setIsSubmitting(false);
      showAlert(error.message, COLORS.red);
    }
}
const getContractedProductAccessory = (product) => {
  try{
    console.log(product);
    axios.get(App_Url+'GetContractProductAccessoryApp',{
      params:{
        Product_ID:product.Product_ID,
        CNRT_ID:product.CNRT_ID
      }
    })
        .then(json => {
          console.log("incpa");
          json = json.data;
          console.log(json);
          if(json.success){
            setContractedAccessoryList(json.accessory)
          } else {
            showAlert(json.message, COLORS.red);
            setContractedAccessoryList([])
          }
          
        }).catch(error => {
          showAlert(error.message, COLORS.red);
        });
    } catch (error) {
      showAlert(error.message, COLORS.red);
    }
}

const getNonContractedProduct = async () => {
  try{
    setIsSubmitting(true);
    axios.get(App_Url+'GetAllProductListApp')
        .then(json => {
          setIsSubmitting(false);
          console.log(json.data);
          json = json.data;
          if(json.success){
            setNonContractedProductList(json.product);
            setModalVisibleRNonContracted(true);
          } else {
            showAlert("Server Error:"+json.message, COLORS.red);  
          }
        }).catch(error => {
          setIsSubmitting(false);
          showAlert(error.message, COLORS.red);
        });
    } catch (error) {
      setIsSubmitting(false);
      showAlert(error.message, COLORS.red);
    }
}
const getNonContractedProductAccessory = async (product) => {
  if(product!=null){
    try{
      axios.get(App_Url+'GetAllProductAccessoryApp',{
        params:{
          Product_ID:product.Product_ID
        }
      })
          .then(json => {
            json = json.data;
            setNonContractedAccessoryList(json.accessory);
          }).catch(error => {
            showAlert(error.message, COLORS.red);
          });
      } catch (error) {
        showAlert(error.message, COLORS.red);
      }
  }
 
}

  const showAlert = (message,color)=> {
    SnackbarAlert(
      message,
      COLORS.white,
      color,
      'Got it',
      COLORS.white,
    )
  };
  const AddProduct = (type)=> {
    const user_id =route.params.userId;
    const id = route.params.id;
    console.log(ContractedProduct+"contracted"+ContractedAccessory);
    console.log(NonContractedProduct+"nonc"+NonContractedProduct);
    if(type == 1 && (ContractedProduct == null || ContractedAccessory == null)){
      showAlert("Product or Accessory Missing",COLORS.red);
    } else if(type == 0 && (NonContractedAccessory==null || NonContractedProduct == null)){
      showAlert("Product or Accessory Missing",COLORS.red);
    } else if(Quantity == "0"){
      showAlert("Quantity should not be 0",COLORS.red);
    } else if(Price == "0" ) {
      showAlert("Price should not be 0",COLORS.red);
    } else if(PaymentStatus == ""){
      showAlert("Select payment status",COLORS.red);
    } else {
      try{
        let params={
          type:type,
          service_id:id,
          contract_id:ticket.contract_id,
          product_id:type ==1 ? ContractedProduct.ID : NonContractedProduct.Product_ID,
          accessory_id:type ==1 ? ContractedAccessory.id : NonContractedAccessory.PA_ID,
          given_qty:Quantity,
          price:Price,
          Is_Paid:PaymentStatus.id
        };
        console.log(params);
        setIsSubmitting(true);
        axios.post(App_Url+'AddServiceCallAccessoryApp',
         {
            type:type,
            service_id:id,
            contract_id:ticket.contract_id,
            product_id:type ==1 ? ContractedProduct.ID : NonContractedProduct.Product_ID,
            accessory_id:type ==1 ? ContractedAccessory.id : NonContractedAccessory.PA_ID,
            given_qty:Quantity,
            price:Price,
            Is_Paid:PaymentStatus.id
          }
        )
        .then((json) => {
          setIsSubmitting(false);
          console.log(json.data);
          if(json.data.success) {
            GetTicketsDetails();
            closeModelRContracted();
            closeModelRNonContracted();
            showAlert(json.data.message,COLORS.green);
          } else {
            showAlert(json.data.message,COLORS.red);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
          showAlert("Connection Error!",COLORS.red);
        });
      }catch(error){
        setIsSubmitting(false);
        console.error(error);
        showAlert("Connection Error!",COLORS.red);
      }
      
    }
    
  }
  const openModelRNonContracted = () => {
      getNonContractedProduct();
    
};
const closeModelRNonContracted = () => {
  setModalVisibleRNonContracted(false);
  setPrice("");
  setQuantity("");
  setNonContractedAccessory(null);
  setNonContractedProduct(null);
  setNonContractedProductList([]);
  setNonContractedAccessoryList([]);
  setPaymentStatus("");
};
  const openModelRContracted = () => {
    getContractedProduct();
    
  };
  const closeModelRContracted = () => {
  setModalVisibleRContracted(false);
  setPrice("");
  setQuantity("");
  setTotalQuantity("");
  setContractedAccessory(null);
  setContractedProduct(null);
  setContractedProductList([]);
  setContractedAccessoryList([]);
  setPaymentStatus("");
  };

  // Returning

  if(Loading){
    return <ScreenLoader message="Loading Tickets..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      
      <View>
      <Modal
          isVisible={isModalVisibleRContracted}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={PERSONAL_DETAILS_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalTitle}>
              Add Product
            </Text>
            {/* Modal info */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalInfo}>
            Contrcated
            </Text>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
              dataSet={ContractedProductList}
              clearOnFocus={false}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Select Product",
                autoCorrect: false,
                autoCapitalize: "none",
                style: {
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  paddingLeft: 18
                }
              }}
              inputContainerStyle={[
                GLOBAL_STYLES.autoComplete,
              ]}
              onSelectItem={value=>{
                setContractedProduct(value);
                if(value!=null){
                  getContractedProductAccessory(value);
                }
                
              }}
              useFilter={false}
            />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            textInputProps={{
              placeholder:"Select Accessory",
              autoCorrect: false,
              autoCapitalize: "none",
              style: {
                backgroundColor: COLORS.white,
                color: COLORS.black,
                paddingLeft: 18
              }
            }}
            inputContainerStyle={[
              GLOBAL_STYLES.autoComplete,
            ]}
            useFilter={false}
            onSelectItem={value=>{
              setContractedAccessory(value)
              if(value!=null){
                setTotalQuantity(value.totalQty);
                setPrice(value.price);
              }
              
            }}
            dataSet={ContractedAccessoryList}
          />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Total Quantity"
                placeholderTextColor={COLORS.darkGrey}
                value={TotalQuantity}
                editable={false}
                style={[
                  GLOBAL_STYLES.textInputCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Given Quantity"
                placeholderTextColor={COLORS.darkGrey}
                value={Quantity}
                autoComplete='off'
                keyboardType='number-pad'
                onChangeText={(value)=>{
                  setQuantity(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Price"
                placeholderTextColor={COLORS.darkGrey}
                value={Price}
                keyboardType='number-pad'
                onChangeText={(value)=>{
                  setPrice(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Payment Status",
                autoCorrect: false,
                autoCapitalize: "none",
                style: {
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  paddingLeft: 18
                }
              }}
              inputContainerStyle={[
                GLOBAL_STYLES.autoComplete,
              ]}
              onSelectItem={setPaymentStatus}
              dataSet={PaymentStatusList}
              useFilter={false}
            />
            </View>
            <Button
              label="Add Product"
              customButtonStyle={{
                marginVertical: 0,
                marginTop: scale(10),
              }}
              disabled={isSubmitting}
              onPress={()=> {
                AddProduct(1);
              }}
            />
            {/* Modal close icon */}
            <View style={GLOBAL_STYLES.modalCloseIconContainer}>
              <TouchableOpacity
                onPress={closeModelRContracted}>
                <Icon name="close" size={scale(20)} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={isModalVisibleRNonContracted}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={PERSONAL_DETAILS_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalTitle}>
             Add Product
            </Text>
            {/* Modal info */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalInfo}>
              Non-Contrcated
            </Text>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
              clearOnFocus={false}
              style={GLOBAL_STYLES.inputLabel}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Select Product",
                autoCorrect: false,
                autoCapitalize: "none",
                style: {
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  paddingLeft: 18
                }
              }}
              inputContainerStyle={[
                GLOBAL_STYLES.autoComplete,
              ]}
              dataSet={NonContractedProductList}
              onSelectItem={value=>{
                console.log(value);
                setNonContractedProduct(value);
                getNonContractedProductAccessory(value);
              }}
              useFilter={true}
            />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            textInputProps={{
              placeholder:"Select Accessory",
              autoCorrect: false,
              autoCapitalize: "none",
              style: {
                backgroundColor: COLORS.white,
                color: COLORS.black,
                paddingLeft: 18
              }
            }}
            inputContainerStyle={[
              GLOBAL_STYLES.autoComplete,
            ]}
            useFilter={false}
            onSelectItem={setNonContractedAccessory}
            dataSet={NonContractedAccessoryList}
          />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Quantity"
                placeholderTextColor={COLORS.darkGrey}
                keyboardType='number-pad'
                onChangeText={(value)=>{
                  setQuantity(value);
                }}
                value={Quantity}
                style={[
                  GLOBAL_STYLES.textInputCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Price"
                placeholderTextColor={COLORS.darkGrey}
                onChangeText={(value)=>{
                  setPrice(value);
                }}
                value={Price}
                keyboardType='number-pad'
                style={[
                  GLOBAL_STYLES.textInputCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
              clearOnFocus={false}
              style={GLOBAL_STYLES.inputLabel}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Payment Status",
                autoCorrect: false,
                autoCapitalize: "none",
                style: {
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  paddingLeft: 18
                }
              }}
              inputContainerStyle={[
                GLOBAL_STYLES.autoComplete,
              ]}
              onSelectItem={setPaymentStatus}
              dataSet={PaymentStatusList}
              useFilter={false}
            />
            </View>
           
            <Button
              label="Add Product"
              customButtonStyle={{
                marginVertical: 0,
                marginTop: scale(10),
              }}
              disabled={isSubmitting}
              onPress={()=> {
                AddProduct(0);
              }}
            />
            {/* Modal close icon */}
            <View style={GLOBAL_STYLES.modalCloseIconContainer}>
              <TouchableOpacity
                onPress={closeModelRNonContracted}>
                <Icon name="close" size={scale(20)} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
        {/* Order container */}
        {ticket!=null ?
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Animatable.View
        delay={100}
        animation="fadeInUp"
        easing="ease-in-out-sine"
        useNativeDriver={true}
        style={[
          ORDER_STYLES.sectionContainer,
          ORDER_STYLES.sectionContainerMarginTicket,
        ]}>
        {/* Order ID */}
     
        <View style={ADDRESSES_STYLES.addressTypeContainer}>
                    <Icon
                      name="notifications"
                      size={scale(25)}
                      color={COLORS.primary}
                    />
                    <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                    ID - {ticket?.service_no}
                    </Text>
                    {true ? (
                      <View
                        style={[
                          ADDRESSES_STYLES.statusContainer,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Text style={ADDRESSES_STYLES.statusLabel}>
                        {ticket?.service_date}
                        </Text>
                      </View>
                    ) : null}
                  </View>
        {/* Destinations */}
        <View style={MY_ORDERS_STYLES.destinations}>
              <View style={{alignItems: 'flex-start'}}>
                <View>
                <Text style={MY_ORDERS_STYLES.destination}>
                  {ticket?.CST_Name}
                </Text>
                </View>
             
                <Text style={MY_ORDERS_STYLES.date}>
                  {ticket?.CNRT_Number}
                </Text>
              </View>
              <View style={[{alignItems: 'flex-start'},ADDRESSES_STYLES.statusContainerInfo,GLOBAL_STYLES.xyCenter]}>
                  <Text style={ADDRESSES_STYLES.statusLabelInfo}>
                    {ticket.contract_id ==0 ? "Non-Contracted" : 'Contracted'}
                  </Text>
                </View>
              
            </View>
            
      </Animatable.View>
      {
        ticket.service_status !=6 ?
        <Animatable.View
        delay={500}
        animation="fadeInUp"
        easing="ease-in-out-sine"
        useNativeDriver={true}
        style={ORDER_STYLES.sectionContainer}>
        <Text style={ORDER_STYLES.sectionTitle}>Add Accessory</Text>
        <View>
          <View>
         {
           ticket.contract_id !=0 ?
           <Button
            label="Contracted"
            style={[
              GLOBAL_STYLES.marginYNone,
              {marginTop:0}
            ]}
            disabled={isSubmitting}
            onPress={openModelRContracted}
          />
           :
           null 
         } 
          </View>
          <View>
          <Button
            label="Non-Contracted"
            style={[
              GLOBAL_STYLES.marginYNone,
              {marginTop:0}
            ]}
            disabled={isSubmitting}
            onPress={openModelRNonContracted}
            />
          </View>
         
        </View>
        
      </Animatable.View>
      :
      null

      }
       

      <Animatable.View
        delay={500}
        animation="fadeInUp"
        easing="ease-in-out-sine"
        style={ORDER_STYLES.sectionContainer}>
        {/* Section title */}
        <Text style={ORDER_STYLES.sectionTitle}>Accessory List</Text>
        {/* Price info */}
        <View style={ORDER_STYLES.row}>
          <Text style={[ORDER_STYLES.rowTitleCopy]}>Accessory</Text>
          <Text style={ORDER_STYLES.rowValueHeader}>Payment</Text>
          <Text style={ORDER_STYLES.rowValueHeader}>Qty</Text>
          <Text style={ORDER_STYLES.rowValueHeader}>Price</Text>
          <Text style={ORDER_STYLES.rowValueHeader}>Sub Total</Text>
        </View>
        {accessoryList.map((tik, index) => (
          <View key={index} >
               <View style={ORDER_STYLES.row}>
          <Text style={[ORDER_STYLES.rowTitleCopy, {textTransform: 'uppercase'}]}>
            {tik.PA_Name}
          </Text>
          <Text style={ORDER_STYLES.rowValueCopy}>{tik.Is_Paid == 0 ? 'UnPaid' : 'Paid'}</Text>
          <Text style={ORDER_STYLES.rowValueCopy}>{tik.given_qty}</Text>
          <Text style={ORDER_STYLES.rowValueCopy}>{tik.price}</Text>
          <Text style={ORDER_STYLES.rowValueCopy}>{tik.price*tik.given_qty}</Text>
          
         </View>
          </View>
         
        ))}
      
        
      </Animatable.View>
        </ScrollView>
        :
<View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <Animatable.View
            animation="fadeInDown"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../../assets/lottie/no-internet.json')}
              loop
              autoPlay
              resizeMode="cover"
            />
          </Animatable.View>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieTitle}>
            Server Connection Failed
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            Server problem or relaod page.
          </Animatable.Text>
        </View>
      }
        
        {/* Shipping details */}
        
        {/* Actions */}
        
          
         

        
        
      
      {/* Review writing Modal */}
      <View>
      
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default Accessory;
