import React from 'react';
import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';

export const Header1 = ({ label }) => {
    return (
        <Header
            label={label}
            borderWidth={0}
            borderColor={null}
            paddingHorizontal={0}
            paddingVertical={0}
            borderRadius={0}
            fontSize={28}
        />
    );
};

export const Header2 = ({ label }) => {
    return (
        <Header
            label={label}
            borderWidth={0}
            borderColor={null}
            paddingHorizontal={0}
            paddingVertical={0}
            borderRadius={0}
            fontSize={23}
        />
    );
};

export const Header3 = ({ label }) => {
    return (
        <Header
            label={label}
            borderWidth={0}
            borderColor={null}
            paddingHorizontal={0}
            paddingVertical={0}
            borderRadius={0}
            fontSize={14}
        />
    );
};

export const CarNumber = ({ label }) => {
    return (
        <Header
            label={label}
            borderWidth={1}
            borderColor={grey}
            paddingHorizontal={10}
            paddingVertical={5}
            borderRadius={5}
            fontSize={28}
        />
    );
};

const Header = ({
    label,
    borderWidth,
    borderColor,
    paddingHorizontal,
    paddingVertical,
    borderRadius,
    fontSize,
}) => {
    const container: StyleProp<ViewStyle> = {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: borderWidth,
        borderColor: borderColor,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        borderRadius: borderRadius,
    };
    const text: StyleProp<TextStyle> = {
        color: grey,
        fontSize: fontSize,
        fontWeight: '300',
    };
    return (
        <View style={container}>
            <Text style={text}>{label}</Text>
        </View>
    );
};

const grey = 'rgb(69, 69, 69)';
