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
import { format } from 'date-fns';
// Functional component
const VisitList = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  
  const [myVisits, setMyVisits] = useState([]);

  const [selectedMonth,setSetelectedMonth] = useState({id:(new Date().getMonth()+1)<10 ? "0"+(new Date().getMonth()+1):(new Date().getMonth()+1) });
  const [selectedYear,setSetelectedYear] = useState({id:new Date().getFullYear().toString()});
  const [Loading,setLoading] = useState(false);
  const [userId,setUserId] = useState(0);
  
  const getUser = async()=>{
    const userId  = await LocalCart.getUserId();
    LoadVisits(userId); 
    setUserId(userId);
  } 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });
    return unsubscribe;
  }, [])

  const LoadVisits = async(userId) =>{
    try {
      setLoading(true);
      let  params={
        User_ID:userId,
        month: selectedMonth.id,
        year:selectedYear.id,
        
      }
      console.log(params);
      axios.get(App_Url+App_API.GetUserVisitsById,{
        params:{
          User_ID:userId,
          month: selectedMonth.id,
          year:selectedYear.id,
          
        }
      })
      .then((json)=>{
        console.log(json.data)
        if(json.data.success)
        {
          setMyVisits(json.data.visits);
        }
        
        setLoading(false);
      })
      .catch((error) => {
        setMyVisits([])
        setLoading(false);
        showAlert(error.message);
      });
    }catch(error){
      setMyVisits([])
      setLoading(false);
      showAlert(error.message);
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
  
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {Loading ?<Loader loading={Loading} /> : null}
      <View style={{margin:scale(15),flexDirection:'row-reverse'}}>
        <TouchableOpacity
          style={[GLOBAL_STYLES.ButtonApply,{paddingLeft:50,paddingRight:50}]}
          onPress={()=>{
            navigation.navigate("NewVisit")
          }}>
            <Text style={{color:COLORS.white,fontSize:20}}>New Visit</Text>
        </TouchableOpacity>
      </View>
      <View style={[{marginLeft:scale(5)},GLOBAL_STYLES.headerText]}>
        <Text>Visit Filter</Text>
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
          dataSet={[{id:'1',title:'January'},
          {id:'2',title:'February'},
          {id:'3',title:'March'},
          {id:'4',title:'April'},
          {id:'5',title:'May'},
          {id:'6',title:'June'},
          {id:'7',title:'July'},
          {id:'8',title:'August'},
          {id:'9',title:'September'},
          {id:'10',title:'October'},
          {id:'11',title:'November'},
          {id:'12',title:'December'}]}
          initialValue={{id:(new Date().getMonth()+1).toString()}}
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
        onPress={()=>{LoadVisits(userId)}}
      >
       
        </IconButton> 
      </View>
      {myVisits?.length === 0 ? (
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
            No Visit History!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any visit history for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {myVisits?.map((visit, index) => (
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
                      {visit.visitStatus ==1  ? (
                        
                        <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                            GLOBAL_STYLES.activeBackground,
                            {marginLeft:15}
                          ]}>
                          <Text style={{color:COLORS.white}}>
                          {visit.status_name}
                          </Text>
                        </View>
                      ) : visit.visitStatus ==2 ? <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.inProgressBackground,
                        {marginLeft:15}
                      ]}>
                      <Text style={{color:COLORS.white}}>
                      {visit.status_name}
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
                    Visit Date: {format(new Date(visit.visitDate),"dd-M-Y")}
                  </Text>
                  </View>
                  
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <View>
                  <Text style={MY_ORDERS_STYLES.destination}>
                  Type: {visit.type_name}
                  </Text>
                  </View>
                  
                </View>
              </View>
              {/* Order item container */}
              <View style={ORDER_STYLES.row}>
              <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowTitle}>
                    Source
                  </Text>
              </View>
                  <Text style={ORDER_STYLES.rowValueFlex}>
                    {visit.fromLocation}
                  </Text>
              </View>
              <View style={ORDER_STYLES.row}>
              <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowTitle}>
                    Destination
                  </Text>
              </View>
                  <Text style={ORDER_STYLES.rowValueFlex}>
                    {visit.toLocation}
                  </Text>
              </View>
              <View style={ORDER_STYLES.row}>
              <View style={ORDER_STYLES.row}>
                  <Text style={ORDER_STYLES.rowTitle}>
                  Distance
                  </Text>
              </View>
                  <Text style={[ORDER_STYLES.rowValueFlex]}>
                    {visit.totalKm}
                  </Text>
              </View>
            
            </Pressable>
          ))}

        </ScrollView>
      )}
     
    </SafeAreaView>
  );
};

// Exporting
export default VisitList;
