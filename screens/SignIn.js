// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native'; 
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import SIGN_IN_STYLES from '../styles/screens/SIGN_IN_STYLES';
import COLORS from '../config/COLORS';
import {Button} from '../components/BUTTONS';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import SweetAlert from 'react-native-sweet-alert';
import {ScreenLoader} from '../components/LOADERS';
import Loader from '../screens/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Server from '../data/Server_Info';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen'
import axios from 'axios';
import ShowAlert from '../data/ShowAlert';
// Functional component
const SignIn = ({navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [Device_ID,setDevice_ID] = useState("");
    useEffect(() => {
      SplashScreen.hide();
     let id =  DeviceInfo.getAndroidId().then((id) => {
      setDevice_ID(id);
    });
     
      return () => setIsAlive(false)
    }, [isAlive]);
  // Toggling password visibility
  const _togglePasswordVisibility = () => {
    setIsPasswordInvisible(!isPasswordInvisible);
  };
  const handleSubmitPress = () => {
  
    
    if (!userEmail) {
      //alert('Please fill Email');
      showAlert("Enter your registered email.");
      return;
    }
    if (!userPassword) {
      //alert('Please fill Password');
      showAlert("Enter your Password");
      return;
    } 
    if(Device_ID == ""){
      showAlert("Someting went wrong, check app permissions");
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword,Device_ID:Device_ID};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    axios.post(App_Url+'signin',dataToSend,{timeout:1500})
      .then((responseJson) => { 
        setLoading(false);
        if (responseJson.data.success) {
          try {
            let user = responseJson.data.user;
             if(user == null){
                showAlert("something went wrong, try again.");
             } else {
              storeToken(responseJson.data.user);
              RNRestart.Restart();
             }
           
          } catch(e) {
            showAlert("System error, Try again.");
          }
        } else {
          showAlert(responseJson.data.message); 
        }
      })
      .catch((error) => {
        setLoading(false);
        showAlert(error.message);
      });
  };
const storeToken = async(user) =>{
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('user',JSON.stringify(user));  
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

const showAlert = (message)=>{
  SweetAlert.showAlertWithOptions({
    title: 'Alert',
    subTitle: message,
    confirmButtonTitle: 'OK',
    confirmButtonColor: COLORS.primaryDark,
    otherButtonColor: COLORS.primaryDark,
    style: 'warning',
    cancellable: true
  },
    callback => console.log('callback'));
};
  // Returning
  // if(Loading){
  //   return <ScreenLoader message="Login to account..." />;
  // }
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {Loading ? <Loader loading={Loading}/> : null}
      <View
        style={[GLOBAL_STYLES.authFormLogoFlexArea, GLOBAL_STYLES.xyCenter]}>
        <View style={GLOBAL_STYLES.authFormLogoContainer}>
          <Animatable.Image
            delay={100}
            animation="bounceIn"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            source={require('../assets/images/logo.png')}
            style={GLOBAL_STYLES.responsiveImage}
          />
        </View>
      </View>
      <View style={[GLOBAL_STYLES.authFormFlexArea]}>
        <Animatable.View
          delay={400}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[GLOBAL_STYLES.authFormContainer, GLOBAL_STYLES.yCenter]}>
          {/* Form title */}
          <Animatable.View
            delay={700}
            animation="fadeInDown"
            easing="ease-in-out-back"
            useNativeDriver={true}
            style={GLOBAL_STYLES.formTitleContainer}>
            <Text style={GLOBAL_STYLES.authFormTitle}>Sign In</Text>
            <View style={GLOBAL_STYLES.authFormTitleLine}></View>
          </Animatable.View>
          <Animatable.View
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-back"
            useNativeDriver={true}>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={COLORS.fontLight}
                value={userEmail}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                style={GLOBAL_STYLES.textInput}
              />
            </View>
            {/* Input field password */}
            <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
              <Text style={GLOBAL_STYLES.inputLabel}>Password</Text>
              <View style={GLOBAL_STYLES.positionRelative}>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.fontLight}
                  value={userPassword}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
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
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            {/* Button component */}
            <Button label="Sign In "
            onPress={handleSubmitPress} />
            {/* Questions start */}
            <View
              style={[
                GLOBAL_STYLES.questionContainer,
                SIGN_IN_STYLES.questionContainerMargin,
              ]}>
              <Text style={GLOBAL_STYLES.question}>Forgot password?</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text
                  style={[GLOBAL_STYLES.question, GLOBAL_STYLES.actionLink]}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={GLOBAL_STYLES.questionContainer}>
              <Text style={GLOBAL_STYLES.question}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={[GLOBAL_STYLES.question, GLOBAL_STYLES.actionLink]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View> */}
          </Animatable.View>
          {/* Questions end */}
        </Animatable.View>
      </View>
      {/* Forgot password Modal */}
      <View>
        <Modal
          isVisible={isModalVisible}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={SIGN_IN_STYLES.modalMargin}>
          {/* Modal content */}
          <View style={SIGN_IN_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={SIGN_IN_STYLES.passwordResetModalTitle}>
              Reset password
            </Text>
            {/* Modal info */}
            <Text style={SIGN_IN_STYLES.passwordResetModalInfo}>
              We'll send new password to your eMail.
            </Text>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter email address"
                placeholderTextColor={COLORS.darkGrey}
                style={[GLOBAL_STYLES.textInput, GLOBAL_STYLES.borderDark]}
              />
            </View>
            {/* Button component */}
            <Button
              label="Reset password"
              onPress={()=>{
                ShowAlert.ShowAlert("Under Development",COLORS.green);
              }}
              customButtonStyle={SIGN_IN_STYLES.buttonMargin}
            />

            {/* Modal close icon */}
            <View style={GLOBAL_STYLES.modalCloseIconContainer}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <MaterialIcon
                  name="close"
                  size={scale(20)}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default SignIn;
