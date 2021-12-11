/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, SafeAreaView, View, Text} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class Appbar extends Component {
  render() {
    const {
      style,
      onBackAction,
      onCloseAction,
      onPressMore,
      onPressNext,
      title,
      dark,
      ...props
    } = this.props;
    const BackAction = () =>
      onBackAction ? (
        <View>
          <TouchableRipple
            style={{alignSelf: 'flex-start'}}
            onPress={onBackAction}
            rippleColor="transparent">
            <View
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/back.png')}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'cover',
                  tintColor: dark && '#ffffff',
                }}
              />
            </View>
          </TouchableRipple>
        </View>
      ) : null;

    const CloseAction = () =>
      onCloseAction ? (
        <View>
          <TouchableRipple
            style={{alignSelf: 'flex-start'}}
            onPress={onCloseAction}
            rippleColor="transparent">
            <View
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="md-close"
                color={dark ? '#ffffff' : '#333333'}
                size={26}
              />
            </View>
          </TouchableRipple>
        </View>
      ) : null;

    const More = () =>
      onPressMore ? (
        <View>
          <TouchableRipple
            style={{alignSelf: 'flex-end'}}
            onPress={onPressMore}
            rippleColor="transparent">
            <View
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 22, height: 22, resizeMode: 'contain'}}
                source={require('../icons/tabnavi/verDot.png')}
              />
            </View>
          </TouchableRipple>
        </View>
      ) : null;

    const Next = () =>
      onPressNext ? (
        <View>
          <TouchableRipple
            style={{alignSelf: 'flex-end'}}
            onPress={onPressNext}
            rippleColor="transparent">
            <View
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'NotoSansCJKkr-Medium',
                  fontSize: 16,
                  lineHeight: 22,
                  color: 'rgb(102,102,102)',
                }}>
                다음
              </Text>
            </View>
          </TouchableRipple>
        </View>
      ) : null;

    return (
      <SafeAreaView
        style={{
          width: '100%',
          height: 44,
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...style,
        }}
        {...props}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <BackAction />
          <CloseAction />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: onPressMore || onPressNext ? 0 : 44,
            }}>
            <Text
              style={{
                fontFamily: dark
                  ? 'NotoSansCJKkr-Regular'
                  : 'NotoSansCJKkr-Bold',
                fontSize: dark ? 14 : 16,
                color: dark ? '#ffffff' : '#333333',
              }}>
              {title}
            </Text>
          </View>
          <More />
          <Next />
        </View>
      </SafeAreaView>
    );
  }
}
