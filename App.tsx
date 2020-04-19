import React from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { loadAsync } from 'expo-font';

/* from app */
import fonts from 'app/src/fonts';
import Navigation from 'app/src';

type Props = {
  skipLoadingScreen: boolean;
};

type State = {
  isLoadingComplete: boolean;
};

export default class App extends React.Component<Props, State> {
  static defaultProps = {
    skipLoadingScreen: false
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }

  loadResourcesAsync = async () => {
    /* asset */
    await Asset.loadAsync(require('app/assets/images/icon.png'));

    /* font */
    loadAsync(fonts);
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }
    return <Navigation />;
  }
}
