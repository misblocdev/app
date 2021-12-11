import React, {Component} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export class ConfirmModal extends Component {
  render() {
    const {
      visible,
      hide,
      onConfirm,
      title,
      contents,
      confirm,
      cancle,
      ...props
    } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={hide}>
        <TouchableWithoutFeedback onPress={hide}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View style={styles.contents_box}>
                  <View style={styles.title}>
                    <Text style={styles.title_text}>{title}</Text>
                  </View>
                  <View style={styles.contents}>
                    <Text style={styles.contents_text}>{contents}</Text>
                  </View>
                </View>

                <View style={styles.button_row}>
                  <TouchableOpacity style={styles.button} onPress={hide}>
                    <Text style={styles.cancel_button_text}>{cancle}</Text>
                  </TouchableOpacity>
                  <View style={styles.border_between_button} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      hide();
                      onConfirm();
                    }}>
                    <Text style={styles.confirm_button_text}>{confirm}</Text>
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
  contents_box: {
    paddingHorizontal: width * 0.061,
    paddingVertical: 26,
  },
  title: {width: '100%', alignItems: 'center', justifyContent: 'center'},
  title_text: {
    fontFamily: 'NotoSansCJKkr-Medium',
    marginLeft: 4,
    fontSize: 16,
    color: '#333333',
    lineHeight: 19,
  },
  contents: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  contents_text: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    color: 'rgb(153,153,153)',
    lineHeight: 19,
    textAlign: 'center',
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
  confirm_button_text: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    color: 'rgb(62,170,255)',
    lineHeight: 19,
  },
});
