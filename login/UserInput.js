import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TextInput, Dimensions, Platform} from 'react-native';

const MARGIN = 120;
const scW = Math.round(Dimensions.get('window').width);
const scH = Math.round(Dimensions.get('window').height);

export default class UserInput extends Component {
  constructor() {
    super();
    this.state = {screenWidth: scW, screenHeight: scH};
  }

  render() {
    return (
      <View
        style={
          Platform.OS === 'ios' ? styles.inputWrapperIOS : styles.inputWrapper
        }>
        <TextInput
          style={(styles.input, {width: this.state.screenWidth - MARGIN})}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="#333333"
          underlineColorAndroid="rgba(0,0,0,0)"
          maxlength={30}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props._onPress}
          value={this.props.value}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    height: 38,
    fontSize: 12,
    //fontFamily: 'NotoSansCJKkr',
    color: '#333333',
  },
  inputWrapper: {
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingTop: 0,
    paddingLeft: 20,
    color: '#333',
  },
  inputWrapperIOS: {
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});
