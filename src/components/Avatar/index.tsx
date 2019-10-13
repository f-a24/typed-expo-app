import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import styles from './styles';

export default ({
  uri,
  style,
  size = 36
}: {
  uri?: string;
  style?: {
    marginVertical: number;
  };
  size?: number;
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

  if (!uri) {
    return <View style={avatarStyle} />;
  }
  return <Image uri={uri} style={avatarStyle} />;
};
