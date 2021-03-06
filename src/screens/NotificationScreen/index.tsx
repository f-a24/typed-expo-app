import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Notifications, Video } from 'expo';

/* node_modules */
import { Image } from 'react-native-expo-image-cache';

/* from app */
import Avatar from 'app/src/components/Avatar';
import FlatList from 'app/src/components/FlatList';
import Text from 'app/src/components/Text';
import GA from 'app/src/analytics';
import I18n from 'app/src/i18n';
import styles from './styles';

type Props = {
  navigation: any;
};

type State = {
  notifications: any[];
  cursor: null;
  fetching: boolean;
  loading: boolean;
};

export default class NotificationScreen extends React.Component<Props, State> {
  static navigationOptions = () => ({
    headerTitle: I18n.t('Notification.title')
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      notifications: [],
      cursor: null,
      fetching: false,
      loading: false
    };

    GA.ScreenHit('Notification');
  }

  onUserPress = (item: any) => {
    const { navigation } = this.props;
    navigation.push('User', { uid: item.from.uid });
  };

  onFilePress = (item: any) => {
    const { navigation } = this.props;
    navigation.push('Post', { pid: item.post.pid });
  };

  render() {
    const { notifications, fetching, loading } = this.state;

    if (notifications.length === 0) {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={[styles.container, styles.empty]}
        >
          <Text font="noto-sans-bold" style={styles.emptyText}>
            {I18n.t('Notification.noNotifications')}
          </Text>
        </ScrollView>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item: any) => item.key}
          renderItem={({ item }: { item: any }) => (
            <TouchableHighlight
              style={styles.rowContainer}
              underlayColor="rgba(0,0,0,0.1)"
              onPress={() => this.onFilePress(item)}
            >
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.avatar}
                  onPress={() => this.onUserPress(item)}
                >
                  <Avatar uri={item.from.img} />
                </TouchableOpacity>
                <Text style={styles.message}>
                  {item.from.name}
                  {I18n.t('Notification.message')}
                </Text>
                <TouchableOpacity onPress={() => this.onFilePress(item)}>
                  {item.post.type === 'photo' && (
                    <Image
                      uri={item.post.fileUri}
                      style={styles.file}
                      resizeMode="cover"
                    />
                  )}
                  {item.post.type === 'movie' && (
                    <Video
                      source={{ uri: item.post.fileUri }}
                      resizeMode="cover"
                      shouldPlay
                      isLooping
                      style={styles.file}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
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
