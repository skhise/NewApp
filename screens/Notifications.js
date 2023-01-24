// Importing
import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import NOTIFICATIONS_STYLES from '../styles/screens/NOTIFICATIONS_STYLES';
import NOTIFICATIONS from '../data/NOTIFICATIONS';
import COLORS from '../config/COLORS';
import {scale as smScale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import {ConfirmationAlert, SnackbarAlert} from '../components/ALERTS';
import Animated, {interpolateNode} from 'react-native-reanimated';

// Functional component
const Notifications = ({route,navigation}) => {
  // Local states and variables
  const [notifications, setNotifications] = useState(route.props.Notification);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState(null);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [dynamicLottieView, setDynamicLottieView] = useState(null);
  const [dynamicLottieViewTitle, setDynamicLottieViewTitle] = useState(null);
  const [isCloseVisible, setIsCloseVisible] = useState(false);
  const [loop, setLoop] = useState(true);
  const ITEM_SIZE = smScale(150);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = useRef(new Animated.Value(smScale(135))).current;

  // Updating status of the notification message
  const _updateNotificationStatus = id => {
    // Duplicating notifications data
    const newNotifications = [...notifications];
    // Getting index of clicked item
    const index = notifications.findIndex(item => item.id === id);
    // Comparing
    if (newNotifications[index].status === 'read') {
      // Updating status
      newNotifications[index].status = 'unread';
      // Showing snackbar alert
      SnackbarAlert(
        'Notification marked as unread.',
        COLORS.white,
        COLORS.red,
        'Got it',
        COLORS.white,
      );
    } else if (newNotifications[index].status === 'unread') {
      // Updating status
      newNotifications[index].status = 'read';
      // Showing snackbar alert
      SnackbarAlert(
        'Notification marked as read.',
        COLORS.white,
        COLORS.green,
        'Got it',
        COLORS.white,
      );
    }
    // Updating state
    setNotifications(newNotifications);
  };

  // Removing notification item
  const _removeNotificationItem = id => {
    // Updating states
    setIsItemDeleted(true);
    setDynamicLottieView(require('../assets/lottie/timer.json'));
    setDynamicLottieViewTitle('Wait while deleting...');
    setLoop(true);
    setIsCloseVisible(false);
    // Delete
    setTimeout(() => {
      // Duplicating notifications data
      const newNotifications = [...notifications];
      // Getting index of clicked item
      const index = notifications.findIndex(item => item.id === id);
      // Removing item from the array
      newNotifications.splice(index, 1);
      // Updating state
      setNotifications(newNotifications);
      setDynamicLottieView(require('../assets/lottie/checkmark.json'));
      setDynamicLottieViewTitle('A notification has deleted successfully.');
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
      {notifications.length === 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          <Animatable.View
            delay={500}
            animation="fadeInDown"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/no-notifications.json')}
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
            No Notifications!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            You don't have any Notifications for now.
          </Animatable.Text>
        </View>
      ) : (
        <View style={NOTIFICATIONS_STYLES.contentCotainer}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: SCROLL_Y}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}>
            {notifications.map((itemObj, index) => {
              // Setting dynamic scale input and output range to the interpolate
              const scale = interpolateNode(SCROLL_Y, {
                inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
                outputRange: [1, 1, 1, 0],
              });

              // Setting dynamic opacity input and output range to the interpolate
              const opacity = interpolateNode(SCROLL_Y, {
                inputRange: [
                  -1,
                  0,
                  ITEM_SIZE * index,
                  ITEM_SIZE * (index + 0.75),
                ],
                outputRange: [1, 1, 1, 0],
              });

              // Returning
              return (
                <Animated.View
                  key={itemObj.id}
                  style={[
                    NOTIFICATIONS_STYLES.notificationContainer,
                    {
                      height: ITEM_HEIGHT,
                      transform: [{scale}],
                      opacity,
                      backgroundColor:
                        itemObj.status === 'unread'
                          ? COLORS.primaryLightest
                          : COLORS.white,
                      marginTop: index === 0 ? smScale(15) : 0,
                    },
                  ]}>
                  <View
                    style={[
                      NOTIFICATIONS_STYLES.iconContainer,
                      {backgroundColor: itemObj.color},
                      GLOBAL_STYLES.xyCenter,
                    ]}>
                    <Icon
                      name={itemObj.icon}
                      size={smScale(20)}
                      color={COLORS.white}
                    />
                  </View>
                  <View style={NOTIFICATIONS_STYLES.notification}>
                    <View>
                      <Text style={[NOTIFICATIONS_STYLES.title]}>
                        {itemObj.title}
                      </Text>
                      <Text style={NOTIFICATIONS_STYLES.message}>
                        {itemObj.message}
                      </Text>
                    </View>
                    <View style={NOTIFICATIONS_STYLES.footer}>
                      <View style={NOTIFICATIONS_STYLES.actionIconsContainer}>
                        <TouchableOpacity
                          onPress={() => _showConfirmationAlert(itemObj.id)}>
                          <Icon
                            name="close-circle-outline"
                            size={smScale(25)}
                            color={COLORS.darkGrey}
                            style={NOTIFICATIONS_STYLES.actionIcon}
                          />
                        </TouchableOpacity>
                        {itemObj.status === 'read' ? (
                          <TouchableOpacity
                            onPress={() =>
                              _updateNotificationStatus(itemObj.id)
                            }>
                            <Icon
                              name="mail-open-outline"
                              size={smScale(25)}
                              color={COLORS.darkGrey}
                              style={NOTIFICATIONS_STYLES.actionIcon}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              _updateNotificationStatus(itemObj.id)
                            }>
                            <Icon
                              name="mail-unread-outline"
                              size={smScale(25)}
                              color={COLORS.red}
                              style={NOTIFICATIONS_STYLES.actionIcon}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <Text style={NOTIFICATIONS_STYLES.time}>
                        {itemObj.time}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </Animated.ScrollView>
        </View>
      )}

      {/* Delete confirmation Modal */}
      <ConfirmationAlert
        isVisible={isAlertVisible}
        title="You are about to delete an item!"
        subTitle="Are you sure to delete?"
        onPressClose={() => setIsAlertVisible(!isAlertVisible)}
        onPressCancel={() => setIsAlertVisible(!isAlertVisible)}
        onPressDelete={() => _removeNotificationItem(selectedItemID)}
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
export default Notifications;
