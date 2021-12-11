import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
class TimeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected() {
    const {selected} = this.state;
    const {onHandlePress, click} = this.props;

    if (click < 1) {
      this.setState({
        selected: !selected,
      });
      onHandlePress();
    } else if (click === 1 && selected) {
      this.setState({
        selected: !selected,
      });
      onHandlePress();
    } else {
      alert('하나의 시간만 선택 가능합니다.');
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={
          this.state.selected
            ? styles.squareButtonSelected
            : styles.squareButton
        }
        onPress={() => this.toggleSelected()}>
        <Text
          style={[
            styles.buttonText,
            this.state.selected
              ? {color: 'rgb(10,201,199)'}
              : {color: '#333333'},
          ]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

TimeButton.defaultProps = {
  text: 'Button',
};

export default TimeButton;
const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '400',
    marginBottom: 30,
  },

  squareButton: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.03,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  squareButtonSelected: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.03,
    borderColor: '#0ac9c7',
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    lineHeight: 19,
  },
});
