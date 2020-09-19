import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import BrowseScreen from '../screens/Movies/BrowseScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import ProfileScreen from '../screens/Profile/Profile';

import HeaderOptions from '../constants/HeaderOptions';

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator({navigation, route}) {
  //set the navbar
  navigation.setOptions(HeaderOptions(navigation));

  return (
    <BottomTab.Navigator
      activeColor="#f05123"
      barStyle={{
        backgroundColor: '#ffffff',
      }}
      initialRouteName={'BrowseMovies'}>
      <BottomTab.Screen
        name="BrowseMovies"
        component={BrowseScreen}
        options={{
          title: 'Movies',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="local-movies" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="favorite" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="search" />
          ),
        }}
      />
      <BottomTab.Screen
        name="BrowseActors"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
