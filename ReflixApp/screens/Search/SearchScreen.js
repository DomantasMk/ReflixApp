import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';
import {searchMovieUrl} from '../../assets/utils/UrlsMovieAPI';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import Colors from '../../constants/Colors';

export default function SearchScreen({route, navigation}) {
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    //The reason for this condition, is that we set page to 0 when we leave this screen
    //So we could avoid situation where this useEffect isnt triggered because page was set from 1 to 1
    getMovies(false);
  }, [page]);
  const getMovies = (reset) => {
    if (page != 0 && query.length > 3) {
      setLoading(true);
      axios
        .get(searchMovieUrl(query, page))
        .then(function (response) {
          if (reset) {
            setMovies(response.data);
          } else {
            setMovies([...movies, ...response.data]);
          }
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    } else {
      setMovies([]);
    }
  };
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        style={styles.textInput}
        onChangeText={(text) => {
          setPage(1);
          setQuery(text);
        }}
        onIconPress={() => {
          getMovies(true);
        }}
        value={query}
        iconColor={Colors.tintColor}
        onSubmitEditing={() => {
          getMovies(true);
        }}
      />
      {movies.length > 0 ? (
        <MovieList
          movies={movies}
          nextPage={() => {
            setPage(page + 1);
            console.log(page);
          }}
          removeMovie={() => {}}
          navigation={navigation}
          listTitle={'SearchResults'}
          renderButton={false}
        />
      ) : isLoading ? (
        <View style={styles.moreMoviesText}>
          <ActivityIndicator animating={isLoading} size={50} />
          <Text style={styles.moreMoviesText}>Loading</Text>
        </View>
      ) : null}
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
  button: {
    borderRadius: 10,
    margin: 10,
  },
  textInput: {
    margin: 10,
    backgroundColor: '#ffffff',
  },
});
