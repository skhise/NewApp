// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
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
import Loader from '../../screens/Loader/Loader';
import Server from '../../data/Server_Info';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import axios from 'axios';
import FAB from 'react-native-fab';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import LocalCart from '../../data/LocalCart';
// Functional component
const Attendance = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [MyAttendance, setMyAttendance] = useState([]);
  const [selectedMonth,setSetelectedMonth] = useState({id:(new Date().getMonth()+1)<10 ? "0"+(new Date().getMonth()+1):(new Date().getMonth()+1) });
  const [selectedYear,setSetelectedYear] = useState({id:new Date().getFullYear().toString()});
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [userId,setUserId] = useState(0);
    useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserId();
    });
    return unsubscribe;
  }, []);
  const getUserId= async()=>{
    let userId = await LocalCart.getUserId();
    setUserId(userId);
    LoadAttendance(userId);
  }
  const LoadAttendance = (userId) =>{
    try {
      console.log("userId:"+userId);
      axios.create().timeOut = 1500;
      let month = selectedMonth =="" ? parseInt(new Date().getMonth())+1 : selectedMonth.id;
      var year = selectedYear =="" ? new Date().getFullYear() : selectedYear.id;
      console.log(month,year);
      setLoading(true);
      axios.get(App_Url+'GetEngineerAttendance',{params:{
        userId:userId,
        month:month ,
        year:year,
      }})
      .then((json)=>{
        console.log(json.data);
        setMyAttendance(json.data.attendance);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setMyAttendance([]);
        setLoading(false);
        alert(error.message);
      });
    }catch(error){
      console.log(error.message);
      setMyAttendance([]);
      setLoading(false);
      alert(error.message);
    }
  }

  
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {Loading ?<Loader loading={Loading} /> : null}
      <View style={[{marginTop:scale(20),marginLeft:scale(5)},GLOBAL_STYLES.headerText]}>
        <Text>Select Attendance Filter</Text>
        </View>
      <View style={[GLOBAL_STYLES.flexRow]}>
      <View style={[GLOBAL_STYLES.inputGroup,GLOBAL_STYLES.flexOneContainer,{margin:scale(5)}]}>
        <AutocompleteDropdown
          clearOnFocus={false}
          style={[GLOBAL_STYLES.inputLabel]}
          closeOnBlur={true}
          textInputProps={{
            placeholder: 'Select Month',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              backgroundColor: COLORS.white,
              color: COLORS.black,
              paddingLeft: 18,
            },
          }}
          
          inputContainerStyle={[GLOBAL_STYLES.autoComplete]}
          onSelectItem={setSetelectedMonth}
          dataSet={[
            {id:'01',title:'January'},
            {id:'02',title:'February'},
            {id:'03',title:'March'},
            {id:'04',title:'April'},
            {id:'05',title:'May'},
            {id:'06',title:'June'},
            {id:'07',title:'July'},
            {id:'08',title:'August'},
            {id:'09',title:'September'},
            {id:'10',title:'October'},
            {id:'11',title:'November'},
            {id:'12',title:'December'},
          ]}
          initialValue={{id:(new Date().getMonth()+1)<10 ? "0"+(new Date().getMonth()+1).toString() :(new Date().getMonth()+1).toString()}}
          useFilter={false}
        />
      </View>
      <View style={[GLOBAL_STYLES.inputGroup,GLOBAL_STYLES.flexOneContainer,{margin:scale(5)}]}>
        <AutocompleteDropdown
          clearOnFocus={false}
          style={GLOBAL_STYLES.inputLabel}
          closeOnBlur={true}
          textInputProps={{
            placeholder: 'Select Year',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              backgroundColor: COLORS.white,
              color: COLORS.black,
              paddingLeft: 18,
            },
          }}
          inputContainerStyle={[GLOBAL_STYLES.autoComplete]}
          onSelectItem={setSetelectedYear}
          dataSet={[
            {id:'2018',title:'2018'},
            {id:'2019',title:'2019'},
            {id:'2020',title:'2020'},
            {id:'2021',title:'2021'},
            {id:'2022',title:'2022'},
            {id:'2023',title:'2023'},
            {id:'2024',title:'2024'},{id:'2025',title:'2025'},{id:'2026',title:'2026'}]}
          initialValue={{id:new Date().getFullYear().toString()}}
          useFilter={false}
        />
      </View>  
      <IconButton
        style={[{margin:scale(5)},GLOBAL_STYLES.iconButton]}
        icon='sync'
        color='#ffffff'
        size={25} 
        onPress={()=>{LoadAttendance(userId)}}
      >
       
        </IconButton> 
      </View>
      {MyAttendance?.length === 0 ? (
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
            No Attendance History!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any attendance history for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {MyAttendance?.map((att, index) => (
            <Pressable
              key={index}
              style={[
                MY_ORDERS_STYLES.orderContainer,
                {marginTop: index === 0 ? scale(15) : 0},
              ]}
              onPress={() => {
               // navigation.navigate('TicketTabCustomer',{userId:userId,id:att.service_id,ticketType:status,title:route.params.title})
              } }>
              {/* Order ID */}
              <View style={ADDRESSES_STYLES.addressTypeContainer}>
                      <Icon
                        name="calendar"
                        size={scale(25)}
                        color={COLORS.primary}
                      />
                      <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                      {att.att_date}
                      </Text>
                      {/* {att.service_status ==1  ? (
                        <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                            GLOBAL_STYLES.activeBackground
                          ]}>
                          <Text style={ADDRESSES_STYLES.statusLabel}>
                          {att.Status_Name}
                          </Text>
                        </View>
                      ) : att.service_status ==4 ? <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.inProgressBackground
                      ]}>
                      <Text style={ADDRESSES_STYLES.statusLabel}>
                      {att.Status_Name}
                      </Text>
                    </View> : <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.activeBackground
                      ]}>
                      <Text style={ADDRESSES_STYLES.statusLabel}>
                      {att.Status_Name}
                      </Text>
                    </View>} */}
                    </View>
              {/* Destinations */}
              <View style={MY_ORDERS_STYLES.destinations}>
                <View style={{alignItems: 'flex-start'}}>
                  <View>
                  <Text style={MY_ORDERS_STYLES.destination}>
                   In : {att.att_intime!=null ? format(new Date(att.Att_In) ,"p"):"00:00"}
                  </Text>
                  
                  </View>
                </View>
                <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowValue}> Out : {att.att_outtime!=null? format(new Date(att.Att_Out) ,"p"):'00:00'}</Text>
                </View>  
              </View>
              {/* Order item container */}
              <Text style={MY_ORDERS_STYLES.itemTitle}>
                        Remark
              </Text>
              <View style={MY_ORDERS_STYLES.orderItemContainer}>
                
                <View style={MY_ORDERS_STYLES.item}>
                  
                  <View style={MY_ORDERS_STYLES.itemInfo}>
                    <View>
                     
                      <Text style={MY_ORDERS_STYLES.itemShortDetails}>
                        {att.att_remark}
                      </Text>
                    </View>
                   </View>
                </View>
              </View>
            </Pressable>
          ))}

        </ScrollView>
      )}
     
    </SafeAreaView>
  );
};

// Exporting
export default Attendance;
