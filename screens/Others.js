// Importing
import React, {useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput, 
  StyleSheet,
  Dimensions,
  
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../styles/screens/ORDER_STYLES';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from '../components/BUTTONS';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import * as Animatable from 'react-native-animatable';
import {ScreenLoader} from '../components/LOADERS';
import {SnackbarAlert} from '../components/ALERTS';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// Functional component
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Others = ({route,navigation}) => {
  // Local states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading,setLoading] = useState(false);
  const [ticket,setTicket] = useState([]);
  const [accessoryList,setAccessoryList] = useState([]);
  const [statusList,setStatusList] = useState([]);
  const [reasonList,setReasonList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { width } = Dimensions.get("window");
  const [isModalVisibleR, setModalVisibleR] = useState(false);
  const [actionNote,setActionNote] = useState("");
  const [selectedStatus,setSelectedStatus] = useState(0);
  const [selectedReason,setSelectedReason] = useState(0);

  // Returning

  if(Loading){
    return <ScreenLoader message="Loading History..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      </ScrollView>
    </SafeAreaView>
  );
};

// Exporting
export default Others;
