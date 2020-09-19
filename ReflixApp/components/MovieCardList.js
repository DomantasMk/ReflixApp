import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MovieCard from './MovieCard';

export default function MovieList({navigation, url, title}) {
  const [movies, setMovies] = React.useState();
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    if (url) {
      fetch(`${url}${page}`)
        .then((res) => res.json())
        .then((result) => {
          //Only save the fields we need for optimization purposes
          const results = result.map(({_id, poster_uri, title}) => ({
            _id,
            poster_uri,
            title,
          }));
          if (movies) {
            setMovies([...movies, ...results]);
          } else {
            setMovies(results);
          }
        });
    }
  }, [page]);

  return (
    <View>
      {movies ? (
        <View style={styles.container}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <FlatList
            data={movies}
            renderItem={({item}) => (
              <MovieCard
                movie={item}
                clickEvent={() => {
                  navigation.push('Details', {id: item._id});
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            onEndReached={() => {
              setPage(page + 1);
            }}
          />
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: (deviceHeight * 2) / 100,
    marginLeft: (deviceWidth * 2) / 100,
  },
  movie: {
    paddingRight: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  poster: {
    width: (deviceWidth * 48) / 100,
    height: (deviceHeight * 40) / 100,
  },
});
