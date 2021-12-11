import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export const SafeContainer = ({ children }) => {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const white = 'rgb(255, 255, 255)';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
