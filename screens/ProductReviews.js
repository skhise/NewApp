// Importing
import React, {useState} from 'react';
import {SafeAreaView, FlatList, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import PRODUCT_REVIEWS from '../data/PRODUCT_REVIEWS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import {ProductReviewCard} from '../components/CARDS';
import {scale} from 'react-native-size-matters';
import {Button} from '../components/BUTTONS';
import * as Animatable from 'react-native-animatable';

// Functional component
const ProductReviews = () => {
  // Local states
  const [reviews, setReviews] = useState(PRODUCT_REVIEWS);

  // Rendering item for the Flatlist
  const _renderItem = ({item, index}) => (
    <ProductReviewCard
      id={item.id}
      index={index}
      overallRating={item.overallRating}
      reviewAge={item.reviewAge}
      reviewTitle={item.reviewTitle}
      review={item.review}
      reviewerImage={item.reviewerImage}
      reviewerName={item.reviewerName}
      reviewerDesignation={item.reviewerDesignation}
    />
  );

  // List footer component
  const _listFooterComponent = () => (
    <View style={PRODUCT_REVIEWS_STYLES.buttonContainer}>
      <Button
        label="More reviews"
        customButtonStyle={[
          GLOBAL_STYLES.marginYNone,
          PRODUCT_REVIEWS_STYLES.customButtonStyle,
        ]}
      />
    </View>
  );

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {reviews.length === 0 ? (
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
            No Reviews!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            This item doesn't have any Reviews for now.
          </Animatable.Text>
        </View>
      ) : (
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={reviews}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
          ListFooterComponent={_listFooterComponent}
        />
      )}
    </SafeAreaView>
  );
};

// Exporting
export default ProductReviews;

// Style
const PRODUCT_REVIEWS_STYLES = StyleSheet.create({
  buttonContainer: {marginHorizontal: scale(15)},
  customButtonStyle: {marginBottom: scale(15)},
});
