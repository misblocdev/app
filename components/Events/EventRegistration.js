import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Header, Left, Right, Container, Content} from 'native-base';
import {CheckBox} from 'react-native-elements';
import {getAuthStore, setEventApply} from '../../utils/AuthEvent';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
export default class EventRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_time: '',
      상시: false,
      오전: false,
      오후: false,
      radioButton: null,
      name: '',
      phoneNumber: '',
      checkAll: false,
      마케팅: false,
      이용약관: false,
      개인정보: false,
      warning: '',
    };
  }

  render() {
    const {eventId} = this.props.navigation.state.params;

    const goBack = () => this.props.navigation.goBack();

    const onRadioSelect = title => {
      if (title === '오전') {
        this.setState({
          ...this.state,
          radioButton: 1,
          오전: true,
          오후: false,
          상시: false,
        });
      } else if (title === '오후') {
        this.setState({
          ...this.state,
          radioButton: 2,
          오전: false,
          오후: true,
          상시: false,
        });
      } else if (title === '상시') {
        this.setState({
          ...this.state,
          radioButton: 0,
          오전: false,
          오후: false,
          상시: true,
        });
      } else {
        this.setState({
          ...this.state,
          radioButton: null,
          오전: false,
          오후: false,
          상시: false,
        });
      }
    };

    const handleName = text => {
      this.setState({name: text});
    };

    const handleNumber = text => {
      this.setState({phoneNumber: text});
    };

    const onCheckboxSelect = title => {
      // 이용약관 모두 동의
      if (title === '이용약관 모두 동의' && !this.state.checkAll) {
        this.setState({
          ...this.state,
          checkAll: true,
          마케팅: true,
          이용약관: true,
          개인정보: true,
        });
      } else if (title === '이용약관 모두 동의' && this.state.checkAll) {
        this.setState({
          ...this.state,
          checkAll: false,
          마케팅: false,
          이용약관: false,
          개인정보: false,
        });
      }
      // 이용약관 (필수)
      else if (title === '이용약관 (필수)' && !this.state.이용약관) {
        this.setState({...this.state, 이용약관: true});
      } else if (title === '이용약관 (필수)' && this.state.이용약관) {
        this.setState({...this.state, checkAll: false, 이용약관: false});
      }
      // 개인정보 수집/이용 (필수)
      else if (title === '개인정보 수집/이용 (필수)' && !this.state.개인정보) {
        this.setState({...this.state, 개인정보: true});
      } else if (title === '개인정보 수집/이용 (필수)' && this.state.개인정보) {
        this.setState({...this.state, checkAll: false, 개인정보: false});
      }
      // 마케팅 관련 수신 (선택)
      else if (title === '마케팅 관련 수신 (선택)' && !this.state.마케팅) {
        this.setState({...this.state, 마케팅: true});
      } else if (title === '마케팅 관련 수신 (선택)' && this.state.마케팅) {
        this.setState({...this.state, checkAll: false, 마케팅: false});
      }
    };

    const register = async () => {
      if (
        this.state.이용약관 &&
        this.state.개인정보 &&
        this.state.name !== '' &&
        this.state.phoneNumber !== '' &&
        this.state.radioButton !== null
      ) {
        let inParams = {
          userId: 0,
          EventId: eventId,
          userName: this.state.name,
          userPhone: this.state.phoneNumber,
          contactTime: this.state.radioButton,
          Agreement1: this.state.이용약관 ? 'y' : 'n',
          Agreement2: this.state.개인정보 ? 'y' : 'n',
          Agreement3: this.state.마케팅 ? 'y' : 'n',
        };

        try {
          let autoInfo = await getAuthStore('userinfo');
          if (autoInfo !== '') {
            const oJson = JSON.parse(autoInfo);
            inParams.userId = oJson[0].userId;
            console.log('inParams', inParams);
            let data = await setEventApply(inParams);
            console.log('data', data);
            if (data.code === 1) {
              console.log('success', data);
              this.props.navigation.navigate('EventRegistrationDone');
            }
          } else {
            //console.error(data);
            //There is no login information.
            return false;
          }
        } catch (err) {
          console.warn('error:', err.message);
        }
      } else {
        Alert.alert('알림', '필수 항목을 모두 체크해주세요!', [
          {
            text: '확인',
            style: 'cancel',
          },
        ]);
      }
    };
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Image
                source={require('../../icons/tabnavi/chevronLeft.png')}
                style={styles.goBack}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <KeyboardAvoidingView
              style={styles.avoidingView}
              behavior={Platform.OS === 'ios' ? 'height' : null}>
              <View style={styles.content}>
                <View style={styles.contentTitle}>
                  <Text style={styles.title}>이벤트접수</Text>
                </View>
                <View style={styles.nameView}>
                  <View style={styles.required}>
                    <Text style={styles.Label}>이름</Text>
                    <Text style={styles.redText}>*</Text>
                  </View>
                  <TextInput
                    style={styles.name}
                    placeholder="이름을 입력해주세요."
                    keyboardType={'default'}
                    onChangeText={handleName}
                    autoCorrect={false}
                    placeholderTextColor="#999999"
                    maxLength={12}
                  />
                </View>
                <View style={styles.FormView}>
                  <View style={styles.required}>
                    <Text style={styles.Label}>휴대폰 번호</Text>
                    <Text style={styles.redText}>*</Text>
                  </View>
                  <TextInput
                    style={styles.name}
                    placeholder="-없이 입력해주세요."
                    keyboardType={'phone-pad'}
                    onChangeText={handleNumber}
                    placeholderTextColor="#999999"
                    maxLength={20}
                  />
                </View>
                <View style={styles.FormView}>
                  <View style={styles.required}>
                    <Text style={styles.Label}>연락선호 시간</Text>
                    <Text style={styles.redText}>*</Text>
                  </View>
                  <View style={styles.RadioButtonView}>
                    <CheckBox
                      checked={this.state.상시}
                      title="상시"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      onPress={() => {
                        let title = '상시';
                        onRadioSelect(title);
                      }}
                      containerStyle={styles.radioButton}
                      textStyle={styles.radioText}
                      size={18}
                      checkedColor="#44adff"
                    />
                    <CheckBox
                      checked={this.state.오전}
                      title="오전"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      onPress={() => {
                        let title = '오전';
                        onRadioSelect(title);
                      }}
                      containerStyle={styles.radioButton}
                      textStyle={styles.radioText}
                      size={18}
                      checkedColor="#44adff"
                    />
                    <CheckBox
                      checked={this.state.오후}
                      title="오후"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      onPress={() => {
                        let title = '오후';
                        onRadioSelect(title);
                      }}
                      containerStyle={styles.radioButton}
                      textStyle={styles.radioText}
                      size={18}
                      checkedColor="#44adff"
                    />
                  </View>
                </View>
                <View style={styles.FormView}>
                  <Text style={styles.Label}>이용자 동의</Text>
                  <View style={styles.checkBoxView}>
                    <CheckBox
                      checked={this.state.checkAll}
                      title="이용약관 모두 동의"
                      checkedColor="#44adff"
                      containerStyle={styles.checkBox}
                      textStyle={styles.checkTextAll}
                      onIconPress={() => {
                        let title = '이용약관 모두 동의';
                        onCheckboxSelect(title);
                      }}
                    />
                    <View style={styles.required}>
                      <CheckBox
                        checked={this.state.이용약관}
                        title="이용약관 (필수)"
                        checkedColor="#44adff"
                        containerStyle={styles.checkBox이용약관}
                        textStyle={styles.checkText}
                        onIconPress={() => {
                          let title = '이용약관 (필수)';
                          onCheckboxSelect(title);
                        }}
                      />
                      <Text style={styles.redText필수}>*</Text>
                    </View>
                    <View style={styles.required}>
                      <CheckBox
                        checked={this.state.개인정보}
                        checkedColor="#44adff"
                        title="개인정보 수집/이용 (필수)"
                        containerStyle={styles.checkBox개인정보}
                        textStyle={styles.checkText}
                        onIconPress={() => {
                          let title = '개인정보 수집/이용 (필수)';
                          onCheckboxSelect(title);
                        }}
                      />
                      <Text style={styles.redText필수}>*</Text>
                    </View>
                    <CheckBox
                      checked={this.state.마케팅}
                      title="마케팅 관련 수신 (선택)"
                      checkedColor="#44adff"
                      containerStyle={styles.checkBox}
                      textStyle={styles.checkText}
                      onIconPress={() => {
                        let title = '마케팅 관련 수신 (선택)';
                        onCheckboxSelect(title);
                      }}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <View
            style={
              Platform.OS === 'ios' ? styles.buttonBottom : styles.buttonAndroid
            }>
            <TouchableOpacity style={styles.button} onPress={register}>
              <Text style={styles.buttonText}>신청하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    width: width,
  },
  header: {
    paddingRight: 16,
    paddingLeft: 11,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'white',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  goBack: {
    width: 22,
    height: 22,
  },
  content: {
    flexDirection: 'column',
    marginBottom: 50,
    flex: 1,
  },
  contentTitle: {
    paddingRight: 19,
    paddingLeft: 19,
    marginTop: 13,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameView: {
    paddingRight: 19,
    paddingLeft: 19,
    marginTop: 30,
  },
  Label: {
    fontSize: 14,
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    color: '#333333',
    height: 40,
    textAlignVertical: 'center',
    marginTop: 5,
  },
  FormView: {
    paddingRight: 19,
    paddingLeft: 19,
    marginTop: 30,
  },
  RadioButtonView: {
    flexDirection: 'row',
  },
  radioButton: {
    width: 70,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingBottom: 2,
    paddingLeft: 0,
    marginLeft: 0,
  },
  radioText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#666',
    fontWeight: '400',
  },
  checkBoxView: {
    marginTop: 9,
  },
  checkBox: {
    marginLeft: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  checkBox이용약관: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  checkBox개인정보: {
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  checkText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#666666',
    fontWeight: '500',
    marginLeft: 5,
  },
  checkTextAll: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  buttonBottom: {
    position: 'absolute',
    width: width,
    bottom: 0,
  },
  buttonAndroid: {
    position: 'absolute',
    width: width,
    flexDirection: 'column',
    bottom: 0,
  },
  button: {
    width: width,
    backgroundColor: '#44adff',
    justifyContent: 'center',
    height: 60,
  },
  buttonText: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  redText: {
    color: 'red',
    marginLeft: 4,
  },
  redText필수: {
    color: 'red',
    marginLeft: -5,
  },
  required: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avoidingView: {
    flex: 1,
  },
});
