import * as React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Share,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';

/* from app */
import FlatList from 'app/src/components/FlatList';
import Item from 'app/src/components/Item';
import Text from 'app/src/components/Text';
import GA from 'app/src/analytics';
import i18n from 'app/src/i18n';
import styles from './styles';

type Props = {
  navigation: any;
};

type State = {
  posts: any[];
  fetching: boolean;
  loading: boolean;
};

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = () => ({
    headerTitle: i18n.t('Home.title')
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      fetching: false,
      loading: false
    };

    GA.ScreenHit('Home');
  }

  onUserPress = (item: any) => {
    const { navigation } = this.props;
    navigation.push('user', { uid: item.user.uid });
  };

  onMorePress = (item: any) => {
    Share.share({
      message: item.fileUrl
    });
  };

  onLinkPress = (url: string, txt: string[]) => {
    const { navigation } = this.props;
    switch (txt[0]) {
      case '#':
        navigation.push('Tag', { tag: txt });
        break;
      default:
        WebBrowser.openBrowserAsync(url);
        break;
    }
  };

  render() {
    const { posts, fetching, loading } = this.state;
    if (posts.length === 0) {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={[styles.container, styles.empty]}
        >
          <Text font="noto-sans-bold" style={styles.emptyText}>
            {i18n.t('Home.noPosts')}
          </Text>
        </ScrollView>
      );
    }
    return (
      <View style={styles.container} testID="Home">
        <FlatList
          data={posts}
          keyExtractor={item => item.key}
          renderItem={({ item, index, viewableItemIndices }) => (
            <Item
              {...item}
              visible={viewableItemIndices.indexOf(index) > -1}
              onUserPress={this.onUserPress}
              onMorePress={this.onMorePress}
              onLikePress={() => {}}
              onLinkPress={this.onLinkPress}
            />
          )}
          ListFooterComponent={() =>
            loading ? (
              <View style={styles.loading}>
                <ActivityIndicator size="small" />
              </View>
            ) : null
          }
        />
      </View>
    );
  }
}
