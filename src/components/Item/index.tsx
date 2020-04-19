import React, { FC, useState } from 'react';
import { View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Constants from 'expo-constants';
import { Video } from 'expo-av';

/* node_modules */
import { Image } from 'react-native-expo-image-cache';
import Hyperlink from 'react-native-hyperlink';
import LinkifyIt from 'linkify-it';

/* from app */
import Avatar from 'app/src/components/Avatar';
import IconButton from 'app/src/components/IconButton';
import Text from 'app/src/components/Text';
import styles from './styles.js';

const linkify = new LinkifyIt();
linkify.add('#', {
  validate: (text, pos) => {
    const tail = text.slice(pos);

    if (!linkify.re.hashtag) {
      linkify.re.hashtag = new RegExp(
        /^[#]{0,2}?(w*[一-龠_ぁ-ん_ァ-ヴーａ-ｚＡ-Ｚa-zA-Z0-9]+|[a-zA-Z0-9_]+|[a-zA-Z0-9_]w*)/gi
      );
    }

    if (linkify.re.hashtag.test(tail) && tail.match(linkify.re.hashtag)) {
      return tail.match(linkify.re.hashtag)![0].trim().length;
    }

    return 0;
  },
  normalize: match => {
    match.index += match.url.lastIndexOf('#');
    match.url = match.url.replace(/^#{0,}/, '#');
  }
});

type ItemProps = {
  pid: string,
  uid: string,
  type: string,
  text: string,
  fileUri: string,
  liked: boolean,
  user: {
    uid: string,
    img: string,
    name: string
  },
  timestamp: string,
  visible: boolean,
  onUserPress: (arg: { uid: string, user:{
    uid: string,
    img: string,
    name: string
  } }) => void,
  onMorePress: (arg: { fileUri: string }) => void,
  onLikePress: (arg: { pid: string, user:{
    uid: string,
    img: string,
    name: string
  } }) => void,
  onLinkPress: (url: string, text: string) => void
}

const Item: FC<ItemProps> = ({
  pid,
  uid,
  type = 'photo',
  text = '',
  fileUri,
  liked,
  user,
  timestamp,
  visible = true,
  onUserPress,
  onMorePress,
  onLikePress,
  onLinkPress
}) => {
  const [height, setHeight] = useState(0);

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { height } = nativeEvent.layout;
    setHeight(height);
  };

  const getRelativeTime = (timestamp: string) => {
    const created = new Date(timestamp);
    const diff = Math.floor((new Date().getTime() - created.getTime()) / 1000);

    if (diff < 60) {
      return `${diff}s`;
    }
    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m`;
    }
    if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h`;
    }

    return `${created.getFullYear()}/${`00${created.getMonth() + 1}`.slice(
      -2
    )}/${`00${created.getDate()}`.slice(-2)}`;
  };

  
  if (!visible && height > 0) {
    return <View style={{ height }} />;
  }

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.header}>
        <View style={styles.headerUser}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => onUserPress({ uid, user})}
          >
            <Avatar uri={user.img} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onUserPress( {uid, user})}>
            <Text font="noto-sans-medium">{user.name}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <IconButton
            name="ios-more"
            size={26}
            style={styles.icon}
            onPress={() => onMorePress({fileUri})}
          />
        </View>
      </View>
      {type === 'photo' && <Image uri={fileUri} style={styles.file} />}
      {type === 'movie' && (
        <Video
          source={{ uri: fileUri }}
          resizeMode="cover"
          useNativeControls
          style={styles.file}
        />
      )}
      <View style={styles.buttons}>
        <IconButton
          name={liked ? 'ios-heart' : 'ios-heart-outline'}
          size={26}
          style={styles.icon}
          color={liked ? '#ed4956' : Constants.manifest.extra!.textColor}
          onPress={() => onLikePress({pid, user})}
        />
      </View>
      {text !== '' && (
        <Hyperlink
          onPress={onLinkPress}
          linkify={linkify}
          linkStyle={{ color: '#2980b9' }}
        >
          <Text style={styles.text}>{text}</Text>
        </Hyperlink>
      )}
      <Text style={styles.time}>{getRelativeTime(timestamp)}</Text>
    </View>
  );
};

export default Item;
