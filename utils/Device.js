import {Platform, Dimensions, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

class Device {
  static getStatusBarHeight = () => {
    return Platform.OS === 'ios'
      ? getStatusBarHeight(true)
      : StatusBar.currentHeight;
  };
  static getScreenHeight = () => {
    if (isIphoneX()) {
      return Math.round(Dimensions.get('window').height - getBottomSpace());
    } else {
      return Math.round(Dimensions.get('window').height);
    }
  };
}

export default Device;
