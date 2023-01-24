// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../config/COLORS';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from '../../components/BUTTONS';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import * as Animatable from 'react-native-animatable';
import {ScreenLoader} from '../../components/LOADERS';
import {SnackbarAlert} from '../../components/ALERTS';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Server from '../../data/Server_Info';
import axios from 'axios';
// Functional component
const CustomerContractDetails = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(false);
  const [Loading,setLoading] = useState(false);
  const [contract,setContract] = useState([]);
  const [accessoryList,setAccessoryList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { width } = Dimensions.get("window");
  const [isModalVisibleR, setModalVisibleR] = useState(false);
  const [rejectNote,setRejectNote] = useState("");
  const [attachments,setAttachments] = useState([]);

  useEffect(() => {
    const user_id =route.params.userId;
    const id = route.params.id;
    setContract(route.params.contract);
    setAttachments(route.params.contract.Attachment)
    return () => setIsAlive(false)
  }, [isAlive])

  const showAlert = (message)=> {
    SnackbarAlert(
      message,
      COLORS.white,
      COLORS.orange,
      'Got it',
      COLORS.white,
    )
  };
  
  const openModelR = () => {
    setModalVisibleR(true);
};
const closeModelR = () => {
  setModalVisibleR(false);
};
  // Returning

  if(Loading){
    return <ScreenLoader message="Loading Tickets..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Order container */}
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[
            ORDER_STYLES.sectionContainer,
            ORDER_STYLES.sectionContainerMarginTicket,
          ]}>
          {/* Order ID */}
          <View style={ADDRESSES_STYLES.addressTypeContainer}>
                      <Icon
                        name="md-document"
                        size={scale(20)}
                        color={COLORS.primary}
                      />
                      <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                      ID - {contract.CNRT_Number}
                      </Text>
                      {contract.CNRT_Status==1 ? (
                        <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                            GLOBAL_STYLES.activeBackground,
                            
                          ]}>
                          <Text style={ADDRESSES_STYLES.statusLabel}>
                          {contract.contract_status_name}
                          </Text>
                        </View>
                      ) : <View
                      style={[
                        ADDRESSES_STYLES.statusContainer,
                        GLOBAL_STYLES.xyCenter,
                        GLOBAL_STYLES.expiryBackground,
                        
                      ]}>
                      <Text style={ADDRESSES_STYLES.statusLabel}>
                      {contract.contract_status_name}
                      </Text>
                    </View>}
                    </View>
          {/* Destinations */}
          <View style={MY_ORDERS_STYLES.destinations}>
                
                <View style={{alignItems: 'flex-start'}}>
                
                  <View>
                  <Text style={MY_ORDERS_STYLES.destination}>
                    {contract.site_type_name}
                  </Text>
                  </View>
                  <View>
                  <Text style={MY_ORDERS_STYLES.destination}>
                    {contract.contract_type_name}
                  </Text>
                  </View>
                </View>
                
              </View>
              {/* Order item container */}
              <Text style={MY_ORDERS_STYLES.destination}>Products</Text>
              <View style={MY_ORDERS_STYLES.orderItemContainer}>
                <View style={MY_ORDERS_STYLES.item}>
                  
                  <View style={MY_ORDERS_STYLES.itemInfo}>
                    <View>
                      <Text style={MY_ORDERS_STYLES.itemTitle}>
                        {contract.Product_Name}
                      </Text>
                    </View>
                   </View>
                </View>
              </View>
        </Animatable.View>
        <Animatable.View
          delay={110}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Expiry Details</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Start Date</Text>
            <Text style={ORDER_STYLES.rowValue}>{contract.Start_Date}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>End Date</Text>
            <Text style={ORDER_STYLES.rowValue}>{contract.End_Date}</Text>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={130}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Site Address</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Site No.</Text>
            <Text style={ORDER_STYLES.rowValue}>{contract.SiteNumber}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Site Name </Text>
            <Text style={ORDER_STYLES.rowValue}>{contract.SiteName}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Site Area</Text>
            <Text style={ORDER_STYLES.rowValue}>{contract.SiteAreaName}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Address</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowValue}>{contract.SiteOther}</Text>
          </View>
          
        </Animatable.View>

        <Animatable.View
        delay={500}
        animation="fadeInUp"
        easing="ease-in-out-sine"
        style={ORDER_STYLES.sectionContainer}>
        {/* Section title */}
        <Text style={ORDER_STYLES.sectionTitle}>Attachments List</Text>
        {/* Price info */}
        {
          attachments?.length>0 ?
          attachments?.map((tik, index) => (
            <View key={index} >
                 <View style={ORDER_STYLES.row}>
            <Text style={[ORDER_STYLES.rowTitleCopy, {textTransform: 'uppercase'}]}>
              {tik.Description != null ? tik.Description : 'Contract Attachment'}
            </Text>
            <Text
              onPress={()=>{
                try{
                  Linking.canOpenURL(`${Server.root+tik.Attachment_Path}`).then(supported => {
                    if (supported) {
                      Linking.openURL(`${Server.root+tik.Attachment_Path}`);
                    } else {
                      ShowAlert.ShowAlert("Failed to download file.",COLORS.red);
                      console.log('Don\'t know how to open URI: ' + `${Server.root+tik.Attachment_Path}`);
                    }
                  });
                  //Linking.openURL();
                }catch(error){
                  console.log(error.message);
                }
                
              }}
             style={ORDER_STYLES.rowValueLink}>Download</Text>
           </View>
            </View>
           
          ))
            :
            <Text style={ORDER_STYLES.rowValueCopy}>No Any Attachment To Download</Text>
        }
        
      
        
      </Animatable.View>
        
      </ScrollView>
      {/* Review writing Modal */}
    </SafeAreaView>
  );
};

// Exporting
export default CustomerContractDetails;
