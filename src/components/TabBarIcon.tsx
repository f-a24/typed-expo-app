import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from 'app/constants/Colors';

interface Props {
  name: string;
  focused: boolean;
}

export default (props: Props) => (
  <Ionicons
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);
