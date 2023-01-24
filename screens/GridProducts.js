// Importing
import React, {useState, useRef, useCallback,useEffect} from 'react';
import {
  SafeAreaView,
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
import GRID_PRODUCT_STYLES from '../styles/screens/GRID_PRODUCT_STYLES';
import {FlatGrid} from 'react-native-super-grid';
import {scale} from 'react-native-size-matters';
import {ProductCard} from '../components/CARDS';
import {SnackbarAlert} from '../components/ALERTS';
import * as Animatable from 'react-native-animatable';
import COLORS from '../config/COLORS';
import DIMENSIONS from '../config/DIMENSIONS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import App_Url from '../data/Server_Info';

// Functional component
const GridProducts = ({navigation}) => {
  // Constants
  const {height} = DIMENSIONS;
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
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
  const [isAlive, setIsAlive] = useState(true);
  // Hooks
  const refRBSheet = useRef(null);

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
  useEffect(() => {
    setLoading(true);
    fetch(App_Url+'GetStoreProductsApp')
    .then((response) => response.json())
    .then((json)=>{
      //console.log(json);
      setLoading(false);
      setProducts(json);
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false);
      console.error(error);
      //alert("connection error");
      showAlert("Connection Error!");
      //navigation.replace('Home');

    });
    return () => setIsAlive(false)
    
  }, [isAlive])
  // Rendering flatgrid item
  const _renderFlatGridItem = ({item}) => (
    // Product card component
    <ProductCard
      id={item.id}
      badgeLabel={'Best Offer'}
      addedInWishlist={item.addedInWishlist}
      photo={{uri:`${item.product_image_url}`}}
      title={item.product_name}
      overallRating={4}
      price={item.product_price_mrp}
      onPressHeart={() => _toggleHeartIcon(item.id)}
      onPressAdd={() =>
        // Showing snackbar alert
        SnackbarAlert(
          'An item added to cart.',
          COLORS.white,
          COLORS.green,
          'Got it',
          COLORS.white,
        )
      }
      onPressItem={() => navigation.navigate('Product',{itemId:item.id,product:item})}
      shadowValue={5}
    />
  );

  // Rendering flatgrid header
  const _renderListHeader = () => (
    <View
      style={[
        GLOBAL_STYLES.productsFilterIconContainer,
        GLOBAL_STYLES.marginTNone,
        {marginBottom: scale(15)},
      ]}>
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={[GLOBAL_STYLES.xyCenter, GLOBAL_STYLES.productsFilterIcon]}>
        <Icon name="sliders-h" size={scale(20)} color={COLORS.primary} />
      </TouchableOpacity>
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
  if(Loading){
    return <ScreenLoader message="Loading Products..." />;
  }
  // Returning
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeAreaView}>
      {products.length === 0 ? (
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
        <FlatGrid
          itemDimension={130}
          data={products}
          style={GRID_PRODUCT_STYLES.gridView}
          spacing={scale(15)}
          renderItem={_renderFlatGridItem}
          keyExtractor={item => item.id}
          bounces={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={_renderListHeader}
        />
      )}

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
export default GridProducts;
