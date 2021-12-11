import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Link = ({ label, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const grey = 'rgb(245, 245, 245)';
const black = 'rgb(69, 69, 69)';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: grey,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    text: {
        color: black,
        fontSize: 21,
        fontWeight: '300',
    },
});
