import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  View,
  Dimensions,
} from 'react-native';

const MARGIN = 40;
const scW = Math.round(Dimensions.get('window').width);
const scH = Math.round(Dimensions.get('window').height);

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: scW,
      screenHeight: scH,
    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
    this._onSignup = this._onSignup.bind(this);
  }

  _onPress() {
    this.props._onPress();
  }

  _onSignup() {
    this.props._onSignup();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      //outputRange: [this.state.screenWidth - MARGIN, MARGIN],
      outputRange: [this.state.screenWidth - 92, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            <Text style={styles.text}>로그인</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button2}
            onPress={this._onSignup}
            activeOpacity={1}>
            <Text style={styles.text}>회원가입</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 56,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0177c0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ac9c7',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    marginTop: 10,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
