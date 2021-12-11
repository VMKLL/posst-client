import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const Input = ({
    label,
    value,
    onChange,
    capitalize,
    secure = undefined,
    length = undefined,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder={label}
                value={value}
                onChangeText={onChange}
                autoCapitalize={capitalize}
                secureTextEntry={secure}
                autoCorrect={false}
                maxLength={length}
            />
        </View>
    );
};

const grey = 'rgb(196, 196, 196)';
const white = 'rgb(255, 255, 255)';
const black = 'rgb(69, 69, 69)';

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 240,
        backgroundColor: white,
        borderColor: grey,
        borderRadius: 10,
        borderWidth: 1,
    },
    text: {
        height: '100%',
        textAlign: 'center',
        color: black,
        fontSize: 23,
        fontWeight: '300',
        paddingHorizontal: 3,
    },
});
