import React from 'react';
import { NavigationActions } from '@react-navigation/compat';
import { createStackNavigator } from '@react-navigation/stack';

/* screen */
import MainTabNavigator from 'app/src/navigation/MainTabNavigator';
import UserScreen from 'app/src/screens/UserScreen';
import TagScreen from 'app/src/screens/TagScreen';
import PostScreen from 'app/src/screens/PostScreen';
import TakeScreen from 'app/src/screens/TakeScreen';
import TakePublishScreen from 'app/src/screens/TakePublishScreen';

/* from app */
import IconButton from 'app/src/components/IconButton';

const Stack = createStackNavigator();

const TakeStack = () => (
<Stack.Navigator headerMode="screen">
<Stack.Screen name="Take" component={TakeScreen} />
<Stack.Screen name="TakePublish" component={TakePublishScreen} />
  </Stack.Navigator>
);

const CardNavigator = () => (
<Stack.Navigator  screenOptions={{
        headerTitleStyle: {
          color: '#333'
        },
        headerLeft: IconButton
}}>
<Stack.Screen name="Main" component={MainTabNavigator} options={{ header: () => null }} />
<Stack.Screen name="User" component={UserScreen} />
<Stack.Screen name="Tag" component={TagScreen} />
<Stack.Screen name="Post" component={PostScreen} />
</Stack.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator
  mode="modal"
  headerMode="none"
  screenOptions={{
    headerTitleStyle: {
      color: '#333'
    }
  }}>
  <Stack.Screen name="MainStack" component={CardNavigator}  options={{ header: () => null }}/>
  <Stack.Screen name="TakeModal" component={TakeStack} />
    </Stack.Navigator>
  );

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;
  if (
    state &&
    type === NavigationActions.navigate &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) {
    return null;
  }
  return getStateForAction(action, state);
};

export const getActiveRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
};

AppNavigator.router.getStateForAction = navigateOnce(
  AppNavigator.router.getStateForAction
);

export default AppNavigator;
