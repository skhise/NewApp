// Importing
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import PERSONAL_DETAILS_STYLES from '../styles/screens/PERSONAL_DETAILS_STYLES';
import COLORS from '../config/COLORS';
import {Button} from '../components/BUTTONS';
import {scale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

// Functional component
const PersonalDetails = () => {
  // Local states
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('Webtree');
  const [mobileNumber, setMobileNumber] = useState('12365478');
  const [emailId, setEmailId] = useState('demo6@hotmail.com');
  const [address, setAddress] = useState(
    'Demo, Demo',
  );
  const [city, setCity] = useState('Demo');
  const [zipCode, setZipCode] = useState('819919');

  // Toggling password visibility
  const _togglePasswordVisibility = () => {
    setIsPasswordInvisible(!isPasswordInvisible);
  };

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[
          GLOBAL_STYLES.authFormFlexArea,
          {backgroundColor: COLORS.white},
        ]}
        contentContainerStyle={GLOBAL_STYLES.scrollviewContentContainer}>
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[
            GLOBAL_STYLES.authFormContainer,
            GLOBAL_STYLES.yCenter,
            PERSONAL_DETAILS_STYLES.noBorderRadius,
          ]}>
          {/* Input field name */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={name}
            />
          </View>
          {/* Input field mobile */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Mobile number</Text>
            <TextInput
              placeholder="Enter your mobile number"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={mobileNumber}
            />
          </View>
          {/* Input field email */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={emailId}
            />
          </View>
          {/* Input field address */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={address}
            />
          </View>
          {/* Input field city */}
          <View style={GLOBAL_STYLES.inputGroup}>
            <Text style={GLOBAL_STYLES.inputLabel}>City</Text>
            <TextInput
              placeholder="Enter your city"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={city}
            />
          </View>
          {/* Input field zip code */}
          <View style={[GLOBAL_STYLES.inputGroup, GLOBAL_STYLES.marginBNone]}>
            <Text style={GLOBAL_STYLES.inputLabel}>ZIP code</Text>
            <TextInput
              placeholder="Enter your ZIP code"
              placeholderTextColor={COLORS.fontLight}
              style={GLOBAL_STYLES.textInput}
              value={zipCode}
            />
          </View>
          {/* Button component */}
          <Button label="Save Details" />
          {/* Question */}
          <View style={GLOBAL_STYLES.questionContainer}>
            <Text style={GLOBAL_STYLES.question}>
              Want to update login details?
            </Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={[GLOBAL_STYLES.question, GLOBAL_STYLES.actionLink]}>
                Click here
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
      {/* Login details update Modal */}
      <View>
        <Modal
          isVisible={isModalVisible}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={PERSONAL_DETAILS_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalTitle}>
              Update login details
            </Text>
            {/* Modal info */}
            <Text style={PERSONAL_DETAILS_STYLES.passwordResetModalInfo}>
              We'll send 4 digit code to your eMail.
            </Text>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={COLORS.darkGrey}
                style={[
                  GLOBAL_STYLES.textInput,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            {/* Input field current password */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter current password"
                placeholderTextColor={COLORS.darkGrey}
                style={[
                  GLOBAL_STYLES.textInput,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            {/* Input field new password */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter new password"
                placeholderTextColor={COLORS.darkGrey}
                style={[
                  GLOBAL_STYLES.textInput,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            <Button
              label="Update Details"
              customButtonStyle={{
                marginVertical: 0,
                marginTop: scale(10),
              }}
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
export default PersonalDetails;
