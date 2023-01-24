import WebView from "react-native-webview";


const PaymentPage = ()=>{



    return (
        <WebView
        javaScriptEnabled={true}
        source={{url:'www.google.com'}}/>
    )

}
export default PaymentPage;