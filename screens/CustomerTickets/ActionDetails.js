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
import COLORS from '../../config/COLORS';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import ADDRESSES_STYLES from '../../styles/screens/ADDRESSES_STYLES';
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
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
const ActionDetails = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [ticket,setTicket] = useState([]);
  const [HistoryList,setHistoryList] = useState([]);
  const isFocused = useIsFocused();
  
  React.useEffect(() => {
    GetTicketsDetails();
  }, [isFocused]);

  const GetTicketsDetails = async () => {
    
    try {
      const user_id =route.params.userId;
      const id = route.params.id;
      setLoading(true);
      axios.get(App_Url+'GetServiceTicketByIdCustomer',{
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
      showAlert("Connection Error ss!",COLORS.red);
    });
  }

  useEffect(() => {
    GetTicketsDetails();
    GetTicketsHistory();
    return () => setIsAlive(false)
  }, [isAlive])


  const showAlert = (message,color)=> {
    SnackbarAlert(
      message,
      COLORS.white,
      color,
      'Got it',
      COLORS.white,
    )
  };
  

  // Returning

  if(Loading){
    return <ScreenLoader message="Loading Details..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
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
                
              </View>
              
        </Animatable.View>
         {/* Actions */}
         
        <Animatable.View
            animation="fadeInUp"
            easing="ease-in-out-sine"
            style={[
              ORDER_STYLES.sectionContainer,
            ]}>
                 <View>
            <Text style={[{fontSize:scale(20)}]}>Action History</Text>
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
