/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Platform, SafeAreaView, StatusBar, Keyboard} from 'react-native';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import Device from '../utils/Device';

export class BackgroundView extends Component {
  state = {
    screenHeight: Device.getScreenHeight(),
  };

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListener = Keyboard.addListener(
        'keyboardWillShow',
        this._keyboardWillShow,
      );
      this.keyboardWillHideListener = Keyboard.addListener(
        'keyboardWillHide',
        this._keyboardWillHide,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      Keyboard.removeListener('keyboardWillShow', this._keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', this._keyboardWillHide);
    }
  }

  _keyboardWillShow = e => {
    const BottomSpace = isIphoneX() ? getBottomSpace() : 0;
    this.setState({
      screenHeight:
        Device.getScreenHeight() - e.endCoordinates.height + BottomSpace,
    });
  };

  _keyboardWillHide = () => {
    this.setState({
      screenHeight: Device.getScreenHeight(),
    });
  };

  render() {
    const {dark, style, children, ...props} = this.props;

    return (
      <React.Fragment>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <SafeAreaView
          style={
            Platform.OS === 'ios'
              ? {
                  height: this.state.screenHeight,
                  backgroundColor: '#ffffff',
                  ...style,
                }
              : {
                  flex: 1,
                  backgroundColor: '#ffffff',
                  ...style,
                }
          }
          {...props}>
          {children}
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
