import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.manifest.extra!.backgroundColor
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18
  }
});
