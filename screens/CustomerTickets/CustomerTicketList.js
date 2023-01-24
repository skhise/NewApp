// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import COLORS from '../../config/COLORS';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import MY_ORDERS_STYLES from '../../styles/screens/MY_ORDERS_STYLES';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SnackbarAlert} from '../../components/ALERTS';
import {ScreenLoader} from '../../components/LOADERS';
import Server from '../../data/Server_Info';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import axios from 'axios';
import FAB from 'react-native-fab';

// Functional component
const TicketList = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [Tickets, setTickets] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [userId,setUserId] = useState(0);
  const [status,setStatus] = useState(0);
  
  useEffect(() => {
    setUserId(route.params.user_id);
    //setStatus(route.params.ticketType);
    LoadCustomerServices(); 
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      LoadCustomerServices(); 
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    
  }, [isAlive])
  
  const LoadCustomerServices = () =>{
    try {
      setLoading(true);
      axios.get(App_Url+'GetTicketListCustomer',{
        params:{
          id:route.params.user_id,
          requesttype:route.params.request
        }
      })
      .then((json)=>{
        setTickets(json.data.tickets);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showAlert("Connection Error!");
      });
    }catch(error){
      setLoading(false);
      showAlert("Connection Error!");
    }
  }
  const showAlert = (message)=>{
    SnackbarAlert(
      message,
      COLORS.white,
      COLORS.orange,
      'Got it',
      COLORS.white,
    )
  };
  // Returning

  if(Loading){
    return <ScreenLoader message="Loading Services..." />;
  }
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>

      {Tickets.length === 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <Animatable.View
            animation="fadeInDown"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../../assets/lottie/checkmark.json')}
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
            No Service History!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any service history for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {Tickets.map((ticket, index) => (
            <Pressable
              key={index}
              style={[
                MY_ORDERS_STYLES.orderContainer,
                {marginTop: index === 0 ? scale(15) : 0},
              ]}
              onPress={() => {
                navigation.navigate('TicketTabCustomer',{userId:userId,id:ticket.service_id,ticketType:status,title:route.params.title})
              } }>
              {/* Order ID */}
              <View style={ADDRESSES_STYLES.addressTypeContainer}>
                      <Icon
                        name="md-bookmark"
                        size={scale(25)}
                        color={COLORS.primary}
                      />
                      <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                      ID - {ticket.service_no}
                      </Text>
                      {ticket.service_status ==1  ? (
                        <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                            GLOBAL_STYLES.activeBackground
                          ]}>
                          <Text style={ADDRESSES_STYLES.statusLabel}>
                          {ticket.Status_Name}
                          </Text>
                        </View>
                      ) : ticket.service_status ==4 ? <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.inProgressBackground
                      ]}>
                      <Text style={ADDRESSES_STYLES.statusLabel}>
                      {ticket.Status_Name}
                      </Text>
                    </View> : <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.activeBackground
                      ]}>
                      <Text style={ADDRESSES_STYLES.statusLabel}>
                      {ticket.Status_Name}
                      </Text>
                    </View>}
                    </View>
              {/* Destinations */}
              <View style={MY_ORDERS_STYLES.destinations}>
                <View style={{alignItems: 'flex-start'}}>
                  <View>
                  <Text style={MY_ORDERS_STYLES.destination}>
                    {ticket.CST_Name}
                  </Text>
                  </View>
                </View>
                <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowValue}>{ticket.service_date}</Text>
                </View>  
              </View>
              {/* Order item container */}
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
            </Pressable>
          ))}

        </ScrollView>
      )}
     <FAB 
      buttonColor={COLORS.primary} 
      iconTextColor="#FFFFFF" 
      onClickAction={() => {LoadCustomerServices();}}
       visible={true}
        iconTextComponent={<Icon name="reload-circle" size={35}/>} />
    </SafeAreaView>
  );
};

// Exporting
export default TicketList;
