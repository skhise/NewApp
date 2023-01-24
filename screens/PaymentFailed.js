// Importing
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button} from '../components/BUTTONS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import PAYMENT_FAILED_STYLES from '../styles/screens/PAYMENT_FAILED_STYLES';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

// Functional component
const PaymentFailed = ({navigation}) => {
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <View style={GLOBAL_STYLES.flexTwoContainer}>
        <View
          style={[
            PAYMENT_FAILED_STYLES.contentCotainer,
            GLOBAL_STYLES.xyCenter,
          ]}>
          <View style={PAYMENT_FAILED_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/payment-failed.json')}
              loop={false}
              autoPlay
              resizeMode="cover"
            />
          </View>
          {/* Failed title */}
          <Animatable.Text
            delay={500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={PAYMENT_FAILED_STYLES.title}>
            Payment Failed!
          </Animatable.Text>
          {/* Failed message */}
          <Animatable.Text
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={PAYMENT_FAILED_STYLES.info}>
            Hey!{' '}
            <Text style={PAYMENT_FAILED_STYLES.highlightedText}>Mohan</Text>,
            Sorry your payment has declined {'\n'}by the Bank due to
            insufficient funds.
          </Animatable.Text>
        </View>
      </View>
      <Animatable.View
        delay={1500}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}
        style={[
          PAYMENT_FAILED_STYLES.buttonsContainer,
          GLOBAL_STYLES.xyCenter,
        ]}>
        {/* Button components */}
        <Button label="Try once again" onPress={() => navigation.goBack()} />
        <Button
          label="Payment Success"
          customButtonStyle={[
            GLOBAL_STYLES.marginYNone,
            PAYMENT_FAILED_STYLES.customButton,
          ]}
          customLabelStyle={{color: COLORS.primary}}
          // onPress={() => navigation.dispatch(StackActions.popToTop())}
          onPress={() => navigation.navigate('PaymentSuccess')}
        />
      </Animatable.View>
    </SafeAreaView>
  );
};

// Exporting
export default PaymentFailed;
