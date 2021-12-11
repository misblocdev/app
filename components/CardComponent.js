import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableHighlight,
  Linking,
} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Rigth,
  Icon,
} from 'native-base';
import { SliderBox } from 'react-native-image-slider-box';
import ImageSlider from 'react-native-image-slider';

import {
  setFavoriteHos,
  getCmmAuthNote,
  getAuthStore,
} from '../utils/AuthInterests';
import { connect } from 'react-redux';
import { SET_MY_HOSPITAL_UNREAD } from '../actions/unreadActions';

const { width, height } = Dimensions.get('window');
const card_width = width * 0.95;
const card_height = Platform.OS === 'ios' ? 380 : 410;

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      images: [
        this.props.result.sPhoto01,
        this.props.result.sPhoto02,
        this.props.result.sPhoto03,
        this.props.result.sPhoto04,
        this.props.result.sPhoto05,
      ],

      isInterested: this.props.result.bFavorite,
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

  _clickInterest() {
    this.setFavoriteHospital(this.state.isInterested);
  }

  setFavoriteHospital = async bFavorite => {
    let inParams = {
      nMemSeq: 0,
      nHospitalNo: this.props.result.id,
      nMode: bFavorite > 0 ? 2 : 1,
    };

    try {
      let autoInfo = await getAuthStore('userinfo');

      if (autoInfo !== '') {
        const oJson = JSON.parse(autoInfo);
        inParams.nMemSeq = oJson[0].userId;

        let data = await setFavoriteHos(inParams);
        console.log('sent', inParams);
        if (data.code === 1) {
          console.log('set Favorite Hospital success at Card: ', data);

          if (
            this.state.isInterested &&
            this.props.unreadAlerts.myHospitals > 0
          )
            this.props.setMyHospitalUnread(
              this.props.unreadAlerts.myHospitals - 1,
            );
          else
            this.props.setMyHospitalUnread(
              this.props.unreadAlerts.myHospitals + 1,
            );

          this.setState({
            isInterested: !this.state.isInterested,
          });
        } else {
          console.log('set Favorite Hospital fail : ', data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    // console.log("Search Card : " + JSON.stringify(this.props.result))
    return (
      <Container style={styles.container}>
        <Card style={styles.card}>
          <CardItem style={styles.cardImage}>
            {/* <SliderBox
              images={this.state.images}
              sliderBoxHeight={height * 0.15}
              parentWidth={width * 0.86}
              dotColor="#FFEE58"
            /> */}
            <ImageSlider
              // loopBothSides
              // autoPlayWithInterval={3000}
              images={this.state.images}
              style={{ width: card_width * 0.92, height: card_height * 0.33 }}
            />

            <View style={styles.cardIconOnImgContainer}>
              {/* <Text
                style={[
                  styles.cardTextOnImg,
                  this.props.result.bStatus
                    ? { backgroundColor: '#FF7C7C' }
                    : { backgroundColor: '#FF953F' },
                ]}>
                {this.props.result.bStatus ? '진료중' : '접수대기'}
              </Text> */}
              <Text
                style={[
                  styles.cardTextOnImg,
                  this.props.result.bReserve
                    ? { backgroundColor: '#2EA3FF' }
                    : { backgroundColor: '#737373' },
                ]}>
                {this.props.result.bReserve ? '예약가능' : '예약종료'}
              </Text>
              {/* <Text
                style={[styles.cardTextOnImg, { backgroundColor: '#1CCDC7' }]}>
                {this.props.result.sMedicalCourse}
              </Text> */}
            </View>
          </CardItem>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Detail', {
                // result: this.props.result,
                nHospSeq: this.props.result.id,
              });
            }}>
            <CardItem>
              <View style={styles.cardBodySection}>
                <View style={styles.cardTitleSection}>
                  <Text style={styles.cardTitle}>
                    {this.props.result.sName}
                  </Text>
                  {/* <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={styles.cardStarIcon}
                      source={require('../icons/dentistInfo/etc/star.png')}
                    />
                    <Image
                      style={styles.cardStarIcon}
                      source={require('../icons/dentistInfo/etc/star.png')}
                    />
                    <Image
                      style={styles.cardStarIcon}
                      source={require('../icons/dentistInfo/etc/star.png')}
                    />
                    <Image
                      style={styles.cardStarIcon}
                      source={require('../icons/dentistInfo/etc/star.png')}
                    />
                    <Image
                      style={styles.cardStarIcon}
                      source={require('../icons/dentistInfo/etc/star.png')}
                    />
                  </View> */}

                  <View style={styles.cardTitleIconSection}>
                    <TouchableOpacity
                      onPress={() => { Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + this.props.result.sAddr01 + " " + this.props.result.sAddr02) }}>
                      <Image
                        style={[styles.cardTitleIcon, { marginRight: 20 }]}
                        source={require('../icons/dentistInfo/etc/mapmark.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._clickInterest()}>
                      <Image
                        style={styles.cardTitleIcon}
                        source={
                          this.state.isInterested
                            ? require('../icons/dentistInfo/etc/stroke.png')
                            : require('../icons/dentistInfo/etc/samll_stroke_false.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cardLocationSection}>
                  <Text style={styles.cardLocation}>
                    {this.props.result.sAddr01}
                  </Text>
                </View>
              </View>
            </CardItem>
            <View
              style={{
                width: card_width * 0.92,
                height: 1,
                backgroundColor: '#f2f2f2',
                // borderWidth: 0.2,
                borderStyle: 'solid',
                marginLeft: card_width * 0.04,
              }}
            />

            <CardItem style={{ flexDirection: 'column' }}>
              <View style={styles.timeInfoSection}>
                <Text style={styles.timeTitle}>[진료시간]</Text>
                <Text style={[styles.basicFont]}>
                  {this.props.result !== null
                    ? this.setTimeFormat(
                      '평일 ',
                      this.props.result.nWeekDay01,
                      this.props.result.nWeekDay02,
                      '~',
                      '진료',
                    )
                    : ''}
                  {this.props.result !== null
                    ? this.setTimeFormat(
                      '| 토요일 ',
                      this.props.result.nWeekEnd01,
                      this.props.result.nWeekEnd02,
                      '~',
                      '진료',
                    )
                    : ''}
                </Text>
                <Text style={styles.basicFont}>
                  {this.props.result !== null
                    ? this.setTimeFormat(
                      '일요일 및 공휴일 ',
                      this.props.result.nHoliyDay01,
                      this.props.result.nHoliyDay02,
                      '~',
                      '진료',
                    )
                    : ''}
                </Text>
              </View>
              <View style={styles.introSection}>
                <Text style={styles.basicFont}>{this.props.result.sMemo}</Text>
              </View>

              <TouchableOpacity
                style={styles.reservationB}
                onPress={() => {
                  this.props.navigation.navigate(
                    'DetailReservation',
                    this.props.result,
                  );
                }}>
                <Text style={styles.reservationT}>예약하기</Text>
              </TouchableOpacity>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </Container>
    );
  }
}

export const mapStateToProps = state => {
  return {
    unreadAlerts: state.unreadAlerts,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setMyHospitalUnread: value => dispatch(SET_MY_HOSPITAL_UNREAD(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);

const styles = StyleSheet.create({
  container: {
    height: card_height + 10,
    // marginTop: 10,
  },

  changeorder: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 15,
  },
  changeorderIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  changeorderText: {
    width: 37,
    height: 17,

    fontSize: 13,
    fontWeight: '500',

    //letterSpacing: 'normal',
    color: '#333333',
    marginLeft: 5,
  },
  card: {
    width: card_width,
    height: card_height,
    borderRadius: 5,
    alignSelf: 'center',
    shadowColor: '#333333',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // overflow: 'hidden',
  },

  cardImage: {
    alignSelf: 'center',
  },
  cardIconOnImgContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-start',
    marginTop: Platform.OS === 'ios' ? card_height * 0.03 : card_height * 0.04,
    marginLeft: card_width * 0.05,
  },
  cardTextOnImg: {
    textAlign: 'center',
    height: 14,
    marginTop: 2,
    marginRight: 3,
    //세로
    paddingLeft: 5,
    paddingRight: 5,

    fontSize: 11.5,
    // fontWeight: 'bold',
    paddingTop: 1.5,
    paddingBottom: 1.5,

    borderRadius: 4,
    overflow: 'hidden',
    color: 'white',
    lineHeight: 13,
    fontFamily: "NotoSansCJKkr-Bold",
  },
  cardBodySection: {
    flexDirection: 'column',
  },
  cardTitleSection: {
    flexDirection: 'row',
  },
  cardTitle: {
    // height: 19,
    fontSize: 15,
    fontWeight: '600',
    marginRight: 5,
    color: '#333333',
    marginTop: Platform.OS === 'ios' ? -card_height * 0.02 : -card_height * 0.03,
    lineHeight: 19,
    fontFamily: "NotoSansCJKkr-Bold",

  },
  cardStarIcon: {
    width: width * 0.04,
    height: height * 0.015,
    marginRight: 2,
    resizeMode: 'contain',
  },

  cardTitleIconSection: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: Platform.OS === 'ios' ? card_width * 0.77 : card_width * 0.77,
    marginTop: -card_height * 0.03,
  },

  cardTitleIcon: {
    width: card_width * 0.045,
    height: card_height * 0.05,
    resizeMode: 'contain',

  },
  cardLocation: {
    //width: 66,

    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
    lineHeight: 17,
    fontFamily: "NotoSansCJKkr-Regular",
  },

  timeInfoSection: {
    width: card_width * 0.92,
    height: Platform.OS === 'ios' ? 60 : 70,
  },
  timeTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#999999',
    lineHeight: 19,
    fontFamily: "NotoSansCJKkr-Medium",
  },
  introSection: {
    width: card_width * 0.92,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  basicFont: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginTop: 3,
    lineHeight: 19,
    fontFamily: "NotoSansCJKkr-Regular",
  },

  reservationB: {
    alignItems: 'center',
    backgroundColor: '#1ccdc7',
    padding: 5,
    width: card_width * 0.92,
    height: 40,
    // borderRadius: 5,
    // borderWidth: 0.5,
    marginTop: Platform.OS === 'ios' ? card_height * 0.04 : card_height * 0.025,
    borderColor: 'white',
    justifyContent: 'center',
  },
  reservationT: {
    color: 'white',
    fontSize: 17,
  },

  modal: {
    width: width * 0.9,
    height: height * 0.75,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#333333',
    padding: 10,
    marginTop: 130,
    marginLeft: 20,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },

  customSlide: {
    width: width * 0.85,
    height: height * 0.15,
  },
});
