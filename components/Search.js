/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export class Search extends Component {
  render() {
    const {placeholder, onChangeText, onSearch, value} = this.props;

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: '#cccccc',
          borderRadius: 12,
          marginRight: 16,
          marginLeft: 16,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 13,
        }}>
        <TextInput
          style={{
            height: 35,
            //fontFamily: 'NotoSansCJKkr-Regular',
            flex: 1,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: 14,
            color: '#333333',
            lineHeight: 19,
            marginBottom: 2,
            padding: 0,
          }}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity onPress={onSearch}>
          <Image
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              marginLeft: 10,
            }}
            source={require('../icons/search/search.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
