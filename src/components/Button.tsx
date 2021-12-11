import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';

export const SimpleButton = ({ label, onPress }) => {
    return (
        <Button
            label={label}
            onPress={onPress}
            textColor={black}
            backgroundColor={white}
            borderWidth={1}
            borderColor={black}
        />
    );
};

export const ActionButton = ({ label, onPress }) => {
    return (
        <Button
            label={label}
            onPress={onPress}
            textColor={red}
            backgroundColor={white}
            borderWidth={1}
            borderColor={red}
        />
    );
};

const Button = ({
    label,
    onPress,
    textColor,
    backgroundColor,
    borderWidth,
    borderColor,
}) => {
    const container: StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: 15,
        height: 50,
        width: 240,
        alignItems: 'center',
        justifyContent: 'center',
    };
    const text: StyleProp<TextStyle> = {
        color: textColor,
        fontSize: 21,
        fontWeight: '300',
    };
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Text style={text}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const black = 'rgb(69, 69, 69)';
const white = 'rgb(255, 255, 255)';
const red = 'rgb(245, 62, 80)';
