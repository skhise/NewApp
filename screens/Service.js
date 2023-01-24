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
import SIGN_IN_STYLES from '../styles/screens/SIGN_IN_STYLES';
import COLORS from '../config/COLORS';
import {Button} from '../components/BUTTONS';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import SweetAlert from 'react-native-sweet-alert';
import {ScreenLoader} from '../components/LOADERS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Server from '../data/Server_Info';
// Functional component
const Service = ({navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  // Toggling password visibility
  const _togglePasswordVisibility = () => {
    setIsPasswordInvisible(!isPasswordInvisible);
  };
  const handleSubmitPress = () => {
    setErrortext('');
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
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(App_Url+'signin', {
      method: 'POST',
      body: formBody,
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
          try{
             AsyncStorage.setItem('email', responseJson.user.email);
             AsyncStorage.setItem('id', ""+responseJson.user.id);
             AsyncStorage.setItem('role', ""+responseJson.user.role);
             AsyncStorage.setItem('status', true);
            navigation.navigate('Home');
            //navigation.navigate('SignIn');
          }catch(e){
            console.log(e);
            showAlert("System error, Try again.");
          }
          
        } else {
          showAlert(responseJson.message); 
        }
      })
      .catch((error) => {
        setLoading(false);
        showAlert("Connection Error!");
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

    </SafeAreaView>
  );
};

// Exporting
export default Service;
