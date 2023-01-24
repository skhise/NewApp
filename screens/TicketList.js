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
import COLORS from '../config/COLORS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import MY_ORDERS_STYLES from '../styles/screens/MY_ORDERS_STYLES';
import ADDRESSES_STYLES from '../styles/screens/ADDRESSES_STYLES';
import ORDERS from '../data/ORDERS';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SnackbarAlert} from '../components/ALERTS';
import {ScreenLoader} from '../components/LOADERS';
import Server from '../data/Server_Info';
import ShowAlert from '../data/ShowAlert';
import { format } from "date-fns";
import ORDER_STYLES from '../styles/screens/ORDER_STYLES';
import { color } from 'react-native-reanimated';
import FAB from 'react-native-fab'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

// Functional component
const TicketList = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [Tickets, setTickets] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [userId,setUserId] = useState(0);
  const [status,setStatus] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchData();
  }, [isFocused])
  
  const fetchData = () =>{
    try{
        setUserId(route.params.user_id);
        setStatus(route.params.ticketType);
        setLoading(true);
        fetch(App_Url+'GetTickets?id='+route.params.user_id+"&status="+route.params.ticketType)
        .then((response) => response.json())
        .then((json)=>{
          console.log(json);
          setTickets(json.tickets);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          ShowAlert.ShowAlert("Connection Error!",COLORS.red);
        });
    } catch(error){
      ShowAlert.ShowAlert("Connection Error!",COLORS.red);
    }

  }
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {
        Loading 
        ?
        <ScreenLoader message="Loading Tickets..." />
        :
        <View>
{Tickets.length === 0 ? (
        <View style={[GLOBAL_STYLES.orderContainer, GLOBAL_STYLES.xyCenter]}>
          <Animatable.View
            animation="fadeInDown"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/checkmark.json')}
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
            No Tickets!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any tickets for now.
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
                status ==2 ?
                navigation.navigate('TicketDetails',{userId:userId,id:ticket.service_id,ticketType:status,title:route.params.title})
                :
                navigation.navigate('TicketTabTop',{userId:userId,id:ticket.service_id,ticketType:status,title:route.params.title})
              } }>
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
                <View style={[{alignItems: 'flex-start'}]}>
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
                    {
                ticket.resolvedDate !=null
                ?
                <View style={ORDER_STYLES.rowStatus}>
              <View   style={[
                            ADDRESSES_STYLES.statusContainerSuccess,
                            GLOBAL_STYLES.xyCenter,
                          
                          ]}>
                    <Text style={[MY_ORDERS_STYLES.itemTitle,ADDRESSES_STYLES.statusLabel]}>
                        Resolved At 
                      </Text>
                    </View>
                    <Text>
                      {ticket.resolvedDate}
                    </Text>
              </View>
                :
                null
              }
              </View>
              </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
        </View>
      }
      
      <FAB 
      buttonColor={COLORS.primaryDark} 
      iconTextColor={COLORS.white} 
      onClickAction={() => {fetchData();}}
       visible={true}
        iconTextComponent={<Icon name="reload-circle" size={100}/>} />
    </SafeAreaView>
  );
};

// Exporting
export default TicketList;
