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
  
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../styles/screens/ORDER_STYLES';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from '../components/BUTTONS';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import * as Animatable from 'react-native-animatable';
import {ScreenLoader} from '../components/LOADERS';
import {SnackbarAlert} from '../components/ALERTS';

import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// Functional component
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Server from '../data/Server_Info';
import ShowAlert from '../data/ShowAlert';
const TicketDetails = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [ticket,setTicket] = useState([]);
  const [accessoryList,setAccessoryList] = useState([]);
  const [statusList,setStatusList] = useState([]);
  const [reasonList,setReasonList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { width } = Dimensions.get("window");
  const [isModalVisibleR, setModalVisibleR] = useState(false);
  const [actionNote,setActionNote] = useState("");
  const [selectedStatus,setSelectedStatus] = useState(0);
  const [selectedReason,setSelectedReason] = useState(0);
  
  useEffect(() => {
    setLoading(true);
    const user_id =route.params.userId;
    const id = route.params.id;
    fetch(App_Url+'GetServiceTicketById?userId='+user_id+"&id="+id)
    .then((response) => response.json())
    .then((json)=> {
      console.log(json);
      setTicket(json.ticket);
      setAccessoryList(json.ticket.accessory);
      console.log(json.ticket.accessory);
      getReasons();
      getStatus();
      setLoading(false);
      
    })
    .catch((error) => {
      setLoading(false);
     console.error(error);
     ShowAlert.ShowAlert("Connection Error!",COLORS.red);
    });
    return () => setIsAlive(false)
  }, [isAlive])

  const getStatus = async () => {
    const response = await fetch(App_Url+"GetStatusList")
    const items = await response.json()
    const status = items.map((item) => ({
        id: item.Status_Id,
        title: item.Status_Name
    }))
    setStatusList(status);
}
const getReasons = async () => {
  try{
    const response = await fetch(App_Url+"GetReasonList")
  const items = await response.json()
  const reasons = items.map((item) => ({
      id: item.id,
      title: item.reason_name
  }))
  setReasonList(reasons)
  }catch(error){
    ShowAlert.ShowAlert("Connection Error!",COLORS.red);
  }
  
}
  const ApplyAction = ()=>{
    try{
      const user_id =route.params.userId;
    const id = route.params.id;
    const ticketType = route.params.ticketType;
    setLoading(true);
    console.log(selectedStatus+"--"+selectedReason);
    const data = "?service_id="+id+"&status_id="+selectedStatus.id+"&reason_id="+selectedReason.id+"&user_id="+user_id+"&action_description="+actionNote;
    fetch(App_Url+'ApplyServiceAction'+data)
    .then((response) => response.json())
    .then((json)=> {
      setLoading(false);
      if(json.success){
        ShowAlert.ShowAlert(json.message,COLORS.green);
        navigation.navigate('TicketList',{title:route.params.title,ticketType:ticketType,user_id:user_id});
      } else {
        ShowAlert.ShowAlert(json.message,COLORS.red);
      }

    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
      ShowAlert.ShowAlert("Connection Error!",COLORS.red);
    });
    }catch(error){
      console.error(error);
      ShowAlert.ShowAlert("Connection Error!",COLORS.red);
    }
    
  }
  const openModelR = () => {
    setModalVisibleR(true);
};
const closeModelR = () => {
  setModalVisibleR(false);
};

  // Returning

  if(Loading){
    return <ScreenLoader message="Loading Tickets..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View>
        <Modal
          isVisible={isModalVisibleR}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={PERSONAL_DETAILS_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalTitle}>
             Apply Action
            </Text>
            {/* Modal info */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalInfo}>
              apply action on ticket
            </Text>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
              clearOnFocus={false}
              style={GLOBAL_STYLES.inputLabel}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Select Status"
              }}
              initialValue={{ id: "2" }} // or just '2'
              onSelectItem={setSelectedStatus}
              dataSet={statusList}
              useFilter={false}
            />
            </View>
            
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            textInputProps={{
              placeholder:"Select Reason"
            }}
            useFilter={false}
            initialValue={{ id: "1" }} // or just '2'
            onSelectItem={setSelectedReason}
            dataSet={reasonList}
          />
            </View>
          
         
            
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter your text here..."
                placeholderTextColor={COLORS.darkGrey}
                multiline
                numberOfLines={3}
                onChange={(value)=>{
                  setActionNote(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
           
            <Button
              label="Apply"
              customButtonStyle={{
                marginVertical: 0,
                marginTop: scale(10),
              }}
              onPress={()=>{
                ApplyAction();
              }}
            />
            {/* Modal close icon */}
            <View style={GLOBAL_STYLES.modalCloseIconContainer}>
              <TouchableOpacity
                onPress={closeModelR}>
                <Icon name="close" size={scale(20)} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
        {/* Order container */}
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[
            ORDER_STYLES.sectionContainer,
            ORDER_STYLES.sectionContainerMarginTop,
          ]}>
          {/* Order ID */}
          <View style={ADDRESSES_STYLES.addressTypeContainer}>
                      <Icon
                        name="ios-arrow-forward"
                        size={scale(25)}
                        color={COLORS.primary}
                      />
                      <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                      ID - {ticket.service_no}
                      </Text>
                      {true ? (
                        <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                          ]}>
                          <Text style={ADDRESSES_STYLES.statusLabel}>
                          {ticket.service_date}
                          </Text>
                        </View>
                      ) : null}
                    </View>
          {/* Destinations */}
          <View style={MY_ORDERS_STYLES.destinations}>
                <View style={{alignItems: 'flex-start'}}>
                  <View>
                  <Text style={MY_ORDERS_STYLES.destination}>
                    {ticket.CST_Name}
                  </Text>
                  </View>
               
                  <Text style={MY_ORDERS_STYLES.date}>
                    {ticket.CNRT_Number}
                  </Text>
                </View>
                <View style={[{alignItems: 'flex-start'},ADDRESSES_STYLES.statusContainerInfo,GLOBAL_STYLES.xyCenter]}>
                  <Text style={ADDRESSES_STYLES.statusLabelInfo}>
                    {ticket.contract_id ==0 ? "Non-Contracted" : 'Contracted'}
                  </Text>
                </View>
                
              </View>
              
        </Animatable.View>
        <Animatable.View
          delay={1300}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Problem Reported</Text>
          <View style={MY_ORDERS_STYLES.orderItemContainer}>
                <View style={MY_ORDERS_STYLES.item}>
                  
                  <View style={MY_ORDERS_STYLES.itemInfo}>
                    <View>
                      <Text style={MY_ORDERS_STYLES.itemTitle}>
                        {ticket.type_name}
                      </Text>
                      <Text style={MY_ORDERS_STYLES.itemShortDetails}>
                        {ticket.issue_name}
                      </Text>
                    </View>
                   </View>
                </View>
              </View>
              <View style={MY_ORDERS_STYLES.orderItemContainer}>
                <View style={MY_ORDERS_STYLES.item}>
                  
                  <View style={MY_ORDERS_STYLES.itemInfo}>
                    <View>
                      <Text style={MY_ORDERS_STYLES.itemTitle}>
                        {ticket.service_note}
                      </Text>
                    </View>
                   </View>
                </View>
              </View>
        </Animatable.View>
        <Animatable.View
          delay={1300}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Address details</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Name</Text>
            <Text style={ORDER_STYLES.rowValue}>{ticket.contact_person}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Phone number</Text>
            <Text style={ORDER_STYLES.rowValue}>{ticket.contact_number1}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Alt. Phone number</Text>
            <Text style={ORDER_STYLES.rowValue}>{ticket.contact_number2}</Text>
          </View>
          
        </Animatable.View>
        <Animatable.View
          delay={1300}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Site Address Details</Text>
          {/* Price info */}
          {
            ticket.contract_id ==0 ?
              <View style={ORDER_STYLES.row}>
              <Text style={ORDER_STYLES.rowValue}>{ticket.site_location}</Text>
            </View>
            :
            <View>
              <View style={ORDER_STYLES.row}>
                <Text style={ORDER_STYLES.rowTitle}>Site No.</Text>
                <Text style={ORDER_STYLES.rowValue}>{ticket.SiteNumber}</Text>
              </View>
              <View style={ORDER_STYLES.row}>
                <Text style={ORDER_STYLES.rowTitle}>Site Name</Text>
                <Text style={ORDER_STYLES.rowValue}>{ticket.SiteName}</Text>
              </View>
              <View style={ORDER_STYLES.row}>
                <Text style={ORDER_STYLES.rowTitle}>Site Area</Text>
                <Text style={ORDER_STYLES.rowValue}>{ticket.SiteAreaName}</Text>
              </View>
              <View style={ORDER_STYLES.row}>
                <Text style={ORDER_STYLES.rowTitle}>Address</Text>
                <Text style={ORDER_STYLES.rowValue}>{ticket.SiteOther}</Text>
              </View>
            </View>
          }
          
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Google Map</Text>
            <Text style={ORDER_STYLES.rowValueLink}
                  onPress={() =>{
                    Linking.canOpenURL(`${ticket.site_google_link}`).then(supported => {
                      if (supported) {
                        Linking.openURL(`${ticket.site_google_link}`);
                      } else {
                        showAlert.ShowAlert("Failed to open ggogle link",COLORS.red);
                        console.log('Don\'t know how to open URI: ' + `${ticket.site_google_link}`);
                      }
                    });
                  }}>
              Map Link
            </Text>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={1300}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Accessory details</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitleCopy}>Accessory</Text>
            <Text style={ORDER_STYLES.rowValueCopy}>Qty</Text>
            <Text style={ORDER_STYLES.rowValueCopy}>Sub Total</Text>
          </View>
          {accessoryList.map((tik, index) => (
            <View key={index}>
                 <View style={ORDER_STYLES.row}>
            <Text style={[ORDER_STYLES.rowTitleCopy, {textTransform: 'uppercase'}]}>
              {tik.PA_Name}
            </Text>
            <Text style={ORDER_STYLES.rowValueCopy}>{tik.PA_Qty}</Text>
            <Text style={ORDER_STYLES.rowValueCopy}>{tik.PA_Qty*tik.PA_Price}</Text>
           </View>
            </View>
           
          ))}
         {
          //ticket.service_status !=2 ? null
          //  <View><View style={ORDER_STYLES.row}>
          //   <Text style={ORDER_STYLES.rowTitle}>Shipping cost</Text>
          //   <Text style={ORDER_STYLES.rowValue}>19.99</Text>
          // </View>
          // <View style={ORDER_STYLES.row}>
          //   <Text style={ORDER_STYLES.rowTitle}>Discount</Text>
          //   <Text style={ORDER_STYLES.rowValue}>00.00</Text>
          // </View>
          // <View style={ORDER_STYLES.row}>
          //   <Text style={ORDER_STYLES.rowTitle}>Total payble</Text>
          //   <Text style={ORDER_STYLES.rowValue}>199.99</Text>
          // </View>
          // <View style={[ORDER_STYLES.row, {borderBottomWidth: 0}]}>
          //   <Text style={ORDER_STYLES.rowTitle}>Payment mode</Text>
          //   <View style={ORDER_STYLES.paymentModeCheckmarkContainer}>
          //     <Text style={ORDER_STYLES.paymentMode}>Google Pay</Text>
          //     <Icon
          //       name="checkmark-circle-outline"
          //       size={scale(25)}
          //       color={COLORS.green}
          //     />
          //   </View>
          // </View></View> :null 
         } 
          
        </Animatable.View>
        {/* Shipping details */}
        
        {/* Actions */}
        
          
          <Animatable.View
          delay={1700}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Actions</Text>
          {/* Action buttons */}
          <View>
            <Button
              label="action"
              customButtonStyle={[
                GLOBAL_STYLES.marginYNone,
              ]}
              onPress={openModelR}
            />
          </View>
        </Animatable.View>

        
        
      </ScrollView>
      {/* Review writing Modal */}
      <View>
        <Modal
          isVisible={isModalVisible}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={ORDER_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={ORDER_STYLES.passwordResetModalTitle}>
              Write review
            </Text>
            {/* Modal info */}
            <Text style={ORDER_STYLES.passwordResetModalInfo}>
              Review will be verified before publishing.
            </Text>
            {/* Input field title */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter review title"
                placeholderTextColor={COLORS.darkGrey}
                style={[
                  GLOBAL_STYLES.textInput,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            {/* Textarea review */}
            <Textarea
              containerStyle={ORDER_STYLES.textareaContainer}
              style={ORDER_STYLES.textarea}
              onChangeText={text => console.log(text)}
              defaultValue={null}
              maxLength={150}
              placeholder={'Enter review'}
              placeholderTextColor={COLORS.darkGrey}
              underlineColorAndroid={'transparent'}
            />
            {/* Rating about the comfort */}
            <View>
              <Text style={ORDER_STYLES.question}>
                1. How would you rate the comfort?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Comfort rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Rating about the quality */}
            <View>
              <Text style={ORDER_STYLES.question}>
                2. How would you rate the quality?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Quality rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Rating about the durability */}
            <View>
              <Text style={ORDER_STYLES.question}>
                3. How would you rate the durability?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Durability rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Button component */}
            <Button
              label="Submit review"
              customButtonStyle={ORDER_STYLES.customButton}
            />
            {/* Modal close icon */}
            <View style={GLOBAL_STYLES.modalCloseIconContainer}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Icon name="close" size={scale(20)} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default TicketDetails;
