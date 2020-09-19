import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ListItem from './MovieListItem';
import {Title, Divider} from 'react-native-paper';

const MovieList = ({
  movies,
  nextPage,
  removeMovie,
  navigation,
  listTitle,
  renderButton,
}) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        ListHeaderComponent={<Title style={styles.title}>{listTitle}</Title>}
        ListFooterComponent={<View style={styles.listEnd} />}
        ItemSeparatorComponent={() => <Divider />}
        data={movies}
        renderItem={({item}) => (
          <ListItem
            movie={item}
            removeMovie={removeMovie}
            clickEvent={() => navigation.push('Details', {id: item._id})}
            navigation={navigation}
            renderButton={renderButton}
          />
        )}
        keyExtractor={(item, index) => item._id}
        onEndReached={() => {
          nextPage();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {},
  title: {
    fontSize: 30,
    marginHorizontal: 30,
    paddingVertical: 30,
  },
  listEnd: {
    marginVertical: 0,
  },
});
export default MovieList;
