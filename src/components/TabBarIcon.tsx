import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';

const TabBarIcon: FC<{
  name: string;
  focused: boolean;  
}> = ({ name, focused}) => (
  <Ionicons
    name={name}
    size={26}
    style={{ marginBottom: -3 }}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />  
);

export default TabBarIcon;
