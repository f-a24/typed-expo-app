import * as React from 'react';
import { View } from 'react-native';
import { TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

/* from app */
import styles from './styles';

type Color = {
  tintColor: string;
};

export const HomeTabIcon = ({ tintColor }: Color) => (
  <Ionicons name="md-home" size={26} style={styles.icon} color={tintColor} />
);
export const SearchTabIcon = ({ tintColor }: Color) => (
  <Ionicons name="md-search" size={26} style={styles.icon} color={tintColor} />
);
export const NotificationTabIcon = ({ tintColor }: Color) => (
  <Ionicons name="md-heart" size={26} style={styles.icon} color={tintColor} />
);
export const MeTabIcon = ({ tintColor }: Color) => (
  <Ionicons name="md-person" size={26} style={styles.icon} color={tintColor} />
);
export const TakeTabIcon = ({ tintColor }: Color) => (
  <View style={styles.takeTab}>
    <View style={[styles.takeTabRounded, { borderColor: tintColor }]}>
      <Ionicons
        name="md-add"
        size={18}
        style={styles.takeTabIcon}
        color={tintColor}
      />
    </View>
  </View>
);

export const TabBar = TabBarBottom;
