import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { Icon } from "native-base";

const { width, heigth } = Dimensions.get('window');
class AreaButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        }
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected() {
        const { selected } = this.state;
        const { onHandlePress, click } = this.props;

        if (click < 3) {
            this.setState({
                selected: !selected,
            })
            onHandlePress();
        }
        else if (click === 3 && selected) {
            this.setState({
                selected: !selected,
            })
            onHandlePress();
        }
        else {
            alert("3개까지만");
        }

    }

    render() {

        return (
            <TouchableOpacity
                style={this.state.selected ? styles.squareButtonSelected : styles.squareButton}
                onPress={() => this.toggleSelected()}
            >
                <Text style={[styles.buttonText, this.state.selected ? { color: 'rgb(10,201,199)' } : { color: '#333333' }]}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

AreaButton.defaultProps = {
    text: 'Button',

}

export default AreaButton;
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
    },

})