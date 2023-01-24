// Importing
import React from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import PRODUCT_CARD_STYLES from '../styles/components/PRODUCT_CARD_STYLES';
import PRODUCT_LIST_STYLES from '../styles/components/PRODUCT_LIST_STYLES';
import REVIEW_CARD_STYLES from '../styles/components/REVIEW_CARD_STYLES';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import COLORS from '../config/COLORS';
import {ButtonWithIcon} from '../components/BUTTONS';
import shadow from './SHADOW';

// Sizes constants
const SIZE_15 = scale(15);
const SIZE_20 = scale(20);
const SIZE_25 = scale(25);

// Functional components

// Product card(Grid view)
const ProductCard = ({
  id,
  badgeLabel,
  addedInWishlist,
  photo,
  title,
  overallRating,
  price,
  onPressHeart,
  onPressItem,
  onPressAdd,
  shadowValue,
  customCardStyle,
}) => (
  <Pressable
    key={id}
    style={[
      PRODUCT_CARD_STYLES.itemContainer,
      {...shadow(scale(shadowValue), COLORS.shadowDark)},
      customCardStyle,
    ]}
    onPress={onPressItem}>
    {/* Header */}
    <View style={PRODUCT_CARD_STYLES.itemHeader}>
      {badgeLabel !== null ? (
        <View style={[PRODUCT_CARD_STYLES.badge, GLOBAL_STYLES.xyCenter]}>
          <Text style={PRODUCT_CARD_STYLES.badgeLabel}>{badgeLabel}</Text>
        </View>
      ) : (
        <View></View>
      )}

      <ButtonWithIcon
          iconName="information-circle-sharp"
          iconSize={SIZE_20}
          iconColor={COLORS.white}
          customButtonStyle={[
            GLOBAL_STYLES.marginYNone,
            PRODUCT_CARD_STYLES.EnquiryButton,
            GLOBAL_STYLES.xyCenter,
          ]}
          onPress={onPressHeart}
        />
 
    </View>
    {/* Photo */}
    <View style={PRODUCT_CARD_STYLES.photoContainer}>
      <Image source={photo} style={GLOBAL_STYLES.responsiveImage} />
    </View>
    {/* Footer */}
    <View>
      <Text style={PRODUCT_CARD_STYLES.itemTitle}>{
          title?.length < 25
            ? `${title}`
            : `${title.substring(0, 20)+"..."}`}</Text>
      {overallRating === 1 ? (
        <Icon
          name="star-sharp"
          size={SIZE_15}
          style={PRODUCT_CARD_STYLES.starIcon}
        />
      ) : overallRating === 1.5 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-half-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : overallRating === 2 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : overallRating === 2.5 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-half-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : overallRating === 3 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : overallRating === 3.5 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-half-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : overallRating === 4 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : overallRating === 4.5 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-half-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : overallRating === 5 ? (
        <View style={PRODUCT_CARD_STYLES.ratingStarsContainer}>
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={PRODUCT_CARD_STYLES.starIcon}
          />
        </View>
      ) : null}
      
      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={PRODUCT_CARD_STYLES.itemPrice}>{price}</Text>
        <ButtonWithIcon
          iconName="add"
          iconSize={SIZE_25}
          iconColor={COLORS.white}
          customButtonStyle={[
            GLOBAL_STYLES.marginYNone,
            PRODUCT_CARD_STYLES.addButton,
          ]}
          onPress={onPressAdd}
        />
      </View>
    </View>
  </Pressable>
);

// Product list(List view)
const ProductList = ({
  id,
  index,
  addedInWishlist,
  photo,
  title,
  description,
  overallRating,
  price,
  onPressHeart,
  onPressItem,
  onPressAdd,
}) => (
  <Pressable
    key={id}
    style={[
      PRODUCT_LIST_STYLES.itemContainer,
      {marginTop: index == 0 ? 15 : 0},
    ]}
    onPress={onPressItem}>
    <View style={PRODUCT_LIST_STYLES.photoContainer}>
      <Image source={photo} style={GLOBAL_STYLES.responsiveImage} />
    </View>
    <View style={PRODUCT_LIST_STYLES.itemDetailsContainer}>
      <View style={PRODUCT_LIST_STYLES.itemHeader}>
        <View>
          <Text style={PRODUCT_LIST_STYLES.itemTitle}>
          {
          title?.length < 25
            ? `${title}`
            : `${title.substring(0, 50)+"..."}`}
            {}</Text>
          {overallRating === 1 ? (
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={PRODUCT_LIST_STYLES.starIcon}
            />
          ) : overallRating === 1.5 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-half-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : overallRating === 2 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : overallRating === 2.5 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-half-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : overallRating === 3 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : overallRating === 3.5 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-half-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : overallRating === 4 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : overallRating === 4.5 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-half-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : overallRating === 5 ? (
            <View style={PRODUCT_LIST_STYLES.ratingStarsContainer}>
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
              <Icon
                name="star-sharp"
                size={SIZE_15}
                style={PRODUCT_LIST_STYLES.starIcon}
              />
            </View>
          ) : null}
          {
        description!="" ? 
        <View>
      <Text style={PRODUCT_CARD_STYLES.itemTitle}>{
          description?.length < 25
            ? `${description}`
            : `${description.substring(0, 80)+"..."}`}</Text>
       
      </View>
      : null
      }
        </View>

        {/*addedInWishlist ? (
          <TouchableOpacity>
            <Icon
              name="heart"
              size={SIZE_25}
              color={COLORS.red}
              onPress={onPressHeart}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Icon
              name="heart-outline"
              size={SIZE_25}
              color={COLORS.darkGrey}
              onPress={onPressHeart}
            />
          </TouchableOpacity>
        )*/}
      </View>

      {/* Item footer */}
      <View style={PRODUCT_LIST_STYLES.itemFooter}>
        <Text style={PRODUCT_LIST_STYLES.itemPrice}>{price}</Text>
        <ButtonWithIcon
          iconName="add"
          iconSize={SIZE_20}
          iconColor={COLORS.white}
          customButtonStyle={[
            GLOBAL_STYLES.marginYNone,
            PRODUCT_LIST_STYLES.addButton,
          ]}
          onPress={onPressAdd}
        />
      </View>
    </View>
  </Pressable>
);

// Product review card
const ProductReviewCard = ({
  id,
  index,
  overallRating,
  reviewAge,
  reviewTitle,
  review,
  reviewerImage,
  reviewerName,
  reviewerDesignation,
}) => (
  <View
    key={id}
    style={[
      REVIEW_CARD_STYLES.reviewContainer,
      {marginTop: index === 0 ? 15 : 0},
    ]}>
    <View style={REVIEW_CARD_STYLES.reviewHeader}>
      <Text style={REVIEW_CARD_STYLES.overallRating}>
        {overallRating.toFixed(1)}
      </Text>
      <View>
        {overallRating === 1 ? (
          <Icon
            name="star-sharp"
            size={SIZE_15}
            style={REVIEW_CARD_STYLES.starIcon}
          />
        ) : overallRating === 1.5 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-half-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : overallRating === 2 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : overallRating === 2.5 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-half-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : overallRating === 3 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : overallRating === 3.5 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-half-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : overallRating === 4 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : overallRating === 4.5 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-half-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : overallRating === 5 ? (
          <View style={REVIEW_CARD_STYLES.ratingStarsContainer}>
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
            <Icon
              name="star-sharp"
              size={SIZE_15}
              style={REVIEW_CARD_STYLES.starIcon}
            />
          </View>
        ) : null}
        <Text style={REVIEW_CARD_STYLES.reviewAge}>{reviewAge}</Text>
      </View>
    </View>
    <Text style={REVIEW_CARD_STYLES.reviewTitle}>{reviewTitle}</Text>
    <Text style={REVIEW_CARD_STYLES.review}>{review}</Text>
    <View style={REVIEW_CARD_STYLES.reviewFooter}>
      <View style={REVIEW_CARD_STYLES.reviewerImage}>
        <Image source={reviewerImage} style={GLOBAL_STYLES.responsiveImage} />
      </View>
      <View>
        <Text style={REVIEW_CARD_STYLES.reviewerName}>{reviewerName}</Text>
        <Text style={REVIEW_CARD_STYLES.reviewerDesignation}>
          {reviewerDesignation}
        </Text>
      </View>
    </View>
  </View>
);

// Exporting
export {ProductCard, ProductList, ProductReviewCard};
