import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  Title,
  Surface,
  Avatar,
} from 'react-native-paper';
import layout from '../../constants/Layout';
import auth from '@react-native-firebase/auth';
import authContext from '../../utils/authContext/authContext';

export default function ProfileScreen({route, navigation}) {
  const {currentUser} = React.useContext(authContext);
  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Avatar.Icon size={100} icon="account" style={styles.accountIcon} />
        <Title>
          {currentUser ? currentUser.email : 'Log in/Register to see your info'}
        </Title>
      </View>

      <Surface style={styles.signInContainer}>
        <Text></Text>
        {currentUser ? (
          <Button
            dark
            mode="contained"
            style={styles.button}
            onPress={handleLogOut}>
            LogOut
          </Button>
        ) : (
          <Button
            dark
            mode="contained"
            style={styles.button}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            Log In
          </Button>
        )}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  signInContainer: {
    backgroundColor: '#fff',
    width: layout.window.width,
    height: (layout.window.height * 60) / 100,
    marginTop: (layout.window.height * 40) / 100,
    alignSelf: 'center',
    elevation: 5,
    borderTopEndRadius: 10,
    padding: 30,
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    borderRadius: 10,
    marginVertical: 10,
  },
  userContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  accountIcon: {
    alignSelf: 'center',
  },
});
