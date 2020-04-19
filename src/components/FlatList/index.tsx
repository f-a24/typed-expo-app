import React, { FC, useState } from 'react';
import { FlatList as RNFlatList, ViewToken } from 'react-native';

const FlatList: FC<{
  extraData: {};
  renderItem: (param?: any) => JSX.Element;
  data: any;
}> = props => {
  const { renderItem, extraData } = props;
  const [viewableItemIndices, setViewableItemIndices] = useState<ViewToken[]>([]);
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length) {
      setViewableItemIndices(viewableItems);
    }
  };

  return (
    <RNFlatList
      {...props}
      data={props.data}
      renderItem={item => renderItem({ ...item, viewableItemIndices })}
      extraData={Object.assign({}, extraData, viewableItemIndices)}
      viewabilityConfig={{
        minimumViewTime: 1,
        viewAreaCoveragePercentThreshold: 0
      }}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

export default FlatList;
