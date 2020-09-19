import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FabButton = ({clickEvent, iconName, iconSize}) => {
  return (
    <View style={styles.button}>
      <Icon
        name={iconName}
        size={iconSize}
        backgroundColor="#3b5998"
        color="#ffffff"
        onPress={clickEvent}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 1000,
    backgroundColor: '#f05123',
    padding: 6,
    marginLeft: 8,
    width: 'auto',
    elevation: 5,
  },
});
export default FabButton;
