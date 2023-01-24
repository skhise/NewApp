// Importing
import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import LottieView from 'lottie-react-native';
import {ButtonWithIcon} from '../components/BUTTONS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import WISHLIST_STYLES from '../styles/screens/WISHLIST_STYLES';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import WISHLIST_ITEMS from '../data/WISHLIST_ITEMS';
import {ConfirmationAlert, SnackbarAlert} from '../components/ALERTS';

// Functional component
const Wishlist = () => {
  // Local states
  const [wishlist, setWishlist] = useState(WISHLIST_ITEMS);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState(null);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [dynamicLottieView, setDynamicLottieView] = useState(null);
  const [dynamicLottieViewTitle, setDynamicLottieViewTitle] = useState(null);
  const [isCloseVisible, setIsCloseVisible] = useState(false);
  const [loop, setLoop] = useState(true);

  // Removing wishlist item
  const _removeWislistItem = id => {
    // Updating states
    setIsItemDeleted(true);
    setDynamicLottieView(require('../assets/lottie/timer.json'));
    setDynamicLottieViewTitle('Wait while deleting...');
    setLoop(true);
    setIsCloseVisible(false);
    // Delete
    setTimeout(() => {
      // Duplicating wishlist data
      const newWishlist = [...wishlist];
      // Getting index of clicked item
      const index = wishlist.findIndex(item => item.id === id);
      // Removing item from the array
      newWishlist.splice(index, 1);
      // Updating state
      setWishlist(newWishlist);
      setDynamicLottieView(require('../assets/lottie/checkmark.json'));
      setDynamicLottieViewTitle('An item deleted successfully.');
      setLoop(false);
      setIsCloseVisible(true);
    }, 3000);
  };

  // Showing delete confirmation alert
  const _showConfirmationAlert = itemID => {
    // Updating states
    setIsAlertVisible(!isAlertVisible);
    setSelectedItemID(itemID);
    setIsItemDeleted(false);
  };

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {wishlist.length === 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <View style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/broken-heart.json')}
              loop
              autoPlay
              resizeMode="cover"
            />
          </View>
          <Animatable.Text
            delay={500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieTitle}>
            Empty Wishlist!
          </Animatable.Text>
          <Animatable.Text
            delay={1000}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            Oh snap! Seems, your Wishlist is empty. {'\n'}Add a few items to
            make me Happy :)
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {wishlist.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  WISHLIST_STYLES.itemContainer,
                  {marginTop: index === 0 ? scale(15) : 0},
                ]}>
                {/* Item photo */}
                <View style={WISHLIST_STYLES.itemPhotoContainer}>
                  <Image
                    source={item.photo}
                    style={GLOBAL_STYLES.responsiveImage}
                  />
                </View>

                {/* Item info */}
                <View style={WISHLIST_STYLES.itemInfo}>
                  {/* Item title, price & qty */}
                  <View>
                    <Text style={WISHLIST_STYLES.itemTitle}>{item.title}</Text>
                    <Text style={WISHLIST_STYLES.itemPrice}>
                      {item.price} X {item.qty}
                    </Text>
                  </View>

                  <View style={WISHLIST_STYLES.infoFooter}>
                    {/* Added date */}
                    <View style={WISHLIST_STYLES.addedDateContainer}>
                      <Text style={WISHLIST_STYLES.addedDate}>
                        {item.addedOn}
                      </Text>
                    </View>

                    {/* Add to cart button */}
                    <ButtonWithIcon
                      iconName="cart-outline"
                      iconSize={scale(20)}
                      iconColor={COLORS.primary}
                      customButtonStyle={[
                        GLOBAL_STYLES.marginYNone,
                        WISHLIST_STYLES.buttonWithIcon,
                      ]}
                      onPress={() =>
                        SnackbarAlert(
                          'An item added to cart.',
                          COLORS.white,
                          COLORS.green,
                          'Got it',
                          COLORS.white,
                        )
                      }
                    />

                    {/* Trash button */}
                    <ButtonWithIcon
                      iconName="trash-outline"
                      iconSize={scale(20)}
                      iconColor={COLORS.primary}
                      customButtonStyle={[
                        GLOBAL_STYLES.marginYNone,
                        WISHLIST_STYLES.buttonWithIcon,
                      ]}
                      onPress={() => _showConfirmationAlert(item.id)}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* Delete confirmation Modal */}
      <ConfirmationAlert
        isVisible={isAlertVisible}
        title="You are about to delete an item!"
        subTitle="Are you sure to delete?"
        onPressClose={() => setIsAlertVisible(!isAlertVisible)}
        onPressCancel={() => setIsAlertVisible(!isAlertVisible)}
        onPressDelete={() => _removeWislistItem(selectedItemID)}
        isItemDeleted={isItemDeleted}
        isCloseVisible={isCloseVisible}
        dynamicLottieView={dynamicLottieView}
        loop={loop}
        dynamicLottieViewTitle={dynamicLottieViewTitle}
        cancelButtonLabel="No"
        confirmButtonLabel="Yes"
      />
    </SafeAreaView>
  );
};

// Exporting
export default Wishlist;
