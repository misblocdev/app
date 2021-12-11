import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { Icon } from "native-base";

const { width, heigth } = Dimensions.get('window');
class AreaButton2 extends React.Component {




    render() {

        return (
            <TouchableOpacity
                style={[this.props.selected ? styles.squareButtonSelected : styles.squareButton]}
                onPress={() => this.props.onHandlePress()}
            >
                <Text style={[styles.buttonText, this.props.selected ? { color: 'rgb(10,201,199)' } : { color: '#333333' }]}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

AreaButton2.defaultProps = {
    text: '관심 지역',

}

export default AreaButton2;
const styles = StyleSheet.create({
    title: {
        color: "black",
        fontSize: 30,
        marginTop: 50,
        fontWeight: "400",
        marginBottom: 30
    },

    squareButton: {
        borderWidth: 0.5,
        padding: 5,
        width: width * 0.45,
        height: 36,
        borderColor: 'grey',
    },
    squareButtonSelected: {
        borderWidth: 0.5,
        padding: 5,
        width: width * 0.45,
        height: 36,
        borderColor: "rgb(28,205,199)",
    },
    buttonText: {
        fontSize: 14,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 18,
        fontFamily: "NotoSansCJKkr-Regular",
    },

})