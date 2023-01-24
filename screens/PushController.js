import axios from "axios";
import React, {Component} from "react";
import PushNotification from "react-native-push-notification";
import LocalData from '../data/LocalCart';
import Server_Info from "../data/Server_Info";
import App_API from '../data/App_API';
export const APNBadgeContext = React.createContext({
  badge: 0,
  setBadge: () => { }
});
export const useApnBadge = () => React.useContext(APNBadgeContext);


export default class PushController extends Component{

  
  componentDidMount(){
     
    PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister: async function(token) {
            console.log("TOKEN:", token.token);
            let userId = await LocalData.getUserId();
            console.log("userId:", userId);
            let data = {
              UserId:userId,
              token:token.token
            }
            axios.post(Server_Info.api+""+App_API.fcmToken,data).then(data=>{
              console.log(data.data);
            }).catch(error=>{
              console.log(error.message);
            });
           
          },
        
          // (required) Called when a remote or local notification is opened or received
          onNotification: function(notification) {
           

            console.log("NOTIFICATION:", notification);
            LocalData.setNotificationCount("1");
            LocalData.setNotification(notification);
            
            // process the notification here
        
            // required on iOS only 
           // notification.finish(PushNotificationIOS.FetchResult.NoData);
          },
          // Android only
          senderID: "514944356968",
          // iOS only
          permissions: {
            alert: true,
            badge: true,
            sound: true
          },
          popInitialNotification: true,
          requestPermissions: true
        });
        PushNotification.createChannel(
          {
              channelId: 'fcm_fallback_notification_channel', // (required)
              channelName: 'Channel', // (required)
          },
          (created) => console.log(`createChannel returned '${created}`),
      );
     
  };
  UpdateFcToken() {
    alert(this.token);
  }
  render(){
      return null;
  }
}