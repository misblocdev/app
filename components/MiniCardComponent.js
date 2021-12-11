import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import {Card, CardItem} from 'native-base';

//import { HugeImage, BigImage, SmallImage, LongImage } from '../screens/Anapatalk/Components/Image';
import FastImage from 'react-native-fast-image';
import {ConfirmModalOk} from '../components/ConfirmModalOk';

const {width, height} = Dimensions.get('window');
const card_width = Platform.OS === 'ios' ? 156 : 170;
const card_height = Platform.OS === 'ios' ? 190 : 214;

export default class MiniCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      images: [
        this.props.result.id % 3 == 0
          ? this.props.result.sPhoto01
          : this.props.result.sPhoto02,
        this.props.result.id % 3 == 0
          ? this.props.result.sPhoto03
          : this.props.result.sPhoto04,
        this.props.result.id % 3 == 0
          ? this.props.result.sPhoto05
          : this.props.result.sPhoto01,
      ],

      ConfirmModalReadyVisible: false,
    };
  }

  setTimeFormat = (sTitle, iData01, iData02, sBar, sMode) => {
    if (iData01 < 1 || iData02 < 1) {
      if (sMode.indexOf('점심') > -1) {
        sMode = '';
      }
      return sTitle + ' ' + sMode + ' 없음';
    }
    let sData01, sData02;
    try {
      sData01 = iData01.toString();
      sData02 = iData02.toString();
    } catch (e) {
      console.log('iData01 :' + iData01 + ',iData02:' + iData02);
      return sTitle + ' ' + sMode + ' 없음';
    }

    if (iData01 > 1000) {
      sData01 = sData01.substr(0, 2) + ':' + sData01.substr(2, 2);
    } else {
      sData01 = '0' + sData01.substr(0, 1) + ':' + sData01.substr(1, 2);
    }

    if (iData02 > 1000) {
      sData02 = sData02.substr(0, 2) + ':' + sData02.substr(2, 2);
    } else {
      sData02 = '0' + sData02.substr(0, 1) + ':' + sData02.substr(1, 2);
    }

    let outMsg = sTitle + ' ' + sData01 + sBar + sData02;
    return outMsg;
  };

  render() {
    const randomN = Math.floor(Math.random() * 2);
    return (
      <Card style={styles.card}>
        <CardItem style={styles.cardStateIconSection}>
          <View style={styles.cardStateIcon}>
            {/* <Text
                            style={[
                                styles.cardStateText,
                                this.props.result.bStatus
                                    ? { backgroundColor: '#FF7C7C' }
                                    : { backgroundColor: '#FF953F' },
                            ]}>
                            {this.props.result.bStatus ? '진료중' : '접수대기'}
                        </Text> */}
            <Text
              style={[
                styles.cardStateText,
                this.props.result.bReserve
                  ? {backgroundColor: '#2EA3FF'}
                  : {backgroundColor: '#737373'},
              ]}>
              {this.props.result.bReserve ? '예약가능' : '예약종료'}
            </Text>
            <Text style={[styles.cardStateText, {backgroundColor: '#1CCDC7'}]}>
              {this.props.result.sMedicalCourse}
            </Text>
          </View>
        </CardItem>

        <CardItem>
          <View style={styles.cardTitleSection}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Detail', {
                  nHospSeq: this.props.result.id,
                  // result: this.props.result,
                  navigation: this.props.navigation,
                });
              }}>
              <Text style={styles.cardTitle}>{this.props.result.sName}</Text>
            </TouchableOpacity>
            {/* {console.log("https://www.google.com/maps/search/?api=1&query=" + this.props.result.sGeoCode)} */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query=' +
                    this.props.result.sAddr01 +
                    ' ' +
                    this.props.result.sAddr02,
                );
              }}>
              <Image
                style={styles.mapMark}
                source={require('../icons/temp/mapMark2.png')}></Image>
            </TouchableOpacity>
          </View>
        </CardItem>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Detail', {
              nHospSeq: this.props.result.id,
              // result: this.props.result,
              navigation: this.props.navigation,
            });
          }}>
          <CardItem>
            <View style={styles.timeSection}>
              <Image
                style={styles.clockIcon}
                source={require('../icons/temp/clockIcon.png')}></Image>
              {/* <Text style={[styles.timeTextTitle]}>진료시간</Text> */}
              <Text style={styles.timeText}>
                {' '}
                {this.props.result !== null
                  ? this.setTimeFormat(
                      '진료시간      ',
                      this.props.result.nWeekDay01,
                      this.props.result.nWeekDay02,
                      '~',
                      '',
                    )
                  : ''}
              </Text>
            </View>
          </CardItem>
        </TouchableOpacity>
        <CardItem>
          <View style={styles.imageSection}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Detail', {
                  nHospSeq: this.props.result.id,
                  navigation: this.props.navigation,
                });
              }}>
              {this.state.images.length === 0 ? (
                <Image
                  style={[
                    styles.cardImg,
                    {borderWidth: 1, borderColor: '#cccccc'},
                  ]}
                  source={require('../images/s_prepare_hospital_image.png')}
                />
              ) : (
                <FastImage
                  style={styles.cardImg}
                  source={{uri: this.state.images[0]}}
                />
              )}
            </TouchableOpacity>

            {this.props.result.bStatus ? (
              <TouchableOpacity
                style={styles.reservationSection}
                onPress={() => {
                  this.props.navigation.navigate(
                    'DetailReservation',
                    this.props.result,
                  );
                }}>
                <Image
                  style={styles.circleB}
                  source={require('../icons/temp/circleB.png')}></Image>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </CardItem>

        <ConfirmModalOk
          visible={this.state.ConfirmModalReadyVisible}
          hide={() => this.setState({ConfirmModalReadyVisible: false})}
          // onConfirm={this.deleteType === 1 ? this.delFreetalk : this.delReply}
          title={'준비중'}
          contents={'준비중입니다.'}
          confirm="확인"
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: card_height,
    width: card_width,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },

  cardStateIconSection: {
    backgroundColor: 'transparent',
    width: card_width,
    marginLeft: -card_width * 0.05,
    // marginTop: card_height * 0.01,
  },
  cardStateIcon: {
    flexDirection: 'row',
    // alignSelf: "flex-start",
  },
  cardStateText: {
    textAlign: 'center',
    height: Platform.OS === 'ios' ? 14 : 17,

    paddingTop: Platform.OS === 'ios' ? 1 : 3,
    marginRight: 3,
    //세로
    paddingLeft: 5,
    paddingRight: 5,

    lineHeight: Platform.OS === 'ios' ? 13 : 12,
    fontSize: 10.5,
    fontWeight: 'bold',

    borderRadius: 4,
    overflow: 'hidden',
    color: 'white',

    fontFamily: 'NotoSansCJKkr-Medium',
  },
  cardTitleSection: {
    flexDirection: 'row',
    marginLeft: -card_width * 0.05,
    marginTop:
      Platform.OS === 'ios' ? -card_height * 0.05 : -card_height * 0.07,
  },
  cardTitle: {
    width: card_width * 0.8,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'NotoSansCJKkr-Bold',
    lineHeight: 18,
    // flex: 1,
  },
  mapMark: {
    width: Platform.OS === 'ios' ? 14 : 15,
    height: Platform.OS === 'ios' ? 17 : 17,
    // resizeMode: 'contain',

    // position: 'absolute',
    // marginLeft: 35,
    marginTop: Platform.OS === 'ios' ? 0 : card_height * 0.01,
  },
  timeSection: {
    width: card_width - 18,
    height: 14,
    borderRadius: 2,
    flexDirection: 'row',
    marginLeft: -card_width * 0.05,
    marginTop:
      Platform.OS === 'ios' ? -card_height * 0.05 : -card_height * 0.07,
    backgroundColor: '#f3f3f3',
  },
  clockIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 5,
  },
  timeTextTitle: {
    fontSize: 10,
    alignSelf: 'center',
    color: 'black',
    marginRight: Platform.OS === 'ios' ? card_width * 0.1 : card_width * 0.15,
    marginLeft: card_width * 0.02,
  },
  timeText: {
    fontSize: 10,
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'NotoSansCJKkr-Regular',
    lineHeight: 14,
  },
  imageSection: {
    // width: 138,
    // height: 97,
    marginLeft: -card_width * 0.05,
    marginTop:
      Platform.OS === 'ios' ? -card_height * 0.07 : -card_height * 0.08,
  },
  cardImg: {
    width: card_width - 18,
    height: Platform.OS === 'ios' ? card_height - 90 : card_height - 100,
    resizeMode: 'cover',
    borderRadius: 8,
    overflow: 'hidden',
  },
  circleB: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  reservationSection: {
    marginLeft: Platform.OS === 'ios' ? card_width * 0.65 : card_width * 0.68,
    marginTop: Platform.OS === 'ios' ? -card_height * 0.2 : -card_height * 0.16,
  },
});
