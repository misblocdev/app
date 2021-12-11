import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Card, CardItem } from 'native-base';
import config from '../utils/config';

const SERVER_URL = config.url;
const { width, height } = Dimensions.get('window');

const card_width = Platform.OS === 'ios' ? 281 : 300;
const card_height = Platform.OS === 'ios' ? 141 : 160;

export default class ReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const showCon = () => {
      console.log(this.props.result);
      this.props.navigation.navigate('ReviewDetail', { data: this.props.result });
    };
    // var tagResult = this.props.result.sMedicalCourse.split(",");
    var medicalResult = this.props.result.sMedicalCourse.split(',');
    return (
      <TouchableOpacity onPress={showCon}>
        <Card style={styles.card}>
          <CardItem style={styles.cardTagSection}>
            {medicalResult.length > 1 ? (
              medicalResult.map(course => {
                return <Text style={styles.tagFont}>#{course.trim()}</Text>;
              })
            ) : (
                <Text style={styles.tagFont}>#아나파톡</Text>
              )}
          </CardItem>

          <CardItem style={styles.cardContentsSection}>
            <Image
              style={styles.cardImg}
              source={
                this.props.result.sPhotos2 !== ''
                  ? {
                    uri: `${SERVER_URL}/upload${
                      this.props.result.sPhotos2.split(',')[0]
                      }`,
                  }
                  : require('../assets/236PinterestCopy2.png')
              }
            />
            <View style={styles.contents}>
              <View style={styles.nickSection}>
                <Image
                  style={styles.iconImg}
                  source={require('../icons/search/1.png')}
                />

                <Text style={styles.nickFont}>{this.props.result.sNick}</Text>
              </View>
              <View style={styles.textSection}>
                <Text style={styles.contentFont}>
                  {this.props.result.sReview}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.moreContentsSection}
                onPress={showCon}>
                <Text style={styles.moreContents}>...더보기</Text>
              </TouchableOpacity>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: card_height,
    width: card_width,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  cardContentsSection: {
    flexDirection: 'row',
    marginTop: -card_height * 0.08,
    backgroundColor: 'transparent',
  },
  cardTagSection: {
    backgroundColor: 'transparent',
    marginTop: -3,
  },

  tagFont: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'rgb(62, 170, 255)',
    marginRight: width * 0.01,
    lineHeight: 17,
    fontFamily: "NotoSansCJKkr-Regular",
  },

  cardImg: {
    width: Platform.OS === 'ios' ? 96 : 106,
    height: Platform.OS === 'ios' ? 96 : 106,
    borderRadius: 8,
    overflow: 'hidden',
  },

  contents: {
    flexDirection: 'column',
    marginLeft: card_width * 0.04,
    marginTop: -card_height * 0.05,
  },
  nickSection: {
    flexDirection: 'row',
  },
  iconImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: card_width * 0.01,
  },
  nickFont: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: Platform.OS === 'ios' ? card_height * 0.03 : 0,
    lineHeight: Platform.OS === 'ios' ? 15 : 17,
    fontFamily: "NotoSansCJKkr-Regular",
  },
  textSection: {
    width: card_width * 0.54,
    height: card_height * 0.45,
  },
  contentFont: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: "NotoSansCJKkr-Regular",
    lineHeight: 15,
  },
  moreContentsSection: {
    position: 'absolute',
    marginTop: card_height * 0.55,
    marginLeft: Platform.OS === 'ios' ? card_width * 0.4 : card_width * 0.38,
    fontFamily: "NotoSansCJKkr-Regular",
    lineHeight: 15,
  },
  moreContents: {
    width: 40,
    height: 15,
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',

    color: 'gray',
  },
});
