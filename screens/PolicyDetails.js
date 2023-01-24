// Importing
import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import COLORS from '../config/COLORS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import POLICY_DETAILS_STYLES from '../styles/screens/POLICY_DETAILS_STYLES';

// Functional component
const PolicyDetails = ({route}) => {
  // Getting route params
  const {title} = route.params;

  // Returning
  return (
    <SafeAreaView
      style={[GLOBAL_STYLES.safeAreaView, POLICY_DETAILS_STYLES.body]}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={POLICY_DETAILS_STYLES.contentContainer}>
          {/* Last updated date */}
          <Text style={POLICY_DETAILS_STYLES.updatedDate}>
            Last updated on August 7, 2021
          </Text>
          {/* Point title */}
          <Text style={POLICY_DETAILS_STYLES.pointTitle}>{title}</Text>
          {/* Point details */}
          <Text style={POLICY_DETAILS_STYLES.pointDetails}>
          Privacy Policy
                     
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Exporting
export default PolicyDetails;
