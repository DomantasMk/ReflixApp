import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import MainNavigator from './navigation/MainStackNavigator';
import AuthProvider from './utils/authContext/authProvider';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import RecyclerView from 'react-native-recycler-view';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f05123',
    accent: '#f05123',
  },
};
export default function App() {
  return (
    <View style={styles.container}>
      {/* <AuthProvider>
        <PaperProvider theme={theme}>
          <MainNavigator />
        </PaperProvider>
      </AuthProvider> */}
      <RecyclerView style={{height: 300}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
