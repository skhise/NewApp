// Importing
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import ADDRESSES_STYLES from '../styles/screens/ADDRESSES_STYLES';
import ADDRESSES from '../data/DELIVERY_ADDRESSES';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

// Functional component
const Addresses = () => {
  // Local states and variables
  const [addresses, setAddresses] = useState(ADDRESSES);

  // Returning
  return (
    <View style={GLOBAL_STYLES.safeAreaView}>
      {addresses.length === 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <Animatable.View
            delay={500}
            animation="fadeInDown"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/sad-face.json')}
              loop
              autoPlay
              resizeMode="cover"
            />
          </Animatable.View>
          <Animatable.Text
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieTitle}>
            No Addresses!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any Addresses for now.
          </Animatable.Text>
        </View>
      ) : (
        <View style={GLOBAL_STYLES.flexOneContainer}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {addresses.map((address, index) => {
              return (
                <View
                  key={index}
                  style={[
                    ADDRESSES_STYLES.addressContainer,
                    {marginTop: address.id === 1 ? scale(15) : 0},
                  ]}>
                  <View>
                    <View style={ADDRESSES_STYLES.addressTypeContainer}>
                      <Icon
                        name={address.addressTypeIcon}
                        size={scale(25)}
                        color={COLORS.primary}
                      />
                      <Text style={ADDRESSES_STYLES.addressTypeTitle}>
                        {address.addressType}
                      </Text>
                      {address.isDefault ? (
                        <View
                          style={[
                            ADDRESSES_STYLES.statusContainer,
                            GLOBAL_STYLES.xyCenter,
                          ]}>
                          <Text style={ADDRESSES_STYLES.statusLabel}>
                            Default
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={ADDRESSES_STYLES.name}>{address.name}</Text>
                    <Text style={ADDRESSES_STYLES.contactDetails}>
                      {address.contactDetails}
                    </Text>
                  </View>
                  <Text style={ADDRESSES_STYLES.address}>
                    {address.address}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

// Exporting
export default Addresses;
