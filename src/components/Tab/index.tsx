import React, { FC } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* from app */
import styles from './styles';

type Color = {
  color: string;
};

export const HomeTabIcon: FC<Color> = ({ color }) => (
  <Ionicons name="md-home" size={26} style={styles.icon} color={color} />
);
export const SearchTabIcon : FC<Color> = ({ color }) => (
  <Ionicons name="md-search" size={26} style={styles.icon} color={color} />
);
export const NotificationTabIcon: FC<Color> = ({ color }) => (
  <Ionicons name="md-heart" size={26} style={styles.icon} color={color} />
);
export const MeTabIcon: FC<Color> = ({ color }) => (
  <Ionicons name="md-person" size={26} style={styles.icon} color={color} />
);
export const TakeTabIcon: FC<Color> = ({ color }) => (
  <View style={styles.takeTab}>
    <View style={[styles.takeTabRounded, { borderColor: color }]}>
      <Ionicons
        name="md-add"
        size={18}
        style={styles.takeTabIcon}
        color={color}
      />
    </View>
  </View>
);
