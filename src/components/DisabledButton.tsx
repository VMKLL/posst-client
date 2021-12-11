import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DisabledButton = ({ label }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const white = 'rgb(255, 255, 255)';
const grey = 'rgb(196, 196, 196)';

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: grey,
        borderRadius: 15,
        height: 50,
        width: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: grey,
        fontSize: 21,
        fontWeight: '300',
    },
});
