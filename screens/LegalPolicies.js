// Importing
import React,{useEffect,useState} from 'react';
import {SafeAreaView, View, ScrollView, useWindowDimensions} from 'react-native';
import {LinkWithLeftRightIcons} from '../components/LINKS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import LEGAL_POLICIES_STYLES from '../styles/screens/LEGAL_POLICIES_STYLES';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import RenderHtml from 'react-native-render-html';
import Server from '../data/Server_Info';
import showAlert from '../data/ShowAlert';
import axios from 'axios';
// Functional component
const LegalPolicies = ({navigation}) => {
  // Returning
  const [isAlive, setIsAlive] = useState(true);
  const [Loading, setLoading] = useState(false);
  let [Policy,setPolicy] = useState("<p style='text-align: center;'>no policy found.</p>");
  const source = {
    html: Policy
  };
  useEffect(() => {
    setLoading(true);
    let App_Url = Server.api;
    axios.get(App_Url+'AccountSetting')
    .then((json)=>{
      console.log(json.data.account[0].termandconditions);
      setLoading(false);
      if(json.data.account[0].termandconditions!=""){
        setPolicy(json.data.account[0].termandconditions);
      } else {
        setPolicy("<p  style='text-align: center;'>no policy found.</p>");
      }
      
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
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {/* Screens links */}
      <View
        style={[LEGAL_POLICIES_STYLES.navigationLinks, GLOBAL_STYLES.xyCenter]}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GLOBAL_STYLES.scrollviewContentContainer}>
          {/* Links container */}
          <Animatable.View
            delay={100}
            animation="fadeInUp"
            easing="ease-in-out-back"
            useNativeDriver={true}
            style={[LEGAL_POLICIES_STYLES.navigationLinksContainer,{paddingLeft:scale(10)}]}>
            {/* Link component */}
            {/* Link */}
            <RenderHtml
              contentWidth={width}
              style={GLOBAL_STYLES.policyPadding}
              source={source}
            />
            {/* <LinkWithLeftRightIcons
              iconLeft="list"
              iconLeftColor={COLORS.primary}
              iconLeftSize={scale(25)}
              title="Privacy Policy"
              iconRight="arrow-right"
              iconRightColor={COLORS.primary}
              iconRightSize={scale(20)} 
              onPress={() =>
                navigation.navigate('PolicyDetails', {title: 'Privacy Policy'})
              }
            /> */}
           
          </Animatable.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default LegalPolicies;
