import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Chip = ({label}) => {
  return <Text style={styles.button}>{label}</Text>;
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: '#f05123',
    padding: 10,
    color: '#ffffff',
    alignSelf: 'flex-start',
    elevation: 5,
    marginRight: 6,
  },
});
export default Chip;
