import React from 'react';
import { View, TouchableHighlight, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';

/* from app */
import FlatList from 'app/src/components/FlatList';
import Text from 'app/src/components/Text';
import GA from 'app/src/analytics';
import I18n from 'app/src/i18n';
import styles from './styles';

type Props = {
  navigation: any;
};

type State = {
  keyword: string | undefined;
  tags: any[];
  searching: boolean;
};

export default class SearchScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  private interval: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      keyword: undefined,
      tags: [],
      searching: false
    };

    this.interval = 0;

    GA.ScreenHit('Home');
  }

  onChangeText = (text: string) => {
    clearTimeout(this.interval);
    this.setState({ keyword: text.replace(/^#/, ''), searching: true });
  };

  onRowPress = (item: any) => {
    const { navigation } = this.props;
    navigation.push('Tag', { tag: `${item.name}` });
  };

  render() {
    const { keyword, tags, searching } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <FlatList
            data={tags}
            keyExtractor={(item: any) => item.key}
            ListHeaderComponent={
              <View style={styles.header}>
  <TextInput
                  style={styles.search}
                  value={keyword}
                  placeholder={I18n.t('Search.placeholder')}
                  underlineColorAndroid="transparent"
                  onChangeText={this.onChangeText}
                  clearButtonMode="while-editing"
                />
</View>
            }
            renderItem={({ item }: { item: any }) => {
              if (searching) {
                return null;
              }
              return (
                <TouchableHighlight
                  underlayColor="rgba(0,0,0,0.1)"
                  style={styles.row}
                  onPress={() => this.onRowPress(item)}
                >
                  <Text font="noto-sans-medium" style={styles.rowText}>
                    #
{item.name}
                  </Text>
                </TouchableHighlight>
              );
            }}
            ListFooterComponent={() =>
              searching && keyword ? (
                <Text font="noto-sans-medium" style={styles.searching}>
                  #
{keyword}
                  {I18n.t('Search.searching')}
                </Text>
              ) : null
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
