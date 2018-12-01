import * as React from "react";
import { AppLoading, Font, Asset } from "expo";

/* from app */
import Navigation from "app/src";
import fonts from "app/src/fonts";
import images from "app/src/images";

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
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));

    /* font */
    Font.loadAsync(fonts);
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
