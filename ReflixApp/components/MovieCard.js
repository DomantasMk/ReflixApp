import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const MovieCard = ({movie, clickEvent}) => {
  return (
    <TouchableOpacity onPress={clickEvent} style={styles.card}>
      <Image
        style={styles.poster}
        source={{
          uri: `${movie.poster_uri}`,
        }}
      />
      <Text style={styles.title}>
        {movie.title.substr(0, 20)}
        {movie.title.length > 20 ? '...' : ''}
      </Text>
    </TouchableOpacity>
  );
};

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    paddingRight: 15,
    elevation: 5,
  },
  poster: {
    width: (deviceWidth * 48) / 100,
    height: (deviceHeight * 40) / 100,
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});
export default MovieCard;
/*     */
