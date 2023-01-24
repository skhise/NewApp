// Importing
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../styles/screens/ORDER_STYLES';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from '../components/BUTTONS';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import * as Animatable from 'react-native-animatable';
import Server_Info from '../data/Server_Info';
import Animated, { interpolateNode } from 'react-native-reanimated';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HeaderTitle } from '../components/HEADER_TITLE';
import MY_ORDERS_STYLES from '../styles/screens/MY_ORDERS_STYLES';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { ScreenLoader } from '../components/LOADERS';
// Functional component
const Order = ({route,navigation}) => {
  // Local states
  let App_Url = Server_Info.api;
  const [rating, setRating] = useState(0);
  const [order,setOrder] = useState({});
  const [products,setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Loading,setLoading] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const {orderId} = route.params;
  const isFocused = useIsFocused();
  // Returning
  useEffect(() => {
    FetchOder(orderId,1);
  }, [isFocused])

  const FetchOder = (id,c) =>{
    try {
        setLoading(true);
        fetch(App_Url+App_API.GetOrder+'?id='+id)
        .then((response) => response.json())
        .then((json)=>{
          setLoading(false);
          if(json.success){
            setOrder(json.orders);
            setProducts(json.orders.product);
          } else {
            ShowAlert.ShowAlert(json.message,COLORS.red);  
          }
        })
        .catch((error) => {
          setLoading(false);
          ShowAlert.ShowAlert(error.message,COLORS.red);
        });
    } catch(error){
      setLoading(false);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    }

  }
  const HEADER_HEIGHT = scale(0);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_HEIGHT],
  });
 
 
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <Animated.View
            style={[
              HOME_STYLES.header,
              {
                transform: [
                  {
                    translateY: translateY,
                  },
                ],
              },
            ]}>
            <View style={{flexDirection: 'row',marginTop:10}}>
              <View style={[HOME_STYLES.headerLeft, GLOBAL_STYLES.xCenter]}>
                {/* Menu icon */}
                <IonIcon
                  name="arrow-back-sharp"
                  color={COLORS.white}
                  size={scale(20)}
                  onPress={() => navigation.navigate("MyOrders")}
                />
                
              </View>
              <HeaderTitle title="Order Details" />
              <View style={HOME_STYLES.headerRight}>
               
              </View>
            </View>
      </Animated.View>  
      {
        Loading ? 
        <ScreenLoader message="Loading Products..."/>
        :
<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Order container */}
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[
            ORDER_STYLES.sectionContainer,
            ORDER_STYLES.sectionContainerMarginTop,
          ]}>
          {/* Order ID */}
          <Text style={ORDER_STYLES.orderId}>ID - {order.id}</Text>
          {/* Destinations */}
          <View style={ORDER_STYLES.destinations}>
            <View style={{alignItems: 'flex-start'}}>
            <Text style={ORDER_STYLES.destination}>{order.CustomerName}</Text>
              <Text style={ORDER_STYLES.date}>{order.createdat}</Text>
            </View>
          {/* <View style={{alignItems: 'flex-end'}}>
            <Text style={ORDER_STYLES.date}>29 may 2021</Text>
            <Text style={ORDER_STYLES.destination}>Kolkata</Text>
          </View> */}
          </View>
          {/* Order status progress */}
          <View style={[MY_ORDERS_STYLES.statusContainer]}>
                {order.Order_Status == 0 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Rejected
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Delivered
                      </Text>
                    </View>
                  </View>
                ) : order.Order_Status ==1 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Rejected
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleDefault,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <View
                          style={MY_ORDERS_STYLES.statusCircleMiddle}></View>
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleDefault,
                        ]}>
                        Delivered
                      </Text>
                    </View>
                  </View>
                ) : order.Order_Status ==2 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Delivered
                      </Text>
                    </View>
                  </View>
                ) : order.Order_Status ==3 ? (
                  <View style={MY_ORDERS_STYLES.statusCirclesContainer}>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Placed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Confirmed
                      </Text>
                    </View>
                    <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleReject,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="close-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Rejected
                      </Text>
                    </View>
                    {/* <View style={MY_ORDERS_STYLES.statusCircleContainer}>
                      <View
                        style={[
                          MY_ORDERS_STYLES.statusCircle,
                          MY_ORDERS_STYLES.statusCircleActive,
                          GLOBAL_STYLES.xyCenter,
                        ]}>
                        <Icon
                          name="checkmark-outline"
                          size={scale(20)}
                          color={COLORS.white}
                        />
                      </View>
                      <Text
                        style={[
                          MY_ORDERS_STYLES.statusTitle,
                          MY_ORDERS_STYLES.statusTitleActive,
                        ]}>
                        Delivered
                      </Text>
                    </View> */}
                  </View>
                ) : null}
                {/* Horizontal line */}
                <View style={MY_ORDERS_STYLES.horizontalbarDefault}></View>
              </View>
        </Animatable.View>
        {/* Order Products */}
        <Animatable.View
    delay={100}
    animation="fadeInUp"
    easing="ease-in-out-sine"
    style={ORDER_STYLES.sectionContainer}>
    {/* Section title */}
    <Text style={ORDER_STYLES.sectionTitle}>Order Products</Text>
    {/* Price info */}
    <View style={ORDER_STYLES.row}>
      <Text style={[ORDER_STYLES.rowTitleCopy]}>Name</Text>
      <Text style={ORDER_STYLES.rowValueHeader}>Qty</Text>
      <Text style={ORDER_STYLES.rowValueHeader}>Price</Text>
      <Text style={ORDER_STYLES.rowValueHeader}>Sub Total</Text>
    </View>
    {products.map((item, index) => {
      return(
        <View key={index}>
        <View style={ORDER_STYLES.row}>
          <Text
            style={[
              ORDER_STYLES.rowTitleCopy,
            ]}>
            {item.Product_Name}
          </Text>
          <Text style={ORDER_STYLES.rowValueCopy}>{item.Product_Qty}</Text>
          <Text style={ORDER_STYLES.rowValueCopy}>{item.Product_Price}</Text>
          <Text style={ORDER_STYLES.rowValueCopy}>
            {item.Product_Qty * item.Product_Price}
          </Text>
        </View>
      </View>
      )
      
  }
  )
  
  }
  </Animatable.View>
  {/* Payment details */}
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Payment details</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Subtotal</Text>
            <Text style={ORDER_STYLES.rowValue}>{parseFloat(order.SubTotal>0 ? order.SubTotal : 0).toFixed(3)}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={[ORDER_STYLES.rowTitle, {textTransform: 'uppercase'}]}>
              VAT
            </Text>
            <Text style={ORDER_STYLES.rowValue}>{parseFloat(order.Vat>0 ? order.Vat : 0).toFixed(3)}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Total Payble</Text>
            <Text style={ORDER_STYLES.rowValue}>{parseFloat(order.Order_Amount>0 ? order.Order_Amount : 0).toFixed(3)}</Text>
          </View>
          <View style={[ORDER_STYLES.row, {borderBottomWidth: 0}]}>
            <Text style={ORDER_STYLES.rowTitle}>Payment Status</Text>
            <View style={ORDER_STYLES.paymentModeCheckmarkContainer}>
              <Text style={
                order.Order_Payment_Status==0 ? 
                ORDER_STYLES.paymentModePending
              :
              ORDER_STYLES.paymentMode
              }>{order.Order_Payment_Status==0 ? 'Pending' : 'Paid'}</Text>
              {order.Order_Payment_Status==0 ? 
              <Icon
              name="checkmark-circle-outline"
              size={scale(25)}
              color={COLORS.red}
            />
              :

              <Icon
                name="checkmark-circle"
                size={scale(25)}
                color={COLORS.green}
              />}
              
            </View>
          </View>
        </Animatable.View>
        {/* Shipping details */}
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Shipping details</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Contact Name</Text>
            <Text style={ORDER_STYLES.rowValue}>{order.Order_ContactPerson}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>Phone number</Text>
            <Text style={ORDER_STYLES.rowValue}>{order.Order_Contact}</Text>
          </View>
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitle}>City</Text>
            <Text style={ORDER_STYLES.rowValue}>{order.AreaName}</Text>
          </View>
          <View style={[ORDER_STYLES.row, {borderBottomWidth: 0}]}>
            <Text style={ORDER_STYLES.rowTitle}>Area Code</Text>
            <Text style={ORDER_STYLES.rowValue}>{order.AreaCode}</Text>
          </View>
        </Animatable.View>
        {/* Actions */}
        {
          order.Order_Status==2 ?
         <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={ORDER_STYLES.sectionContainer}>
          <Text style={ORDER_STYLES.sectionTitle}>Actions</Text>
          <View style={ORDER_STYLES.actionButtonsContainer}>
            {/* <Button
              label="Cancel order"
              customButtonStyle={[
                GLOBAL_STYLES.marginYNone,
                ORDER_STYLES.customButtonStyleCancel,
              ]}
              customLabelStyle={{color: COLORS.white}}
            /> */}
            <Button
              label="Invoice"
              customButtonStyle={[
                GLOBAL_STYLES.marginYNone,
                ORDER_STYLES.customButtonStyleLong,
              ]}
              onPress={() => navigation.navigate('Invoice',{order:order})}
            />
          </View>
        </Animatable.View>
        :
        null }
      </ScrollView>
      }
    
      
      {/* Review writing Modal */}
      <View>
        <Modal
          isVisible={isModalVisible}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={ORDER_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={ORDER_STYLES.passwordResetModalTitle}>
              Write review
            </Text>
            {/* Modal info */}
            <Text style={ORDER_STYLES.passwordResetModalInfo}>
              Review will be verified before publishing.
            </Text>
            {/* Input field title */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter review title"
                placeholderTextColor={COLORS.darkGrey}
                style={[
                  GLOBAL_STYLES.textInput,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            {/* Textarea review */}
            <Textarea
              containerStyle={ORDER_STYLES.textareaContainer}
              style={ORDER_STYLES.textarea}
              onChangeText={text => console.log(text)}
              defaultValue={null}
              maxLength={150}
              placeholder={'Enter review'}
              placeholderTextColor={COLORS.darkGrey}
              underlineColorAndroid={'transparent'}
            />
            {/* Rating about the comfort */}
            <View>
              <Text style={ORDER_STYLES.question}>
                1. How would you rate the comfort?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Comfort rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Rating about the quality */}
            <View>
              <Text style={ORDER_STYLES.question}>
                2. How would you rate the quality?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Quality rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Rating about the durability */}
            <View>
              <Text style={ORDER_STYLES.question}>
                3. How would you rate the durability?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Durability rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Button component */}
            <Button
              label="Submit review"
              customButtonStyle={ORDER_STYLES.customButton}
            />
            {/* Modal close icon */}
            <View style={GLOBAL_STYLES.modalCloseIconContainer}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Icon name="close" size={scale(20)} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default Order;
