// Importing
import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ImageBackground,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LinkWithLeftRightIcons} from '../components/LINKS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import MY_PROFILE_STYLES from '../styles/screens/MY_PROFILE_STYLES';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import {SnackbarAlert} from '../components/ALERTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importing
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PERSONAL_DETAILS_STYLES from '../styles/screens/PERSONAL_DETAILS_STYLES';
import {Button} from '../components/BUTTONS';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ORDER_STYLES from '../styles/screens/ORDER_STYLES';
import BUTTON_STYLES from '../styles/components/BUTTON_STYLES';
import axios from 'axios';
import Server from '../data/Server_Info';
import App_API from '../data/App_API';
import ShowAlert from '../data/ShowAlert';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';


// Functional component
const MyProfile = ({navigation}) => {
  // Returning
  const [isAlive, setIsAlive] = useState(true);
  const [user,setUser] = React.useState([]);
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isModalVisibleR, setModalVisibleR] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [NewPassword,setConfirmPassword] = useState("");
  const [ConfirmPassword,setNewPassword] = useState("");
  const [errortext, setErrortext] = useState('');
  const [role,setRole] = useState(0);
  const isFocused = useIsFocused();
  const _togglePasswordVisibility = () => {
    setIsPasswordInvisible(!isPasswordInvisible);
  };
  const GetUser =async()=>{
    try {
      const data  = await AsyncStorage.getItem("user");
      if(data!=null) {
        
        let loginUser = JSON.parse(data);  
        
        setName(loginUser.name);
        setEmailId(loginUser.email);
        setUser(loginUser);
        setRole(loginUser.role);
        setMobileNumber(loginUser.role==2 ? loginUser.CCP_Mobile : loginUser.EMP_MobileNumber)
        setAddress(loginUser.role == 2 ? loginUser.CST_OfficeAddress : loginUser.EMP_Address);
       // getProfile(loginUser);
      }
    } catch(error) {
      console.log("in error"+error.message);
    }
  }
  useEffect(() => {
    GetUser();
    
  }, [isFocused])

  const UpdateProfile = () =>{
    setIsSubmitting(true);
    let data= {
      address:address,
      role:role,
      id:user.id
    }
    axios.post(Server.api+""+App_API.updateProfile,data).then(data=>{
      setIsSubmitting(false);
      if(data.data.success){
        ShowAlert.ShowAlert("Updated",COLORS.green);
      } else {
        ShowAlert.ShowAlert(data.data.message,COLORS.red);  
      }
    }).catch(error=>{
      setIsSubmitting(false);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    });
  }
  
  const openModelR = () => {
    setModalVisibleR(true);
  
};
const ChangePassword = () => {
  setErrortext('');
  console.log(user.id);
  console.log(NewPassword);
  if(NewPassword=="" || ConfirmPassword == ""){
    ShowAlert.ShowAlert('password missing.',COLORS.red);
  } else if(NewPassword!=ConfirmPassword){
    ShowAlert.ShowAlert('password mismatched.',COLORS.red);
  } else {
    try{
      let  params = {
        id:user.id,
        password:NewPassword
    };
      setIsSubmitting(true);
    axios.post(Server.api+App_API.PasswordChange,params)
    .then((data)=>{
      console.log(data.data);
      setIsSubmitting(false);
      if(data.data.success){
        ShowAlert.ShowAlert(data.data.message,COLORS.green);
        closeModelR();
      } else {
        ShowAlert.ShowAlert(data.data.message,COLORS.red);
      }


    }).catch((error)=>{
      setIsSubmitting(false);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    })
    }catch(error){
      setIsSubmitting(false);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    }
    
  }
}
const closeModelR =()=> {
  setNewPassword("");
  setConfirmPassword("");
  setModalVisibleR(false);
};
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {/* Header background */}
      <View>
        <Modal
          isVisible={isModalVisibleR}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
         
          <View style={PERSONAL_DETAILS_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalTitle}>
             Password Change
            </Text>
            {/* Modal info */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalInfo}>
              change your password
            </Text>
            <View style={[GLOBAL_STYLES.positionRelative,GLOBAL_STYLES.inputLabel]}>
              <View style={GLOBAL_STYLES.positionRelative}>
              <TextInput
                  placeholder="New Password"
                  placeholderTextColor={COLORS.fontLight}
                  onChangeText={(NewPassword) =>
                    setNewPassword(NewPassword)
                  }
                  style={GLOBAL_STYLES.textInput}
                  secureTextEntry={isPasswordInvisible}
                />
                {/* Icon eye */}
                <TouchableOpacity
                  onPress={() => _togglePasswordVisibility()}
                  style={GLOBAL_STYLES.inputEyeIcon}>
                  {/* Comparing */}
                  {isPasswordInvisible ? (
                    <MaterialIcon
                      name="visibility"
                      size={scale(25)}
                      color={COLORS.primary}
                    />
                  ) : (
                    <MaterialIcon
                      name="visibility-off"
                      size={scale(25)}
                      color={COLORS.red}
                    />
                  )}
                </TouchableOpacity>
              </View>
                
              </View>
              <View  style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
              <View style={GLOBAL_STYLES.positionRelative}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.fontLight}
                  onChangeText={(ConfirmPassword) =>
                    setConfirmPassword(ConfirmPassword)
                  }
                  style={GLOBAL_STYLES.textInput}
                  secureTextEntry={isPasswordInvisible}
                />
                {/* Icon eye */}
                <TouchableOpacity
                  onPress={() => _togglePasswordVisibility()}
                  style={GLOBAL_STYLES.inputEyeIcon}>
                  {/* Comparing */}
                  {isPasswordInvisible ? (
                    <MaterialIcon
                      name="visibility"
                      size={scale(25)}
                      color={COLORS.primary}
                    />
                  ) : (
                    <MaterialIcon
                      name="visibility-off"
                      size={scale(25)}
                      color={COLORS.red}
                    />
                  )}
                </TouchableOpacity>
              </View>
              </View>
            
              
            <Button
              label="Update Password"
              customButtonStyle={[
                {marginVertical: 0},
               {marginTop: scale(10)},
              ]}
              disabled={isSubmitting}
              onPress={()=>{
                ChangePassword();
              }}
            />
            {/* Modal close icon */}
            <View style={GLOBAL_STYLES.modalCloseIconContainer}
            >
              <Button
                label="X"
                customLabelStyle={[{color:COLORS.black}]}
                onPress={(v)=>{closeModelR();}}
                customButtonStyle={BUTTON_STYLES.buttonTransperant}/>
                
            </View>
          </View>
        </Modal>
      </View>
      <ImageBackground
        style={[MY_PROFILE_STYLES.headerBackground, GLOBAL_STYLES.xyCenter]}
        source={require('../assets/images/profile_image.png')}
        height="1">
          {/*600X400*/}
        {/* Profile photo */}
        <Animatable.View
          delay={100}
          animation="bounceIn"
          easing="ease-in-out-sine"
          useNativeDriver={true}>
           {/* <View style={MY_PROFILE_STYLES.profilePhotoContainer}>
           <Image
              source={require('../assets/images/200x200.jpg')}
              style={GLOBAL_STYLES.responsiveImage}
            /> 
          </View>  */}
         </Animatable.View>
        {/* Profile name */}
        <Animatable.Text
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={MY_PROFILE_STYLES.profileNameLabel}>
          {user.name}
        </Animatable.Text>
        {/* Profile eMail */}
        <Animatable.View
          delay={1000}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={MY_PROFILE_STYLES.profileEmailContainer}>
          <Text style={MY_PROFILE_STYLES.profileEmailLabel}>
          {user.email}
          </Text>
          
        </Animatable.View>
        <Animatable.Text
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={MY_PROFILE_STYLES.profileNameLabelCopy}>
          <Icon name='phone-portrait' size={scale(15)} color="#fff"></Icon>{'  '}{mobileNumber}
        </Animatable.Text>
      </ImageBackground>
      {/* Screens links */}
      <View style={MY_PROFILE_STYLES.navigationLinks}>
      <Animatable.View
            animation="fadeInUp"
            easing="ease-in-out-back"
            useNativeDriver={true}
            style={MY_PROFILE_STYLES.navigationLinksContainer}>
            {/* Link component */}
            <LinkWithLeftRightIcons
              iconLeft="user"
              iconLeftColor={COLORS.primary}
              iconLeftSize={scale(25)}
              title="Personal Details"
              iconRightColor={COLORS.primary}
              iconRightSize={scale(20)}
              
            />
           
            {/* Link */}
            {/* <LinkWithLeftRightIcons
              iconLeft="package"
              iconLeftColor={COLORS.primary}
              iconLeftSize={scale(25)}
              title="My Orders"
              iconRight="arrow-right"
              iconRightColor={COLORS.primary}
              iconRightSize={scale(20)}
              onPress={() => navigation.navigate('MyOrders')}
            /> */}
            {/* Link component */}
            {/*<LinkWithLeftRightIcons
              iconLeft="heart"
              iconLeftColor={COLORS.primary}
              iconLeftSize={scale(25)}
              title="My Wishlist"
              iconRight="arrow-right"
              iconRightColor={COLORS.primary}
              iconRightSize={scale(20)}
              onPress={() => navigation.navigate('Wishlist')}
            />*/}
            {/* Link component */}
            {/*
            <LinkWithLeftRightIcons
              iconLeft="gift"
              iconLeftColor={COLORS.primary}
              iconLeftSize={scale(25)}
              title="My Coupons"
              iconRight="arrow-right"
              iconRightColor={COLORS.primary}
              iconRightSize={scale(20)}
              onPress={() => navigation.navigate('MyCoupons')}
            />
            */}
            {/* Link component */}
            {/* <LinkWithLeftRightIcons
              iconLeft="map-pin"
              iconLeftColor={COLORS.primary}
              iconLeftSize={scale(25)}
              title="Address Book"
              iconRight="arrow-right"
              iconRightColor={COLORS.primary}
              iconRightSize={scale(20)}
              onPress={() => navigation.navigate('Addresses')}
            /> */}
            {/* Link component */}
          {/*
          <LinkWithLeftRightIcons
              iconLeft="bell"
              iconLeftColor={COLORS.primary}
              iconLeftSize={scale(25)}
              title="Notifications"
              iconRight="arrow-right"
              iconRightColor={COLORS.primary}
              iconRightSize={scale(20)}
              onPress={() => navigation.navigate('Notifications')}
            />
          */}  
          </Animatable.View>
        <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
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
          {/* Input field address */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor={COLORS.fontLight}
              multiline={true}
              numberOfLines={4}
              onChangeText={setAddress}
              style={[GLOBAL_STYLES.textInputArea]}
              value={address}
            />
          </View>
          {/* Button component */}
          
          {/* Question */}
          {/* <View style={GLOBAL_STYLES.questionContainer}>
            <Text style={GLOBAL_STYLES.question}>
              Want to update login details?
            </Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={[GLOBAL_STYLES.question, GLOBAL_STYLES.actionLink]}>
                Click here
              </Text>
            </TouchableOpacity>
          </View> */}
        </Animatable.View>
      </ScrollView>
      <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
         {role == 2 ? <View
          >
            <Button
              label="Save Details"
              onPress={UpdateProfile}
              disabled={isSubmitting}
              customButtonStyle={[
                GLOBAL_STYLES.marginYNone,
              ]}
              style={{marginTop:scale(10)}}
            />
          </View> : null} 
          <View
          style={{marginTop:scale(10)}}
          >
            <Button
              label="Password Change"
              onPress={()=>{openModelR()}}
              disabled={isSubmitting}
              customButtonStyle={[
                BUTTON_STYLES.buttonWarning
              ]
              }
            />
             
            
          </View>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default MyProfile;
