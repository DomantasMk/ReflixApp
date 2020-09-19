import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MovieList from '../../components/MovieList/MovieList';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {favoriteMovieIdsUrl} from '../../assets/utils/UrlsMovieAPI';
import {ActivityIndicator} from 'react-native-paper';

export default function FavoritesScreen({route, navigation}) {
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let unsubscribe = navigation.addListener('blur', () => {
      setMovies([]);
      setPage(0);
    });
    unsubscribe = navigation.addListener('focus', () => {
      setPage(1);
    });
    return unsubscribe;
  }, [navigation]);
  React.useEffect(() => {
    setLoading(true);
    //The reason for this condition, is that we set page to 0 when we leave this screen
    //So we could avoid situation where this useEffect isnt triggered because page was set from 1 to 1
    if (page != 0) {
      auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then(function (data) {
            axios.defaults.headers.common = {
              Authorization: `Bearer ${data}`,
            };
            axios
              .get(favoriteMovieIdsUrl(page))
              .then(function (response) {
                setMovies([...movies, ...response.data]);
                setLoading(false);
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(() => {});
          });
        } else {
          setLoading(false);
        }
      });
    }
  }, [page]);
  const removeMovie = (id) => {
    const filteredData = movies.filter((item) => item._id !== id);
    setMovies(filteredData);
  };
  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        <MovieList
          movies={movies}
          nextPage={() => {
            setPage(page + 1);
            console.log(page);
          }}
          removeMovie={removeMovie}
          navigation={navigation}
          listTitle={'My library'}
          renderButton={true}
        />
      ) : (
        <View style={styles.moreMoviesText}>
          <ActivityIndicator animating={isLoading} size={50} />
          <Text style={styles.moreMoviesText}>
            Add Movies to your library to see them here!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  moreMoviesText: {
    alignSelf: 'center',
    top: 100,
    fontWeight: 'bold',
  },
});
