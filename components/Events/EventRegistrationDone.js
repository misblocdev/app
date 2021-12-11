/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class EventRegistrationDone extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const goBack = () => this.props.navigation.goBack();

    const Done = () => this.props.navigation.navigate('MainTab');
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
          <View style={styles.doneView}>
            <Image source={require('../../assets/group63.png')} />
            <Text style={styles.TextBold}>이벤트접수가 완료되었습니다.</Text>
            <Text style={styles.Text}>
              빠른 시간내에 상담원이 연락 드리겠습니다.
            </Text>
          </View>
          <View
            style={
              Platform.OS === 'ios' ? styles.buttonBottom : styles.buttonAndroid
            }>
            <TouchableOpacity style={styles.button} onPress={Done}>
              <Text style={styles.buttonText}>확인</Text>
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
    height: height,
    flexDirection: 'column',
    flex: 1,
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
  doneView: {
    alignSelf: 'center',
    marginTop: 182,
  },
  TextBold: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Text: {
    marginTop: 1,
    fontSize: 14,
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
    height: 50,
  },
  buttonText: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
