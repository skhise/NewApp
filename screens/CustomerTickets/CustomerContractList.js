// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import COLORS from '../../config/COLORS';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import MY_ORDERS_STYLES from '../../styles/screens/MY_ORDERS_STYLES';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SnackbarAlert} from '../../components/ALERTS';
import {ScreenLoader} from '../../components/LOADERS';
import Server from '../../data/Server_Info';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
// Functional component
const CustomerContractList = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  const [List, setList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [userId,setUserId] = useState(0);
  const isFocused = useIsFocused();

  useEffect( () => {
    setUserId(route.params.user_id);
    setLoading(true);
    fetch(App_Url+'GetContractListByCustomer?id='+route.params.user_id)
    .then((response) => response.json())
    .then((json)=>{
      //console.log(json.contracts.Attachment);
      if(json.success){

        setList(json.contracts);
      }
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      showAlert("Connection Error!");
    });
    
  }, [isFocused])
  
  const showAlert = (message)=>{
    SnackbarAlert(
      message,
      COLORS.white,
      COLORS.orange,
      'Got it',
      COLORS.white,
    )
  };
  // Returning

  if(Loading){
    return <ScreenLoader message="Loading Contracts..." />;
  }
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {List.length == 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <Animatable.View
            animation="fadeInDown"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../../assets/lottie/checkmark.json')}
              loop
              autoPlay
              resizeMode="cover"
            />
          </Animatable.View>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieTitle}>
            No Contracts!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any contract for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {List.map((contract, index) => (
            <Pressable
              key={index}
              style={[
                MY_ORDERS_STYLES.orderContainer,
                {marginTop: index === 0 ? scale(15) : 0},
              ]}
              onPress={() => {
                navigation.navigate('CustomerContractDetails',{userId:userId,contract:contract})
              } }>
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
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// Exporting
export default CustomerContractList;
