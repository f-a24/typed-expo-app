import { Constants } from 'expo';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

/* from */
import HomeScreen from 'app/src/screens/HomeScreen';
import SearchScreen from 'app/src/screens/SearchScreen';
import NotificationScreen from 'app/src/screens/NotificationScreen';
import UseScreen from 'app/src/screens/UseScreen';
import {
  HomeTabIcon,
  SearchTabIcon,
  TakeTabIcon,
  NotificationTabIcon,
  MeTabIcon,
  TabBar
} from 'app/src/components/Tab';

const createTabStack = (title: string, screen: JSX.Element) =>
  createStackNavigator({
    [title]: { screen }
  });

export default createBottomTabNavigator(
  {
    HomeTab: {
      screen: createTabStack('HomeTab', HomeScreen),
      navigationOptions: () => ({
        tabBarIcon: HomeTabIcon
      })
    },
    SearchTab: {
      screen: createTabStack('SearchTab', SearchScreen),
      navigationOptions: () => ({
        tabBarIcon: SearchTabIcon
      })
    },
    TakeTab: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: TakeTabIcon,
        tabBarOnPress: () => {
          navigation.push('TakeModal');
        }
      })
    },
    NotificationTab: {
      screen: createTabStack('NotificationTab', NotificationScreen),
      navigationOptions: () => ({
        tabBarIcon: NotificationTabIcon
      })
    },
    MeTab: {
      screen: createTabStack('MeTab', UseScreen),
      navigationOptions: () => ({
        tabBarIcon: MeTabIcon
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#333',
      inactiveTintColor: '#bbb',
      style: {
        backgroundColor: Constants.manifest.extra.backgroundColor
      }
    },
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);
