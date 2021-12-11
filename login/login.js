import React, { Component } from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import { Alert } from 'react-native';
import {
  login,
  getAuthStore,
  getUserInfo,
  getRefreshToken,
} from '../utils/JWTAuth.js';
import { ACCOUNT_LOGIN } from '../actions/loginActions';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'testsv@ruu.kr',
      password: 'asdf123!',
      isLoginSend: false,
    };
    this._onHandlerCharge = this._onHandlerCharge.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onSignup = this._onSignup.bind(this);
    this._onFind1 = this._onFind1.bind(this);
    this._onFind2 = this._onFind2.bind(this);
  }

  _onHandlerCharge(name, value) {
    switch (name) {
      case 1:
        this.setState({ email: value });
        break;
      case 2:
        this.setState({ password: value });
        break;
    }
    //console.log('_onHandlerCharge :' + name + ',' + value);
  }

  async _onFind1() {
    this.props.navigation.navigate('FindEmailStep01');
  }

  async _onFind2() {
    this.props.navigation.navigate('FindPwdStep01');
  }

  async _onPress() {
    if (this.state.email === '') {
      Alert.alert('로그인', '아이디를 입력하세요');
      return;
    }

    if (this.state.password === '') {
      Alert.alert('로그인', '비밀번호를 입력하세요');
      return;
    }

    // this.state.email = 'a';
    // this.state.password = 'a';
    //this.props.navigation.navigate('Main');
    try {
      await this.doLogin();
    } catch (e) {
      console.log('log error :' + e);
    }
  }
  async doLogin() {
    let info = {
      Username: this.state.email,
      Password: this.state.password,
    };

    const oJson = await login(info);
    try {
      if (oJson === null || parseInt(oJson.code, 10) === 0) {
        Alert.alert('로그인 정보가 일치하지 않습니다.');
        return;
      } else {
        //let sToken = await getAuthStore('access_token');
        let sResult = await getUserInfo();
        console.log(sResult);
        if (typeof sResult.decUserID !== 'object') {
          this.props.accountLogin(sResult[0]);
          this.props.navigation.navigate('Main');
        } else {
          //console.log('sResult :' + JSON.stringify(sResult));
          //access_token 만료
          if (sResult.userId === -1) {
            if (!this.state.isLoginSend) {
              let bResult = await getRefreshToken();
              this.state.isLoginSend = true;
              if (bResult === true) {
                let sResult2 = await getUserInfo();
                if (sResult2.decUserID !== undefined) {
                  this.props.navigation.navigate('Main');
                } else {
                  Alert.alert(
                    '로그인 정보 조회 중 오류가 발생 했습니다. 잠시 후 이용하세요.'
                  );
                }
              }
            }
          } else {
            Alert.alert(
              '로그인 정보를 확인 중 오류가 발생 했습니다. 잠시 후 이용하세요.'
            );
          }
        }
      }
    } catch (e) {
      console.error('oJson :' + JSON.stringify(e.message));
      Alert.alert('로그인에 실패 했습니다. 잠시 후 이용하세요.');
      return;
    }
  }

  _onSignup(info) {
    this.props.navigation.navigate('SignupStep01');
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form
          _onHandlerCharge={this._onHandlerCharge}
          _onPress={this._onPress}
          _onFind1={this._onFind1}
          _onFind2={this._onFind2}
        />
        <ButtonSubmit _onPress={this._onPress} _onSignup={this._onSignup} />
        {/* <SignupSection /> */}
      </Wallpaper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogin: (value) => dispatch(ACCOUNT_LOGIN(value)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
