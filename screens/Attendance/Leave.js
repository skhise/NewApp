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
import Loader from '../Loader/Loader';
import Server from '../../data/Server_Info';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import axios from 'axios';
import LocalCart from '../../data/LocalCart';
import FAB from 'react-native-fab';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { IconButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import App_API from '../../data/App_API';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import ShowAlert from '../../data/ShowAlert';
// Functional component
const Leave = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const isFocused = useIsFocused();
  const [myLeave, setMyLeave] = useState([]);
  
  const [selectedYear,setSetelectedYear] = useState({id:new Date().getFullYear().toString()});
  const [Loading,setLoading] = useState(false);
  const [userId,setUserId] = useState(0);
  const  Months =[
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
  ];
  const [selectedMonth,setSetelectedMonth] = useState(Months[new Date().getMonth()]);
  const getUser = async()=>{
    console.log(selectedMonth);
    const userId = await LocalCart.getUserId();
    LoadLeaves(userId); 
    setUserId(userId);
  } 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });
    return unsubscribe;
  }, []);

  const LoadLeaves = async(userId) =>{
    try {
      setLoading(true);
      let params={
        User_ID:userId,
        month: selectedMonth.id,
        year:selectedYear.id,
      }
      axios.create().timeOut = 1500;
      axios.get(App_Url+App_API.GetLeaves,{
        params:{
          User_ID:userId,
          month: selectedMonth.id,
          year:selectedYear.id,
        }
      })
      .then((json)=>{
        console.log(json.data);
        if(json.data.success)
        {
          setMyLeave(json.data.leaves);
        } else {
          setMyLeave([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMyLeave([]);
        alert(error.message);
      });
    }catch(error){
      setLoading(false);
      alert(error.message);
      setMyLeave([])
     
    }
  }

  
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {Loading ?<Loader loading={Loading} /> : null}
      <View style={{margin:scale(15),flexDirection:'row-reverse'}}>
        <TouchableOpacity
          style={[GLOBAL_STYLES.ButtonApply,{paddingLeft:50,paddingRight:50}]}
          onPress={()=>{
            navigation.navigate("NewLeave")
          }}>
            <Text style={{color:COLORS.white,fontSize:20}}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={[{marginLeft:scale(5)},GLOBAL_STYLES.headerText]}>
        <Text>Select Leaves Filter</Text>
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
          dataSet={Months}
          initialValue={selectedMonth}
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
        onPress={()=>{LoadLeaves(userId)}}
      >
       
        </IconButton> 
      </View>
      {myLeave?.length === 0 ? (
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
            No Leave History!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any leave history for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {myLeave?.map((ticket, index) => (
            <Pressable
              key={index}
              style={[
                MY_ORDERS_STYLES.orderContainer,
                {marginTop: index === 0 ? scale(15) : 0},
              ]}
              >
              {/* Order ID */}
              <View style={ADDRESSES_STYLES.addressTypeContainer}>
                      <Icon
                        name="calendar-outline"
                        size={scale(25)}
                        color={COLORS.primary}
                      />   
                      {ticket.Leave_Status ==0  ? (
                        <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                            GLOBAL_STYLES.activeBackground
                          ]}>
                          <Text style={{color:COLORS.white}}>
                          Pending
                          </Text>
                        </View>
                      ) : ticket.Leave_Status ==1 ? <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.inProgressBackground
                      ]}>
                      <Text style={{color:COLORS.white}}>
                      Approved
                      </Text>
                    </View> : <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.activeBackground
                      ]}>
                      <Text style={{color:COLORS.white}}>
                      Rejected
                      </Text>
                    </View>}
                    </View>
              {/* Destinations */}
              <View style={MY_ORDERS_STYLES.destinations}>
                <View style={{alignItems: 'flex-start'}}>
                  <View>
                  <Text style={MY_ORDERS_STYLES.destination}>
                    From: {format(new Date(ticket.From_Date),"dd-MM-Y")}
                  </Text>
                  </View>
                </View>
                <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowValue}>
                  To: {format(new Date(ticket.To_Date),"dd-MM-Y")}
                    </Text>
                </View>  
              </View>
              {/* Order item container */}
              <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowValue}>
                    Reason:  {ticket.Leave_Reason}
                  </Text>
              </View>
              <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowValue}>
                    Leave Status Note
                  </Text>
              </View>
              <View style={MY_ORDERS_STYLES.orderItemContainer}>
                <View style={MY_ORDERS_STYLES.item}>
                  <View style={MY_ORDERS_STYLES.itemInfo}>
                    <View>
                      <Text style={MY_ORDERS_STYLES.itemShortDetails}>
                        {ticket.Update_Note}
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
export default Leave;
