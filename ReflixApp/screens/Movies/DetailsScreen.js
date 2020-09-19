import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import MovieList from '../../components/MovieCardList';
import {urlsMovies} from '../../assets/utils/UrlsMovieAPI';
import {Paragraph} from 'react-native-paper';
import {detailsUrl} from '../../assets/utils/UrlsMovieAPI';
import RatingBox from '../../components/RatingBox';
import FabButton from '../../components/FabButton';
import Chip from '../../components/Chip';
import HeaderOptions from '../../constants/HeaderOptions';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';

function DetailsScreen({route, navigation}) {
  const [movie, setMovie] = React.useState();
  navigation.setOptions(HeaderOptions(navigation));
  const [isFavorite, setFavorite] = React.useState(false);
  const setMovieFavorite = (movieId) => {
    axios
      .get(`http://localhost:5000/api/favoritemovies/isFavorite/${movieId}`)
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => console.log(err));
  };
  const changeStatus = (movieId, favoriteStatus) => {
    let action = '';
    if (favoriteStatus) {
      action = 'remove';
    } else {
      action = 'post';
    }
    let postLink = `http://localhost:5000/api/favoritemovies/${action}/movie/${movieId}`;
    axios
      .post(postLink)
      .then(function (response) {
        setFavorite(!isFavorite);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //to do:
  //Add some logic to cancel fetch requests on componentWillUnmount
  //Reason: Possible memory leak if the user leaves the screen before we get the response
  navigation.option;
  React.useEffect(() => {
    fetch(detailsUrl(route.params.id))
      .then((res) => res.json())
      .then((result) => {
        setMovie(result);
        auth().onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken().then(function (data) {
              axios.defaults.headers.common = {
                Authorization: `Bearer ${data}`,
              };
              console.log('heh');
              setMovieFavorite(result._id);
            });
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {movie ? (
          <View style={styles.innerContainer}>
            <Image
              style={styles.poster}
              source={{
                uri: `${movie.poster_uri}`,
              }}
            />
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <RatingBox rating={movie.rating} />
              <View style={styles.genreContainer}>
                {movie.genres.map((genre) => (
                  <Chip label={genre} />
                ))}
              </View>
              <Text style={styles.smallTitle}>Movie Plot</Text>

              <Paragraph>{movie.description}</Paragraph>
            </View>
            <View style={styles.bookmarkButton}>
              {isFavorite ? (
                <FabButton
                  clickEvent={() => {
                    changeStatus(movie._id, isFavorite);
                  }}
                  iconName={isFavorite ? 'bookmark' : 'bookmark-border'}
                  iconSize={50}
                  style={styles.playButton}
                />
              ) : (
                <FabButton
                  clickEvent={() => {
                    changeStatus(movie._id, isFavorite);
                  }}
                  iconName={isFavorite ? 'bookmark' : 'bookmark-border'}
                  iconSize={50}
                  style={styles.playButton}
                />
              )}
            </View>

            <MovieList
              navigation={navigation}
              title={'Recommendations'}
              url={urlsMovies[0].url}
            />
          </View>
        ) : (
          <View style={styles.center}>
            <ActivityIndicator animating={true} size={50} />
          </View>
        )}
      </ScrollView>
      {movie ? (
        <View style={styles.playButton}>
          <FabButton
            clickEvent={() => {
              navigation.navigate('Player', {videoId: movie.trailerId});
            }}
            iconName="play-arrow"
            iconSize={50}
            style={styles.playButton}
          />
        </View>
      ) : null}
    </View>
  );
}

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    margin: 0,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
    width: deviceWidth,
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    marginTop: (deviceHeight * 50) / 100,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  smallTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  spanText: {
    color: '#333333',
    fontWeight: '600',
    lineHeight: 23,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  poster: {
    width: deviceWidth,
    height: (deviceHeight * 60) / 100,
    position: 'absolute',
  },
  genreContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  playButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  bookmarkButton: {
    position: 'absolute',
    top: (deviceHeight * 46) / 100,
    right: 20,
  },
});

export default DetailsScreen;
