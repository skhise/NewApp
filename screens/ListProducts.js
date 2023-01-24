// Importing
import React, {useState, useRef, useCallback,useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PRODUCTS from '../data/PRODUCTS';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import LIST_PRODUCT_STYLES from '../styles/screens/LIST_PRODUCT_STYLES';
import {ProductList} from '../components/CARDS';
import {SnackbarAlert} from '../components/ALERTS';
import * as Animatable from 'react-native-animatable';
import COLORS from '../config/COLORS';
import DIMENSIONS from '../config/DIMENSIONS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import {scale} from 'react-native-size-matters';
import CART_ITEMS from '../data/LocalCart';
import RangeSlider from 'rn-range-slider';

import {
  Thumb,
  Rail,
  RailSelected,
  Label,
  Notch,
} from '../components/RANGE_SLIDER';
import {Button} from '../components/BUTTONS';
import BRANDS from '../data/BRANDS';
import {ScreenLoader} from '../components/LOADERS';
import Server from '../data/Server_Info';
import axios from 'axios';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { HeaderTitle } from '../components/HEADER_TITLE';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HOME_STYLES from '../styles/screens/HOME_STYLES';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
// Functional component
const ListProducts = ({route,navigation}) => {
  // Constants
  const {height} = DIMENSIONS;
  let App_Url = Server.api;
  let App_Root = Server.root;
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const [isAlive, setIsAlive] = useState(true);
  const isFocused = useIsFocused();
  const handleValueChange = useCallback((low, high) => {
    setLowestPrice(low);
    setHighestPrice(high);
  }, []);

  // Local states
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState(BRANDS);
  const [priceSort, setPriceSort] = useState('H2L');
  const [selectedBrand, setSelectedBrand] = useState('Godrej Interio');
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(100);
  const [isFilterApplying, setIsFilterApplying] = useState(false);
  const [Loading,setLoading] = useState(false);
  const [cartCount,setCartCount] = React.useState(0);
  const HEADER_HEIGHT = scale(0);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_HEIGHT],
  });

  const GetProduct =async()=>{
    setLoading(true);
    let id=route.params.id;
    console.log("id:"+id);
    let count = await CART_ITEMS.getItemCount();
      setCartCount(count);
    try{
      setProducts([]);
    axios.get(App_Url+'GetStoreProductsApp',{
      params:{
        category:id
      }
    })
        .then(json => {
          setLoading(false);
          if(json.data.success){
            setLoading(false);
            console.log(json.data.storeproducts);
            setProducts(json.data.storeproducts);
          } else {
            setProducts([]);
            showAlert(json.data.message, COLORS.red);
          }
          
        }).catch(error => {
          setLoading(false);
          showAlert(error.message, COLORS.red);
        });

    } catch (error) {
      setLoading(false);
      showAlert(error.message, COLORS.red,COLORS.red);
    }
  }
 
  useEffect(() => {
    GetProduct();
  }, [isFocused]);

  const showAlert = (message,color)=> {
    SnackbarAlert(
      message,
      COLORS.white,
      color,
      'Got it',
      COLORS.white,
    )
  };
  // Hooks
  const refRBSheet = useRef(null);

  // Rendering flatlist item
  const _renderItem = ({item, index}) => (
    // Product list component
    <ProductList 
      id={item.id}
      index={index}
      addedInWishlist={item.addedInWishlist}
      photo={item.product_image_url != "" ?{uri:`${App_Root+item.product_image_url}`} :require('../assets/images/default_image.jpg')}
      title={item.product_name}
      description={item.product_description}
      overallRating={4}
      price={item.is_offer_active==1 ? item.product_offer_price : item.product_price_sell}
      onPressHeart={() => _toggleHeartIcon(item.id)}
      onPressItem={() => navigation.navigate('Product',{itemId:item.id,product:item})}
      onPressAdd={ async() =>{
        try{
          let price = item.is_offer_active==1 ? item.product_offer_price : item.product_price_sell;
          let p = {
            id:item.id,
            product_image_url:item.product_image_url,
            product_name:item.product_name,
            product_price_sell:price,
            product_qty:1
          };
        let isadd =  await CART_ITEMS.AddItem(p);
        if(isadd){
          SnackbarAlert(
            'An item added to cart.',
            COLORS.white,
            COLORS.green,
          )
          let count = await CART_ITEMS.getItemCount();
          setCartCount(count);
        } else {
          showAlert("Add to cart failed",COLORS.red); 
        }
      
        }catch(error){
          console.log(error);
          showAlert("cart add failed",COLORS.red);
        }
        
      }
        // Showing snac-kbar alert
        
      }
    />
  );

  // Toggling heart icon
  const _toggleHeartIcon = itemID => {
    // Copy products
    const newProducts = [...products];
    // Getting index of selected item
    const index = products.findIndex(item => item.id === itemID);
    // Checking
    if (newProducts[index].addedInWishlist) {
      // Updating value
      newProducts[index].addedInWishlist = false;
      // Showing snackbar alert
      SnackbarAlert(
        'Item removed from wishlist.',
        COLORS.white,
        COLORS.red,
        'Got it',
        COLORS.white,
      );
    } else {
      // Updating value
      newProducts[index].addedInWishlist = true;
      // Showing snackbar alert
      SnackbarAlert(
        'Item added to wishlist.',
        COLORS.white,
        COLORS.green,
        'Got it',
        COLORS.white,
      );
    }
    // Updating state
    setProducts(newProducts);
  };

  // Rendering Flatlist header
  const _renderListHeader = () => (
    <View style={GLOBAL_STYLES.productsFilterIconContainer}>
      {/* <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={[GLOBAL_STYLES.xyCenter, GLOBAL_STYLES.productsFilterIcon]}>
        <Icon name="sliders-h" size={scale(20)} color={COLORS.primary} />
      </TouchableOpacity> */}
    </View>
  );

  // Toggling price sorting options
  const _toggleSortByPrices = param => {
    // Updating state
    setPriceSort(param);
  };

  // Toggling brand options
  const _toggleBrands = param => {
    // Updating state
    setSelectedBrand(param);
  };

  // Applying filter
  const _applyFilter = () => {
    // Closing filter sheet modal
    refRBSheet.current.close();
    // Updating state
    setIsFilterApplying(true);
    // Re-updating state after a few seconds of delay
    setTimeout(() => {
      setIsFilterApplying(false);
      // Showing snackbar alert
      SnackbarAlert(
        'Filter applied successfully.',
        COLORS.white,
        COLORS.green,
        'Got it',
        COLORS.white,
      );
    }, 4000);
  };

  // Checking
  if (isFilterApplying) {
    // Returning
    return <ScreenLoader message="Product filter & sort being applied." />;
  }

  return (
    
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      <Animated.View
            style={[
              HOME_STYLES.header,
              {
                transform: [
                  {
                    translateY: translateY,
                  },
                ],
              },
            ]}>
            <View style={{flexDirection: 'row',marginTop:10}}>
              <View style={[HOME_STYLES.headerLeft, GLOBAL_STYLES.xCenter]}>
                {/* Menu icon */}
                <IonIcon
                  name="arrow-back-sharp"
                  color={COLORS.white}
                  size={scale(20)}
                  onPress={() => navigation.goBack()}
                />
                
              </View>
              <HeaderTitle title={route.params.title} />
              <View style={HOME_STYLES.headerRight}>
                {/* Mic icon */}
                <TouchableOpacity style={HOME_STYLES.micIconContainer}
                onPress={() => navigation.navigate('CheckoutStack', {title: "Shopping Cart"})}
                >
                  { <View  style={[
              PRODUCT_STYLES.headerIconContainerCopy,
              GLOBAL_STYLES.xyCenter,
            ]}>
                    <Text style={PRODUCT_STYLES.officeDiscount}>{cartCount}</Text>
                  </View>}
                  { <IonIcon name="cart" size={scale(25)} color={COLORS.white} /> }
                </TouchableOpacity>
                {/* Context menu */}
              </View>
            </View>
      </Animated.View>  
            {
              Loading ?
                <ScreenLoader message="Loading Products..." />
                :
              <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
                 {products.length == 0 ? (
        <View style={[GLOBAL_STYLES.flexOneContainer, GLOBAL_STYLES.xyCenter]}>
         <Animatable.View
            delay={500}
            animation="fadeInDown"
            easing="ease-in-out-sine"
            style={GLOBAL_STYLES.lottieViewContainer}>
            {/* Lottie view */}
            <LottieView
              source={require('../assets/lottie/checkmark.json')}
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
            No products!
          </Animatable.Text>
          <Animatable.Text
            delay={1500}
            animation="fadeInUp"
            easing="ease-in-out-sine"
            useNativeDriver={true}
            style={GLOBAL_STYLES.lottieInfo}>
            Sorry! we don't have any Products for now.
          </Animatable.Text>
        </View>
      ) : (
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          style={LIST_PRODUCT_STYLES.listView}
          ListHeaderComponent={_renderListHeader}
        />
      )}
              </View>
            }
     

      {/* Filter apply sheet(modal) */}
      <RBSheet
        dragFromTopOnly={true}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        height={Platform.OS === 'ios' ? height - getStatusBarHeight() : height}
        customStyles={{
          wrapper: GLOBAL_STYLES.rbSheetWrapper,
          draggableIcon: GLOBAL_STYLES.rbSheetDraggableIcon,
        }}>
        {/* Sheet content */}
        <View
          style={[
            GLOBAL_STYLES.rbSheetContentContainer,
            GLOBAL_STYLES.marginXNone,
          ]}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {/* Content Title */}
            <View
              style={[
                GLOBAL_STYLES.rbSheetContentTitleContainer,
                GLOBAL_STYLES.flexRow,
              ]}>
              <Text style={GLOBAL_STYLES.rbSheetContentTitle}>
                Sort & Filter
              </Text>
              <Button
                label="Apply"
                customButtonStyle={[
                  GLOBAL_STYLES.marginYNone,
                  GLOBAL_STYLES.applyFilterButton,
                ]}
                onPress={() => _applyFilter()}
              />
            </View>

            {/* Section tile */}
            <View style={GLOBAL_STYLES.rbSheetSectionTitleContainer}>
              <Text style={GLOBAL_STYLES.rbSheetSectionTitle}>
                Sort by prices
              </Text>
            </View>

            {/* Options container */}
            <View style={GLOBAL_STYLES.productsFilterSortOptionsContainer}>
              {/* Options */}
              <TouchableOpacity
                style={[GLOBAL_STYLES.sortOptionRow, GLOBAL_STYLES.flexRow]}
                onPress={() => _toggleSortByPrices('H2L')}>
                <View style={[GLOBAL_STYLES.flexRow, GLOBAL_STYLES.xCenter]}>
                  <Icon
                    name="sort-amount-down"
                    size={scale(15)}
                    color={COLORS.primary}
                  />
                  <Text style={GLOBAL_STYLES.sortOptionLabel}>
                    High to Low prices
                  </Text>
                </View>
                {priceSort === 'H2L' && (
                  <Icon
                    name="dot-circle"
                    size={scale(15)}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[GLOBAL_STYLES.sortOptionRow, GLOBAL_STYLES.flexRow]}
                onPress={() => _toggleSortByPrices('L2H')}>
                <View style={[GLOBAL_STYLES.flexRow, GLOBAL_STYLES.xCenter]}>
                  <Icon
                    name="sort-amount-up"
                    size={scale(15)}
                    color={COLORS.primary}
                  />
                  <Text style={GLOBAL_STYLES.sortOptionLabel}>
                    Low to High prices
                  </Text>
                </View>
                {priceSort === 'L2H' && (
                  <Icon
                    name="dot-circle"
                    size={scale(15)}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  GLOBAL_STYLES.sortOptionRow,
                  GLOBAL_STYLES.flexRow,
                  {borderBottomColor: 'transparent'},
                ]}
                onPress={() => _toggleSortByPrices('HP')}>
                <View style={[GLOBAL_STYLES.flexRow, GLOBAL_STYLES.xCenter]}>
                  <Icon name="fire" size={scale(15)} color={COLORS.primary} />
                  <Text style={GLOBAL_STYLES.sortOptionLabel}>
                    Hot & Popular
                  </Text>
                </View>
                {priceSort === 'HP' && (
                  <Icon
                    name="dot-circle"
                    size={scale(15)}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
            </View>

            {/* Section tile */}
            <View style={GLOBAL_STYLES.rbSheetSectionTitleContainer}>
              <Text style={GLOBAL_STYLES.rbSheetSectionTitle}>
                Filter by price range
              </Text>
            </View>

            {/* Range slider container */}
            <View style={GLOBAL_STYLES.rangeSliderContainer}>
              {/* Slider title */}
              <Text style={GLOBAL_STYLES.rangeSliderLabel}>
                Price Range -{' '}
                <Text style={GLOBAL_STYLES.priceRangeValue}>{lowestPrice}</Text>{' '}
                to{' '}
                <Text style={GLOBAL_STYLES.priceRangeValue}>
                  {highestPrice}
                </Text>{' '}
              </Text>
              {/* Range slider */}
              <RangeSlider
                min={0}
                max={100}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChange}
              />
            </View>

            {/* Section tile */}
            <View style={GLOBAL_STYLES.rbSheetSectionTitleContainer}>
              <Text style={GLOBAL_STYLES.rbSheetSectionTitle}>
                Filter by price brands
              </Text>
            </View>

            {/* Brands filter container */}
            <View
              style={[
                GLOBAL_STYLES.brandsFilterContainer,
                GLOBAL_STYLES.flexRow,
              ]}>
              {brands.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    GLOBAL_STYLES.brandOptionContainer,
                    selectedBrand === item.title
                      ? GLOBAL_STYLES.brandOptionContainerActive
                      : GLOBAL_STYLES.brandOptionContainerDefault,
                  ]}
                  onPress={() => _toggleBrands(item.title)}>
                  <Text
                    style={[
                      GLOBAL_STYLES.brandOptionLabel,
                      selectedBrand === item.title
                        ? GLOBAL_STYLES.brandOptionLabelActive
                        : GLOBAL_STYLES.brandOptionLabelDefault,
                    ]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

// Exporting
export default ListProducts;
