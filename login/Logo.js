import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import logoImg from '../images/login_logo.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  image: {
    width: 139,
    height: 132,
    resizeMode: 'contain',
  },
});
