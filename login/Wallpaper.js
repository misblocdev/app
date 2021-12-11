import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class Wallpaper extends Component {
  render() {
    return <View style={styles.background}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
