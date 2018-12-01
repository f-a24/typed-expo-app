import * as React from 'react';
import { Text, TextStyle, ViewStyle, ImageStyle } from 'react-native';

interface Props {
  style: TextStyle | ViewStyle | ImageStyle;
}

export class MonoText extends React.Component<Props> {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    );
  }
}
