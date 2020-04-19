import React, { FC } from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import Constants from 'expo-constants';

const Text: FC<{
  font?: string,
  style?: TextStyle
}> = props => {
  const { font, style } = props;
  const textStyle = {
    fontFamily: font || 'noto-sans-regular',
    color: Constants.manifest.extra.textColor
  };
  return <RNText {...props} style={[textStyle, style]} />
};

export default Text;
