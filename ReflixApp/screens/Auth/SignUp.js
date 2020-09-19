import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button, Title, Surface} from 'react-native-paper';
import layout from '../../constants/Layout';
import auth from '@react-native-firebase/auth';

export default function SignUpScreen({route, navigation}) {
  const [loginData, setLoginData] = React.useState({
    Email: '',
    Password: '',
    PasswordRepeat: '',
  });

  const handleChange = (text, name) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.Password == loginData.PasswordRepeat) {
      auth()
        .createUserWithEmailAndPassword(loginData.Email, loginData.Password)
        .then((res) => {
          navigation.pop();
        })
        .catch((err) => alert(err.message));
    } else {
      console.log("Passwords don't match");
    }
  };
  return (
    <View style={styles.container}>
      <Surface style={styles.signInContainer}>
        <Title style={styles.title}>Sign Up</Title>
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
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Repeat Password"
          name="Password"
          secureTextEntry
          value={loginData.PasswordRepeat}
          onChangeText={(text) => handleChange(text, 'PasswordRepeat')}
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
            navigation.push('SignIn');
          }}>
          <Text style={styles.clickableText}>
            Already have an account? Sign in
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
