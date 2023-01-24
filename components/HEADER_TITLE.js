// Importing
import React from 'react';
import {Text} from 'react-native';
import HEADER_TITLE_STYLES from '../styles/components/HEADER_TITLE_STYLES';

// Header title
const HeaderTitle = ({title}) => (
  <Text style={HEADER_TITLE_STYLES.headerTitle}>{title}</Text>
);

// Exporting
export {HeaderTitle};
