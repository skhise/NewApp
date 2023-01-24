// Importing
import React, {useState, useRef,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import COLORS from '../config/COLORS';
import DIMENSIONS from '../config/DIMENSIONS';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import PRODUCT_STYLES from '../styles/screens/PRODUCT_STYLES';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button, ButtonWithIcon} from '../components/BUTTONS';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {scale} from 'react-native-size-matters';
import {SnackbarAlert} from '../components/ALERTS';
import CART_ITEMS from '../data/LocalCart';
import Server from '../data/Server_Info'
import ShowAlert from '../data/ShowAlert';
import BUTTON_STYLES from '../styles/components/BUTTON_STYLES';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { HeaderTitle } from '../components/HEADER_TITLE';
import HOME_STYLES from '../styles/screens/HOME_STYLES';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
// Functional component
const Product = ({route,navigation}) => {
  // Local states
  let App_Url = Server.api;
  let App_Root = Server.root;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('2S');
  const [selectedColor, setSelectedColor] = useState('#c3aa64');
  const [isAlive, setIsAlive] = useState(true);
  const [cartCount,setCartCount] = React.useState(0);
  const HEADER_HEIGHT = scale(0);
  const SCROLL_Y = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(SCROLL_Y, 0, HEADER_HEIGHT);
  const isFocused = useIsFocused();
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_HEIGHT],
  });
  //const product = route.product;
  // Hooks
  const { itemId, product } = route.params;

  const refTopFlatlist = useRef(null);
  const refTnFlatlist = useRef(null);
  const refRBSheet = useRef(null);

  // Constants
  const thumbnailBoxSize = scale(60);
  const thumbnailXSpacing = 5;

  // Getting window width & height from dimensions
  const {width, height} = DIMENSIONS;
  const GetCount=async() =>{
    let count = await CART_ITEMS.getItemCount();
    setCartCount(count);
  }
  useEffect(() => {
    GetCount();
  }, [isFocused]);
  // Scrolling flatlists
  const scrollToIndex = index => {
    // Updating state
    setActiveIndex(index);
    // Scrolling large image to specified offset
    refTopFlatlist?.current?.scrollToOffset({
      offset: width * index,
      animated: true,
    });
    // Comparing
    if (
      index * (thumbnailBoxSize + thumbnailXSpacing * 2) -
        (thumbnailBoxSize + thumbnailXSpacing * 2) / 2 >
      width / 2
    ) {
      // Scrolling active thumbnail image to specified offset
      refTnFlatlist?.current?.scrollToOffset({
        animated: true,
        offset:
          index * (thumbnailBoxSize + thumbnailXSpacing * 2) -
          width / 2 +
          (thumbnailBoxSize + thumbnailXSpacing * 2) / 2,
      });
    } else {
      // Scrolling active thumbnail image to 0 offset
      refTnFlatlist?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  // Rendering large image
  const _renderLargeImages = ({item, index}) => (
    <View key={index} style={PRODUCT_STYLES.largeImageContainer}>
      <Image source={item.large} style={GLOBAL_STYLES.responsiveImage} />
    </View>
  );

  // Rendering thumbnail image
  const _renderThumbnailImages = ({item, index}) => (
    <Pressable
      onPress={() => scrollToIndex(index)}
      key={index}
      style={[
        PRODUCT_STYLES.thumbnailImageContainer,
        {
          borderColor: activeIndex === index ? COLORS.primary : COLORS.white,
        },
      ]}>
      <Image 
      
      source={item.thumbnail != null ?{uri:`${App_Root+item.thumbnail}`} :require('../assets/images/default_image.jpg')}
       style={GLOBAL_STYLES.responsiveImage} />
    </Pressable>
  );

  // Toggling size options
  const _toggleSizeOptions = size => {
    // Updating state
    setSelectedSize(size);
  };

  // Toggling color options
  const _toggleColorOptions = color => {
    // Updating state
    setSelectedColor(color);
  };

  // Toggling bottom sheet
  const _toggleRBSheet = param => {
    if (param === 'open') {
      refRBSheet.current.open();
    } else if (param === 'close') {
      refRBSheet.current.close();
      navigation.navigate('ProductReviews');
    }
  };

  // Returning
  return (
    <SafeAreaView style={[GLOBAL_STYLES.safeAreaView]}>
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
              <HeaderTitle title="Product Details" />
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
      
      {/* Product details area */}
      <View style={PRODUCT_STYLES.detailsContainer}>
        {/* Few details */}
        <View style={PRODUCT_STYLES.flatlistContainer}>
        {/* Custom header */}
        {
           product.is_offer_active == 1 ? 
           <View style={PRODUCT_STYLES.header}>
          <TouchableOpacity
            style={[
              PRODUCT_STYLES.offerIconContainer,
              GLOBAL_STYLES.xyCenter,
            ]}>
            <Text style={PRODUCT_STYLES.officeDiscount}>Offer</Text>
          </TouchableOpacity>
          
        </View>
            :
            null
        }
        
        

        {/* Large images flatlist */}
        {/* <FlatList
          ref={product}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          horizontal
          scrollEnabled
          renderItem={_renderLargeImages}
          onMomentumScrollEnd={ev => {
            scrollToIndex(Math.round(ev.nativeEvent.contentOffset.x / width));
          }}
        /> */}
        <View style={PRODUCT_STYLES.largeImageContainer}>
          <Image
           source={product.product_image_url != null ?{uri:`${App_Root+product.product_image_url}`} :require('../assets/images/default_image.jpg')}
          style={GLOBAL_STYLES.responsiveImage} />
        </View>
      </View>
        <View style={PRODUCT_STYLES.fewDetailsContainer}>
          {/* Product title, offer & price */}
          <View style={PRODUCT_STYLES.productTitleOfferPrice}>
            <View style={PRODUCT_STYLES.productTitleContainer}>
              <Text style={PRODUCT_STYLES.productTitle}>
              {product.product_name}
              </Text>
            </View>
            
            <View style={PRODUCT_STYLES.offerContainer}>
              {/* <View style={{padding: 0}}> */}
              <Text style={PRODUCT_STYLES.offer}>Price</Text>
              <Text style={PRODUCT_STYLES.price}>{product.product_price_mrp}</Text>
              {/* </View> */}
            </View>
            
          </View>
          {
            product.is_offer_active == 1 ? 
            <View style={PRODUCT_STYLES.productOffer}>
            <View style={PRODUCT_STYLES.productTitleContainer}>
              <Text style={PRODUCT_STYLES.productTitleOffer}>
                Discount 
              </Text>
            </View>
            
            
            <View style={PRODUCT_STYLES.offerContainer}>
              {/* <View style={{padding: 0}}> */}
              <Text style={PRODUCT_STYLES.offer}>Offer Price</Text>
              <Text style={PRODUCT_STYLES.price}>{product.product_offer_price}</Text>
              {/* </View> */}
            </View>
            
          </View>
            :
            <View style={PRODUCT_STYLES.productOffer}>
            <View style={PRODUCT_STYLES.productTitleContainer}>
              <Text style={PRODUCT_STYLES.productTitleOffer}>
                Discount 
              </Text>
            </View>
            
            
            <View style={PRODUCT_STYLES.offerContainer}>
              {/* <View style={{padding: 0}}> */}
              <Text style={PRODUCT_STYLES.offer}>Sell Price</Text>
              <Text style={PRODUCT_STYLES.price}>{product.product_price_sell}</Text>
              {/* </View> */}
            </View>
            
          </View>
          }
          
          {/* Sizes section */}
          <View style={PRODUCT_STYLES.sectionContainer}>
            {/* Section title */}
            <Text style={PRODUCT_STYLES.productTitle}>Description</Text>
            <Text style={PRODUCT_STYLES.sectionTitle}>
            {product.product_description}
              </Text>
          </View>


          {/* Action buttons */}
          <View style={GLOBAL_STYLES.flexRow}>
            <View
              style={[
                GLOBAL_STYLES.flexOneContainer,
                PRODUCT_STYLES.addToCartButtonMargin,
              ]}>
              {/* Button component */}
              <Button
                label="Add to cart"
                customButtonStyle={BUTTON_STYLES.buttonPositive}
                onPress={ async () =>{
                  try{
                    let price = product.is_offer_active==1 ? product.product_offer_price : product.product_price_sell;
                              let p = {
                                id:product.id,
                                product_image_url:product.product_image_url,
                                product_name:product.product_name,
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
                    ShowAlert.ShowAlert("Add to cart failed",COLORS.red); 
                  }
                
                  }catch(error){
                    ShowAlert.ShowAlert("Add to cart failed",COLORS.red);
                  }
                }
                 
                }
              />
              <Button
                label="Enquiry Now"
                customButtonStyle={BUTTON_STYLES.buttonNigative}
                onPress={() => navigation.navigate('NewInquiry',{product:product.product_name})}
              />
            </View>
            <View style={GLOBAL_STYLES.flexRow}>
              {/*
               <ButtonWithIcon
                iconName="heart"
                iconSize={scale(20)}
                iconColor={COLORS.primary}
                customButtonStyle={[
                  GLOBAL_STYLES.marginYNone,
                  PRODUCT_STYLES.buttonWithIcon,
                ]}
                onPress={() =>
                  SnackbarAlert(
                    'An item added to wishlist.',
                    COLORS.white,
                    COLORS.yellow,
                    'Got it',
                    COLORS.white,
                  )
                }
              />
              */}
             
              {/* <ButtonWithIcon
                iconName="ellipsis-vertical"
                iconSize={scale(20)}
                iconColor={COLORS.primary}
                customButtonStyle={[
                  GLOBAL_STYLES.marginYNone,
                  PRODUCT_STYLES.buttonWithIcon,
                  GLOBAL_STYLES.marginRNone,
                ]}
                onPress={() => _toggleRBSheet('open')}
              /> */}
            </View>
          </View>
        </View>

        {/* More details sheet(modal) */}
        <RBSheet
          dragFromTopOnly={true}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          animationType="fade"
          height={
            Platform.OS === 'ios' ? height - getStatusBarHeight() : height
          }
          customStyles={{
            wrapper: GLOBAL_STYLES.rbSheetWrapper,
            draggableIcon: GLOBAL_STYLES.rbSheetDraggableIcon,
          }}>
          <View style={GLOBAL_STYLES.rbSheetContentContainer}>
            {/* Product title, offer & price */}
            <View
              style={[
                PRODUCT_STYLES.productTitleOfferPrice,
                PRODUCT_STYLES.productTitleOfferPriceMargin,
              ]}>
              <View style={PRODUCT_STYLES.productTitleContainer}>
                <Text style={PRODUCT_STYLES.productTitle}>
                  2 seater hall sofa from urban...
                </Text>
              </View>
              <View style={PRODUCT_STYLES.offerContainer}>
                <View style={GLOBAL_STYLES.paddingNone}>
                  <Text style={PRODUCT_STYLES.offer}>On sale</Text>
                  <Text style={PRODUCT_STYLES.price}>125.99</Text>
                </View>
              </View>
            </View>

            {/* Scrollview */}
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {/* Overall Rating */}
              <View style={PRODUCT_STYLES.overallRatingContainer}>
                <Text style={PRODUCT_STYLES.overallRatingValue}>
                  4.5
                  <Text style={PRODUCT_STYLES.ratingThresholdValue}> / 5</Text>
                </Text>
                <View
                  style={[
                    GLOBAL_STYLES.flexRow,
                    PRODUCT_STYLES.overallRatingStarsContainerMargin,
                  ]}>
                  <MaterialIcon
                    name="star"
                    size={scale(25)}
                    color={COLORS.yellow}
                  />
                  <MaterialIcon
                    name="star"
                    size={scale(25)}
                    color={COLORS.yellow}
                  />
                  <MaterialIcon
                    name="star"
                    size={scale(25)}
                    color={COLORS.yellow}
                  />
                  <MaterialIcon
                    name="star"
                    size={scale(25)}
                    color={COLORS.yellow}
                  />
                  <MaterialIcon
                    name="star-half"
                    size={scale(25)}
                    color={COLORS.yellow}
                  />
                </View>
                <Text style={PRODUCT_STYLES.ratingCount}>66K reviews</Text>
                <TouchableOpacity
                  style={PRODUCT_STYLES.seeAllReviewsMargin}
                  onPress={() => _toggleRBSheet('close')}>
                  <Text style={PRODUCT_STYLES.seeAllReviews}>
                    See all reviews
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Rating counts based on each star */}
              <View style={PRODUCT_STYLES.eachStarRatingContainer}>
                {/* 5 star rating count */}
                <View style={PRODUCT_STYLES.ratingBarContainer}>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>5</Text>
                  <MaterialIcon
                    name="star"
                    size={scale(20)}
                    color={COLORS.yellow}
                  />
                  <View style={PRODUCT_STYLES.ratingBarBackground}>
                    <View
                      style={[
                        PRODUCT_STYLES.ratingBarForground,
                        PRODUCT_STYLES.fiveStarRatingBar,
                      ]}></View>
                  </View>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>18K</Text>
                </View>
                {/* 4 star rating count */}
                <View style={PRODUCT_STYLES.ratingBarContainer}>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>4</Text>
                  <MaterialIcon
                    name="star"
                    size={scale(20)}
                    color={COLORS.yellow}
                  />
                  <View style={PRODUCT_STYLES.ratingBarBackground}>
                    <View
                      style={[
                        PRODUCT_STYLES.ratingBarForground,
                        PRODUCT_STYLES.fourStarRatingBar,
                      ]}></View>
                  </View>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>15K</Text>
                </View>
                {/* 3 star rating count */}
                <View style={PRODUCT_STYLES.ratingBarContainer}>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>3</Text>
                  <MaterialIcon
                    name="star"
                    size={scale(20)}
                    color={COLORS.yellow}
                  />
                  <View style={PRODUCT_STYLES.ratingBarBackground}>
                    <View
                      style={[
                        PRODUCT_STYLES.ratingBarForground,
                        PRODUCT_STYLES.threeStarRatingBar,
                      ]}></View>
                  </View>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>13K</Text>
                </View>
                {/* 2 star rating count */}
                <View style={PRODUCT_STYLES.ratingBarContainer}>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>2</Text>
                  <MaterialIcon
                    name="star"
                    size={scale(20)}
                    color={COLORS.yellow}
                  />
                  <View style={PRODUCT_STYLES.ratingBarBackground}>
                    <View
                      style={[
                        PRODUCT_STYLES.ratingBarForground,
                        PRODUCT_STYLES.twoStarRatingBar,
                      ]}></View>
                  </View>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>12K</Text>
                </View>
                {/* 1 star rating count */}
                <View style={PRODUCT_STYLES.ratingBarContainer}>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>1</Text>
                  <MaterialIcon
                    name="star"
                    size={scale(20)}
                    color={COLORS.yellow}
                  />
                  <View style={PRODUCT_STYLES.ratingBarBackground}>
                    <View
                      style={[
                        PRODUCT_STYLES.ratingBarForground,
                        PRODUCT_STYLES.oneStarRatingBar,
                      ]}></View>
                  </View>
                  <Text style={PRODUCT_STYLES.ratingValueCount}>08K</Text>
                </View>
              </View>

              {/* Section title */}
              <Text style={PRODUCT_STYLES.sectionTitle}>Payment options</Text>

              {/* Payment options */}
              <View style={PRODUCT_STYLES.listContainer}>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    Direct bank transfer
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    Debit/Credit cards
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    No cost <Text style={GLOBAL_STYLES.textUppercase}>EMI</Text>{' '}
                    from ₹3,833/month.
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    Cheque/Demad drafts
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Pay on delivery</Text>
                </View>
              </View>

              {/* Section title */}
              <Text style={PRODUCT_STYLES.sectionTitle}>
                Product Description
              </Text>

              {/* Product description */}
              <View style={PRODUCT_STYLES.listContainer}>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    Two-tone Designer Look
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Square Arms</Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    Sturdy Wood Structure
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    High Density Foam
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Firm Seating</Text>
                </View>
              </View>

              {/* Section title */}
              <Text style={PRODUCT_STYLES.sectionTitle}>Product Features</Text>

              {/* Product features */}
              <View style={PRODUCT_STYLES.listContainer}>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    Suitable for living room
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>
                    Matte finish type
                  </Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Modern style</Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Bush included</Text>
                </View>
              </View>

              {/* Section title */}
              <Text style={PRODUCT_STYLES.sectionTitle}>
                Product Dimensions
              </Text>

              {/* Product dimensions */}
              <View style={PRODUCT_STYLES.listContainer}>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Width - 78.74 Cm</Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Depth - 68.49 Cm</Text>
                </View>
                <View style={PRODUCT_STYLES.list}>
                  <IonIcon
                    name="square-sharp"
                    size={scale(10)}
                    color={COLORS.primary}
                  />
                  <Text style={PRODUCT_STYLES.listTitle}>Weight - 18 kg</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

// Exporting
export default Product;
