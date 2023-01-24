// Importing
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import COLORS from '../config/COLORS';
import {Button} from '../components/BUTTONS';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import {ScreenLoader} from '../components/LOADERS';
import SweetAlert from 'react-native-sweet-alert';
import Server from '../data/Server_Info';

// Functional component
const SignUp = ({navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [errortext, setErrortext] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [Loading, setLoading] = useState(false);
  // Toggling password visibility
  const _togglePasswordVisibility = () => {
    setIsPasswordInvisible(!isPasswordInvisible);
  };
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userName) {
      //alert('Please fill Email');
      showAlert("Enter your full name.");
      return;
    }
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
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword,name:userName};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

   // axios.post()
    fetch(App_Url+'signup', {
      method: 'POST',
      body:formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
     
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.success) {
          showAlert(responseJson.message);
          navigation.navigate('SignIn');
          setUserEmail('')
                    setUserName('');
                    setUserPassword('');
        } else {
          showAlert(responseJson.message); 
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        //alert("connection error");
        showAlert("Connection Error!");
        //navigation.replace('Home');

      });
  };
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
  if(Loading){
    return <ScreenLoader message="Creating Account..." />;
  }
  return (

    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {/* <View style={GLOBAL_STYLES.centerContentContainer}> */}
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
            <Text style={GLOBAL_STYLES.authFormTitle}>Sign Up</Text>
            <View style={GLOBAL_STYLES.authFormTitleLine}></View>
          </Animatable.View>
          <Animatable.View
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-back"
            useNativeDriver={true}>
            {/* Input field name */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Name</Text>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={COLORS.fontLight}
                style={GLOBAL_STYLES.textInput}
                value={userName}
                onChangeText={(UserName) =>
                  setUserName(UserName)
                }
              />
            </View>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={COLORS.fontLight}
                style={GLOBAL_STYLES.textInput}
                value={userEmail}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
              />
            </View>
            {/* Input field password */}
            <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
              <Text style={GLOBAL_STYLES.inputLabel}>Password</Text>
              <View style={{position: 'relative'}}>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.fontLight}
                  style={GLOBAL_STYLES.textInput}
                  value={userPassword}
                  secureTextEntry={isPasswordInvisible}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
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
            {/* Button component */}
            <Button label="Sign Up"
            onPress={handleSubmitPress} />
            {/* Question */}
            <View style={GLOBAL_STYLES.questionContainer}>
              <Text style={GLOBAL_STYLES.question}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => {
                    navigation.navigate('SignIn');
                    setUserEmail('')
                    setUserName('');
                    setUserPassword('');
              }}>
                <Text
                  style={[GLOBAL_STYLES.question, GLOBAL_STYLES.actionLink]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
          {/* Questions end */}
        </Animatable.View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

// Exporting
export default SignUp;
