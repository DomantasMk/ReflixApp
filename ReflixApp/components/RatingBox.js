import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const primaryColor = '#f05123';
const RatingBox = ({rating}) => {
  let starSize = 30;
  const generateStars = (ratingMovie) => {
    let stars = [];
    let rating = ratingMovie / 2;
    for (let i = 0; i < 5; i++) {
      if (rating >= 1)
        stars.push(
          <Icon
            name="star"
            size={starSize}
            color={primaryColor}
            key={i}></Icon>,
        );
      else if (rating >= 0.25 && rating < 1)
        stars.push(
          <Icon
            name="star-half"
            size={starSize}
            color={primaryColor}
            key={i}></Icon>,
        );
      else
        stars.push(
          <Icon
            name="star-border"
            size={starSize}
            color={primaryColor}
            key={i}></Icon>,
        );
      rating--;
    }
    return stars;
  };
  return (
    <View style={styles.infoWrap}>
      <View style={styles.ratingWrap}>
        <View style={styles.ratingBox}>
          <Text style={styles.ratingText}>
            {Math.round((rating / 2) * 10) / 10}
          </Text>
        </View>
        <View style={styles.starsBox}>
          <Text style={styles.stars}> {generateStars(rating)}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rating: {
    borderRadius: 1000,
    backgroundColor: primaryColor,
    padding: 3,
    marginLeft: 8,
  },
  ratingWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsBox: {
    position: 'relative',
    left: -35,
    width: 'auto',
    height: 35,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 5,
    padding: 10,
  },
  stars: {},
  ratingBox: {
    borderRadius: 1000,
    minWidth: 90,
    height: 50,
    paddingRight: 10,
    backgroundColor: primaryColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
    color: '#ffffff',
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default RatingBox;
