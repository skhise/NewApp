// Importing
import React,{useState,useEffect} from 'react';
import {Text, Pressable, SafeAreaView, ScrollView} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import HELP_SUPPORT_STYLES from '../styles/screens/HELP_SUPPORT_STYLES';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import COLORS from '../config/COLORS';
import * as Animatable from 'react-native-animatable';
import Server from '../data/Server_Info';
import showAlert from '../data/ShowAlert';
import axios from 'axios';

// Functional component
const HelpSupport = ({navigation}) => {
  // Returning
  const [isAlive, setIsAlive] = useState(true);
  const [Loading, setLoading] = useState(false);
  let [Policy,setPolicy] = useState([]);

  useEffect(() => {
    setLoading(true);
    let App_Url = Server.api;
    axios.get(App_Url+'AccountSetting')
    .then((json)=>{
      setLoading(false);
      setPolicy(json.data.account);
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false);
      console.error(error);
      //alert("connection error");
      showAlert.ShowAlert("Connection Error!",COLORS.red);
      //navigation.replace('Home');

    });
    return () => setIsAlive(false)
    
  }, [isAlive])
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          GLOBAL_STYLES.xyCenter,
          HELP_SUPPORT_STYLES.contentCotainer,
        ]}>
        {/* Question */}
        <Animatable.Text
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-back"
          useNativeDriver={true}
          style={HELP_SUPPORT_STYLES.question}>
          Do you have any issues?
        </Animatable.Text>
        {/* Answer */}
        <Animatable.Text
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-back"
          useNativeDriver={true}
          style={HELP_SUPPORT_STYLES.answer}>
          We are here to help & support you more quickly.
        </Animatable.Text>
        {/* Content card container */}
        <Animatable.View
          delay={1300}
          animation="fadeInUp"
          easing="ease-in-out-back"
          useNativeDriver={true}>
          <Pressable
            style={[
              HELP_SUPPORT_STYLES.contentCardContainer,
              GLOBAL_STYLES.xyCenter,
            ]}
            >
            {/* Icon */}
            <Icon
              name="location-outline"
              size={scale(30)}
              color={COLORS.primary}
            />
            {/* Title */}
            <Text style={HELP_SUPPORT_STYLES.contentCardTitle}>{Policy[0]?.companyname}</Text>
            {/* Info */}
            <Text style={HELP_SUPPORT_STYLES.contentCardInfo}>
            {Policy[0]?.companyAddress}
            </Text>
            <Text style={HELP_SUPPORT_STYLES.contentCardInfoAddress}>
            {Policy[0]?.ContactInformation}
            </Text>
          </Pressable>
        </Animatable.View>
        {/* Content card container */}
        
      </ScrollView>
    </SafeAreaView>
  );
};

// Exporting
export default HelpSupport;
