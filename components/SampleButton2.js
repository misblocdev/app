import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

class SampleButton2 extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.squareButton}
        onPress={() => this.props.onHandlePress()}>
        <Image
          style={[
            styles.buttonImage,
            this.props.selected
              ? { tintColor: 'rgb(10,201,199)' }
              : { tintColor: '#333333' },
          ]}
          source={this.props.source}
        />
        <Text
          style={[
            styles.buttonText,
            this.props.selected
              ? { color: 'rgb(10,201,199)' }
              : { color: '#333333' },
          ]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

SampleButton2.defaultProps = {
  text: 'Button',
  source: require('../icons/search/1.png'),
};

export default SampleButton2;
const styles = StyleSheet.create({
  squareButton: {
    borderWidth: 1,
    padding: 3,
    width: '33%',
    borderColor: 'white',
    marginBottom: height * 0.01,
  },
  // squareButtonSelected: {
  //     borderWidth: 1,
  //     padding: 5,
  //     width: 120,
  //     borderColor: "white",
  // },
  buttonText: {
    marginTop: height * 0.01,
    fontSize: 14,
    alignSelf: 'center',
    lineHeight: 18,
    fontFamily: "NotoSansCJKkr-Regular",
  },
  buttonImage: {
    alignSelf: 'center',
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
