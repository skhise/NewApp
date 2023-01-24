import AsyncStorage from '@react-native-async-storage/async-storage';
export default cart = {
    getItemCount : async ()=>{
        let cart = [];
        let data = await AsyncStorage.getItem("cart");
        if(data == null){
            return 0;
        } else {
            let d = JSON.parse(data);
            return d.length;
        }
        
    },
    clearCart: async () =>{
        await AsyncStorage.removeItem("cart");
    },
    getItem: async () => {
        
        let data = await AsyncStorage.getItem("cart");
        if(data == null){
            return [];
        } else {
            if(typeof data.id === "undefined"){
                let d = JSON.parse(data);
                return d;
            } else {
                let d = JSON.parse(data);
                return d;
            }
            
        }
    },
    AddItem: async (item) =>{

        try {
           await AsyncStorage
            .getItem('cart')
            .then(async(favs) => {
               favs = favs == null ? [] : JSON.parse(favs)
               var index = favs.findIndex(function(p, i){
                return p.id === item.id
              });
              console.log(index);
               if(index!=-1){
                favs[index].product_qty = parseInt(favs[index].product_qty)+1;
               } else {
                favs.push(item);
               }
               await AsyncStorage.setItem('cart', JSON.stringify(favs))
            })
            return true;
        } catch(error){
            console.log(error);
            return false;
        }
        
    },
    DeleteItem:async (item) => {
        try {
            await AsyncStorage
             .getItem('cart')
             .then(async(favs) => {
                favs = favs == null ? [] : JSON.parse(favs)
                var index = favs.findIndex(function(p, i){
                 return p.id === item.id
               });
               console.log(index);
               favs.splice(index,1);
               await AsyncStorage.setItem('cart', JSON.stringify(favs));
             })
             return true;
         } catch(error){
             console.log(error);
             return false;
         }
    },
    RemoveItem: async (item) =>{

        try {
           await AsyncStorage
            .getItem('cart')
            .then(async(favs) => {
               favs = favs == null ? [] : JSON.parse(favs)
               var index = favs.findIndex(function(p, i){
                return p.id === item.id
              });
              console.log(index);
               if(index!=-1){
                   if(favs[index].product_qty>=2){
                    favs[index].product_qty=parseInt(favs[index].product_qty)-1;
                    await AsyncStorage.setItem('cart', JSON.stringify(favs));
                   } else {
                    favs.splice(index,1);
                    await AsyncStorage.setItem('cart', JSON.stringify(favs));
                   }
               } 
               
               
            })
            return true;
        } catch(error){
            console.log(error);
            return false;
        }
        
    },
    setNotificationCount: async(count)=>{
        await AsyncStorage.removeItem("notification_count");
        await AsyncStorage.setItem('notification_count', count);
    },
    getNotificationCount:async()=>{
        let data = await AsyncStorage.getItem("notification_count");
        let count = JSON.parse(data);
        return count;
    },
    setNotification: async(notifications)=>{
        await AsyncStorage.removeItem("notifications");
        await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    },
    getNotification:async()=>{
        let data = await AsyncStorage.getItem("notifications");
        if(data == null){
            return [];
        } else {
            if(typeof data.id === "undefined"){
                let d = JSON.parse(data);
                return d;
            } else {
                let d = JSON.parse(data);
                return d;
            }
            
        }
    },
    clearNotification:async()=>{
        await AsyncStorage.removeItem("notification_count");
        await AsyncStorage.removeItem("notifications");
    },
    getUser:async()=>{
        const data  = await AsyncStorage.getItem("user");
        if(data!=null){
            let loginUser = JSON.parse(data);
            return loginUser;
        } else {
            return null;
        }
    },
    getUserId:async()=>{
        const data  = await AsyncStorage.getItem("user");
        if(data!=null){
            let loginUser = JSON.parse(data);
            return loginUser.id;
        } else {
            return 0;
        }
        
    },
    getUserRole:async()=>{
        const data  = await AsyncStorage.getItem("user");
        if(data!=null){
            let loginUser = JSON.parse(data);
            return loginUser.role;
        } else {
            return 0;
        }
        
    }

   
   

}