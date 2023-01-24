// Importing
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../config/COLORS';
import GLOBAL_STYLES from '../../styles/GLOBAL_STYLES';
import ORDER_STYLES from '../../styles/screens/ORDER_STYLES';
import PAYMENT_STYLES from '../../styles/screens/PAYMENT_STYLES';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from '../../components/BUTTONS';
import Modal from 'react-native-modal';
import Textarea from 'react-native-textarea';
import * as Animatable from 'react-native-animatable';
import {ScreenLoader} from '../../components/LOADERS';
import { WebView } from 'react-native-webview';

// Functional component
import Server from '../../data/Server_Info';
import ShowAlert from '../../data/ShowAlert';
import BUTTON_STYLES from '../../styles/components/BUTTON_STYLES';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import format from 'date-fns/format';
import {useIsFocused } from '@react-navigation/native';
import FAB from 'react-native-fab';


const FieldReport = ({route, navigation}) => {
  // Local states
  let total = 0;
  let App_Url = Server.api;
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [PaymentProccess,setPaymentProccess] = useState(false);
  const [isSubmittingDownload, setisSubmittingDownload] = useState(false);
  const [isCloseing, setIsCloseing] = useState(false);
  const [ticket, setTicket] = useState([]);
  const webviewRef = useRef();

  const [accessoryList, setAccessoryList] = useState([]);
  let [TotalAmount,setTotalAmount] = useState(0);
  let [Service_Charge, setService_Charge] = useState(0);
  const [Part_Fitting, setPart_Fitting] = useState("0");
  const [Vat, setVat] = useState(0);
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
  const [DOA, setDOA] = useState(null);
  const [STOA, setSTOA] = useState('');
  const [ETOA, setETOA] = useState('');
  const [Quotation_No, setQuotation_No] = useState('');
  const [Quotation_Date, setQuotation_Date] = useState(null);
  const [Observation_Note, setObservation_Note] = useState('');
  const [remark, setRemark] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [EquipmentLeft, setEquipmentLeft] = useState('');
  const [EquipmenttoOrder, setEquipmenttoOrder] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  
  const [isCustomerShow,setIsCustomerShow] = useState(false);
  const [account,setAccount] = useState(10);
  const [serviceStatus,setServiceStatus] = useState(0);
  const [showPaymentPage,setShowPaymentPage] = useState(false);
  const [paymentPage,setPaymentPage] = useState("");
  const [CancelPaymentBtn,setCancelPaymentBtn] = useState(true);
  const myContainer = useRef(null);
  let Service_Charge1 = 0;
  const isFocused = useIsFocused();
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Service Field Report</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <style>
      body{
        margin-top:20px;
        color: #484b51;
    }
    .text-secondary-d1 {
        color: #728299!important;
    }
    .page-header {
        margin: 0 0 1rem;
        padding-bottom: 1rem;
        padding-top: .5rem;
        border-bottom: 1px dotted #e2e2e2;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-align: center;
        align-items: center;
    }
    .page-title {
        padding: 0;
        margin: 0;
        font-size: 1.75rem;
        font-weight: 300;
    }
    .brc-default-l1 {
        border-color: #dce9f0!important;
    }
    
    .ml-n1, .mx-n1 {
        margin-left: -.25rem!important;
    }
    .mr-n1, .mx-n1 {
        margin-right: -.25rem!important;
    }
    .mb-4, .my-4 {
        margin-bottom: 1.5rem!important;
    }
    
    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0,0,0,.1);
    }
    .text-grey-m2 {
        color: #888a8d!important;
    }
    
    .text-success-m2 {
        color: #86bd68!important;
    }
    
    .font-bolder, .text-600 {
        font-weight: 600!important;
    }
    
    .text-110 {
        font-size: 110%!important;
    }
    h3 {
      font-size:15px;
  }
    .text-blue {
        color: #478fcc!important;
    }
    .pb-25, .py-25 {
        padding-bottom: .75rem!important;
    }
    
    .pt-25, .py-25 {
        padding-top: .75rem!important;
    }
    .bgc-default-tp1 {
        background-color: rgba(121,169,197,92)!important;
    }
    .bgc-default-l4, .bgc-h-default-l4:hover {
        background-color: #f3f8fa!important;
    }
    .page-header .page-tools {
        -ms-flex-item-align: end;
        align-self: flex-end;
    }
    
    .btn-light {
        color: #757984;
        background-color: #f5f6f9;
        border-color: #dddfe4;
    }
    .w-2 {
        width: 1rem;
    }
    
    .text-120 {
        font-size: 120%!important;
    }
    .text-primary-m1 {
        color: #4087d4!important;
    }
    
    .text-danger-m1 {
        color: #dd4949!important;
    }
    .text-blue-m2 {
        color: #68a3d5!important;
    }
    .text-150 {
        font-size: 150%!important;
    }
    .text-60 {
        font-size: 60%!important;
    }
    .text-grey-m1 {
        color: #7b7d81!important;
    }
    .align-bottom {
        vertical-align: bottom!important;
    }
    @media print {
      .page-break{
        page-break-before: always;
      }
    }  
    .page-break{
      page-break-before: always;
    }  
      </style>
  </head>
  <body>
  <div class="page-content container">
  <div class="page-header text-blue-d2">
      <h1 class="page-title text-secondary-d1">
        <img
            className="w-200 h-100 ml-5"
            src="/assets/images/logo.png"
        />
      </h1>

      <div class="page-tools">
          <div class="action-buttons">
          <address className="mr-10">
                                <p>
                                    <h4>
                                        ${' '}
                                        <strong>
                                            IWS - Integrated Water Systems
                                            W.L.L.
                                        </strong>
                                    </h4>
                                </p>
                                <p>
                                    P.O.Box: 15733, Manama, Kingdom of Bahrain.
                                </p>
                            </address>
          </div>
      </div>
  </div>

  <div class="container px-0">
      <div class="row mt-4">
          <div class="col-12 col-lg-10 offset-lg-1">
              <div class="row">
                  <div class="col-12">
                      <div class="text-center text-150">
                          <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                          <span class="text-default-d3 text-600">Service Field Report</span>
                      </div>
                  </div>
              </div>
              <!-- .row -->

              <hr class="row brc-default-l1 mx-n1 mb-4" />

              <div class="row">
                  <div class="col-sm-6">
                  <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                              Customer
                          </div>
                      <div>
                          <span class="text-600 text-110 text-blue align-middle">${ticket.CST_Name}</span>
                      </div>
                      <div class="text-grey-m2">
                          <div class="my-1">
                          <address className="mr-10">
                          ${ticket.CST_OfficeAddress}
                          </address>
                          
                          </div>
                          
                      </div>
                  </div>
                  <!-- /.col -->

                  <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                      <hr class="d-sm-none" />
                      <div class="text-grey-m2">
                          <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                              Invoice Address
                          </div>

                          <div class="my-2">
                          <address>
                            ${ticket.SiteName},${ticket.SiteNumber},<br/>
                            ${ticket.SiteAreaName}${',\n'}${ticket.SiteOther}
                          </address>
                          
                          </div>

                         </div>
                  </div>
                  <!-- /.col -->
              </div>
              <hr class="row brc-default-l1 mx-n1 mb-4" />
               <div class="row ">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125 col-12">Equipments</div>
                      <div class="col-12 text-capitalize">${ticket.productName}</div>
                </div>
                <hr class="row brc-default-l1 mx-n1 mb-4" />
                <div class="row text-600">
                      <div class="d-none d-sm-block col-6">Job Car No.:${ticket.service_no}, Date:${ticket.serviceDate} </div>
                      <div class="d-none d-sm-block col-6">Quotation No.:${Quotation_No}, Date:${Quotation_Date}</div>
                  </div>
                  <br/>
              <div class="row">
                <div  class="col-6">
                  <table class="table  table-bordered border-1">
                  <thead> <tr class="text-center text-blue"><td  colspan="3">Water Quality Report</td></tr></thead>
                    <tr>
                      <td></td>
                      <td>Feed Water</td>
                      <td>Product Water</td>
                    </tr>
                    <tr>
                      <td>TDS</td>
                      <td>${FWTDS}</td>
                      <td>${PWTDS}</td>
                    </tr>
                    <tr>
                      <td>PH</td>
                      <td>${FWPH}</td>
                      <td>${PWPH}</td>
                    </tr>
                    <tr>
                      <td>HardNess</td>
                      <td>${FWHardness}</td>
                      <td>${PWHardness}</td>
                    </tr>
                  </table>
                </div>
                <div class="col-6">
                  <table class="table table-bordered border-1">
                    <thead> <tr  class="text-center text-blue"><td colspan="4">Plant Parameters</td></tr></thead>
                    <tr>
                      <td>Feed Pump Pr</td>
                      <td>${FeedPumpPr}</td>
                      <td>Hp Pump Pr</td>
                      <td>${HpPumpPr}</td>
                    </tr>
                    <tr>
                      <td>Filter Outlet Pr</td>
                      <td>${FilterOutletPr}</td>
                      <td>Feed Flow</td>
                      <td>${FeedFlow}</td>
                    </tr>
                    <tr>
                      <td>Filter Inlet Pr</td>
                      <td>${FilterInletPr}</td>
                      <td>Reject Flow</td>
                      <td>${RejectFlow}</td>
                    </tr>
                    <tr>
                      <td>System Pr</td>
                      <td> ${SystemPr}</td>
                      <td>Product Flow</td>
                      <td> ${ProductFlow}</td>
                    </tr>
                    <tr>
                      <td>Reject Pr</td>
                      <td>${RejectPr}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
               </div>
               <hr class="row brc-default-l1 mx-n1 mb-4" />
               <div class="row ">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125 col-12">Attended By</div>
                      <div class="col-2 text-capitalize">Engineer Name: ${ticket.name ? ticket.name : ''}</div>
                      <div class="col-2 text-capitalize">Date: ${DOA}</div>
                      <div class="col-2 text-capitalize">Start Time:${STOA}</div>
                      <div class="col-2 text-capitalize">End Time:  ${ETOA}</div>
                </div>
               <hr class="row brc-default-l1 mx-n1 mb-4" />
               <div class="row ">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125 col-12">Observation Note</div>
                      <div class="col-12 text-capitalize">${Observation_Note}</div>
                </div>
                <hr class="row brc-default-l1 mx-n1 mb-4" />
                <div class="row page-break">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125 col-12">Invoice</div>
                </div>
                <hr class="row brc-default-l1 mx-n1 mb-4" />
              <div class="mt-4">
                  <div class="row text-600 text-white bgc-default-tp1 py-25">
                      <div class="d-none d-sm-block col-1">#</div>
                      <div class="col-9 col-sm-5">Accessory Name</div>
                      <div class="d-none d-sm-block col-4 col-sm-2">Qty</div>
                      <div class="d-none d-sm-block col-sm-2">Unit Price</div>
                      <div class="col-2">Total (BHD)</div>
                  </div>
                 ${accessoryList.map((tik, index) => {
                  Service_Charge1 += tik.Is_Paid == 0 ? tik.given_qty * tik.price :0;
                     return(`<div key=${index}>
                      <div class="text-95 text-secondary-d3">
                      <div class="row mb-2 mb-sm-0 py-25">
                          <div class="d-none d-sm-block col-1">${index+1}</div>
                          <div class="col-9 col-sm-5">${tik.PA_Name}</div>
                          <div class="d-none d-sm-block col-2">${tik.given_qty}</div>
                          <div class="d-none d-sm-block col-2 text-95">${tik.price}</div>
                          <div class="col-2 text-secondary-d2">${tik.given_qty * tik.price}</div>
                      </div>
                      
                  </div>
                  <hr/></div>`
                         
                     )
                }
                )
              }
                 <div class="row mt-3">
                      <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                        <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                        <div class="col-7 text-right">
                        <span class="text-150 text-success-d3 text-capitalize"> Payment Status</span>
                        </div>
                        <div class="col-5">
                            <span class="text-150 text-success-d3 text-capitalize">${paymentStatus}</span>
                        </div>
                    </div>
                      <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                          <div class="col-7 text-right">
                          <span class="text-150 text-success-d3 text-capitalize">Payment Mode</span>
                          </div>
                          <div class="col-5">
                              <span class="text-150 text-success-d3 text-capitalize">${paymentType}</span>
                          </div>
                      </div>
                      <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                      <div class="col-7 text-right">
                      <span class="text-150 text-success-d3 text-capitalize">Type Of Service</span>
                      </div>
                      <div class="col-5">
                          <span class="text-150 text-success-d3 text-capitalize">${serviceType}</span>
                      </div>
                      </div>  
                      </div>

                      <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                          <div class="row my-2">
                              <div class="col-7 text-right">
                              Service Charge BD
                              </div>
                              <div class="col-5">
                                  <span class="text-120 text-secondary-d1">${parseFloat(Service_Charge1).toFixed(3)}</span>
                              </div>
                          </div>
                          <div class="row my-2">
                              <div class="col-7 text-right">
                              Part and fitting BD
                              </div>
                              <div class="col-5">
                                  <span class="text-120 text-secondary-d1">${parseFloat(Part_Fitting).toFixed(3)}</span>
                              </div>
                          </div>
                          <div class="row my-2">
                              <div class="col-7 text-right">
                                  Vat (${account}%)
                              </div>
                              <div class="col-5">
                                  <span class="text-110 text-secondary-d1">${parseFloat(Vat).toFixed(3)}</span>
                              </div>
                          </div>

                          <div class="row my-2 align-items-center bgc-primary-l3 p-2 text-white bgc-default-tp1 py-25">
                              <div class="col-7 text-right  text-600">
                                  Total Amount
                              </div>
                              <div class="col-5">
                                  <span class="text-600"><h3>${parseFloat(TotalAmount).toFixed(3)}</h3></span>
                              </div>
                          </div>
                         
                      </div>
                  </div>
                  <hr class="row brc-default-l1 mx-n1 mb-4" />
                <div class="row ">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125 col-12">Equipmment to Order</div>
                      <div class="col-12 text-capitalize">${EquipmenttoOrder}</div>
                </div>
                  
                <hr class="row brc-default-l1 mx-n1 mb-4" />
                <div class="row ">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125 col-12">Remark</div>
                      <div class="col-12 text-capitalize">${remark}</div>
                </div>
                <hr class="row brc-default-l1 mx-n1 mb-4" />
                <div class="row ">
                  <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125 col-12">Next Visit</div>
                  <div class="col-12 text-capitalize"></div>
                </div>
                <hr class="row brc-default-l1 mx-n1 mb-4" />
                <table class="table">
                <tbody>
                    <tr>
                        <td>
                            Engineer: <strong>${ticket.name ? ticket.name :''}</strong>
                        </td>
                        <td>
                            Customer: <strong>${ticket.CST_Name}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>Signed</td>
                        <td>Signed</td>
                    </tr>
                    <tr>
                        <td>
                            Date${'   '}
                            ${format(
                                new Date().getTime(),
                                'dd MMMM, yyyy'
                            )}
                        </td>
                        <td colspan="3">
                                            Date :${'   '}
                                            ${format(
                                                new Date().getTime(),
                                                'dd MMMM, yyyy'
                                            )}
                                        </td>
                                        <td colspan="3">
                                            Designation:
                                        </td>
                    </tr>
                </tbody>
            </table>
              </div>
          </div>
      </div>
  </div>
</div>
  </body>
  </html>`;

  const [filePath, setFilePath] = useState('');

  const isPermitted = async () => {
    console.log(Platform.OS);
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
            buttonPositive:"Allow",
            buttonNegative:"Cancel"
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        ShowAlert.ShowAlert("permission request failed."+err.message,COLORS.red);
        return false;
      }
    } else {
      return true;
    }
  };

  const showFile = (filepath) => {
    FileViewer.open(filepath, { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
      .then(() => {
        
      })
      .catch((error) => {
        ShowAlert.ShowAlert("failed to open file."+error.message,COLORS.red);
      });
      setisSubmittingDownload(false);
  }
  const createPDF = async () => {
    try{
      setisSubmittingDownload(true);
      if (await isPermitted()) {
        let fileName = "Field_Report_"+ticket.service_no;
        let options = {
          //Content to print
          html:htmlContent,
          //File Name
          fileName: fileName,
          //File directory
          directory: 'docs',
        };
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath);
        setFilePath(file.filePath);
        showFile(file.filePath);
      } else {
        setisSubmittingDownload(false);
        ShowAlert.ShowAlert("permission request error.",COLORS.red);
      }
    }catch(error){
      setisSubmittingDownload(false);
      ShowAlert.ShowAlert(error.getmessage(),COLORS.red);
    }
   
  };
  const GetFieldReport = async () => {
    setLoading(true);
    const user_id = route.params.userId;
    const id = route.params.id;
    GetAccessoryList();
    fetch(App_Url + 'GetServiceFieldReportApp?userId=' + user_id + '&id=' + id)
      .then(response => response.json())
      .then(json => {
       // console.log("report:"+json.report);
        setLoading(false);
        setTicket(json.report);
        let report = json.report;
       // console.log(report);
        if(report.ServiceId != null){
          setServiceStatus(report.service_status);
          setIsCustomerShow(report.isSubmitted==1 ? true:false);
          setQuotation_No(report.QuotationNo);
        setQuotation_Date(report.QuotationDate==null ? '':report.QuotDate);
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
        setDOA(report.dateAtt!=null ? report.dateAtt : report.acceptedDate == null ? '':report.acceptedDate);
        setSTOA(report.startTime);
        setETOA(report.endTime);
        setObservation_Note(report.ObservationNote);
        setServiceType(report.ServiceType);
        setEquipmentLeft(report.EquipmentLeft);
        setEquipmenttoOrder(report.EquipmenttoOrder);
        setPaymentStatus(report.PaymentStatus);
        setPaymentType(report.PaymentMode);
        setVat(report.Vat);
        setTotalAmount(report.TotalAmount);
        setPart_Fitting(report.Part_Fitting);
        setRemark(report.Remarks);
        }
        
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        ShowAlert.ShowAlert('Connection Error!',COLORS.red);
      });
  };
  const GetAccessoryList = async () => {
    try {
    const user_id = route.params.userId;
    const id = route.params.id;
    fetch(App_Url + 'GetServiceTicketByIdCustomer?userId=' + user_id + '&id=' + id)
      .then(response => response.json())
      .then(json => {
        setAccessoryList(json.ticket.accessory);
      })
      .catch(error => {
        
        ShowAlert.ShowAlert('Server Error!',COLORS.red);
      });
    }catch(error){
      ShowAlert.ShowAlert('Server Error!',COLORS.red);
    }
    
  };



  useEffect(() => {
      GetFieldReport();
  }, [isFocused]);

  const handleReportClose = async()=> {
    if(serviceStatus!=5 ){
      ShowAlert.ShowAlert("Ticket not resolved yet.",COLORS.red);
    } else
      if(paymentStatus =="unpaid") {
        ShowAlert.ShowAlert("Payment not done yet.",COLORS.red);
      } else {
        try {
          setIsCloseing(true);
          const user_id = route.params.userId;
        const id = route.params.id;
        fetch(App_Url + 'CloseCall?user_id=' + user_id + '&service_id=' + id)
          .then(response => response.json())
          .then(json => {
            setIsCloseing(false);
              if(json.success){
                ShowAlert.ShowAlert(json.message,COLORS.green);
                GetFieldReport();
              } else {
                ShowAlert.ShowAlert(json.message,COLORS.red);
              }
          })
          .catch(error => {
            setIsCloseing(false);
            ShowAlert.ShowAlert(error.message,COLORS.red);
          });
        }catch(error){
          setIsCloseing(false);
          ShowAlert.ShowAlert('Server Error!',COLORS.red);
        }
      }
  }
  const PaymentComplete=(gatewayData) =>{
    let paymentPage = `<!DOCTYPE html>\n
    <html lang="en">
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.min.js"></script>
      <style>
        body{ background-color: #EBEBEB;margin:10px;}
        .btn-proceed{ margin-top: 10px; }
        .owl-item{ float: left; }
        .owl-item img{ width: 100%; }
        .owl-nav.disabled{ display: none; }
        .owl-nav button{ border-radius: 50%; margin: 10px 5px 0; color: #D11A69; }
        .payment-button, .payment-button:hover, .payment-button:focus, .payment-button:active, .payment-button:active:focus{ background: transparent; box-shadow: none; border: none; cursor: pointer; }
      </style>
    </head>
    <body>
    <script src="https://afs.gateway.mastercard.com/checkout/version/60/checkout.js"
        data-error="errorCallback"
        data-cancel="https://website.com/payment-rejected.php"
        data-complete="SuccessCallback">
      </script>
      
        <section id="review" class="review" style="height: 100vh;">
        <div class="clear-gap-60px"></div>
        <div class="container h-100">
            <div class="row h-100">
                <div class="col-md-12 align-self-center text-center">
                    <h5>Please wait...</h5>
                    <p>while we loading payment page.</p>
                </div>
            </div>
        </div>
        <div class="clear-gap-60px"></div>
      </section>
      
      <script type="text/javascript">
       function saveForm(){
          console.log('saveForm');
          Checkout.saveFormFields();
        }
        function restoreForm(){
          console.log('restoreForm');
          Checkout.restoreFormFields();
        }
    
        Checkout.configure({
          merchant: '${gatewayData['merchantID']}',
          order: {
            amount: '${gatewayData['amount']}',
            currency: 'BHD',
            description: 'Service Payment',
            id: '${gatewayData['transactionID']}'
          },
          interaction: {
            merchant: {
              name: 'IWS Service Payment',
              address: {
                
              }
            }
          },
          customer : {
            firstName : '${gatewayData['customerInfo']['CST_Name']}',
            lastName : '',
            phone : '+973${gatewayData['customerInfo']['CCP_Mobile']}',
            email: '${gatewayData['customerInfo']['CCP_Email']}',
          },
          session: {
            id: '${gatewayData['credimaxJSON']['session']['id']}',
          }
        });
        $(window).on('load', function(){
              console.log('onload');
                Checkout.showPaymentPage();
            });
            function errorCallback(error) {
              //alert("Payment Failed, Try Again.");
              console.log(JSON.stringify(error));
              //return error;
            }
            function cancelCallback() {
              confirm("Are you sure to cancel ?");
            }
            function SuccessCallback(response) {
              console.log(JSON.stringify(response));
              //return response;
              //window.location.href = 'www.google.com';
            }
        </script>
        
    </body>
    </html>
    `;
            
    console.log(paymentPage);
    setPaymentPage(paymentPage);
    setShowPaymentPage(true);      
  } 
  let paymentSuccess=`<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
  </head>
    <style>
      body {
        text-align: center;
        padding: 40px 0;
        background: #EBF0F5;
      }
        h1 {
          color: #88B04B;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-weight: 900;
          font-size: 40px;
          margin-bottom: 10px;
        }
        p {
          color: #404F5E;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-size:20px;
          margin: 0;
        }
      i {
        color: #9ABC66;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
      }
      .card {
        background: white;
        padding: 60px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
    </style>
    <body>
      <div class="card">
      <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
        <i class="checkmark">✓</i>
      </div>
        <h1>Success</h1> 
        <p>Payment completed successfully!</p>
      </div>
    </body>
</html>`;
let paymentFailed=`<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
</head>
  <style>
    body {
      text-align: center;
      padding: 40px 0;
      background: #EBF0F5;
    }
      h1 {
        color: #ff0000;
        font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
        font-weight: 900;
        font-size: 40px;
        margin-bottom: 10px;
      }
      p {
        color: #ff0000;
        font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
        font-size:20px;
        margin: 0;
      }
    i {
      color: #ff0000;
      font-size: 100px;
      line-height: 200px;
      margin-left:-15px;
    }
    .card {
      background: white;
      padding: 60px;
      border-radius: 4px;
      box-shadow: 0 2px 3px #C8D0D8;
      display: inline-block;
      margin: 0 auto;
    }
  </style>
  <body>
    <div class="card">
    <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
      <i class="close">✓</i>
    </div>
      <h1>Payment Failed</h1> 
      <p>Payment request failed!</p>
    </div>
  </body>
</html>`;
  const GetPaymentStatus = ()=>{
    try{
      const id = route.params.id;
      let data={
        id:id,
        type:'service',
      };
      axios.post(Server.api+"payment_status",data).then((json)=>{
        console.log("json=>",json.data);
        if(json.data.status == 1){
          setPaymentPage(paymentSuccess);
        Alert.alert(
          "Payment Status",
          "Payment completed successfully!",
          [
            { text: "OK", onPress: () => {
              
              setShowPaymentPage(false);
              GetFieldReport();
            } }
          ]
        );    
        } else {
          setPaymentPage(paymentFailed);
          Alert.alert(
            "Payment Status",
            "Failed to get payment status",
            [
              { text: "OK", onPress: () => {
                setShowPaymentPage(false);
                GetFieldReport();
              } }
            ]
          );      
        }
      }).catch(error=>{
        setPaymentPage("");
        Alert.alert(
          "Payment Status",
          "Failed to get payment status",
          [
            { text: "OK", onPress: () => {
              setShowPaymentPage(false);
              GetFieldReport();
            } }
          ]
        );
           
      })

    } catch(error){
      setPaymentPage("");
      setShowPaymentPage(false);
      GetFieldReport();
      ShowAlert.ShowAlert("Failed to get payment status, page will get auto reload",COLORS.red);  

    } 
    
  }
  const PaymentCancel= (data) =>{
    setPaymentPage("");
    setShowPaymentPage(false);
    console.log(JSON.stringify(data));
  };
  const PaymentError =(error)=>{
    setPaymentPage("");
    setShowPaymentPage(false);
    console.log(JSON.stringify(error));
  };
  const handlePayment = async()=>{
    const user_id = route.params.userId;
    const id = route.params.id;
    let data={
      id:id,
      customerId:user_id,
      medium:'app',
      gateway:'credimax',
      type:'service',

    };
    try{
      setPaymentProccess(true);
      axios.post(Server.api+"init",data).then(json=>{
        setPaymentProccess(false);
        console.log(json.data.getWayData.customerInfo);
        if(json.data.getWayData.credimaxJSON.session.updateStatus == 'SUCCESS'){
              PaymentComplete(json.data.getWayData);
        } else {
          ShowAlert.ShowAlert("Payment request failed, try again",COLORS.red);  
        }
      }).catch(error=>{
        setPaymentProccess(false);
        ShowAlert.ShowAlert(error.message,COLORS.red);
      });
    }catch(error){
      ShowAlert.ShowAlert(error.message,COLORS.red);
      setPaymentProccess(false);
    };
    
}
  
  // Returning

  if (Loading) {
    return <ScreenLoader message="Loading Report..." />;
  }
  // Returning
 
  return (
    isCustomerShow ? 
    
 <SafeAreaView  style={GLOBAL_STYLES.safeAreaView} id="ServiceFieldReport">


<ScrollView ref={myContainer} bounces={false} showsVerticalScrollIndicator={false}>
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
    <View  style={ORDER_STYLES.row}>
    <Text style={[{textAlign:'left'}]}>No.:{Quotation_No}</Text>
    <Text style={[{textAlign:'left'}]}>Date:{Quotation_Date} </Text>
    </View>
  
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
        <Text
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            GLOBAL_STYLES.textInputCopySmall,
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{FWTDS}</Text>
        <Text
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            GLOBAL_STYLES.textInputCopySmall,
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{PWTDS}</Text>
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
        <Text
          width={10}
          style={[
            GLOBAL_STYLES.textInputCopySmall,
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{FWPH}</Text>
        <Text
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          value={PWPH}
          style={[
            GLOBAL_STYLES.textInputCopySmall,
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{PWPH}</Text>
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
        <Text
          width={10}
          style={[
            GLOBAL_STYLES.textInputCopySmall,
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{FWHardness}</Text>
        <Text
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            GLOBAL_STYLES.textInputCopySmall,
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{PWHardness}</Text>
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
        <Text
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Feed Pump Pr:{FeedPumpPr}</Text>
        <Text
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Hp Pump Pr:{HpPumpPr}</Text>
      </View>
    </View>
    <View>
      <View style={ORDER_STYLES.row}>
        <Text
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Filter Outlet Pr:{FilterOutletPr}</Text>
        <Text
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >FeedFlow:{FeedFlow}</Text>
      </View>
    </View>

    <View>
      <View style={ORDER_STYLES.row}>
        <Text
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Filter Inlet Pr:{FilterInletPr}
        </Text>
        <Text
          placeholder="Reject Flow"
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Reject Flow:{RejectFlow}</Text>
      </View>
    </View>
    <View>
      <View style={ORDER_STYLES.row}>
        <Text
          placeholder="System Pr"
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >System Pr:{SystemPr}</Text>
        <Text
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Product Flow:{ProductFlow}</Text>
      </View>
    </View>
    <View>
      <View style={ORDER_STYLES.row}>
        <Text
          placeholder="Reject Pr"
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Reject Pr:{RejectPr}</Text>
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
        <Text
          placeholder="Observation Note"
          placeholderTextColor={COLORS.darkGrey}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{Observation_Note}</Text>
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
        <Text
          placeholder="Equipment to Order"
          placeholderTextColor={COLORS.darkGrey}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{EquipmenttoOrder}</Text>
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
    <View style={ORDER_STYLES.row}>
        <Text
          placeholder="Date (dd-mm-yyy)"
          placeholderTextColor={COLORS.darkGrey}
          
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Name:{ticket.name}</Text>
      </View>
    <View>
      <View style={ORDER_STYLES.row}>
        <Text
          placeholder="Date (dd-mm-yyy)"
          placeholderTextColor={COLORS.darkGrey}
          
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Date:{DOA}</Text>
      </View>
    </View> 
    <View>
      <View style={ORDER_STYLES.row}>
        <Text
          placeholder="Start Time"
          placeholderTextColor={COLORS.darkGrey}
          width={10}
         
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >Start Time: {STOA}</Text>
        <Text
          placeholder="End Time"
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >End Time:{ETOA}</Text>
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
      <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
            {serviceType}
          </Text>
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
        <Text
          placeholder="Feed Pump Pr"
          placeholderTextColor={COLORS.darkGrey}
          style={[
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{remark}</Text>
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
      <Text style={[ORDER_STYLES.rowTitleCopy]}>Accessory</Text>
      <Text style={ORDER_STYLES.rowValueHeader}>Qty</Text>
      <Text style={ORDER_STYLES.rowValueHeader}>Price</Text>
      <Text style={ORDER_STYLES.rowValueHeader}>Sub Total</Text>
    </View>
    {accessoryList.map((tik, index) => {
      Service_Charge += tik.Is_Paid == 0 ? parseFloat(tik.given_qty * tik.price):0;
      return(
        <View key={index}>
        <View style={ORDER_STYLES.row}>
          <Text
            style={[
              ORDER_STYLES.rowTitleCopy,
              
            ]}>
            {tik.PA_Name}
          </Text>
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
          placeholder="Service Charge"
          placeholderTextColor={COLORS.darkGrey}
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
        <Text
          placeholder="Part and Fitting"
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            GLOBAL_STYLES.textInputCopySmallPP,
            ORDER_STYLES.rowValueCopy,
            {borderColor: COLORS.darkGrey},
          ]}
        >{parseFloat(Part_Fitting).toFixed(3)}</Text>
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
          Vat (%)
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
        >{parseFloat(Vat).toFixed(3)}</Text>
      </View>
    </View>
    <View>
      <View style={ORDER_STYLES.row}>
        <Text
          width={10}
          style={[
            ORDER_STYLES.rowValueTotalAmount,
            {borderColor: COLORS.darkGrey},
          ]}>
          Total Amount
        </Text>
        <Text
          placeholderTextColor={COLORS.darkGrey}
          width={10}
          style={[
            GLOBAL_STYLES.textInputTotalAmount,
            ORDER_STYLES.rowValueTotalAmount,
            
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
          <Text style={[PAYMENT_STYLES.checkboxLabel, {marginTop: 5}]}>
            {paymentType}
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
         <Text style={[PAYMENT_STYLES.checkboxLabel]}>
            {paymentStatus}
          </Text>
        </View>
      </View>
    </View>
  </Animatable.View>
  
</ScrollView>
<Animatable.View
    delay={500}
    animation="fadeInUp"
    easing="ease-in-out-sine"
    useNativeDriver={true}
    style={ORDER_STYLES.sectionContainer}>
    {/* Section title */}
    <Text style={ORDER_STYLES.sectionTitle}>Actions</Text>
    {/* Action buttons */}
    <View style={ORDER_STYLES.row}>
      {
        paymentStatus != "paid" ? 
        <Button
        label="Pay Now"
        customButtonStyle={[BUTTON_STYLES.button]}
        disabled={PaymentProccess}
        onPress={handlePayment}
        style={{marginTop: scale(10)}}
      />
      :
      serviceStatus==5 ?
      <Button
        label="Close Service"
        customButtonStyle={[BUTTON_STYLES.button]}
        onPress={handleReportClose}
        disabled={isCloseing}
        style={{marginTop: scale(10)}}
      />
      :
      null
      }
      
    </View>

    <View style={ORDER_STYLES.row}>
    <Button
     label="Download"
     customButtonStyle={[BUTTON_STYLES.button]}
     disabled={isSubmittingDownload}
     onPress={()=>{createPDF(htmlContent)}}
     style={{marginTop: scale(10)}}
   />
    </View>
  </Animatable.View>

{/* Review writing Modal */}
<View>
  <Modal
    isVisible={isModalVisible}
    backdropColor={COLORS.fontDark}
    backdropOpacity={0.9}
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
  <Modal
    isVisible={showPaymentPage}
    backdropColor={COLORS.fontDark}
    backdropOpacity={0.9}
    style={{margin: 10}}>
    {/* Modal content */}
    <WebView 
              ref={webviewRef}
              nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
              style={{ flex: 1,padding:10}}
              source={{html:paymentPage}} 
              originWhitelist={['http://*','https://*', 'git://*']}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              mixedContentMode='compatibility'
              onNavigationStateChange={(e) => {
                
               console.log("current state is ", JSON.stringify(e, null, 2));
                if(e.url.indexOf("credimax-response") > -1){
                    GetPaymentStatus();
                }
                if(e.url.indexOf("cancel-payment") > -1){
                    setPaymentPage("");
                    setShowPaymentPage(false);
                }
                 
            }}
              onLoadEnd={()=>{
                setCancelPaymentBtn(false);
              }}
              javaScriptCanOpenWindowsAutomatically={true}
              thirdPartyCookiesEnabled={true}
              javaScriptEnabledAndroid={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              allowingReadAccessToURL={true}
              onError={(event) => {
                console.log(event);
                setPaymentProccess(false);
                setPaymentPage("");
                setShowPaymentPage(false);
                ShowAlert.ShowAlert("Something went wrong, try again");
        
            }}
            onMessage={(event) => {
                console.log(event.nativeEvent.data);
               // alert(event.nativeEvent.data);
              }}

              
              
          />
    
   {/* <Button
        label="Cancel"
        disabled={CancelPaymentBtn}
        onPress={()=>{
          setPaymentProccess(false);
          setPaymentPage("");
          setShowPaymentPage(false);
        }}
      /> */}
  </Modal>
  
</View>
</SafeAreaView>
    :
    Loading ?
    <ScreenLoader message="Loading Report..." />
    :
    <SafeAreaView style={[GLOBAL_STYLES.safeAreaView,GLOBAL_STYLES.xyCenter]}>
      <Animatable.View
          easing="ease-in-out-sine"
          useNativeDriver={true}
          style={[
            ORDER_STYLES.sectionContainer,
            ORDER_STYLES.sectionContainerMarginTop,
          ]}>
            <View style={GLOBAL_STYLES.xyCenter}>
                <Text style={GLOBAL_STYLES.headerTextMediumRed}>
                    Field Report Not Generated Yet.
                </Text>
              </View>
        </Animatable.View>
        <FAB 
        buttonColor={COLORS.primary} 
        iconTextColor="#FFFFFF" 
        onClickAction={() => {GetFieldReport();}}
         visible={true}
          iconTextComponent={<Icon name="reload-circle" size={35}/>} />
    </SafeAreaView>
  

  );
};

// Exporting
export default FieldReport;
