// Importing
import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import LottieView from 'lottie-react-native';
import Accordion from 'react-native-collapsible/Accordion';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import FAQ_STYLES from '../styles/screens/FAQ_STYLES';
import FAQS from '../data/FAQS';
import * as Animatable from 'react-native-animatable';

// Functional component
const Faq = () => {
  // Local states
  const [faqs, setFaqs] = useState(FAQS);
  const [activeSection, setActiveSection] = useState([1]);

  // Rendering header
  _renderHeader = section => {
    return (
      <View style={FAQ_STYLES.header}>
        <Text style={FAQ_STYLES.question}>{section.question}</Text>
      </View>
    );
  };

  // Rendering content
  _renderContent = section => {
    return (
      <View style={FAQ_STYLES.content}>
        <Text style={FAQ_STYLES.answer}>{section.answer}</Text>
      </View>
    );
  };

  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {faqs.length === 0 ? (
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
            No Faqs!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            There are no Faqs for now.
          </Animatable.Text>
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Accordion
            sections={faqs}
            activeSections={activeSection}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={activeSection => setActiveSection(activeSection)}
            underlayColor="transparent"
            containerStyle={FAQ_STYLES.accordiancontainer}
            keyExtractor={item => item.id}
            align="bottom"
            duration={400}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// Exporting
export default Faq;
