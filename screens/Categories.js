// Importing
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import CATEGORIES_STYLES from '../styles/screens/CATEGORIES_STYLES';
import CATEGORIES from '../data/CATEGORIES';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import Server from '../data/Server_Info';
import ShowAlert from '../data/ShowAlert'
import { scale } from 'react-native-size-matters';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { ScreenLoader } from '../components/LOADERS';
import COLORS from '../config/COLORS';
// Functional component
const Categories = ({navigation}) => {
  // Local states
  let App_Url = Server.api;
  let App_Root = Server.root;
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState([]);//CATEGORIES
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      fetch(App_Url+'getCategoryListApp')
      .then((response) => response.json())
      .then((json)=>{
        setLoading(false);
        console.log(json);
        setCategories(json);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        ShowAlert.ShowAlert("Connection Error!",COLORS.red);
      });
    }catch(error){
     setLoading(false);
      showAlert("Connection Error!");
    }
  }, [isFocused])
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
       {
        Loading 
        ?
        <ScreenLoader message="Loading Tickets..." />
        :
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
          {categories.length === 0 ? (
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
            No categories!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            Sorry! we don't have any Categories for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={CATEGORIES_STYLES.categoriesContainer}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {categories.map((category, index) => (
             <TouchableOpacity
                key={index}
                style={[ 
                  CATEGORIES_STYLES.categoryBox,
                  {
                    borderTopWidth: index > 1 ? 1 : 0,
                    borderRightWidth: category.id % 2 !== 0 ? 1 : 0,
                  },
                ]}
                onPress={() =>{
                  console.log("here");
                  navigation.navigate('ListProducts', {title: category.name,id:category.id})
                }}>
                  {
                          category.image == null
                          ?
                          <Image
                          source={require('../assets/images/default_image.jpg')}
                          style={[{width:scale(100)},{height:scale(100)}]}
                        />
                          :
                          <Image
                          source={{uri:`${App_Root+category.image}`}}
                          style={[{width:scale(100)},{height:scale(100)}]}
                        />
                        }
                <Text style={CATEGORIES_STYLES.categoryTitleCopy}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
        </View>
      }
    </SafeAreaView>
  );
};

// Exporting
export default Categories;
