import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/Home';
import {Anapatalk} from '../screens/Anapatalk';
import ReservationScreen from '../screens/Reservation';
import SearchScreen from '../screens/Search';
import Event from '../screens/Event';

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: '홈',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../icons/tabnavi/home.png')}
            style={[styles.tabIcon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Anapatalk: {
      screen: Anapatalk,
      navigationOptions: {
        title: '아나파톡',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../icons/tabnavi/community.png')}
            style={[styles.tabIcon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Reservation: {
      screen: ReservationScreen,
      navigationOptions: {
        title: '예약확인',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../icons/tabnavi/check.png')}
            style={[
              styles.tabIcon,
              {
                tintColor: tintColor,
              },
            ]}
          />
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: '병원찾기',
        labelStyle: {fontWeight: '500'},
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../icons/tabnavi/mark.png')}
            style={[styles.tabIcon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Event: {
      screen: Event,
      navigationOptions: {
        title: '이벤트',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../icons/tabnavi/event.png')}
            style={[styles.tabIcon, {tintColor: tintColor}]}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgb(17,128,195)',
      inactiveTintColor: 'rgb(102,102,102)',
      style: {
        height: 59,
        paddingTop: 3,
      },
      labelStyle: {
        fontFamily: 'NotoSansCJKkr-Medium',
        fontSize: 13,
        lineHeight: 17,
        paddingBottom: 3,
      },
    },
  },
);

export default createAppContainer(AppTabNavigator);

const styles = StyleSheet.create({
  tabIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
