// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import PERSONAL_DETAILS_STYLES from '../../styles/screens/PERSONAL_DETAILS_STYLES';
import COLORS from '../../config/COLORS';
import {Button} from '../../components/BUTTONS';
import {scale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import axios from 'axios';
import Server_Info from '../../data/Server_Info';
import App_Api from '../../data/App_API'
import ShowAlert from '../../data/ShowAlert'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';

// Functional component
const MarkPunch = ({route,navigation}) => {
  // Local states
  let App_Url = Server_Info.api;

  const [fromDate,setFromDate] =useState(new Date());
  const [toDate,setToDate] =useState(new Date());

  const [message, setMessage] = useState('');
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [openFromDate,setOpenFromDate] = useState(false);
  const [openToDate,setOpenToDate] = useState(false);
  const [userId,setUserId] = useState(0);
  const isFocused = useIsFocused();
  const GetUser = async() =>{
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null) {
        let loginUser = JSON.parse(data);  
        setUserId(loginUser.id);
       }
       
    } catch(error){
      console.log("in error");
    }

  }
  useEffect(() => {
    GetUser();
    
  }, [isFocused])
  // Toggling password visibility
  const _togglePasswordVisibility = () => {
    setIsPasswordInvisible(!isPasswordInvisible);
  };
  const SaveLeave = () => {

    let values = {
      fromDate:fromDate,
      toDate:toDate,
      message:message,
      User_ID:userId
    };
    try{
      console.log(values);
      setIsSubmitting(true)
      axios.post(App_Url+""+App_Api.LeaveApply,values)
      .then(json=>{
        setIsSubmitting(false);
        if(json.data.success){
          ShowAlert.ShowAlert(json.data.message,COLORS.green);
          navigation.navigate('Leave');
        } else {
          ShowAlert.ShowAlert(json.data.message,COLORS.red);
        }
      })
      .catch(error=>{
        setIsSubmitting(false);
        ShowAlert.ShowAlert(error.message,COLORS.red);
      })
    }catch(error){
      setIsSubmitting(false);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    }
    
    
  }

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <DatePicker
        modal
        open={openFromDate}
        date={fromDate}
        mode='date'
        onConfirm={(date) => {
          setOpenFromDate(false)
          setFromDate(date)
        }}
        onCancel={() => {
          setOpenFromDate(false);
        }}
      />
      <DatePicker
        modal
        open={openToDate}
        date={toDate}
        mode='date'
        onConfirm={(date) => {
          setOpenToDate(false)
          setToDate(date)
        }}
        onCancel={() => {
          setOpenToDate(false);
        }}
      />
    
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[
          GLOBAL_STYLES.authFormFlexArea,
          {backgroundColor: COLORS.white},
        ]}
        contentContainerStyle={GLOBAL_STYLES.scrollviewContentContainer}>
          
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
          {/* Input field city */}
          <View>
              <Text style={GLOBAL_STYLES.headerText}>Fill Leave Application</Text>
              <Text style={GLOBAL_STYLES.infoText}>(all * marked fields required.)</Text>

          </View>
          <View style={GLOBAL_STYLES.flexRow}>
            <View style={[GLOBAL_STYLES.inputGroup,GLOBAL_STYLES.flexOneContainer]}>
              <Text style={GLOBAL_STYLES.inputLabel}>From Date *</Text>
              <Text
                style={GLOBAL_STYLES.textInput}
              >{format(new Date(fromDate),"dd-MM-Y")}</Text>
            </View>
            <IconButton
            style={[{marginTop:scale(18)},GLOBAL_STYLES.iconButton]}
            icon='calendar'
            color='#ffffff'
            sizes={30} 
            onPress={()=>{setOpenFromDate(true);}}
          >
          
            </IconButton> 
          </View>
          <View style={GLOBAL_STYLES.flexRow}>
            <View style={[GLOBAL_STYLES.inputGroup,GLOBAL_STYLES.flexOneContainer]}>
              <Text style={GLOBAL_STYLES.inputLabel}>To Date *</Text>
              <Text
                style={GLOBAL_STYLES.textInput}
              >{format(new Date(toDate),"dd-MM-Y")}</Text>
            </View>
            <IconButton
            style={[{marginTop:scale(18)},GLOBAL_STYLES.iconButton]}
            icon='calendar'
            color='#ffffff'
            sizes={30} 
            onPress={()=>{setOpenToDate(true);}}
          >
          
            </IconButton> 
          </View>
          <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
            <Text style={GLOBAL_STYLES.inputLabel}>Note *</Text>
            <TextInput
              placeholder="Enter your message"
              multiline={true}
              numberOfLines={6}
              placeholderTextColor={COLORS.fontLight}
              style={[GLOBAL_STYLES.textInputArea]}
              value={message}
              onChangeText={value=>{
                setMessage(value);
              }}
            />
            
          </View>
          {/* Button component */}
          
        </Animatable.View>
      </ScrollView>
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
           <Button label="Submit Application"
          disabled={isSubmitting}
          onPress={SaveLeave}
          />
            
          </View>

          {/* <View
          style={{marginTop:10,color:COLORS.orange}}>
            <Button
              label="Field Report"
              customButtonStyle={[
                GLOBAL_STYLES.marginYNone,
              ]}
              onPress={openModelR}
            />
            
          </View> */}
        </Animatable.View>
    </SafeAreaView>
  );
};

// Exporting
export default MarkPunch;
