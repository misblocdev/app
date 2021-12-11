import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
    Image
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SliderBox } from 'react-native-image-slider-box';


const { width, height } = Dimensions.get('window');
const modal_width = 310;
const modal_height = 355;
export class EventModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
        }

    }
    render() {

        const {
            visible,
            hide,
            onConfirm,
            title,
            contents,
            confirm_title,
            cancle_title,
            close,
            ...props
        } = this.props;

        var images = [];
        contents.map((content) => {
            images.push(content.sPhoto);
        })
        // console.log("-------------Image : " + images);
        // var testI = [
        //     require('../icons/temp/event_image.png'),
        //     require('../icons/temp/event_image.png'),
        // ]
        return (
            <Modal
                animationType="fade"
                transparent
                visible={visible}
                onRequestClose={hide}>
                <TouchableWithoutFeedback onPress={hide}>
                    <View style={styles.modal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.container}>
                                <View style={styles.contents_box}>

                                    {/* 
                                    <ImageSlider
                                        // loopBothSides
                                        // autoPlayWithInterval={3000}
                                        images={images}

                                        style={styles.contents_box}
                                    /> */}
                                    <SliderBox
                                        ImageComponent={FastImage}
                                        images={images}
                                        sliderBoxHeight={modal_height * 0.87}
                                        parentWidth={modal_width}
                                        onCurrentImagePressed={index => onConfirm(contents[index])}
                                        currentImageEmitter={index => this.setState({
                                            index: index,
                                        })}
                                    />


                                </View>

                                <View style={styles.button_row}>
                                    <TouchableOpacity style={styles.button} onPress={close}>
                                        <Text style={styles.cancel_button_text}>{cancle_title}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.border_between_button} />
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            hide();
                                            onConfirm(contents[this.state.index]);
                                        }}>
                                        <Text style={styles.confirm_button_text}>{confirm_title}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: modal_width,
        height: modal_height,
        marginBottom: height * 0.035,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    contents_box: {
        width: modal_width,
        height: modal_height * 0.87,
        overflow: 'hidden'
    },
    title: { width: '100%', alignItems: 'center', justifyContent: 'center' },
    title_text: {
        marginLeft: 4,
        fontSize: 16,
        color: '#333333',
        lineHeight: 19,
        fontWeight: '500',
    },
    contents: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    contents_text: {
        fontSize: 14,
        color: '#999999',
        lineHeight: 19,
        textAlign: 'center',
    },
    button_row: {
        flexDirection: 'row',
        borderTopColor: '#cccccc',
        borderTopWidth: 1,
    },
    button: {
        width: modal_width * 0.5,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
    },
    border_between_button: {
        width: 1,
        backgroundColor: '#cccccc',
    },
    cancel_button_text: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 19,
        fontWeight: '500',
    },
    confirm_button_text: {
        fontSize: 16,
        color: 'rgb(62,170,255)',
        lineHeight: 19,
        fontWeight: '500',
    },
});
