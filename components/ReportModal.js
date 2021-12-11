import React, {Component} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';

const {width} = Dimensions.get('window');
const data = [
  {id: 0, sName: '영리목적 / 홍보성'},
  {id: 1, sName: '음란성 / 선정성'},
  {id: 2, sName: '욕설 / 인신공격'},
  {id: 3, sName: '개인정보 노출'},
  {id: 4, sName: '도배성 게시글'},
  {id: 5, sName: '기타'},
];

export class ReportModal extends Component {
  state = {
    checked: 0,
    contents: '',
  };

  init = () => {
    this.setState({checked: 0, contents: ''});
  };

  render() {
    const {visible, hide, onReport, ...props} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={hide}>
        <TouchableWithoutFeedback
          onPress={() => {
            hide();
            this.init();
          }}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.container}>
                <View style={{padding: width * 0.052}}>
                  <View style={styles.row}>
                    <Image
                      source={require('../icons/Review/report.png')}
                      style={{width: 15, height: 20, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontFamily: 'NotoSansCJKkr-Medium',
                        fontSize: 16,
                        color: '#333333',
                        lineHeight: 19,
                        fontWeight: '600',
                      }}>
                      신고하기
                    </Text>
                  </View>
                  <View style={{marginTop: 15}}>
                    <Text
                      style={{
                        fontFamily: 'NotoSansCJKkr-Regular',
                        fontSize: 15,
                        color: '#666666',
                        lineHeight: 19,
                      }}>
                      신고사유를 선택해 주세요.
                    </Text>
                  </View>
                  {data.map((item, index) =>
                    !(index % 2) ? (
                      <View style={styles.row}>
                        <TouchableOpacity
                          style={styles.check_row}
                          onPress={() => this.setState({checked: index})}>
                          <View style={styles.checkbox}>
                            {this.state.checked === index && (
                              <Image
                                source={require('../icons/Review/check.png')}
                                style={{
                                  marginLeft: -1,
                                  width: 14,
                                  height: 11,
                                  resizeMode: 'contain',
                                }}
                              />
                            )}
                          </View>
                          <Text
                            style={styles.check_item_text}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.sName}
                          </Text>
                        </TouchableOpacity>
                        {data[index + 1] && (
                          <TouchableOpacity
                            style={styles.check_row}
                            onPress={() => this.setState({checked: index + 1})}>
                            <View style={styles.checkbox}>
                              {this.state.checked === index + 1 && (
                                <Image
                                  source={require('../icons/Review/check.png')}
                                  style={{
                                    marginLeft: -1,
                                    width: 14,
                                    height: 11,
                                    resizeMode: 'contain',
                                  }}
                                />
                              )}
                            </View>
                            <Text
                              style={styles.check_item_text}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {data[index + 1].sName}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null,
                  )}
                  <TextInput
                    style={{
                      width: '100%',
                      height: 91,
                      borderWidth: 1,
                      borderColor: '#cccccc',
                      padding: 9,
                      marginTop: 13,
                      paddingTop: 10,
                      textAlignVertical: 'top',
                    }}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    autoCorrect={false}
                    multiline={true}
                    placeholder="신고내용을 입력하세요."
                    value={this.state.contents}
                    onChangeText={_ => this.setState({contents: _})}
                  />
                </View>

                <View style={styles.button_row}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      hide();
                      this.init();
                    }}>
                    <Text style={styles.cancel_button_text}>취소</Text>
                  </TouchableOpacity>
                  <View style={styles.border_between_button} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      onReport(
                        data[this.state.checked].id,
                        this.state.contents,
                      );
                      hide();
                      this.init();
                    }}>
                    <Text style={styles.report_button_text}>신고하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: width * 0.827,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  check_row: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    paddingTop: 10,
    overflow: 'hidden',
  },
  checkbox: {
    width: 12,
    height: 12,
    borderColor: '#cccccc',
    borderRadius: 2,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  check_item_text: {
    flex: 1,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 17,
  },
  button_row: {
    flexDirection: 'row',
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
  },
  button: {
    width: width * 0.4135,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border_between_button: {
    width: 1,
    backgroundColor: '#cccccc',
  },
  cancel_button_text: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    color: '#333333',
    lineHeight: 19,
  },
  report_button_text: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    color: '#ff5858',
    lineHeight: 19,
  },
});
