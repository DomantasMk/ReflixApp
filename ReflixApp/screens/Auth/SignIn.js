import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button, Title, Surface} from 'react-native-paper';
import layout from '../../constants/Layout';
import auth from '@react-native-firebase/auth';

export default function SignInScreen({route, navigation}) {
  const [loginData, setLoginData] = React.useState({
    Email: '',
    Password: '',
  });

  const handleChange = (text, name) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    auth()
      .signInWithEmailAndPassword(loginData.Email, loginData.Password)
      .then((res) => {
        navigation.pop();
      })
      .catch((err) => alert(err.message));
  };
  return (
    <View style={styles.container}>
      <Surface style={styles.signInContainer}>
        <Title style={styles.title}>Sign in</Title>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Email"
          name="Email"
          value={loginData.Email}
          onChangeText={(text) => handleChange(text, 'Email')}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Password"
          name="Password"
          secureTextEntry
          value={loginData.Password}
          onChangeText={(text) => handleChange(text, 'Password')}
        />

        <Button
          dark
          mode="contained"
          style={styles.button}
          onPress={handleSubmit}>
          Submit
        </Button>
        <TouchableOpacity
          onPress={() => {
            navigation.push('SignUp');
          }}>
          <Text style={styles.clickableText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  signInContainer: {
    width: (layout.window.width * 80) / 100,
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 10,
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
  clickableText: {
    textDecorationStyle: 'solid',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});
