import React, { FC } from 'react';
import { Text, TextStyle, ViewStyle, ImageStyle } from 'react-native';

const StyledText: FC<{style: TextStyle | ViewStyle | ImageStyle}> = props =>
<Text
{...props}
style={[props.style, { fontFamily: 'space-mono' }]}
/>;

export default StyledText;
