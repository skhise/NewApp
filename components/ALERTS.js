// Importing
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import {Button} from './BUTTONS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import ALERT_STYLES from '../styles/components/ALERT_STYLES';
import {scale} from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';

// Functional components

// Confirmation alert
const ConfirmationAlert = ({
  isVisible,
  title,
  subTitle,
  onPressClose,
  onPressCancel,
  onPressDelete,
  isItemDeleted,
  isCloseVisible,
  dynamicLottieView,
  loop,
  dynamicLottieViewTitle,
  cancelButtonLabel,
  confirmButtonLabel,
}) => (
  <View>
    <Modal
      isVisible={isVisible}
      backdropColor={COLORS.primary}
      backdropOpacity={0.8}
      style={{margin: scale(10)}}>
      {/* Modal content */}
      <View style={ALERT_STYLES.alertContenContainer}>
        {/* Trash lottie animation */}
        <LottieView
          source={require('../assets/lottie/trash.json')}
          autoPlay
          loop
          style={ALERT_STYLES.lottieViewTrash}
          resizeMode="cover"
        />
        {/* Title */}
        <View style={ALERT_STYLES.alertTitleContainer}>
          <Text style={ALERT_STYLES.alertTitle}>{title}</Text>
          <Text style={ALERT_STYLES.alertSubTitle}>{subTitle}</Text>
        </View>
        {/* Action buttons */}
        <View style={ALERT_STYLES.actionButtonsContainer}>
          {/* Button component */}
          <Button
            label={cancelButtonLabel}
            customButtonStyle={[
              ALERT_STYLES.actionButton,
              ALERT_STYLES.cancelButton,
            ]}
            onPress={onPressCancel}
          />
          {/* Button component */}
          <Button
            label={confirmButtonLabel}
            customButtonStyle={ALERT_STYLES.actionButton}
            onPress={onPressDelete}
          />
        </View>
        {isItemDeleted ? (
          <View style={ALERT_STYLES.alertModalOverlay}>
            {/* Trash lottie animation */}
            <LottieView
              source={dynamicLottieView}
              autoPlay
              loop={loop}
              style={ALERT_STYLES.dynamicLottieView}
              resizeMode="cover"
            />
            {/* Done title */}
            <Text style={ALERT_STYLES.dynamicLottieViewTitle}>
              {dynamicLottieViewTitle}
            </Text>
            {/* Modal close icon */}
            {isCloseVisible ? (
              <View style={GLOBAL_STYLES.modalCloseIconContainer}>
                <TouchableOpacity onPress={onPressClose}>
                  <Icon
                    name="close-outline"
                    size={scale(25)}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </Modal>
  </View>
);

// Snackbar alert
const SnackbarAlert = (
  text,
  textColor,
  backgroundColor,
  actionText,
  actionTextColor,
) =>
  Snackbar.show({
    text: text,
    textColor: textColor,
    backgroundColor: backgroundColor,
    duration: 3000,
    action: {
      text: actionText,
      textColor: actionTextColor,
    },
  });

// Exporting
export {ConfirmationAlert, SnackbarAlert};
