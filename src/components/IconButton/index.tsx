import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

/* from app */
import styles from './styles';

const IconButton: FC<{
  name: string,
  size: number,
  color?: {color: string},
  style: {[key: string]: number|string},
  onPress: () => void
}>
= ({
  name = 'ios-arrow-back',
  size = 32,
  color = Constants.manifest.extra.textColor,
  style = null,
  onPress = () => {}
  }) => (
<TouchableOpacity style={[styles.button, style]} onPress={onPress}>
<Ionicons name={name} size={size} color={color} />
</TouchableOpacity>
);

export default IconButton;
