// Importing
import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {scale} from 'react-native-size-matters';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import MY_COUPONS_STYLES from '../styles/screens/MY_COUPONS_STYLES';
import COUPONS from '../data/COUPONS';
import * as Animatable from 'react-native-animatable';

// Functional component
const MyCoupons = () => {
  // Local states
  const [coupons, setCoupons] = useState(COUPONS);

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {coupons.length === 0 ? (
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
            No Coupons!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any Coupons for now.
          </Animatable.Text>
        </View>
      ) : (
        <View style={MY_COUPONS_STYLES.contentCotainer}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {coupons.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    MY_COUPONS_STYLES.couponContainer,
                    {marginTop: index === 0 ? scale(15) : 0},
                  ]}>
                  {/* Coupon background image */}
                  <Image
                    source={require('../assets/images/coupon-bg.png')}
                    style={[GLOBAL_STYLES.responsiveImage]}
                  />
                  {/* Coupon details */}
                  <View style={MY_COUPONS_STYLES.couponDetails}>
                    {/* Brand image container */}
                    <View style={MY_COUPONS_STYLES.brandImageConainer}>
                      <Image
                        source={item.brandImage}
                        style={GLOBAL_STYLES.responsiveImage}
                      />
                    </View>

                    <View style={MY_COUPONS_STYLES.couponInfoContainer}>
                      <View style={MY_COUPONS_STYLES.offerInfoContainer}>
                        <Text style={MY_COUPONS_STYLES.brandName}>
                          {item.brandTitle}
                        </Text>
                        <Text style={MY_COUPONS_STYLES.offerLabel}>
                          {item.offerLabel}
                        </Text>
                      </View>
                      <View style={MY_COUPONS_STYLES.codeDateContainer}>
                        <Text style={MY_COUPONS_STYLES.code}>{item.code}</Text>
                        <Text style={MY_COUPONS_STYLES.date}>
                          {item.expiryDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

// Exporting
export default MyCoupons;
