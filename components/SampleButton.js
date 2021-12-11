import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';

const { width, height } = Dimensions.get('window');

class SampleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected() {
    const { selected } = this.state;
    const { onHandlePress, click } = this.props;

    if (click < 3) {
      this.setState({
        selected: !selected,
      });
      onHandlePress();
    } else if (click === 3 && selected) {
      this.setState({
        selected: !selected,
      });
      onHandlePress();
    } else {
      alert('3개까지만 선택가능합니다.');
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.squareButton}
        onPress={() => this.toggleSelected()}>
        <Image
          style={[
            styles.buttonImage,
            this.state.selected
              ? { tintColor: 'rgb(10,201,199)' }
              : { tintColor: '#333333' },
          ]}
          source={this.props.source}
        />
        <Text
          style={[
            styles.buttonText,
            this.state.selected ? { color: 'rgb(10,201,199)' } : { color: '#333333' },
          ]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

SampleButton.defaultProps = {
  text: 'Button',
  source: require('../icons/headerIcon/mypage.png'),
};

export default SampleButton;
const styles = StyleSheet.create({
  squareButton: {
    borderWidth: 1,
    padding: 3,
    width: width * 0.33,
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
  },
  buttonImage: {
    alignSelf: 'center',
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
