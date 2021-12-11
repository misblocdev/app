import React, {Component} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Header, Left, Right, Container, Content} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
//import {getMyHospital} from '../../utils/AuthMypage';
import {
  getAuthStore,
  getEventList,
  getEventHospital,
} from '../../utils/AuthEvent';

const {width, height} = Dimensions.get('window');
export default class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalName: '',
    };
  }

  getHospitalInfo = async () => {
    let {event} = this.props.navigation.state.params;
    let inParams = {
      nHospitalNo: event.nHospitalNo,
      userId: 0,
    };
    try {
      let autoInfo = await getAuthStore('userinfo');

      if (autoInfo !== '') {
        const oJson = JSON.parse(autoInfo);
        inParams.userId = oJson[0].userId;

        //let data = await getMyHospital(inParams);
        let data = await getEventHospital(inParams);
        if (data.code === 1) {
          this.setState({...this.state, hospitalName: data.other[0].sName});
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    this.getHospitalInfo();
  }

  render() {
    const goBack = () => this.props.navigation.goBack();
    const register = () =>
      this.props.navigation.navigate('EventRegistration', {
        eventId: this.props.navigation.state.params.event.id,
        props: this.props.navigation.state.params.props,
      });

    const goToHospital = () => {
      this.props.navigation.navigate('SearchResult', {props: this.props});
    };

    const reset = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'EventView', params: {event}}),
        NavigationActions.navigate({routeName: 'Detail'}),
      ],
    });
    const {event} = this.props.navigation.state.params;
    const {props} = this.props.navigation.state.params;

    const end = moment(event.endDate.toString()).format('YYYY.MM.DD');
    const begin = moment(event.nStartDate.toString()).format('YYYY.MM.DD');

    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Image
                source={require('../../icons/tabnavi/chevronLeft.png')}
                style={styles.goBack}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}> {this.state.hospitalName} </Text>
            <TouchableOpacity onPress={() => props.setFavorite(event.id)}>
              <Image
                source={
                  event.isFavorite === '1'
                    ? require('../../assets/iconCopy13.png')
                    : require('../../icons/headerIcon/heart.png')
                }
                style={styles.heart}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {/* Title */}
            <View style={styles.title}>
              <View style={styles.title_date}>
                <Text style={styles.eventTitle}>{event.sTitle}이벤트</Text>
                <Text style={styles.eventDate}>
                  이벤트 기간 {begin} - {end}
                </Text>
              </View>
              <View style={styles.discount}>
                <Text style={styles.discountNumber}>
                  {' '}
                  {event.nDiscountRate}%{' '}
                </Text>
              </View>
            </View>
            {/* Image */}
            <ScrollView>
              <View style={styles.imageView}>
                <Image source={{uri: event.sPhoto}} style={styles.image} />
              </View>
              {/* Hospital Info */}
              <View style={styles.hospitalInfoView}>
                <Text style={styles.hospitalInfoText}> 병원정보 </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Detail', {
                      props: this.props,
                      result: {
                        sName: event.hospital,
                      },
                    })
                  }>
                  <View style={styles.hospitalInfoName}>
                    <View style={styles.hospitalInfoNameLeft}>
                      <Image
                        source={require('../../assets/group11.png')}
                        style={styles.hospitalInfoNameLeftImage}
                      />
                      <Text style={styles.hospitalInfoNameLeftTitle}>
                        {this.state.hospitalName}
                      </Text>
                    </View>
                    <View style={styles.hospitalInfoNameRight}>
                      <Image
                        source={require('../../icons/temp/searchArrow.png')}
                        style={styles.hospitalInfoNameRightImage}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {/* Notice */}

              <View style={styles.notice}>
                <Text style={styles.noticeTitle}> 주의사항 </Text>
                <View style={styles.noticeTarget}>
                  <Text style={styles.target}> 이벤트대상: </Text>
                  <Text style={styles.target}> {event.sTarget} </Text>
                </View>
                <View style={styles.noticeTarget}>
                  <Text style={styles.target}> 부작용안내: </Text>
                  <Text style={styles.target}> {event.sAdverseEffect} </Text>
                </View>
              </View>
            </ScrollView>
            {/* Button */}
          </View>
          <View
            style={
              Platform.OS === 'ios' ? styles.buttonBottom : styles.buttonAndroid
            }>
            <TouchableOpacity style={styles.button} onPress={register}>
              <Text style={styles.buttonText}> 신청하기 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
  },
  header: {
    paddingRight: 16,
    paddingLeft: 11,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'white',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heart: {
    width: 18,
    height: 16,
  },
  goBack: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#ffffff',
    marginBottom: 50,
  },
  title: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 21,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title_date: {
    flexDirection: 'column',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  eventDate: {
    fontSize: 14,
    color: '#666666',
  },
  discount: {
    width: 52,
    height: 52,
    borderRadius: 25,
    backgroundColor: '#44adff',
    alignSelf: 'center',
  },
  discountNumber: {
    marginTop: 15,
    marginBottom: 15,
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 15,
  },
  imageView: {
    paddingLeft: 21,
    paddingRight: 21,
    justifyContent: 'center',
    marginTop: 21,
  },
  image: {
    alignSelf: 'center',
    width: 341,
    height: 341,
  },
  hospital: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hospitalInfoView: {
    paddingLeft: 21,
    paddingRight: 21,
    marginTop: 19,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 11,
    flexDirection: 'column',
  },
  hospitalInfoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  hospitalInfoName: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hospitalInfoNameLeft: {
    flexDirection: 'row',
  },
  hospitalInfoNameLeftImage: {
    marginRight: 12,
  },
  hospitalInfoNameLeftTitle: {
    fontSize: 16,
    alignSelf: 'center',
  },
  hospitalInfoNameRightImage: {
    width: 7,
    height: 12,
  },
  notice: {
    marginTop: 19,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  noticeTarget: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  target: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#44adff',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonBottom: {
    position: 'absolute',
    width: width,
    bottom: 0,
  },
  buttonAndroid: {
    position: 'absolute',
    width: width,
    bottom: 0,
  },
});
