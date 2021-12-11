import React from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Easing,
  Modal,
} from 'react-native';
//import Modal from 'react-native-modalbox';
import {ScrollView} from 'react-native-gesture-handler';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

export class SelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.animateBackdropOpen = this.animateBackdropOpen.bind(this);
    this.animateBackdropClose = this.animateBackdropClose.bind(this);
    this.stopAnimateOpen = this.stopAnimateOpen.bind(this);
    this.animateOpen = this.animateOpen.bind(this);
    this.stopAnimateClose = this.stopAnimateClose.bind(this);
    this.animateClose = this.animateClose.bind(this);
    this.state = {
      position: new Animated.Value(SCREEN_HEIGHT + SCREEN_WIDTH * 0.85),
      backdropOpacity: new Animated.Value(0),
      isAnimateClose: false,
      isAnimateOpen: false,
      isOpen: false,
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
    };
  }

  animateBackdropOpen() {
    if (this.state.isAnimateBackdrop && this.state.animBackdrop) {
      this.state.animBackdrop.stop();
    }
    this.setState({isAnimateBackdrop: true});

    let animBackdrop = Animated.timing(this.state.backdropOpacity, {
      toValue: 1,
      duration: 400,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        isAnimateBackdrop: false,
        animBackdrop,
      });
    });
  }

  animateBackdropClose() {
    if (this.state.isAnimateBackdrop && this.state.animBackdrop) {
      this.state.animBackdrop.stop();
    }
    this.setState({isAnimateBackdrop: true});

    let animBackdrop = Animated.timing(this.state.backdropOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        isAnimateBackdrop: false,
        animBackdrop,
      });
    });
  }

  stopAnimateOpen() {
    if (this.state.isAnimateOpen) {
      if (this.state.animOpen) {
        this.state.animOpen.stop();
      }
      this.setState({isAnimateOpen: false});
    }
  }

  animateOpen() {
    this.stopAnimateClose();
    this.animateBackdropOpen();

    this.setState(
      {
        isAnimateOpen: true,
        isOpen: true,
      },
      () => {
        requestAnimationFrame(() => {
          let animOpen = Animated.timing(this.state.position, {
            toValue: SCREEN_HEIGHT,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            this.setState({
              isAnimateOpen: false,
              animOpen,
            });
          });
        });
      },
    );
  }

  stopAnimateClose() {
    if (this.state.isAnimateClose) {
      if (this.state.animClose) {
        this.state.animClose.stop();
      }
      this.setState({isAnimateClose: false});
    }
  }

  animateClose() {
    this.stopAnimateOpen();
    this.animateBackdropClose();

    this.setState(
      {
        isAnimateClose: true,
        isOpen: false,
      },
      () => {
        let animClose = Animated.timing(this.state.position, {
          toValue: SCREEN_HEIGHT + SCREEN_WIDTH * 0.85,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          this.setState(
            {
              isAnimateClose: false,
              animClose,
            },
            () => {
              this.state.position.setValue(SCREEN_HEIGHT + SCREEN_WIDTH * 0.85);
            },
          );
          this.props.onDismiss();
        });
      },
    );
  }

  renderBackdrop() {
    return (
      <TouchableWithoutFeedback onPress={this.animateClose}>
        <Animated.View
          importantForAccessibility="no"
          style={[styles.absolute, {opacity: this.state.backdropOpacity}]}>
          <View
            style={[
              styles.absolute,
              {
                backgroundColor: 'rgba(0,0,0,0.5)',
                opacity: 0.8,
              },
            ]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  renderContent() {
    //const offsetX = (width - this.state.width) / 2;
    return (
      <Animated.View
        style={{
          height: 'auto',
          width: 'auto',
          transform: [{translateY: this.state.position}, {translateX: 0}],
        }}>
        <View
          style={[
            styles.modal,
            {paddingBottom: isIphoneX() ? getBottomSpace() : 0},
          ]}>
          <View style={{maxHeight: SCREEN_WIDTH * 0.85}}>
            <ScrollView>
              {this.props.list.map((item, index) => (
                <View key={index.toString()}>
                  <TouchableOpacity
                    style={styles.modalTextView}
                    onPress={() => {
                      console.warn(this.props.onSubmit);
                      this.animateClose();
                      this.props.onSubmit(item);
                    }}>
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                  <View
                    style={{borderColor: '#eeeeee', borderBottomWidth: 1}}
                  />
                </View>
              ))}
              <TouchableOpacity
                style={styles.modalTextView}
                onPress={this.animateClose}>
                <Text style={styles.modalText}>취소</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Animated.View>
    );
  }

  render() {
    const {visible} = this.props;

    const content = (
      <View
        importantForAccessibility="yes"
        accessibilityViewIsModal={true}
        style={[styles.transparent, styles.absolute]}
        pointerEvents={'box-none'}>
        <View
          style={[styles.absolute, {flex: 1}]}
          pointerEvents={'box-none'}
          onLayout={() => {
            this.animateOpen();
          }}>
          <Animated.View
            importantForAccessibility="no"
            style={[
              styles.absolute,
              {opacity: this.state.backdropOpacity, zIndex: 0},
            ]}>
            <TouchableWithoutFeedback onPress={this.animateClose}>
              <View
                style={[
                  styles.absolute,
                  {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    opacity: 0.8,
                  },
                ]}
              />
            </TouchableWithoutFeedback>
          </Animated.View>

          <Animated.View
            style={{
              height: 'auto',
              width: 'auto',
              transform: [{translateY: this.state.position}, {translateX: 0}],
              zIndex: 1,
            }}>
            <View
              style={[
                styles.modal,
                {paddingBottom: isIphoneX() ? getBottomSpace() : 0},
              ]}>
              <View style={{maxHeight: SCREEN_WIDTH * 0.85}}>
                <ScrollView>
                  {this.props.list.map((item, index) => (
                    <View key={index.toString()}>
                      <TouchableOpacity
                        style={styles.modalTextView}
                        onPress={() => {
                          console.warn(this.props.onSubmit);
                          this.animateClose();
                          this.props.onSubmit(item);
                        }}>
                        <Text style={styles.modalText}>{item}</Text>
                      </TouchableOpacity>
                      <View
                        style={{borderColor: '#eeeeee', borderBottomWidth: 1}}
                      />
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.modalTextView}
                    onPress={this.animateClose}>
                    <Text style={styles.modalText}>취소</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    );

    return (
      <Modal transparent visible={visible} onRequestClose={this.animateClose}>
        {content}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: SCREEN_WIDTH * 0.087,
    width: SCREEN_WIDTH * 0.826,
    height: 'auto',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  modalTextView: {
    width: SCREEN_WIDTH * 0.827,
    height: SCREEN_WIDTH * 0.123,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    paddingBottom: 12,
    paddingTop: 11,
    fontSize: 16,
  },
});
