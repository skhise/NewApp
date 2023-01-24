// Importing
import React, { useState } from 'react';
import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import INVOICE_STYLES from '../styles/screens/INVOICE_STYLES';
import * as Animatable from 'react-native-animatable';

// Functional component
const Invoice = ({route,navigation}) => {
  // Returning
  const [order,setOrder] = useState(route.params.order);
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GLOBAL_STYLES.scrollviewContentContainer}>
        {/* Invoice container */}
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={INVOICE_STYLES.invoiceContainer}>
          {/* Logo */}
          <View style={INVOICE_STYLES.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={GLOBAL_STYLES.responsiveImage}
            />
          </View>
          {/* Date & time */}
          <Text style={INVOICE_STYLES.dateTime}>
            {order.createdat}
          </Text>
          {/* Order ID container */}
          <View style={INVOICE_STYLES.orderIdContainer}>
            <Text style={INVOICE_STYLES.orderId}>ID: {order.id}</Text>
          </View>
          {/* Invoice details rows */}
          <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Customer</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>{order.CustomerName}</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>{order.Order_ContactPerson}{'\n'}{order.Order_Contact}</Text>
          </View>
          
          {/* <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Type</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>Certified</Text>
          </View> */}
          <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Address</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>
              {order.Order_Billing_Address}
            </Text>
          </View>
          <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Area</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>{order.AreaName},{order.AreaCode}</Text>
          </View>
          {/* Divider */}
          <View style={INVOICE_STYLES.divider}></View>
          {/* Item details table */}
          <View style={INVOICE_STYLES.itemsTable}>
            {/* Table heading row */}
            <View style={INVOICE_STYLES.itemsTableHeading}>
              <Text style={[INVOICE_STYLES.itemsTableHeadingColumnTitle]}>
                Item
              </Text>
              <Text style={[INVOICE_STYLES.itemsTableHeadingColumnTitle]}>
                Price
              </Text>
              <Text style={[INVOICE_STYLES.itemsTableHeadingColumnTitle]}>
                Qty
              </Text>
              <Text style={[INVOICE_STYLES.itemsTableHeadingColumnTitle]}>
                Total
              </Text>
            </View>
            {/* Table data row */}
            {order.product.map((item, index) => {
      return(
        <View key={index} style={INVOICE_STYLES.itemsTableDataRow}>
        <Text
            style={[
              INVOICE_STYLES.itemsTableDataRowColumnTitle,
              {width:180} ,
            ]}>
            {item.Product_Name}
          </Text>
          <Text style={INVOICE_STYLES.itemsTableDataRowColumnTitle}>{item.Product_Qty}</Text>
          <Text style={INVOICE_STYLES.itemsTableDataRowColumnTitle}>{item.Product_Price}</Text>
          <Text style={INVOICE_STYLES.itemsTableDataRowColumnTitle}>
            {item.Product_Qty * item.Product_Price}
          </Text>
      </View>
      )
      
  }
  )
  
  }
              
             
            
            
          </View>
          <View style={INVOICE_STYLES.divider}></View>
          <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Amount</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>{order.SubTotal}</Text>
          </View>
          <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Tax</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>{order.Vat}</Text>
          </View>
          <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Total</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>{order.Order_Amount}</Text>
          </View>
          {/* Divider */}
          <View style={INVOICE_STYLES.divider}></View>
          {/* <View style={INVOICE_STYLES.invoiceDetailsRow}>
            <Text style={INVOICE_STYLES.rowTitle}>Method</Text>
            <Text style={INVOICE_STYLES.rowTitleValue}>Credit card</Text>
          </View> */}
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Exporting
export default Invoice;
