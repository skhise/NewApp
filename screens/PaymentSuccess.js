// Importing
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button} from '../components/BUTTONS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import PAYMENT_SUCCESS_STYLES from '../styles/screens/PAYMENT_SUCCESS_STYLES';
import * as Animatable from 'react-native-animatable';
import {StackActions} from '@react-navigation/native';

// Functional component
const PaymentSuccess = ({navigation}) => {
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <View style={GLOBAL_STYLES.flexTwoContainer}>
        <View
          style={[
            PAYMENT_SUCCESS_STYLES.contentCotainer,
            GLOBAL_STYLES.xyCenter,
          ]}>
          <View style={PAYMENT_SUCCESS_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/checkmark.json')}
              loop={false}
              autoPlay
              resizeMode="cover"
            />
          </View>
          {/* Success title */}
          <Animatable.Text
            delay={500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={PAYMENT_SUCCESS_STYLES.title}>
            Payment Successful!
          </Animatable.Text>
          {/* Success message */}
          <Animatable.Text
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={PAYMENT_SUCCESS_STYLES.info}>
            Hey!{' '}
            <Text style={PAYMENT_SUCCESS_STYLES.highlightedText}>Mohan</Text>,
            Thank you for the Payment. {'\n'}Your order is bieng processed.
          </Animatable.Text>
          {/* Order number */}
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={PAYMENT_SUCCESS_STYLES.orderNumber}>
            Order ID - ORD#627819919
          </Animatable.Text>
        </View>
      </View>
      <Animatable.View
        delay={2000}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}
        style={[
          PAYMENT_SUCCESS_STYLES.buttonsContainer,
          GLOBAL_STYLES.xyCenter,
        ]}>
        {/* Button component */}
        <Button
          label="Back to cart"
          onPress={() => navigation.dispatch(StackActions.popToTop())}
        />
      </Animatable.View>
    </SafeAreaView>
  );
};

// Exporting
export default PaymentSuccess;
