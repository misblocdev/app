import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, Text} from 'react-native';

import UserInput from './UserInput';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
    this.onChange = this.handlerChange.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }
  handlerChange(mode, text) {
    //login.js 호출
    this.props._onHandlerCharge(mode, text);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          placeholder="아이디"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChange={text => this.handlerChange(1, text)}
          value={this.state.id}
          _onPress={this.props._onPress}
        />
        <UserInput
          secureTextEntry={this.state.showPass}
          placeholder="비밀번호"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChange={text => this.handlerChange(2, text)}
          _onPress={this.props._onPress}
        />

        <Text style={styles.text01} onPress={this.props._onFind1}>
          아이디 찾기
        </Text>
        <Text style={styles.text02} onPress={this.props._onFind2}>
          |&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 찾기
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text01: {
    color: '#333',
    fontSize: 12,
    marginLeft: 80,
    backgroundColor: 'transparent',
  },
  text02: {
    color: '#333',
    fontSize: 12,
    marginLeft: 240,
    marginTop: -15,
    backgroundColor: 'transparent',
  },
});
