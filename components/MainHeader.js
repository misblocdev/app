import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Left, Right } from 'native-base';

export class MainHeader extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Header style={styles.header}>
        <Left style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{
                  width: 23,
                  height: 22,
                  resizeMode: 'contain',
                }}
                source={require('../icons/headerIcon/logo.png')}
              />
              <Image
                style={{
                  width: 80,
                  height: 22,
                  resizeMode: 'contain',
                }}
                source={require('../icons/headerIcon/appname.png')}
              />
            </View>
          </TouchableOpacity>
        </Left>
        <Right style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Note')}>
            <Image
              style={styles.headerIcon}
              source={require('../icons/headerIcon/notification.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyFavorite')}>
            <Image
              style={styles.headerIcon}
              source={require('../icons/headerIcon/favorite.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
            <Image
              style={{
                width: 20,
                height: 22,
                resizeMode: 'contain',
                marginLeft: 23,
              }}
              source={require('../icons/headerIcon/mypage.png')}
            />
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
    elevation: 0,
    //height: 64,
  },
  headerLeft: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  headerIcon: {
    width: 19,
    height: 21,
    resizeMode: 'contain',
    marginLeft: 23,
  },
});
