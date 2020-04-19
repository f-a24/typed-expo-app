import React, { FC } from 'react';
import { View, ImageStyle } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import styles from './styles';

const Avatar: FC<{
  uri?: string;
  style?: ImageStyle,
  size?: number;
}> = ({
  uri,
  style,
  size = 36
}) => {
  const avatarStyle = [
    styles.image,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#eee'
    },
    style
  ];

    return !uri ? <View style={avatarStyle} /> : <Image uri={uri} style={avatarStyle} />;
};


export default Avatar;