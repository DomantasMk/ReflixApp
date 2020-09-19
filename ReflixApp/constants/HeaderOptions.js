import * as React from 'react';
import FabButton from '../components/FabButton';

export default navOptions = (navigation) => {
  return {
    title: '',
    headerTitleStyle: {color: '#fff'},
    headerTintColor: '#fff',
    headerTransparent: true,
    headerLeft: () => (
      <FabButton
        clickEvent={() => navigation.goBack()}
        iconName="keyboard-arrow-left"
        iconSize={40}
      />
    ),
  };
};
