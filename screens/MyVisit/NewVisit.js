// Importing
import React, {useState,useEffect, useRef} from 'react';
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
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { IconButton } from 'react-native-paper';

// Functional component
const NewVisit = ({route,navigation}) => {
  // Local states
  let App_Url = Server_Info.api;

  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVisitType,setSetelectedVisitType] = useState(null);
  const [selectedVisitStatus,setSetelectedVisitStatus] = useState(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [VisitType,setVisitType] = useState([]);
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [totalKM, setTotalKM] = useState(0);
  const [otherInformation,setOtherInformation] =useState(null);
  const [VisitStatus,setVisitStatus] =useState([]);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [openVisitDate,setOpenVisitDate] = useState(false);
  const [openVisitTime,setOpenVisitTime] = useState(false);
  const [toLat,setToLat] = useState("");
  const [toLang,setToLang] = useState("");
  const [fromLat,setFromLat] = useState("");
  const [fromLang,setFromLang] = useState("");
  const [isAlive,setIsAlive] = useState(false);
  const [userId,setUserId] = useState(0);
  const isFocused = useIsFocused();
  const ref1 = useRef();
  const ref2 = useRef();

  const GetUser = async() =>{
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null) {
        let loginUser = JSON.parse(data);  
        setUserId(loginUser.id);
        setName(loginUser.name);
        setEmail(loginUser.email)
        setPhone(loginUser.CCP_Phone1)
        setAddress(loginUser.CST_OfficeAddress)
        
       // console.log("id:"+loginUser.id);
      }
      
    } catch(error){
      console.log("in error");
    }

  }
  useEffect(() => {
    GetUser();
    GetVisitData();
  }, [isFocused]);

  const GetVisitData = ()=>{
    axios.get(App_Url+""+App_Api.GetVisitData)
    .then(json=>{
      console.log(json.data);
      if(json.data.success){
       setVisitType(json.data.visittype);
       setVisitStatus(json.data.visitstatus);
      }
    })
    .catch(error=>{
      ShowAlert.ShowAlert(error.message,COLORS.red);
    })
  }
  const SaveVisit = () => {

    let values = {
      EMP_ID:userId,
      fromLocation:fromLocation,
      toLocation:toLocation,
      visitType:selectedVisitType!=null ? selectedVisitType.id:'',
      totalKm:totalKM,
      toLat:toLat,
      toLng:toLang,
      fromLng:fromLang,
      fromLat:fromLat,
      visitRemark:scopeOfWork,
      otherInfo:otherInformation,
      visitStatus:selectedVisitStatus!=null ? selectedVisitStatus.id:'',
      userId:userId,
      isUpdate:false,
      visit_id:0,
      visitDate:new Date(),
    };
    try{
      console.log(values);
      setIsSubmitting(true)
      axios.post(App_Url+""+App_Api.NewVisit,values)
      .then(json=>{
        setIsSubmitting(false);
        console.log(json.data);
        if(json.data.success){
          ShowAlert.ShowAlert(json.data.message,COLORS.green);
          navigation.goBack();
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
  const fetchDistanceBetweenPoints = (lat2,lng2) => { // Pass Latitude & Longitude of both points as a parameter

    var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+fromLat+','+fromLang+'&destinations='+lat2+'%2C'+lng2+'&key=' + App_Api.MapKey;

    fetch(urlToFetchDistance)
            .then(res => {
    return res.json()
  })
  .then(res => {
            var distanceString = res.rows[0].elements[0].distance.text;
            setTotalKM(distanceString)

    // Do your stuff here
  })
  .catch(error => {
    setTotalKM("0 km");
            console.log("Problem occurred:"+error.message);
  });

}
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps='always'
        listViewDisplayed={false}
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
              <Text style={GLOBAL_STYLES.headerText}>Fill New Visit Form</Text>
              <Text style={GLOBAL_STYLES.infoText}>(all * marked fields required.)</Text>

          </View>
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>From Location *</Text>
            <View style={[GLOBAL_STYLES.flexRow]}>
            <GooglePlacesAutocomplete
              ref={ref1}
              placeholder="enter your current location"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setFromLocation(details.formatted_address);
                setFromLat(details.geometry.location.lat);
                setFromLang(details.geometry.location.lng);
              }}
              query={{
                key: App_Api.MapKey,
                language: 'en',
                components: 'country:in',
              }}
              onFail={(error) => console.error(error)}
              placeholderTextColor={COLORS.fontLight}
              styles={{
                textInput: GLOBAL_STYLES.textInput,
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              value={fromLocation}
              onChangeText={value=>{
                setFromLocation(value);
              }}
            />
            <IconButton
              style={[{marginTop:scale(0)},GLOBAL_STYLES.iconButton]}
              icon='close'
              color='#ffffff'
              size={25} 
              onPress={()=>{ref1.current?.setAddressText("");setFromLocation("");setFromLang("");setFromLat("");setTotalKM("");}}
            />
            </View>
           
            
          </View>
          {/* Input field mobile */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>To Location *</Text>
            <View style={GLOBAL_STYLES.flexRow}>
            <GooglePlacesAutocomplete
                  ref={ref2}
              placeholder="enter your destination location"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setToLocation(details.formatted_address);
                setToLat(details.geometry.location.lat);
                setToLang(details.geometry.location.lng);
                fetchDistanceBetweenPoints(details.geometry.location.lat,details.geometry.location.lng);
              }}
              query={{
                key: App_Api.MapKey,
                language: 'en',
                components: 'country:in',
              }}
              onFail={(error) => console.error(error)}
              placeholderTextColor={COLORS.fontLight}
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              styles={{
                textInput: GLOBAL_STYLES.textInput,
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              value={toLocation}
              onChangeText={value=>{
                setToLocation(value);
              }}
            />
            <IconButton
              style={[{marginTop:scale(0)},GLOBAL_STYLES.iconButton]}
              icon='close'
              color='#ffffff'
              size={25} 
              onPress={()=>{ref2.current?.setAddressText("");setToLocation("");setToLang("");setToLat("");setTotalKM("");}}
            />
            </View>
           
          </View>
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Total Distance (KM)</Text>
            <Text
              style={GLOBAL_STYLES.textInput}
              disabled={true}
            >{totalKM}</Text>
          </View>
          
          <View style={GLOBAL_STYLES.inputGroup}>
          <Text style={GLOBAL_STYLES.inputLabel}>Visit Type *</Text>
              <AutocompleteDropdown
              clearOnFocus={false}
              style={[GLOBAL_STYLES.inputLabel]}
              closeOnBlur={true}
              textInputProps={{
                placeholder: 'Select Visit Type',
                autoCorrect: false,
                autoCapitalize: 'none',
                autoComplete:"off",
                style: {
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  paddingLeft: 18,
                },
              }}
              
              inputContainerStyle={[GLOBAL_STYLES.autoComplete]}
              onSelectItem={setSetelectedVisitType}
              dataSet={VisitType}
              useFilter={false}
            />
          </View>
          
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Scope Of Work *</Text>
            <TextInput
              placeholder="Scope Of work"
              numberOfLines={4}
              placeholderTextColor={COLORS.fontLight}
              style={[GLOBAL_STYLES.textInputArea]}
              value={scopeOfWork}
              onChangeText={value=>{
                setScopeOfWork(value);
              }}
            />
          </View>
          <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
            <Text style={GLOBAL_STYLES.inputLabel}>Other Information *</Text>
            <TextInput
              placeholder="Remark"
              numberOfLines={4}
              placeholderTextColor={COLORS.fontLight}
              style={[GLOBAL_STYLES.textInputArea]}
              value={otherInformation}
              onChangeText={value=>{
                setOtherInformation(value);
              }}
            />
          </View>
          <View style={GLOBAL_STYLES.inputGroup}>
          <Text style={GLOBAL_STYLES.inputLabel}>Visit Status *</Text>
              <AutocompleteDropdown
              clearOnFocus={false}
              style={[GLOBAL_STYLES.inputLabel]}
              closeOnBlur={true}
              textInputProps={{
                placeholder: 'Select Visit Status',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                  paddingLeft: 18,
                },
              }}
              
              inputContainerStyle={[GLOBAL_STYLES.autoComplete]}
              onSelectItem={setSetelectedVisitStatus}
              dataSet={VisitStatus}
              useFilter={false}
            />
          </View>
          
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
           <Button label="Save Visit"
          disabled={isSubmitting}
          onPress={SaveVisit}
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
export default NewVisit;
