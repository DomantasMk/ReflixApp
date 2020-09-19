import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import MovieList from '../../components/MovieCardList';
import {urlsMovies} from '../../assets/utils/UrlsMovieAPI';
import {Title} from 'react-native-paper';
import colors from '../../constants/Colors';
import {Divider} from 'react-native-paper';

export default function BrowseScreen({route, navigation}) {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Title style={styles.title}>Play Movies</Title>
            <Divider />
          </View>
        }
        style={styles.list}
        data={urlsMovies}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <MovieList
            navigation={navigation}
            title={item.title}
            url={item.url}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {},
  title: {
    paddingLeft: 10,
    color: colors.tintColor,
    fontSize: 30,
    paddingTop: 15,
    paddingBottom: 5,
  },
});
