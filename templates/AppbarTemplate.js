import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { Appbar } from '../components/Appbar';

export default class AppbarTemplate extends Component {

  render() {

    const { navigation, title } = this.props;
    return (
      <SafeAreaView style={styles.background}>
        <Appbar
          onBackAction={() => {
            // navigation.goBack(null);
            navigation.goBack(null);
          }}
          title={title}
        />
        {this.props.children}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
});
