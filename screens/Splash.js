// Importing
import React, { Component } from 'react';
import {View, SafeAreaView, ImageBackground} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import SPLASH_STYLES from '../styles/screens/SPLASH_STYLES';
import * as Animatable from 'react-native-animatable';
import SplashScreen from 'react-native-splash-screen'
import {getUser} from '../data/LocalCart';
import Server from '../data/Server_Info';
import App_API from '../data/App_API';
// Functional component
class Splash extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      deviceId: 0,
      App_Url:Server.api
    }

  }
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      console.log("in splash screen");
      let id =  DeviceInfo.getAndroidId().then((id) => {
        this.setState({
          deviceId: id
        });
      });
      this.CheckLogin();
      
  }
  CheckLogin () {
   
    let user = getUser();
    if(user == null){
      this.props.navigation.navigate("SignIn");
    } else {
      let dataToSend = {email: user.email, password: user.password,Device_ID:this.state.deviceId};
      axios.post(this.state.App_Url+App_API.getProfile,dataToSend,{timeout:5000})
      .then((responseJson) => { 
        setLoading(false);
        if (responseJson.data.success) {
          try {
            this.props.navigation.navigate("Home");
            SplashScreen.hide();
          } catch(e) {
            console.log(error.message);
            this.props.navigation.navigate("SignIn");
          }
        } else {
          console.log(responseJson.data);
          this.props.navigation.navigate("SignIn");
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.props.navigation.navigate("SignIn");
      });


    }
  }
  render(){
    return (
         <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
           <ImageBackground
             source={require('../assets/images/login-bg-1.jpg')}
             style={SPLASH_STYLES.imageBackground}
             // blurRadius={10}
            resizeMode="cover">
             {/* Overlaty */}
           <View style={SPLASH_STYLES.overlay}></View>
             <View style={[SPLASH_STYLES.contentCotainer, GLOBAL_STYLES.xyCenter]}>
               <View style={SPLASH_STYLES.logoContainerCopy}>
                 <Animatable.Image
                   delay={100}
                   animation="bounceIn"
                  easing="ease-in-out-sine"
                   useNativeDriver={true}
                   style={GLOBAL_STYLES.responsiveImage}
                   source={require('../assets/images/logo.png')}
                 />
               </View>
               {/* <Animatable.Text
                 delay={500}
                 animation="fadeInUp"
                 easing="ease-in-out-sine"
                 useNativeDriver={true}
                 style={SPLASH_STYLES.brandName}>
                 IWS
              </Animatable.Text> */}
              {/* <Animatable.Text
                delay={1000}
                 animation="fadeInUp"
                 easing="ease-in-out-sine"
                useNativeDriver={true}
               style={SPLASH_STYLES.slogan}>
                 Your integration for complete environmental solutions
               </Animatable.Text> */}
             </View>
           </ImageBackground>
         </SafeAreaView>
       );
  }
  
}

// Exporting
export default Splash;
