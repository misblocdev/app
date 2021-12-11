import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
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
import moment from 'moment';
import { setEventFavorit } from '../../utils/AuthEvent';

const { width, height } = Dimensions.get('window');
export default class EventCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const showEvent = event => {
      this.props.navigation.navigate('EventView', {
        props: this.props,
        event: event,
      });
    };

    const results = this.props.results;
    let now = parseInt(moment(new Date()).format('YYYYMMDD'));
    if (results.length > 0) {
      return results.map((item, i) => {
        return (
          <Card style={styles.card} key={i}>
            <CardItem style={styles.imageItem}>
              <TouchableOpacity onPress={() => showEvent(results[i])}>
                <View style={styles.eventImage}>
                  <Image source={{ uri: item.sPhoto }} style={styles.image} />
                </View>
              </TouchableOpacity>
            </CardItem>
            <CardItem style={styles.eventDetails}>
              <View style={styles.eventTitleHeader}>
                <Text style={styles.eventTitle}> {item.sTitle} </Text>
                <TouchableOpacity
                  onPress={() => this.props.setFavorite(item.id, item.isFavorite)}>
                  <Image
                    style={styles.EventLike}
                    source={
                      item.isFavorite === '1'
                        ? require('../../icons/tabFoot/heart.png')
                        : item.isFavorite === '0'
                          ? require('../../icons/tabFoot/heartEmpty.png')
                          : require('../../icons/tabFoot/heartEmpty.png')
                    }
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.descriptionView}>
                <Text
                  style={styles.description}
                  onPress={() => showEvent(results[i])}>
                  {' '}
                  {item.sDesc}{' '}
                </Text>
              </View>
              {/* <View style={styles.DaysView}>
                <Text style={styles.DaysText}> D{item.nStartDate - now} </Text>
              </View> */}
            </CardItem>
          </Card>
        );
      });
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: 149,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 17,
    paddingBottom: 17,
    paddingRight: 17,
    paddingLeft: 17,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    borderRadius: 0,
    borderTopWidth: 0,
  },

  imageItem: {
    padding: 0,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 0,
    paddingRight: 12,
  },

  eventImage: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    borderRadius: 5,
    padding: 0,
  },
  image: {
    width: 110,
    height: 110,
  },

  eventDetails: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
  },

  eventTitleHeader: {
    width: '100%',
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    flexWrap: 'wrap',
    lineHeight: 25,
    fontFamily: "NotoSansCJKkr-Medium",
  },

  EventLike: {
    width: 18,
    height: 16,
    marginTop: 5,
  },
  descriptionView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  description: {
    width: '80%',
    color: '#999999',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "NotoSansCJKkr-Regular",
  },

  DaysView: {
    width: '100%',
    alignSelf: 'flex-end',
    position: 'absolute',
    flex: 1,
    bottom: 0,
    right: 0,
  },
  DaysText: {
    alignSelf: 'flex-end',
    bottom: 0,
    color: '#1ccdc7',
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

  cardImage: {
    alignSelf: 'center',
  },
  cardIconOnImgContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-start',
    marginTop: height * 0.015,
    marginLeft: width * 0.05,
  },
  cardTextOnImg: {
    textAlign: 'center',
    height: 14,
    marginTop: 2,
    marginRight: 3,
    //세로
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: 11,
    fontSize: 11.5,
    fontWeight: 'bold',
    padding: 1.5,

    borderRadius: 4,
    overflow: 'hidden',
    color: 'white',
  },
  cardBodySection: {
    flexDirection: 'column',
  },
  cardTitleSection: {
    flexDirection: 'row',
  },
  cardTitle: {
    height: height * 0.02,
    fontSize: 15,
    fontWeight: '600',
    marginRight: 5,
    color: '#333333',
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
    marginLeft: width * 0.73,
  },

  cardTitleIcon: {
    width: width * 0.04,
    height: height * 0.022,
    resizeMode: 'contain',
  },
  cardLocation: {
    width: 66,
    height: 15,
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
  },

  timeInfoSection: {
    width: width * 0.87,
    height: height * 0.075,
  },
  timeTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#999999',
  },
  introSection: {
    width: width * 0.87,
    height: height * 0.05,
  },
  basicFont: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginTop: 3,
  },

  reservationB: {
    alignItems: 'center',
    backgroundColor: '#1ccdc7',
    padding: 5,
    width: width * 0.88,
    height: height * 0.04,
    borderRadius: 5,
    borderWidth: 0.5,
    marginTop: height * 0.015,
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
});
