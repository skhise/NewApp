// Importing
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
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
import COLORS from '../../config/COLORS';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from '../../components/BUTTONS';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import * as Animatable from 'react-native-animatable';
import {ScreenLoader} from '../../components/LOADERS';
import {SnackbarAlert} from '../../components/ALERTS';
import DatePicker from 'react-native-date-picker'

import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// Functional component
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Server from '../../data/Server_Info';
import ShowAlert from '../../data/ShowAlert';
import BUTTON_STYLES from '../../styles/components/BUTTON_STYLES';
import {CheckboxChecked, CheckboxUnchecked} from '../../components/CHECKBOXES';
import axios from 'axios';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

const FieldReport = ({route, navigation}) => {
  // Local states
  let App_Url = Server.api;
  let total = 0;
  const isFocused = useIsFocused();
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const [openAttendtedDate, setopenAttendtedDate] = useState(false)
  const [openStartTime, setopenStartTime] = useState(false)
  const [openEndTime, setopenEndTime] = useState(false)
  const [perVat, setPerVat] = useState(0);

  const [ticket, setTicket] = useState([]);
  const [checkboxStatusWar, setCheckboxStatusWar] = useState(false);
  const [checkboxStatusMaint, setCheckboxStatusMaint] = useState(false);
  const [checkboxStatusCharge, setCheckboxStatusCharge] = useState(false);

  const [checkboxStatusCheque, setCheckboxStatusCheque] = useState(false);
  const [checkboxStatusCash, setCheckboxStatusCash] = useState(false);

  const [checkboxStatusPaid, setCheckboxStatusPaid] = useState(false);
  const [checkboxStatusUnPaid, setCheckboxStatusUnPaid] = useState(false);

  const [accessoryList, setAccessoryList] = useState([]);
  let [TotalAmount,setTotalAmount] = useState(0);
  let [Service_Charge, setService_Charge] = useState(0);
  const [Part_Fitting, setPart_Fitting] = useState("0");
  const [Vat, setVat] = useState("");
  const [FWTDS, setFWTDS] = useState("0");
  const [PWTDS, setPWTDS] = useState("0");
  const [PWHardness, setPWHardness] = useState("0");
  const [FeedFlow, setFeedFlow] = useState("0");
  const [FeedPumpPr, setFeedPumpPr] = useState("0");
  const [FilterInletPr, setFilterInletPr] = useState("0");
  const [FilterOutletPr, setFilterOutletPr] = useState("0");
  const [SystemPr, setSystemPr] = useState("0");
  const [ProductFlow, setProductFlow] = useState("0");
  const [RejectFlow, setRejectFlow] = useState("0");
  const [RejectPr, setRejectPr] = useState("0");
  const [HpPumpPr, setHpPumpPr] = useState("0");
  const [FWPH, setFWPH] = useState("0");
  const [PWPH, setPWPH] = useState("0");
  const [FWHardness, setFWHardness] = useState("0");
  const [DOA, setDOA] = useState(new Date());
  const [STOA, setSTOA] = useState(new Date());
  const [ETOA, setETOA] = useState(new Date());
  const [Quotation_No, setQuotation_No] = useState('');
  const [Quotation_Date, setQuotation_Date] = useState(new Date());
  const [Observation_Note, setObservation_Note] = useState('');
  const [remark, setRemark] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [EquipmentLeft, setEquipmentLeft] = useState('');
  const [EquipmenttoOrder, setEquipmenttoOrder] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isSubmitting,setIsSubmitting] = useState(false);

  useLayoutEffect(()=> {
    VatDetails();
  },[])
  const VatDetails =() =>{
      axios.get(App_Url+"AccountSetting").then(json=>{
        setPerVat(json.data.account[0].vat)
      }).catch(error=>{
        ShowAlert.ShowAlert(error.message);
      })
  }
  const GetFieldReport = () => {
    setLoading(true);
    const user_id = route.params.userId;
    const id = route.params.id;
    GetAccessoryList();
    fetch(App_Url + 'GetServiceFieldReportApp?userId=' + user_id + '&id=' + id)
      .then(response => response.json())
      .then(json => {
        
        setTicket(json.report);
        let report = json.report;
        if(json.success && report!='undefined'){
          if(report.ServiceId != null){
            setQuotation_No(report.QuotationNo);
          setQuotation_Date(report.QuotationDate!=null ? new Date(report.QuotationDate) : new Date());
          setFWTDS(report.FWTDS);
          setPWTDS(report.PWTDS);
          setFWPH(report.FWPH);
          setPWPH(report.PWPH);
          setFWHardness(report.FWHardness);
          setPWHardness(report.PWHardness);
          setFeedPumpPr(report.FeedPumpPr);
          setHpPumpPr(report.HpPumpPr);
          setFilterOutletPr(report.FilterOutletPr);
          setFeedFlow(report.FeedFlow);
          setFilterInletPr(report.FilterInletPr);
          setRejectFlow(report.RejectFlow);
          setSystemPr(report.SystemPr);
          setProductFlow(report.ProductFlow);
          setRejectPr(report.RejectPr);
          setDOA(report.DOA!=null ? new Date(report.DOA) : report.accespted_datetime!=null ? new Date(report.accespted_datetime) : new Date());
          setSTOA(report.TOA!=null ? new Date(report.TOA):new Date());
          setETOA(report.ETOA!=null ? new Date(report.ETOA): new Date());
          setObservation_Note(report.ObservationNote);
          setServiceType(report.ServiceType);
          setEquipmentLeft(report.EquipmentLeft);
          setEquipmenttoOrder(report.EquipmenttoOrder);
          setPaymentStatus(report.PaymentStatus);
          setPaymentType(report.PaymentMode);
         // setVat(report.Vat);
        //  setService_Charge(report.ServiceCharges);
          setPart_Fitting(report.Part_Fitting);
          
          setRemark(report.Remarks);
          if (report.ServiceType == 'warranty') {
            setCheckboxStatusWar(true);
            setCheckboxStatusCharge(false);
            setCheckboxStatusMaint(false);
          }
          if (report.ServiceType == 'maintenance') {
            setCheckboxStatusWar(false);
            setCheckboxStatusCharge(false);
            setCheckboxStatusMaint(true);
          }
          if (report.ServiceType == 'chargeable') {
            setCheckboxStatusWar(false);
            setCheckboxStatusCharge(true);
            setCheckboxStatusMaint(false);
          }
          if (report.PaymentMode == 'cash') {
            setCheckboxStatusCash(true);
            setCheckboxStatusCheque(false);
          }
          if (report.PaymentMode == 'cheque') {
            setCheckboxStatusCheque(true);
            setCheckboxStatusCash(false);
          }
          if (report.PaymentStatus == 'paid') {
            setCheckboxStatusPaid(true);
            setCheckboxStatusUnPaid(false);
          }
          if (report.PaymentStatus == 'unpaid') {
            setCheckboxStatusPaid(false);
            setCheckboxStatusUnPaid(true);
          }
          }
        }
        
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
       ShowAlert.ShowAlert(error.message,COLORS.red);
      });
  };
  const GetAccessoryList = async () => {
    try{
      const user_id = route.params.userId;
    const id = route.params.id;
    fetch(App_Url + 'GetServiceTicketById?userId=' + user_id + '&id=' + id)
      .then(response => response.json())
      .then(json => {
        setAccessoryList(json.ticket.accessory);
      })
      .catch(error => {
        setLoading(false);
        ShowAlert.ShowAlert(error.message,COLORS.red);
      });
    }catch(error){
      setLoading(false);
      ShowAlert.ShowAlert(error.message,COLORS.red);
    }
    
  };
  const handleReportSave = async (isSubmitted) => {
    try {
      const user_id = route.params.userId;
      const id = route.params.id;
      let values = {
        ServiceId: id,
        user_id: user_id,
        QuotationNo: Quotation_No,
        QuotationDate: Quotation_Date,
        FWTDS: FWTDS,
        PWTDS: PWTDS,
        FWPH: FWPH,
        PWPH: PWPH,
        FWHardness: FWHardness,
        PWHardness: PWHardness,
        FeedPumpPr: FeedPumpPr,
        HpPumpPr: HpPumpPr,
        FilterOutletPr: FilterOutletPr,
        FeedFlow: FeedFlow,
        FilterInletPr: FilterInletPr,
        RejectFlow: RejectFlow,
        SystemPr: SystemPr,
        ProductFlow: ProductFlow,
        RejectPr: RejectPr,
        DOA: DOA,
        STOA: STOA,
        ETOA: ETOA,
        ObservationNote: Observation_Note,
        ServiceType: serviceType,
        PaymentMode: paymentType,
        ServiceCharges: Service_Charge,
        Part_Fitting: Part_Fitting,
        Vat: Vat,
        Remarks: remark,
        EquipmentLeft: EquipmentLeft,
        EquipmenttoOrder: EquipmenttoOrder,
        TotalAmount: TotalAmount,
        PaymentStatus: paymentStatus,
        isSubmitted:isSubmitted

      };
      setIsSubmitting(true);
      axios.post(App_Url+'AddFieldReportApp', values)
        .then(json => {
          setIsSubmitting(false);
          if (json.data.success) {
            ShowAlert.ShowAlert(json.data.message, COLORS.green);
            GetFieldReport();
          } else {
            ShowAlert.ShowAlert(json.data.message, COLORS.red);
          }
        }).catch(error => {
          setIsSubmitting(false);
          ShowAlert.ShowAlert(error.message, COLORS.red);
        });
    } catch (error) {
      setIsSubmitting(false);
      ShowAlert.ShowAlert(error.message, COLORS.red);
    }
  };
  useEffect(() => {
    GetFieldReport();
  }, [isFocused]);

  useEffect(() => {
    totalCal();
  }, [accessoryList]);

  const totalCal = () => {
    let totalVal = 0;
    for (let i = 0; i < accessoryList.length; i++) {
      totalVal = (accessoryList[i].Is_Paid ==0 ? parseFloat(accessoryList[i].price*accessoryList[i].given_qty):0) +parseFloat(totalVal);
    }
    setService_Charge(totalVal)
    let totalVal1 = parseFloat(Part_Fitting) + totalVal;
    let vatVlaue = (totalVal1/100)*perVat;
    setVat(parseFloat(vatVlaue).toFixed(3));
    totalVal = parseFloat(vatVlaue)+parseFloat(totalVal1);
    setTotalAmount(parseFloat(totalVal).toFixed(3));
  };


  const _toggleCheckboxCheque = () => {
    setCheckboxStatusCheque(true);
    setCheckboxStatusCash(false);
    setPaymentType('cheque');
  };
  const _toggleCheckboxCash = () => {
    setPaymentType('cash');
    setCheckboxStatusCash(true);
    setCheckboxStatusCheque(false);
  };
  const _toggleCheckboxPaid = () => {
    setCheckboxStatusPaid(true);
    setCheckboxStatusUnPaid(false);
    setPaymentStatus('paid');
  };
  const _toggleCheckboxUnPaid = () => {
    setPaymentStatus('unpaid');
    setCheckboxStatusUnPaid(true);
    setCheckboxStatusPaid(false);
  };

  const _toggleCheckboxWar = () => {
    setCheckboxStatusMaint(false);
    setCheckboxStatusCharge(false);
    setCheckboxStatusWar(true);
    setServiceType('warranty');
  };
  const _toggleCheckboxMaint = () => {
    setServiceType('maintenance');
    setCheckboxStatusMaint(true);
    setCheckboxStatusCharge(false);
    setCheckboxStatusWar(false);
  };
  const _toggleCheckboxCharge = () => {
    setServiceType('chargeable');
    setCheckboxStatusMaint(false);
    setCheckboxStatusCharge(true);
    setCheckboxStatusWar(false);
  };
  
  if (Loading) {
    return <ScreenLoader message="Loading Report..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
       <DatePicker
        modal
        open={open}
        date={Quotation_Date}
        mode='date'
        onConfirm={(date) => {
          setOpen(false)
          setQuotation_Date(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <DatePicker
        modal
        open={openAttendtedDate}
        date={DOA}
        mode='date'
        onConfirm={(date) => {
          setopenAttendtedDate(false)
          setDOA(date)
        }}
        onCancel={() => {
          setopenAttendtedDate(false)
        }}
      />
      <DatePicker
        modal
        open={openStartTime}
        date={STOA}
        mode='time'
        onConfirm={(date) => {
          setopenStartTime(false)
          setSTOA(date)
        }}
        onCancel={() => {
          setopenStartTime(false)
        }}
      />
      <DatePicker
        modal
        open={openEndTime}
        date={ETOA}
        mode='time'
        onConfirm={(date) => {
          setopenEndTime(false)
          setETOA(date)
        }}
        onCancel={() => {
          setopenEndTime(false)
        }}
      />
       <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Order container */}
        <Animatable.View
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[
            ORDER_STYLES.sectionContainer,
            ORDER_STYLES.sectionContainerMarginTicket,
          ]}>
          {/* Order ID */}
          <View style={ADDRESSES_STYLES.addressTypeContainer}>
            <Icon
              name="notifications"
              size={scale(25)}
              color={COLORS.primary}
            />
            <Text style={ADDRESSES_STYLES.addressTypeTitle}>
              ID - {ticket?.service_no}
            </Text>
            {true ? (
              <View
                style={[
                  ADDRESSES_STYLES.statusContainer,
                  GLOBAL_STYLES.xyCenter,
                ]}>
                <Text style={ADDRESSES_STYLES.statusLabel}>
                  {ticket?.service_date}
                </Text>
              </View>
            ) : null}
          </View>
          {/* Destinations */}
          <View style={MY_ORDERS_STYLES.destinations}>
            <View style={{alignItems: 'flex-start'}}>
              <View>
                <Text style={MY_ORDERS_STYLES.destination}>
                  {ticket?.CST_Name}
                </Text>
              </View>

              <Text style={MY_ORDERS_STYLES.date}>{ticket?.CNRT_Number}</Text>
            </View>
            <View style={[{alignItems: 'flex-start'},ADDRESSES_STYLES.statusContainerInfo,GLOBAL_STYLES.xyCenter]}>
                  <Text style={ADDRESSES_STYLES.statusLabelInfo}>
                    {ticket.contract_id ==0 ? "Non-Contracted" : 'Contracted'}
                  </Text>
                </View>
          </View>
        </Animatable.View>
        {/* Actions */}
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Quotation Details</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <View style={GLOBAL_STYLES.flexOneContainer}>
            <Text style={ORDER_STYLES.rowValueCopy}>Number</Text>
            <TextInput
              placeholderTextColor={COLORS.darkGrey}
              value={Quotation_No}
              onChangeText={value => {
                setQuotation_No(value);
              }}
              style={[
                GLOBAL_STYLES.textInputCopySmallFlex,
                {borderColor: COLORS.darkGrey},
              ]}
            />
            </View>
            <View style={GLOBAL_STYLES.flexOneContainer}>
            <Text style={ORDER_STYLES.rowValueCopy}>Date (dd-mm-yyy)</Text>
            <Text
              style={[
                GLOBAL_STYLES.textInputCopySmallFlex,
                ORDER_STYLES.rowValueCopy,
                {borderColor: COLORS.darkGrey},
              ]}
              onPress={() => setOpen(true)}
            >{Quotation_Date!=null? Quotation_Date?.getDate()+"-"+(Quotation_Date?.getMonth()<10 ? "0"+parseInt(Quotation_Date?.getMonth()+1):parseInt(Quotation_Date?.getMonth()+1))+"-"+Quotation_Date.getFullYear():null}</Text>
            </View>
            
            
          </View>

          <View></View>
        </Animatable.View>
        {/*Water Quality Report*/}
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Water Quality Report</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={ORDER_STYLES.rowTitleCopy}></Text>
            <Text style={ORDER_STYLES.rowValueCopy}>Feed Water</Text>
            <Text style={ORDER_STYLES.rowValueCopy}>Product Water</Text>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                style={[
                  ORDER_STYLES.rowTitleCopy,
                  {textTransform: 'uppercase'},
                ]}>
                TDS
              </Text>
              <TextInput
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={FWTDS}
                onChangeText={value => {
                  setFWTDS(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmall,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
              <TextInput
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={PWTDS}
                onChangeText={value => {
                  setPWTDS(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmall,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                style={[
                  ORDER_STYLES.rowTitleCopy,
                  {textTransform: 'uppercase'},
                ]}>
                PH
              </Text>
              <TextInput
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={FWPH}
                onChangeText={value => {
                  setFWPH(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmall,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
              <TextInput
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={PWPH}
                onChangeText={value => {
                  setPWPH(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmall,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
          </View>

          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                style={[
                  ORDER_STYLES.rowTitleCopy,
                  {textTransform: 'uppercase'},
                ]}>
                Hardness
              </Text>
              <TextInput
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={FWHardness}
                onChangeText={value => {
                  setFWHardness(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmall,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
              <TextInput
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={PWHardness}
                onChangeText={value => {
                  setPWHardness(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmall,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
          </View>
        </Animatable.View>
        {/*Plant Parameters*/}
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Plant Parameters</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <View style={GLOBAL_STYLES.flexOneContainer}>
                <Text style={ORDER_STYLES.rowValueCopy}>Feed Pump Pr</Text>
                <TextInput
                  placeholder="Feed Pump Pr"
                  placeholderTextColor={COLORS.darkGrey}
                  width={10}
                  value={FeedPumpPr}
                  onChangeText={value => {
                    setFeedPumpPr(value);
                  }}
                  style={[
                    GLOBAL_STYLES.textInputCopySmallFlex,
                    ORDER_STYLES.rowValueCopy,
                    {borderColor: COLORS.darkGrey},
                  ]}
                />
              </View>
              <View style={GLOBAL_STYLES.flexOneContainer}>
                  <Text style={ORDER_STYLES.rowValueCopy}>HP Pump Pr</Text>
                  <TextInput
                    placeholder="HP Pump Pr"
                    placeholderTextColor={COLORS.darkGrey}
                    width={10}
                    value={HpPumpPr}
                    onChangeText={value => {
                      setHpPumpPr(value);
                    }}
                    style={[
                      GLOBAL_STYLES.textInputCopySmallFlex,
                      ORDER_STYLES.rowValueCopy,
                      {borderColor: COLORS.darkGrey},
                    ]}
                  />
              </View>
            </View>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
            <View style={GLOBAL_STYLES.flexOneContainer}>
                  <Text style={ORDER_STYLES.rowValueCopy}>Filter Outlet Pr</Text>
                  <TextInput
                    placeholder="Filter Outlet Pr"
                    placeholderTextColor={COLORS.darkGrey}
                    width={10}
                    value={FilterOutletPr}
                    onChangeText={value => {
                      setFilterOutletPr(value);
                    }}
                    style={[
                      GLOBAL_STYLES.textInputCopySmallFlex,
                      ORDER_STYLES.rowValueCopy,
                      {borderColor: COLORS.darkGrey},
                    ]}
                  />
            </View>
            <View style={GLOBAL_STYLES.flexOneContainer}>
                  <Text style={ORDER_STYLES.rowValueCopy}>Feed Flow</Text>
                  <TextInput
                    placeholder="Feed Flow"
                    placeholderTextColor={COLORS.darkGrey}
                    width={10}
                    value={FeedFlow}
                    onChangeText={value => {
                      setFeedFlow(value);
                    }}
                    style={[
                      GLOBAL_STYLES.textInputCopySmallFlex,
                      ORDER_STYLES.rowValueCopy,
                      {borderColor: COLORS.darkGrey},
                    ]}
                  />
            </View>
              
              
            </View>
          </View>

          <View>
            <View style={ORDER_STYLES.row}>
            <View style={GLOBAL_STYLES.flexOneContainer}>
                  <Text style={ORDER_STYLES.rowValueCopy}>Filter Inlet Pr</Text>
                  <TextInput
                    placeholder="Filter Inlet Pr"
                    placeholderTextColor={COLORS.darkGrey}
                    width={10}
                    value={FilterInletPr}
                    onChangeText={value => {
                      setFilterInletPr(value);
                    }}
                    style={[
                      GLOBAL_STYLES.textInputCopySmallFlex,
                      ORDER_STYLES.rowValueCopy,
                      {borderColor: COLORS.darkGrey},
                    ]}
                  />
            </View>
            <View style={GLOBAL_STYLES.flexOneContainer}>
                <Text style={ORDER_STYLES.rowValueCopy}>Reject Flow</Text>
                  <TextInput
                placeholder="Reject Flow"
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={RejectFlow}
                onChangeText={value => {
                  setRejectFlow(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmallFlex,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />    
            </View>

              
            </View>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
            <View style={GLOBAL_STYLES.flexOneContainer}>
                <Text style={ORDER_STYLES.rowValueCopy}>System Pr</Text>
                <TextInput
                placeholder="System Pr"
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={SystemPr}
                onChangeText={value => {
                  setSystemPr(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmallFlex,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            <View style={GLOBAL_STYLES.flexOneContainer}>
                <Text style={ORDER_STYLES.rowValueCopy}>Product Flow</Text>
                <TextInput
                placeholder="Product Flow"
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={ProductFlow}
                onChangeText={value => {
                  setProductFlow(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmallFlex,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
              
            </View>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
            <View style={GLOBAL_STYLES.flexOneContainer}>
                <Text style={ORDER_STYLES.rowValueCopy}>Reject Pr</Text>
                <TextInput
                  placeholder="Reject Pr"
                  placeholderTextColor={COLORS.darkGrey}
                  width={10}
                  value={RejectPr}
                  onChangeText={value => {
                    setRejectPr(value);
                  }}
                  style={[
                    GLOBAL_STYLES.textInputCopySmallPP,
                    ORDER_STYLES.rowValueCopy,
                    {borderColor: COLORS.darkGrey},
                  ]}
                />
            </View>
              
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Observation Note</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <TextInput
                placeholder="Observation Note"
                placeholderTextColor={COLORS.darkGrey}
                multiline
                numberOfLines={4}
                value={Observation_Note}
                onChangeText={value => {
                  setObservation_Note(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputArea,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Equipmment to Order</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <TextInput
                placeholder="Equipment to Order"
                placeholderTextColor={COLORS.darkGrey}
                multiline
                numberOfLines={4}
                value={EquipmenttoOrder}
                onChangeText={value => {
                  setEquipmenttoOrder(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputArea,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Ticket Attended</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
              onPress={()=>{
                setopenAttendtedDate(true);
              }}
                style={[
                  GLOBAL_STYLES.textInputCopy,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                  {marginBottom:scale(5)}
                ]}
              >{DOA!="" ? DOA.getDate()+"-"+(DOA.getMonth()<10 ? "0"+parseInt(DOA.getMonth()+1):parseInt(DOA.getMonth()+1))+"-"+DOA.getFullYear():null}</Text>
            </View>
          </View> 
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                width={10}
                style={[
                  GLOBAL_STYLES.textInputCopySmallPP,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
                onPress={()=>{
                  setopenStartTime(true);
                }}
              >{STOA!="" ? STOA.getHours()+":"+STOA.getMinutes():null}</Text>
              <Text
                width={10}
                style={[
                  GLOBAL_STYLES.textInputCopySmallPP,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
                onPress={()=>{
                  setopenEndTime(true);
                }}
              >{ETOA!="" ? ETOA.getHours()+":"+ETOA.getMinutes():null}</Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Type Of Service</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  PAYMENT_STYLES.checkboxInlineContainer,
                ]}>
                {checkboxStatusWar ? (
                  // Checkbox component
                  <CheckboxChecked onPress={() => _toggleCheckboxWar()} />
                ) : (
                  // Checkbox component
                  <CheckboxUnchecked onPress={() => _toggleCheckboxWar()} />
                )}
                <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
                  Warranty
                </Text>
              </View>
            </View>
            <View style={ORDER_STYLES.row}>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  PAYMENT_STYLES.checkboxInlineContainer,
                ]}>
                {checkboxStatusMaint ? (
                  // Checkbox component
                  <CheckboxChecked onPress={() => _toggleCheckboxMaint()} />
                ) : (
                  // Checkbox component
                  <CheckboxUnchecked onPress={() => _toggleCheckboxMaint()} />
                )}
                <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
                  Maintenance
                </Text>
              </View>
            </View>
            <View style={ORDER_STYLES.row}>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  PAYMENT_STYLES.checkboxInlineContainer,
                ]}>
                {checkboxStatusCharge ? (
                  // Checkbox component
                  <CheckboxChecked onPress={() => _toggleCheckboxCharge()} />
                ) : (
                  // Checkbox component
                  <CheckboxUnchecked onPress={() => _toggleCheckboxCharge()} />
                )}
                <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
                  Chargeable
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Ticket Remark</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <TextInput
                placeholder="Feed Pump Pr"
                placeholderTextColor={COLORS.darkGrey}
                multiline
                numberOfLines={4}
                value={remark}
                onChangeText={value => {
                  setRemark(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputArea,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Next Visit Details</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <Text>Next visit details</Text>
            </View>
          </View>
        </Animatable.View>
        {/* Shipping details */}
        <Animatable.View
          delay={1300}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Invoice Details</Text>
          {/* Price info */}
          <View style={ORDER_STYLES.row}>
            <Text style={[ORDER_STYLES.rowTitleCopy, {textTransform: 'uppercase'}]}>Accessory</Text>
            <Text style={ORDER_STYLES.rowValueHeader}>Payment</Text>
            <Text style={ORDER_STYLES.rowValueHeader}>Qty</Text>
            <Text style={ORDER_STYLES.rowValueHeader}>Price</Text>
            <Text style={ORDER_STYLES.rowValueHeader}>Sub Total</Text>
          </View>
          {accessoryList.map((tik, index) => {
            
            //TotalAmount += tik.Is_Paid == 0 ? parseFloat(tik.given_qty * tik.price) : 0;
            //Service_Charge += tik.Is_Paid == 0 ? parseFloat(tik.given_qty * tik.price) :0;
            return(
              <View key={index}>
              <View style={ORDER_STYLES.row}>
                <Text
                   style={[ORDER_STYLES.rowTitleCopy, {textTransform: 'uppercase'}]}>
                  {tik.PA_Name}
                </Text>
                <Text style={ORDER_STYLES.rowValueCopy}>{tik.Is_Paid == 0 ? 'UnPaid' : 'Paid'}</Text>
                <Text style={ORDER_STYLES.rowValueCopy}>{tik.given_qty}</Text>
                <Text style={ORDER_STYLES.rowValueCopy}>{tik.price}</Text>
                <Text style={ORDER_STYLES.rowValueCopy}>
                  {tik.given_qty * tik.price}
                </Text>
              </View>
            </View>
            )
            
        }
        )
        
        }
          {
            //ticket.service_status !=2 ? null
            //  <View><View style={ORDER_STYLES.row}>
            //   <Text style={ORDER_STYLES.rowTitle}>Shipping cost</Text>
            //   <Text style={ORDER_STYLES.rowValue}>19.99</Text>
            // </View>
            // <View style={ORDER_STYLES.row}>
            //   <Text style={ORDER_STYLES.rowTitle}>Discount</Text>
            //   <Text style={ORDER_STYLES.rowValue}>00.00</Text>
            // </View>
            // <View style={ORDER_STYLES.row}>
            //   <Text style={ORDER_STYLES.rowTitle}>Total payble</Text>
            //   <Text style={ORDER_STYLES.rowValue}>199.99</Text>
            // </View>
            // <View style={[ORDER_STYLES.row, {borderBottomWidth: 0}]}>
            //   <Text style={ORDER_STYLES.rowTitle}>Payment mode</Text>
            //   <View style={ORDER_STYLES.paymentModeCheckmarkContainer}>
            //     <Text style={ORDER_STYLES.paymentMode}>Google Pay</Text>
            //     <Icon
            //       name="checkmark-circle-outline"
            //       size={scale(25)}
            //       color={COLORS.green}
            //     />
            //   </View>
            // </View></View> :null
          }
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Charges Summery</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                style={[
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}>
                Service Charges
              </Text>
              <Text
                placeholderTextColor={COLORS.darkGrey}
                disabled
                width={10}
                style={[
                  GLOBAL_STYLES.textInputCopySmallPP,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              >{parseFloat(Service_Charge).toFixed(3)}</Text>
            </View>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                width={10}
                style={[
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}>
                Part and Fitting
              </Text>
              <TextInput
                placeholder="Part and Fitting"
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                value={Part_Fitting}
                
                keyboardType='number-pad'
                onChangeText={value => {
                  let newTotal = parseFloat(Service_Charge)+parseFloat(value==""? 0 : value);
                  let newVat = (newTotal/100)*10;
                  newTotal = parseFloat(newTotal) + parseFloat(newVat);
                  setTotalAmount(parseFloat(newTotal).toFixed(3));
                  setVat(parseFloat(newVat).toFixed(3));
                  setPart_Fitting(value);
                }}
                style={[
                  GLOBAL_STYLES.textInputCopySmallPP,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                width={10}
                style={[
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}>
                Vat (10%)
              </Text>
              <Text
                placeholder="Vat"
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                style={[
                  GLOBAL_STYLES.textInputCopySmallPP,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              >{Vat}</Text>
            </View>
          </View>
          <View>
            <View style={ORDER_STYLES.row}>
              <Text
                width={10}
                style={[
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}>
                Total Amount
              </Text>
              <Text
                placeholderTextColor={COLORS.darkGrey}
                width={10}
                style={[
                  GLOBAL_STYLES.textInputCopySmallPP,
                  ORDER_STYLES.rowValueCopy,
                  {borderColor: COLORS.darkGrey},
                ]}
              >{parseFloat(TotalAmount).toFixed(3)}</Text>
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Payment Mode</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  PAYMENT_STYLES.checkboxInlineContainer,
                ]}>
                {checkboxStatusCash ? (
                  // Checkbox component
                  <CheckboxChecked onPress={() => _toggleCheckboxCash()} />
                ) : (
                  // Checkbox component
                  <CheckboxUnchecked onPress={() => _toggleCheckboxCash()} />
                )}
                <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
                  Cash
                </Text>
              </View>
            </View>
            <View style={ORDER_STYLES.row}>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  PAYMENT_STYLES.checkboxInlineContainer,
                ]}>
                {checkboxStatusCheque ? (
                  // Checkbox component
                  <CheckboxChecked onPress={() => _toggleCheckboxCheque()} />
                ) : (
                  // Checkbox component
                  <CheckboxUnchecked onPress={() => _toggleCheckboxCheque()} />
                )}
                <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
                  Cheque
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          easing="ease-in-out-sine"
          style={ORDER_STYLES.sectionContainer}>
          {/* Section title */}
          <Text style={ORDER_STYLES.sectionTitle}>Payment Status</Text>
          {/* Price info */}
          <View>
            <View style={ORDER_STYLES.row}>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  PAYMENT_STYLES.checkboxInlineContainer,
                ]}>
                {checkboxStatusPaid ? (
                  // Checkbox component
                  <CheckboxChecked onPress={() => _toggleCheckboxPaid()} />
                ) : (
                  // Checkbox component
                  <CheckboxUnchecked onPress={() => _toggleCheckboxPaid()} />
                )}
                <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
                  Paid
                </Text>
              </View>
            </View>
            <View style={ORDER_STYLES.row}>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  PAYMENT_STYLES.checkboxInlineContainer,
                ]}>
                {checkboxStatusUnPaid ? (
                  // Checkbox component
                  <CheckboxChecked onPress={() => _toggleCheckboxUnPaid()} />
                ) : (
                  // Checkbox component
                  <CheckboxUnchecked onPress={() => _toggleCheckboxUnPaid()} />
                )}
                <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
                  UnPaid
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>
        
      </ScrollView>
      {
        ticket.service_status !=6 ?
        <Animatable.View
        delay={500}
        animation="fadeInUp"
        easing="ease-in-out-sine"
        useNativeDriver={true}
        style={ORDER_STYLES.sectionContainer}>
        {/* Section title */}
        <Text style={ORDER_STYLES.sectionTitle}>Actions</Text>
        {/* Action buttons */}
        <View>
          
        {ticket.isSubmitted == 1 ? 
        <Text style={GLOBAL_STYLES.infoText}>report sent to customer</Text>
        :
        null}
          <Button
            label={ticket.isSubmitted == 0 ? "Save" :"Update"}
            customButtonStyle={[GLOBAL_STYLES.marginYNone]}
            disabled={isSubmitting}
            onPress={()=>{handleReportSave(ticket.isSubmitted)}}
            style={{marginTop: scale(10)}}
          />
          {
            ticket.isSubmitted == 0
            ?
            ticket.service_status  == 5
            ?
            <Button
            label="Save & Send to Customer"
            customButtonStyle={[GLOBAL_STYLES.marginTop]}
            disabled={isSubmitting}
            onPress={()=>{handleReportSave(1)}}
            style={{marginTop: scale(10)}}
          />
          :null
            :
            null
          }
          
        </View>
      </Animatable.View>
        :
        null
      }
     
      {/* Review writing Modal */}
      <View>
        <Modal
          isVisible={isModalVisible}
         
          style={{margin: 10}}>
          {/* Modal content */}
          <View style={ORDER_STYLES.passwordResetModal}>
            {/* Modal title */}
            <Text style={ORDER_STYLES.passwordResetModalTitle}>
              Write review
            </Text>
            {/* Modal info */}
            <Text style={ORDER_STYLES.passwordResetModalInfo}>
              Review will be verified before publishing.
            </Text>
            {/* Input field title */}
            <View style={GLOBAL_STYLES.inputGroup}>
              <TextInput
                placeholder="Enter review title"
                placeholderTextColor={COLORS.darkGrey}
                style={[
                  GLOBAL_STYLES.textInput,
                  {borderColor: COLORS.darkGrey},
                ]}
              />
            </View>
            {/* Textarea review */}
            <Textarea
              containerStyle={ORDER_STYLES.textareaContainer}
              style={ORDER_STYLES.textarea}
              onChangeText={text => console.log(text)}
              defaultValue={null}
              maxLength={150}
              placeholder={'Enter review'}
              placeholderTextColor={COLORS.darkGrey}
              underlineColorAndroid={'transparent'}
            />
            {/* Rating about the comfort */}
            <View>
              <Text style={ORDER_STYLES.question}>
                1. How would you rate the comfort?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Comfort rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Rating about the quality */}
            <View>
              <Text style={ORDER_STYLES.question}>
                2. How would you rate the quality?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Quality rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Rating about the durability */}
            <View>
              <Text style={ORDER_STYLES.question}>
                3. How would you rate the durability?
              </Text>
              <AirbnbRating
                defaultRating={0}
                showRating={false}
                size={scale(20)}
                selectedColor={COLORS.yellow}
                unSelectedColor={COLORS.grey}
                onFinishRating={rating => {
                  console.log('Durability rating - ', rating);
                }}
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
            </View>
            {/* Button component */}
            <Button
              label="Submit review"
              customButtonStyle={ORDER_STYLES.customButton}
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
export default FieldReport;
