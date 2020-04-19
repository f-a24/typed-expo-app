import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, Platform, View } from 'react-native';

import store from 'app/src/store';
import AppWithNavigationState from 'app/src/navigation/RootNavigation';

const Navigation: FC = () => (
  <View style={{ flex: 1 }}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  </View>
);

export default Navigation;
