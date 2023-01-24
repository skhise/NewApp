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
  Alert,
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
import BUTTON_STYLES from '../../styles/components/BUTTON_STYLES';
import axios from 'axios';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
const ActionDetails = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [ticket,setTicket] = useState([]);
  const [accessoryList,setAccessoryList] = useState([]);
  const [statusList,setStatusList] = useState([]);
  const [reasonList,setReasonList] = useState([]);
  const [HistoryList,setHistoryList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { width } = Dimensions.get("window");
  const [isModalVisibleR, setModalVisibleR] = useState(false);
  const [actionNote,setActionNote] = useState("");
  const [selectedStatus,setSelectedStatus] = useState(null);
  const [selectedReason,setSelectedReason] = useState(null);
  const isFocused = useIsFocused();
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
        showAlert(error.message, COLORS.red,COLORS.red);
      }
  }
  const GetTicketsHistory = async () => {
    const user_id =route.params.userId;
    const id = route.params.id;
    fetch(App_Url+'GetServiceHistoryApp?id='+id)
    .then((response) => response.json())
    .then((json)=> {
        setHistoryList(json.history);
    })
    .catch((error) => {
      showAlert("Connection Error!",COLORS.red);
    });
  }

  useEffect(() => {
    GetTicketsDetails();
    GetTicketsHistory();
  }, [isFocused])

  const getStatus = async () => {
    const response = await fetch(App_Url+"GetStatusListApp")
    const items = await response.json()
    const status = items.map((item) => ({
        id: item.Status_Id,
        title: item.Status_Name
    }))
    setStatusList(status);
}
const getReasons = async () => {
  const response = await fetch(App_Url+"GetReasonList")
  const items = await response.json()
  const reasons = items.map((item) => ({
      id: item.id,
      title: item.reason_name
  }))
  setReasonList(reasons)
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
  
  const ApplyAction = ()=>{
    const user_id =route.params.userId;
    const id = route.params.id;
    const ticketType = route.params.ticketType;
    if(selectedStatus!=null && selectedReason!=null) {
      setIsSubmitting(true);
      const data = "?service_id="+id+"&status_id="+selectedStatus.id+"&reason_id="+selectedReason.id+"&user_id="+user_id+"&action_description="+actionNote;
      fetch(App_Url+'ApplyServiceAction'+data)
      .then((response) => response.json())
      .then((json)=> {
        setIsSubmitting(false);
        if(json.success) {
          //showAlert(json.message,COLORS.green);
          Alert.alert(
            "Message",
            json.message,
            [
              { text: "OK", onPress: () => {
                navigation.navigate('Home',{title:route.params.title,ticketType:ticketType,user_id:user_id});
              }}
            ]
          );
          closeModelR();
          GetTicketsHistory();
        
        } else {
          showAlert(json.message,COLORS.red);
        }
  
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        showAlert("Server Error!",COLORS.red);
        
      });
    } else if(selectedStatus == null){
      showAlert("select ticket status",COLORS.red);
    } else if(selectedReason == null){
      showAlert("select action reason",COLORS.red);
    } else {
      showAlert("Unknow error, try again",COLORS.red);
    }
    
  }
  const openModelR = () => {
    setIsSubmitting(true);
    getReasons();
    getStatus();
    setModalVisibleR(true);
    setIsSubmitting(false);
};
const closeModelR = () => {
  setModalVisibleR(false);
  setSelectedStatus(null);
  setSelectedReason(null);
};

  // Returning

  if(Loading){
    return <ScreenLoader message="Loading Details..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
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
              onSelectItem={setSelectedStatus}
              clearOnFocus={false}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Select Status",
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
              
              dataSet={statusList}
              useFilter={false}
            />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
            <AutocompleteDropdown
             onSelectItem={setSelectedReason}
             clearOnFocus={false}
             closeOnBlur={true}
              textInputProps={{
                placeholder:"Select Reason",
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
              dataSet={reasonList}
            />
            </View>
          
         
            
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter your text here..."
                placeholderTextColor={COLORS.darkGrey}
                multiline={true}
                numberOfLines={3}
                onChangeText={(value)=>{
                  setActionNote(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputArea,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
           
            <Button
              label="Apply"
              customButtonStyle={[
                {marginVertical: 0},
                {marginTop: scale(10)},
                
              ]}
              disabled={isSubmitting}
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
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      
        {/* Order container */}
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
                      <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                      ID - {ticket.service_no}
                      </Text>
                      <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                          ]}>
                          <Text style={ADDRESSES_STYLES.statusLabel}>
                          {ticket.service_date}
                          </Text>
                        </View>
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
         {/* Actions */}
         {
           ticket.service_status !=6 ?
           <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Actions</Text>
          {/* Action buttons */}
          <View
          >
            <Button
              label="action"
              customButtonStyle={[
                GLOBAL_STYLES.marginYNone,
              ]}
              disabled={isSubmitting}
              style={{marginTop:scale(10)}}
              onPress={openModelR}
            />
            
          </View>
        </Animatable.View>
           :
           null
         }
         
        <Animatable.View
            animation="fadeInUp"
            easing="ease-in-out-sine"
            style={[
              ORDER_STYLES.sectionContainer,
              ORDER_STYLES.sectionContainerMarginTicket,
            ]}>
                 <View>
            <Text>Action History</Text>
        </View>
            </Animatable.View>
       
        {HistoryList.map((history, index) => (
            <Animatable.View
            key={index}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={[
              ORDER_STYLES.sectionContainer,
            ]}>
            {/* Order ID */}
            <View style={ADDRESSES_STYLES.addressTypeContainer}>
                        <Icon
                          name="sync-circle"
                          size={scale(20)}
                          color={COLORS.primary}
                        />
                        <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                        {history.historyDate}
                        </Text>
                        {true ? (
                          <View
                            style={[
                              ADDRESSES_STYLES.statusContainer,
                              GLOBAL_STYLES.xyCenter,
                            ]}>
                            <Text style={ADDRESSES_STYLES.statusLabel}>
                            {history.Status_Name}
                            </Text>
                          </View>
                        ) : null}
                      </View>
            {/* Destinations */}
            <View style={MY_ORDERS_STYLES.destinations}>
                  <View style={{alignItems: 'flex-start'}}>
                    <View>
                    <Text style={MY_ORDERS_STYLES.destination}>
                      {history.reason_name}
                    </Text>
                    </View>
                 
                    <Text style={MY_ORDERS_STYLES.date}>
                      {history.action_description}
                    </Text>
                  </View>
                  
                </View>
                
          </Animatable.View>
           
          ))}
        
        
       

        
        
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
export default ActionDetails;
