import * as React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      size={30}
      style={{marginBottom: 0, width: 30}}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
