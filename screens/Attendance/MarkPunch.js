// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import PERSONAL_DETAILS_STYLES from '../../styles/screens/PERSONAL_DETAILS_STYLES';
import COLORS from '../../config/COLORS';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Server_Info from '../../data/Server_Info';
import App_Api from '../../data/App_API'
import ShowAlert from '../../data/ShowAlert'
import Loader from '../../screens/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import FONTS from '../../config/FONTS';
import { format } from 'date-fns';
import { PERMISSIONS, request } from "react-native-permissions";

//270

// Functional component
const MarkPunch = ({route,navigation}) => {
  // Local states
  let App_Url = Server_Info.api;

  const [punchDate,setPunchDate] =useState(format(new Date(),"dd-MM-yyyy"));
  const [inTime,setInTime] =useState(null);
  const [outTime,setOutTime] =useState(null);
  const [inTimeS,setInTimeS] =useState(null);
  const [outTimeS,setOutTimeS] =useState(null);
  const [inShow,setInShow] = useState(false);
  const [outShow,setOutShow]= useState(false);
  const [Loading,setLoading] = useState(false);
  const [location,setLocation] = useState(null);
  const [isGranted,setIsGranted] = useState(false);
  const [userId,setUserId] = useState(0);
  const isFocused = useIsFocused();
  const GetUser = async() =>{
    try {
     let user_id=route.params.user_id
     setUserId(user_id);
     GetPunch(user_id);
    } catch(error){
      console.log("in error:"+error.message);
    }

  }
  const GetPunch=(userId)=>{

    try{
      if(userId!=0 && userId!=null && userId!=""){
        setLoading(true);
        let params={
          att_date:format(new Date(),"yyyy-MM-dd"),
          User_Id:userId
        };
        console.log(params);
        axios.get(App_Url+""+App_Api.GetPunch,{params:{
          att_date:format(new Date(),"yyyy-MM-dd"),
          User_Id:userId
        }})
        .then(json=>{
          setLoading(false);
          if(json.data.success){
            let att = json.data.attendance;
            
            if(att!=null){
              
              if(att.Att_In==null){
                setInTime(null);
                setInShow(true);
              } else {
                setInTimeS(format(new Date(att.Att_In),"p"));
              } 
              if(att.Att_Out==null){
                setOutTime(null);
                setOutShow(true);
              } else {
                setOutTimeS(format(new Date(att.Att_Out),"p"));
              }
            } else {
              setInTime(null);
              setOutTime(null);
              setInShow(true);
              setOutShow(true);
            }
          } else {
            ShowAlert.ShowAlert(json.data.message,COLORS.red);
          }
        })
        .catch(error=>{
          setLoading(false);
          ShowAlert.ShowAlert(error.message,COLORS.green);
          
          
        })
      } else {
        setLoading(false);
        navigation.goBack();
        ShowAlert.ShowAlert('something went wrong',COLORS.red);
      }
      
    }catch(error){
      setLoading(false);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    }
    
  }
  useEffect(() => {
    GetUser();
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords.latitude+","+position.coords.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log("here"+error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }, [isFocused])
  const GetCurrentLocation = ()=>{

    try {
      request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          })
        ).then(res => {
          if (res == "granted") {
            Geolocation.getCurrentPosition(
              (position) => {
                setLocation(position.coords.latitude+","+position.coords.longitude);
              },
              (error) => {
                // See error code charts below.
                ShowAlert.ShowAlert(error.message,COLORS.red)
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
          } else {
            // console.log("Location is not enabled");
            ShowAlert.ShowAlert("check location permissions",COLORS.red)
          }
        });
      } catch (error) {
        ShowAlert.ShowAlert("check location permissions",COLORS.red)
      }

  }
  const CheckPermission=()=>{
    
    try {
      request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          })
        ).then(res => {
          if (res == "granted") {
            setIsGranted(true);
            console.log("i am here 1 ");
          } 
        });
      } catch (error) {
      }
      
  }
  const SavePunch = (type) => {
    GetCurrentLocation();
    if(isGranted){
      GetCurrentLocation();
      if(location!=null){
        let values = {
          Att_In:new Date(),
          Att_Out:new Date(),
          Att_Date:punchDate,
          Att_In_Location:location,
          Att_Out_Location:location,
          type:type,
          User_ID:userId
        };
        console.log(values);
        try{
          setLoading(true)
          axios.post(App_Url+""+App_Api.MarkPunch,values)
          .then(json=>{
            setLoading(false);
            if(json.data.success){
              if(type == 'in'){
                setInShow(false);
              }
              if(type == 'out'){
                setOutShow(false);
              }
            } else {
              ShowAlert.ShowAlert(json.data.message,COLORS.red);
            }
          })
          .catch(error=>{
            setLoading(false)
            ShowAlert.ShowAlert(error.message,COLORS.red)
          })
        }catch(error){
          setLoading(false)
          ShowAlert.ShowAlert(error.message,COLORS.red)
        }
        
      }else {
        ShowAlert.ShowAlert("Check your location settings.",COLORS.red)
      }
    } else {
      ShowAlert.ShowAlert("Check app location permissions.",COLORS.red)
    }
    
    
    
  }

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {Loading ?<Loader loading={Loading} /> : null}
      <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[
            GLOBAL_STYLES.authFormContainer,
            PERSONAL_DETAILS_STYLES.noBorderRadius,
          ]}>
          {/* Input field name */}
          <View style={[{marginBottom:scale(50)},GLOBAL_STYLES.xyCenter]}>
              <Text style={GLOBAL_STYLES.headerText}>Mark Attendance Punch</Text>
          </View>
          
          {/* Input field city */}
          <View style={GLOBAL_STYLES.flexRow}>
          <TouchableOpacity
                style={[GLOBAL_STYLES.infoBox]}
              >
                <Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>
                Attendance Date
              </Text><Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>
                {punchDate!=null? punchDate:null}
              </Text>
              </TouchableOpacity>
          </View>
          
          <View style={GLOBAL_STYLES.flexRow}>
          {
            inShow ?
            <TouchableOpacity
            style={[{marginTop:scale(18)},GLOBAL_STYLES.infoBox]}
            onPress={()=>{
              setInTimeS(format(new Date(),"hh:mm:s a"));
              SavePunch('in');
            }}
            
          >
            <Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>Mark Punch In</Text>
            </TouchableOpacity>
            :<TouchableOpacity
            style={[{marginTop:scale(18)},GLOBAL_STYLES.infoBox]}
          >
            <Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>{inTimeS!=null ? inTimeS:null}</Text>
            <Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>In Time Marked</Text>
            </TouchableOpacity>
          }
          {
            outShow ? 
            <TouchableOpacity
            style={[{marginTop:scale(18)},GLOBAL_STYLES.infoBox]}
            onPress={()=>{
              setOutTimeS(format(new Date(),"hh:mm:s a"));
              SavePunch('out');
            }}
          >
            <Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>Mark Punch Out</Text>
            </TouchableOpacity> 
            : <TouchableOpacity
            style={[{marginTop:scale(18)},GLOBAL_STYLES.infoBox]}
          >
            <Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>{outTimeS!=null ? outTimeS:null}</Text>
            <Text style={{color:COLORS.white,fontSize:FONTS.sizes.large}}>Out Time Marked</Text>
            </TouchableOpacity> 
          }
          
          </View>
        </Animatable.View>
      
    </SafeAreaView>
  );
};

// Exporting
export default MarkPunch;
