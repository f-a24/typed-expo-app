import React from 'react';
import { FlatList as RNFlatList } from 'react-native';

type Props = {
  extraData: {};
  renderItem: (param?: any) => {};
  [props: string]: any;
};

type State = {
  viewableItemIndices: any[];
};

export default class FlatList extends React.Component<Props, State> {
  static defaultProps = {
    extraData: {},
    renderItem: () => {}
  };

  viewabilityConfig = {
    minimumViewTime: 1,
    viewAreaCoveragePercentThreshold: 0
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      viewableItemIndices: []
    };
  }

  onViewableItemsChanged = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length) {
      this.setState({
        viewableItemIndices: viewableItems.map(item => item.index)
      });
    }
  };

  render() {
    const { viewableItemIndices } = this.state;
    const { renderItem, extraData } = this.props;

    return (
      <RNFlatList
        {...this.props}
        data={this.props.data}
        renderItem={props => renderItem({ ...props, viewableItemIndices })}
        extraData={Object.assign({}, extraData, viewableItemIndices)}
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={this.onViewableItemsChanged}
      />
    );
  }
}
