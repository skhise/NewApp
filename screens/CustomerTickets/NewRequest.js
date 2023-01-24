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
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import DatePicker from 'react-native-date-picker'
// Functional component
const NewInquiry = ({props,navigation}) => {
  // Local states
  let App_Url = Server_Info.api;

  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate,setVisitDate] =useState(new Date());
  const [visitTime,setVisitTime] =useState(new Date());
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [isAlive,setIsAlive] = useState(false);
  const [userId,setUserId] = useState(0);
  const [issueType,setIssueType] = useState(0);
  const [serviceType,setServiceType] = useState(0);
  const [ServiceTypeList,setServiceTypeList] = useState([]);
  const [IssueTypeList,setIssueTypeList] = useState([]);
  const [openVisitDate,setOpenVisitDate] = useState(false);
  const [openVisitTime,setOpenVisitTime] = useState(false);

  const GetData = async()=>{
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null) {
        let loginUser = JSON.parse(data);  
        setUserId(loginUser.id);
        setName(loginUser.name);
        setEmail(loginUser.email)
        setPhone(loginUser.CCP_Phone1)
        setAddress(loginUser.CST_OfficeAddress)
        getServiceType();
        getIssueType();
       // console.log("id:"+loginUser.id);
      }
      
    } catch(error){
      console.log("in error");
    }
  }
  useEffect(() => {
    GetData();
    return () => setIsAlive(false)
    
  }, [isAlive])
  // Toggling password visibility
  const _togglePasswordVisibility = () => {
    setIsPasswordInvisible(!isPasswordInvisible);
  };
  const SaveInquiry = () => {

    let values = {
      name:name,
      email:email,
      phone:phone,
      visitTime:visitTime,
      visitDate:visitDate,
      address:address,
      message:message,
      Customer_Id:userId,
      issue_type:issueType!=null ? issueType.id:0,
      service_type:serviceType!=null ? serviceType.id : 0,
    };
    try{
      console.log(values);
      setIsSubmitting(true)
      axios.post(App_Url+""+App_Api.NewRequest,values)
      .then(json=>{
        setIsSubmitting(false);
        if(json.data.success){
          ShowAlert.ShowAlert(json.data.message,COLORS.green);
          navigation.navigate('Home');
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

  const getServiceType = async () => {
    const response = await fetch(App_Url+App_Api.ServiceType)
    const items = await response.json()
    const serviceType = items.map((item) => ({
        id: item.id,
        title: item.type_name
    }))
    setServiceTypeList(serviceType);
}
const getIssueType = async () => {
  const response = await fetch(App_Url+App_Api.IssueType)
  const items = await response.json()
  const issueType = items.map((item) => ({
      id: item.id,
      title: item.issue_name
  }))
  setIssueTypeList(issueType)
}


  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>

      <DatePicker
        modal
        open={openVisitDate}
        date={visitDate}
        mode='date'
        onConfirm={(date) => {
          setOpenVisitDate(false)
          setVisitDate(date)
        }}
        onCancel={() => {
          setOpenVisitDate(false);
        }}
      />
      <DatePicker
        modal
        open={openVisitTime}
        date={visitTime}
        mode='time'
        onConfirm={(date) => {
          setOpenVisitTime(false)
          setVisitTime(date)
        }}
        onCancel={() => {
          setOpenVisitTime(false)
        }}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
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
            GLOBAL_STYLES.yCenter,
            PERSONAL_DETAILS_STYLES.noBorderRadius,
          ]}>
          {/* Input field name */}
          <View>
              <Text style={GLOBAL_STYLES.headerText}>Fill New Service Request Form</Text>
              <Text style={GLOBAL_STYLES.infoText}>(all * marked fields required.)</Text>

          </View>
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Name *</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={name}
              onChangeText={value=>{
                setName(value);
              }}
            />
          </View>
          {/* Input field mobile */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Phone *</Text>
            <TextInput
              placeholder="Enter your phone"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              keyboardType="numeric"
              value={phone}
              onChangeText={value=>{
                setPhone(value);
              }}
            />
          </View>
          {/* Input field email */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Email *</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              keyboardType='email-address'
              value={email}
              onChangeText={value=>{
                setEmail(value);
              }}
            />
          </View>
          <View style={GLOBAL_STYLES.inputGroup}>
          <Text style={GLOBAL_STYLES.inputLabel}>Service Type *</Text>
            <AutocompleteDropdown
              clearOnFocus={false}
              style={GLOBAL_STYLES.inputLabel}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Select Service Type",
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
              onSelectItem={setServiceType}
              dataSet={ServiceTypeList}
              useFilter={true}
            />
            </View>
            <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Issue Type *</Text>
              <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              textInputProps={{
                placeholder:"Select Issue Type",
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
              onSelectItem={setIssueType}
              dataSet={IssueTypeList}
              useFilter={true}
            />
              
            
            </View>
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Visit Date</Text>
            <TextInput
              placeholder="Enter visit date"
              placeholderTextColor={COLORS.fontLight}
              autoComplete='birthdate-full'
              style={GLOBAL_STYLES.textInput}
              value={visitDate!=null? visitDate?.getDate()+"-"+(visitDate?.getMonth()<10 ? "0"+parseInt(visitDate?.getMonth()+1):parseInt(visitDate?.getMonth()+1))+"-"+visitDate.getFullYear():null}
              onPressIn={()=>{
                setOpenVisitDate(true);
              }}
            />
          </View>
          {/* Input field zip code */}
          <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
            <Text style={GLOBAL_STYLES.inputLabel}>Visit Time</Text>
            <TextInput
              placeholder="Enter visit time"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={visitTime!="" ? visitTime.getHours()+":"+visitTime.getMinutes():null}
              onPressIn={()=>{
                setOpenVisitTime(true);
              }}
            />
          </View>
          <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
            <Text style={GLOBAL_STYLES.inputLabel}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              numberOfLines={4}
              placeholderTextColor={COLORS.fontLight}
              style={[GLOBAL_STYLES.textInputArea]}
              value={address}
              onChangeText={value=>{
                setAddress(value);
              }}
            />
          </View>
          <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
            <Text style={GLOBAL_STYLES.inputLabel}>Message *</Text>
            <TextInput
              placeholder="Enter your message"
              multiline={true}
              numberOfLines={4}
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
           <Button label="Save Inquiry"
          disabled={isSubmitting}
          onPress={SaveInquiry}
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
export default NewInquiry;
