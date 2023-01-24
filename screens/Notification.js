import React, { Fragment, useEffect, useState } from 'react';
import PushController from './PushController';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Dummy data for list, we'll replace this with data received from push

const Notification = ({route,navigation}) => {
  const [notifications, setNotifications] = useState([]);
  const isFocused = useIsFocused();

  useEffect(()=>{
    setNotifications([]);
    try{
      setNotifications(route.params.Notification);
    } catch(error){
      console.log(error.message);
    };
    
  },[isFocused]); 
  
  _renderItem = ({ item,index }) => (
    <TouchableOpacity
    key={index} 
    onPress={()=>{
      navigation.navigate('TicketList',{title:"New Tickets",ticketType:2,user_id:route.params.user_id});
          }}>
        <View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
    </TouchableOpacity>
    
  );
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        {(notifications.length != 0) && 
        <FlatList
          data={notifications}
          renderItem={(item) => this._renderItem(item)}
          keyExtractor={(item) => item.title}
        />
        }
        {(notifications.length == 0) &&
          <View style={styles.noData}>
            <Text style={styles.noDataText}>You don't have any notification yet.</Text>
          </View>}
        {/* <LearnMoreLinks /> */}
      </View>
  </SafeAreaView>
      );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    color: "#000",
  },
  noData: {
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
export default Notification;