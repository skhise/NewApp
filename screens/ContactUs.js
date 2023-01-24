// Importing
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import MAP_STYLES from '../styles/screens/MAP_STYLES';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import COLORS from '../config/COLORS';
import {scale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import {Button} from '../components/BUTTONS';

// Functional component
const ContactUs = () => {
  // Local states
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <View style={MAP_STYLES.contentContainer}>
        <MapView
          style={MAP_STYLES.mapStyle}
          initialRegion={{
            latitude: 28.661165,
            longitude: 77.227692,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable
            coordinate={{
              latitude: 28.661165,
              longitude: 77.227692,
            }}
            onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Nunova furniture'}
            description={'World of latest furnitures.'}
          />
        </MapView>
        <View style={MAP_STYLES.contactInfoContainer}>
          {/* Send mail icon */}
          <Pressable
            style={[MAP_STYLES.sendMailIconContainer, GLOBAL_STYLES.xyCenter]}
            onPress={() => setIsModalVisible(!isModalVisible)}>
            <FeatherIcon name="send" size={scale(25)} color={COLORS.white} />
          </Pressable>
          {/* Mail IDs */}
          <View style={MAP_STYLES.contactInfo}>
            <Icon
              name="mail-open-outline"
              size={scale(25)}
              color={COLORS.primary}
            />
            <View style={MAP_STYLES.contactInfoTitleDetailsContainer}>
              <Text style={MAP_STYLES.contactInfoTitle}>Mail Us</Text>
              <Text style={MAP_STYLES.contactInfoDetails}>
                webtree@webtree.com | support@webtree.com
              </Text>
            </View>
          </View>
          {/* Phone numbers */}
          <View style={MAP_STYLES.contactInfo}>
            <Icon name="call-outline" size={scale(25)} color={COLORS.primary} />
            <View style={MAP_STYLES.contactInfoTitleDetailsContainer}>
              <Text style={MAP_STYLES.contactInfoTitle}>Call Us</Text>
              <Text style={MAP_STYLES.contactInfoDetails}>
                3658740 | 1236478
              </Text>
            </View>
          </View>
          {/* Location address */}
          <View style={MAP_STYLES.contactInfo}>
            <Icon name="location-outline" size={25} color={COLORS.primary} />
            <View style={MAP_STYLES.contactInfoTitleDetailsContainer}>
              <Text style={MAP_STYLES.contactInfoTitle}>Reach Us</Text>
              <Text style={MAP_STYLES.contactInfoDetails}>
                Demo Demo
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Sending mail Modal */}
      <View>
        <Modal
          isVisible={isModalVisible}
          backdropColor={COLORS.fontDark}
          backdropOpacity={0.9}
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={MAP_STYLES.sendingMailModal}>
            {/* Modal title */}
            <Text style={MAP_STYLES.sendingMailModalTitle}>Write us</Text>
            {/* Modal info */}
            <Text style={MAP_STYLES.sendingMailModalInfo}>
              Message will be verified before replying.
            </Text>
            {/* Input field name */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={COLORS.darkGrey}
                style={[GLOBAL_STYLES.textInput, GLOBAL_STYLES.borderDark]}
              />
            </View>
            {/* Input field email */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={COLORS.darkGrey}
                style={[GLOBAL_STYLES.textInput, GLOBAL_STYLES.borderDark]}
              />
            </View>
            {/* Textarea message */}
            <Textarea
              containerStyle={[
                MAP_STYLES.textareaContainer,
                GLOBAL_STYLES.borderDark,
              ]}
              style={MAP_STYLES.textarea}
              onChangeText={text => console.log(text)}
              defaultValue={null}
              maxLength={150}
              placeholder={'Enter your message'}
              placeholderTextColor={COLORS.darkGrey}
              underlineColorAndroid={'transparent'}
            />
            {/* Button component */}
            <Button
              label="Send us"
              customButtonStyle={MAP_STYLES.customButtonStyle}
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
export default ContactUs;
