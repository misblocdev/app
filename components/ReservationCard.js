import React, { useState } from 'react';
import { Card, View } from 'native-base';
import { TouchableHighlight, StyleSheet, Text, Image, Alert, Dimensions, Platform } from 'react-native';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps'; // 지도 라이브러리
const { width, height } = Dimensions.get('window');
const LatitudeDelta = 0.003;
const LongitudeDelta = 0.003;
// const card_width = width * 0.8;
// const card_height = height * 0.5;
const ReservationCard = props => {
  const [hospitalInfo, setInfo] = useState([]);
  const handleCancel = data => {
    let text =
      '\n 예약 취소에 따른 불이익이\n 있을 수 있습니다.\n 예약을 정말 취소하시겠습니까?';
    let cancel = {
      text: ' 예약취소',
      onPress: () => {
        props.cancel(data);
        props.GetResevations();
      },
    };
    let notCancel = {
      text: '아니오',
      onPress: () => console.log('canceled cancelling'),
      style: 'caancel',
    };
    Alert.alert('예약취소 확인', text, [notCancel, cancel]);
    return;
  };

  let data = props.results;
  if (data.length > 0) {
    return data.map((item, i) => {
      // console.warn(item);
      const date = moment(item.nDate.toString()).format('YYYY-MM-DD');
      const time = item.nTime.toString();
      const hospital = props.getHospitalInfo(item.hospitalId);

      hospital.then(res => {
        let arr = hospitalInfo;
        arr.push({ item: i, info: res });
        setInfo(arr);
      });

      // const hospitalname =
      //   hospitalInfo.length !== 0 && hospitalInfo[i].info[0]
      //     ? hospitalInfo[i].info[0].sName
      //     : '';
      // console.log(
      //   'info',
      //   hospitalInfo.length !== 0 && hospitalInfo[i].info[0]
      //     ? hospitalname
      //     : 'empty',
      // );

      return (

        <View style={styles.container} key={i}>
          <View style={styles.lineView}>
            <View style={[styles.selector, i !== 0 && styles.notRecent]} />
            <View style={styles.line} />
          </View>
          <Card style={styles.card}>
            <View style={styles.cardView}>
              <Text style={styles.info}>예약정보</Text>
              <View style={styles.details}>
                <Text style={styles.title}>예약일시</Text>
                <Text style={styles.value}>{`${date} ${time.substring(
                  0,
                  2,
                )}:${time.substring(2, 5)}`}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>예약병원</Text>
                <Text style={styles.value}>{item.sName}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>진료과목</Text>
                <Text style={styles.value}>{item.sMedicalCourse}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.diagnosis}>진료실</Text>
                <Text style={styles.value}>{item.sAddr01}</Text>
              </View>
              <View style={styles.map}>
                <Image source={item.map} />
              </View>
              <View style={styles.address}>
                {/*<Image source={require('../assets/group2Copy.png')} style={styles.mapImage} />*/}
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: item.sGeoCode.length > 0 ? Number(item.sGeoCode.split(',')[0]) : 0,
                    longitude: item.sGeoCode.length > 0 ? Number(item.sGeoCode.split(',')[1]) : 0,

                    latitudeDelta: LatitudeDelta,
                    longitudeDelta: LongitudeDelta,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: item.sGeoCode.length > 0 ? Number(item.sGeoCode.split(',')[0]) : 0,
                      longitude: item.sGeoCode.length > 0 ? Number(item.sGeoCode.split(',')[1]) : 0,
                    }}
                  >
                    <Image
                      style={styles.cardMarkerIcon}
                      source={require('../icons/dentistInfo/etc/mark.png')}
                    />

                    {/* <View style={{ backgroundColor: "#9370db", padding: 1 }}>
                  <Text>{this.state.loaded ? this.props.params[0].sName : ''}</Text>
                </View> */}
                  </Marker>
                </MapView >
                <Text style={styles.mapAddress}>{item.sAddr02}</Text>
              </View>
              <TouchableHighlight
                style={styles.button}
                onPress={() => handleCancel(item)}>
                <Text style={styles.buttonText}>예약취소</Text>
              </TouchableHighlight>
            </View>
          </Card>
        </View>
      );
    });
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  map: {
    position: 'absolute',
    width: width * 0.75,
    height: 113,
  },
  lineView: {
    width: 1,
    marginLeft: 35,
    marginRight: 17,
  },
  line: {
    height: 425,
    backgroundColor: '#0ac9c7',
    marginTop: -35,
    width: 2,
    zIndex: 0,
  },
  notRecent: {
    backgroundColor: '#cccccc',
    width: 21,
    height: 8,
    marginLeft: -10,
    borderRadius: 5,
    marginTop: 25,
    zIndex: 1,
  },
  selector: {
    backgroundColor: '#0ac9c7',
    width: 21,
    height: 8,
    marginLeft: -10,
    borderRadius: 5,
    marginTop: 25,
    zIndex: 1,
  },
  card: {
    width: width * 0.82,
    marginTop: 18,
    padding: 14,
    height: Platform.OS === 'ios' ? 370 : 400,
  },
  cardView: {
    flexDirection: 'column',
  },
  info: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 15,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  title: {
    fontSize: 13,
    color: '#666666',
    marginRight: 21,
    alignSelf: 'center',
  },
  diagnosis: {
    fontSize: 13,
    color: '#666666',
    marginRight: 32,
    alignSelf: 'center',
  },
  value: {
    fontSize: 14,
    alignSelf: 'center',
  },

  address: {
    marginTop: 7,
    flexDirection: 'row',
  },
  mapImage: {
    width: 9,
    height: 11,
    alignSelf: 'center',
    marginRight: 4,
  },
  mapAddress: {
    alignSelf: 'center',
    fontSize: 13,
    color: '#666666',
    marginTop: 120,
  },
  button: {
    marginTop: Platform.OS === 'ios' ? 15 : 10,
    backgroundColor: '#666666',
    alignContent: 'center',
    height: 36,
  },
  buttonText: {
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 3,
  },
  cardMarkerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default ReservationCard;
