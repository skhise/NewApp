// Importing
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import PAYMENT_STYLES from '../styles/screens/PAYMENT_STYLES';
import {scale} from 'react-native-size-matters';
import COLORS from '../config/COLORS';
import DIMENSIONS from '../config/DIMENSIONS';
import {Button} from '../components/BUTTONS';
import GATEWAYS from '../data/GATEWAYS';
import {
  BoxedRadioDefault,
  BoxedRadioSelected,
  CircledRadioDefault,
  CircledRadioSelected,
} from '../components/RADIOS';
import {CheckboxChecked, CheckboxUnchecked} from '../components/CHECKBOXES';

// Constants
const {width} = DIMENSIONS;
const WIDTH_48_PERCENT = '48%';

// Functional component
const Payment = ({navigation}) => {
  // Local states
  const [paymentType, setPaymentType] = useState('card');
  const [checkboxStatus, setCheckboxStatus] = useState(true);
  const [gateways, setGateways] = useState(GATEWAYS);
  const refScrollView = useRef(null);

  //   Toggling checkbox
  const _toggleCheckbox = () => {
    setCheckboxStatus(!checkboxStatus);
  };

  // Scrolling scrollview
  const scrollToIndex = index => {
    refScrollView.current.scrollTo({
      x: width * index,
      y: 0,
      animated: true,
    });
  };

  // Toggling payment type
  const _togglePaymentType = param => {
    setPaymentType(param);
    scrollToIndex(param === 'card' ? 0 : param === 'gateway' ? 1 : 0);
  };

  // Toggling address radio
  const _toggleGatewayRadio = param => {
    // Preparing new data
    const newData = [...gateways];
    // Getting index of new selected radio
    const clickedRadioIndex = gateways.findIndex(item => item.id === param);
    // Getting index of already selected radio
    const selectedRadioIndex = gateways.findIndex(item => item.active === true);
    // Updating already selected radio active status to false
    newData[selectedRadioIndex].active = false;
    // Updating new selected radio active status to true
    newData[clickedRadioIndex].active = true;
    // Updating state
    setGateways(newData);
  };

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {/* Header */}
      <View style={[PAYMENT_STYLES.header]}>
        {paymentType === 'card' ? (
          // Boxed radio component
          <BoxedRadioSelected
            label="Card pay"
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        ) : (
          // Boxed radio component
          <BoxedRadioDefault
            label="Card pay"
            onPress={() => _togglePaymentType('card')}
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        )}
        {paymentType === 'gateway' ? (
          // Boxed radio component
          <BoxedRadioSelected
            label="Gateway pay"
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        ) : (
          // Boxed radio component
          <BoxedRadioDefault
            label="Gateway pay"
            onPress={() => _togglePaymentType('gateway')}
            customRadioStyle={{width: WIDTH_48_PERCENT}}
          />
        )}
      </View>
      {/* Body */}
      <View style={PAYMENT_STYLES.body}>
        <ScrollView
          ref={refScrollView}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}>
          <View style={PAYMENT_STYLES.scrollViewContentContainer}>
            {/* Card number input field */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Card number</Text>
              <TextInput
                placeholder="9190 1100 0000 7188"
                placeholderTextColor={COLORS.fontLight}
                style={GLOBAL_STYLES.textInput}
              />
            </View>
            {/* Expiry & CVV code input fields */}
            <View style={PAYMENT_STYLES.expiryCvvInputContainer}>
              <View style={{width: WIDTH_48_PERCENT}}>
                <View style={GLOBAL_STYLES.inputGroup}>
                  <Text style={GLOBAL_STYLES.inputLabel}>Expiry</Text>
                  <TextInput
                    placeholder="11/24"
                    placeholderTextColor={COLORS.fontLight}
                    style={GLOBAL_STYLES.textInput}
                  />
                </View>
              </View>
              <View style={{width: WIDTH_48_PERCENT}}>
                <View style={GLOBAL_STYLES.inputGroup}>
                  <Text
                    style={[
                      GLOBAL_STYLES.inputLabel,
                      GLOBAL_STYLES.textUppercase,
                    ]}>
                    Cvv
                  </Text>
                  <TextInput
                    placeholder="***"
                    placeholderTextColor={COLORS.fontLight}
                    style={GLOBAL_STYLES.textInput}
                  />
                </View>
              </View>
            </View>
            {/* Name input field */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <Text style={GLOBAL_STYLES.inputLabel}>Card holder name</Text>
              <TextInput
                placeholder="Jhon Doe"
                placeholderTextColor={COLORS.fontLight}
                style={GLOBAL_STYLES.textInput}
              />
            </View>
            {/* Checkbox */}
            <View
              style={[
                GLOBAL_STYLES.flexRow,
                PAYMENT_STYLES.checkboxInlineContainer,
              ]}>
              {checkboxStatus ? (
                // Checkbox component
                <CheckboxChecked onPress={() => _toggleCheckbox()} />
              ) : (
                // Checkbox component
                <CheckboxUnchecked onPress={() => _toggleCheckbox()} />
              )}
              <Text style={PAYMENT_STYLES.checkboxLabel}>
                Save for faster payment next time.
              </Text>
            </View>
          </View>
          <View style={PAYMENT_STYLES.scrollViewContentContainer}>
            {/* Nested scrollview */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={GLOBAL_STYLES.scrollviewContentContainer}>
              {gateways.map((gateway, index) => {
                return gateway.active ? (
                  <View
                    key={index}
                    style={[
                      PAYMENT_STYLES.gatewayContainer,
                      PAYMENT_STYLES.gatewayContainerSelected,
                      {
                        marginBottom:
                          index === gateways.length - 1 ? scale(15) : 0,
                      },
                    ]}>
                    <View style={PAYMENT_STYLES.radioGatewayImageContainer}>
                      <CircledRadioSelected />
                      <Image
                        source={gateway.image}
                        style={PAYMENT_STYLES.gatewayImage}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => _toggleGatewayRadio(gateway.id)}
                    key={index}
                    style={[
                      PAYMENT_STYLES.gatewayContainer,
                      PAYMENT_STYLES.gatewayContainerDefault,
                      {
                        marginBottom:
                          index === gateways.length - 1 ? scale(15) : 0,
                      },
                    ]}>
                    <View style={PAYMENT_STYLES.radioGatewayImageContainer}>
                      <CircledRadioDefault />
                      <Image
                        source={gateway.image}
                        style={PAYMENT_STYLES.gatewayImage}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      {/* Footer */}
      <View style={[PAYMENT_STYLES.footer, GLOBAL_STYLES.xyCenter]}>
        <View style={PAYMENT_STYLES.totalContainerInline}>
          <Text style={PAYMENT_STYLES.totalLabel}>Checkout total</Text>
          <Text style={PAYMENT_STYLES.totalAmount}> 399.99</Text>
        </View>
        <Button
          label="Continue"
          customButtonStyle={GLOBAL_STYLES.marginYNone}
          onPress={() => navigation.navigate('PaymentFailed')}
        />
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default Payment;
