import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

const scW = Math.round(Dimensions.get('window').width);
const scH = Math.round(Dimensions.get('window').height);
import SnsFacebook from '../images/sns_facebook.png';
import SnsKakao from '../images/sns_kakao.png';
import SnsNaver from '../images/sns_naver.png';

export default class SignupSection extends Component {
  constructor() {
    super();
    this.state = {
      screenWidth: scW,
      screenHeight: scH,
    };
  }

  btnSns(btnSeq) {
    let SnsTxt = '페이스북 로그인은 준비중입니다. \n 추후 이용하세요.';
    switch (btnSeq) {
      case 1:
        SnsTxt = '페이스북 로그인은 준비중입니다. \n 추후 이용하세요.';
        break;
      case 2:
        SnsTxt = '카카오톡 로그인은 준비중입니다. \n 추후 이용하세요.';
        break;
      case 3:
        SnsTxt = '네이버 로그인은 준비중입니다. \n 추후 이용하세요.';
        break;
    }
    Alert.alert('SNS 로그인 알림', SnsTxt);
    console.log('btn Seq :' + btnSeq);
  }

  render() {
    return (
      <View style={(styles.container, {width: this.state.screenWidth - 92})}>
        <View style={styles.SnsButtons}>
          <TouchableOpacity onPress={() => this.btnSns(1)}>
            <Image source={SnsFacebook} style={styles.image1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.btnSns(2)}>
            <Image source={SnsKakao} style={styles.image2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.btnSns(3)}>
            <Image source={SnsNaver} style={styles.image3} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SnsButtons: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
  },
  image1: {
    width: 67,
    height: 85,
    margin: 30,
  },
  image2: {
    width: 66,
    height: 85,
    margin: 30,
  },
  image3: {
    width: 50,
    height: 85,
    margin: 30,
  },
});
