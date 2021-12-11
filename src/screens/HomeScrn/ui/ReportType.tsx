import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { getDimensions } from '../../../functions/getDimensions';

const { screenHeight } = getDimensions();

export const ReportType = () => {
    return (
        <View style={[styles.typesContainer, withShadow]}>
            <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.typeContainer}>
                    <View
                        style={[styles.typeCircle, { backgroundColor: yellow }]}
                    />
                    <View
                        style={[
                            styles.typeView,
                            withShadow,
                            { backgroundColor: yellow },
                        ]}>
                        <View style={styles.textView}>
                            <Text style={[styles.text, { color: black }]}>
                                Эвакуация
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.typeContainer}>
                <View style={[styles.typeCircle, { backgroundColor: green }]} />
                <View
                    style={[
                        styles.typeView,
                        withShadow,
                        { backgroundColor: green },
                    ]}>
                    <View style={styles.textView}>
                        <Text style={[styles.text, { color: white }]}>
                            Баран
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const lightGrey = 'rgb(196, 196, 196)';
const yellow = 'rgb(246, 247, 227)';
//const red = 'rgb(229, 104, 110)';
const black = 'rgb(69, 69, 69)';
const white = 'rgb(248, 248, 248)';
const green = 'rgb(92, 182, 147)';

const withShadow = {
    shadowColor: lightGrey,
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 15,
};

const styles = StyleSheet.create({
    typesContainer: {
        //backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: screenHeight * 0.04 + 65,
        width: '94%',
        borderRadius: 10,
        paddingTop: 20,
        alignSelf: 'center',
    },
    typeContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    typeCircle: {
        height: 50,
        width: 50,
        borderRadius: 35,
        marginRight: 10,
    },
    typeView: {
        height: 50,
        justifyContent: 'center',
        borderRadius: 35,
        paddingHorizontal: 30,
    },
    textView: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 19,
        fontWeight: '300',
    },
});
