import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import layout from '../../constants/Layout';
import {Text, Title, Caption, Button, FAB} from 'react-native-paper';
import {removeFavorite} from '../../assets/utils/UrlsMovieAPI';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';

const MovieListItem = ({
  movie,
  removeMovie,
  clickEvent,
  navigation,
  renderButton,
}) => {
  const [loading, setLoading] = React.useState(false);
  const removeFromFavorites = () => {
    setLoading(true);
    axios
      .post(removeFavorite(movie._id))
      .then(function (response) {
        removeMovie(movie._id);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => clickEvent()}>
      <Image
        style={styles.poster}
        source={{
          uri: `${movie.poster_uri}`,
        }}
      />
      <View style={styles.descriptionContainer}>
        <Title>{movie.title}</Title>
        <Caption style={styles.genres}>{movie.genres.join(', ')}</Caption>
        <Button
          icon="play-circle"
          dark
          mode="contained"
          disabled={loading}
          onPress={() =>
            navigation.navigate('Player', {videoId: movie.trailerId})
          }>
          Play Trailer
        </Button>
      </View>
      {renderButton ? (
        <FAB
          style={styles.fab}
          small
          icon="minus"
          disabled={loading}
          onPress={() => {
            removeFromFavorites();
          }}
        />
      ) : null}

      {loading ? (
        <View style={styles.loadView}>
          <ActivityIndicator animating={true} size={40} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
  },
  poster: {
    width: (layout.window.width * 36) / 100,
    height: (layout.window.height * 30) / 100,
    borderRadius: 20,
  },
  descriptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 50,
    paddingLeft: 20,
    width: (layout.window.width * 50) / 100,
  },
  genres: {
    maxWidth: 200,
    maxHeight: 60,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: (layout.window.width * 30) / 100,
    top: 0,
  },
  loadView: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '110%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
export default MovieListItem;
