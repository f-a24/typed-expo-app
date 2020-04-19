import React, { FC } from 'react';
import Constants from 'expo-constants';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* from */
import HomeScreen from 'app/src/screens/HomeScreen';
import SearchScreen from 'app/src/screens/SearchScreen';
import NotificationScreen from 'app/src/screens/NotificationScreen';
import UserScreen from 'app/src/screens/UserScreen';
import {
  HomeTabIcon,
  SearchTabIcon,
  TakeTabIcon,
  NotificationTabIcon,
  MeTabIcon
} from 'app/src/components/Tab';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const TabStack = ({title, screen}: {title: string, screen: React.ComponentType}) =>
// <Stack.Screen name={title} component={screen} />;

//     tabBarComponent: TabBar,
//     tabBarPosition: 'bottom',
//     animationEnabled: false,
//     swipeEnabled: false

const MainTabNavigator:FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#333',
      inactiveTintColor: '#bbb',
      style: {
        backgroundColor: Constants.manifest.extra.backgroundColor
      },
    }}
    >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{tabBarIcon: HomeTabIcon}} />
    <Tab.Screen name="SearchTab" component={SearchScreen} options={{tabBarIcon: SearchTabIcon}} />
    <Tab.Screen name="TakeTab" component={() => null} options={{tabBarIcon: TakeTabIcon}} />
    {/* 
    tabBarOnPress: () => {
      navigation.push('TakeModal');
    }
     */}
    <Tab.Screen name="NotificationTab" component={NotificationScreen} options={{tabBarIcon: NotificationTabIcon}} />
    <Tab.Screen name="MeTab" component={UserScreen} options={{tabBarIcon: MeTabIcon}} />
  </Tab.Navigator>
);

export default MainTabNavigator;
