import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { processInputCarNumber } from './functions/processInputCarNumber';
import { processInputCarRegion } from './functions/processInputCarRegion';
import { SmallImage } from '../Image';
import { CancelCircleButton } from '../IconButton';

export const InputCarNumber = ({
    number,
    region,
    onNumberChange,
    onRegionChange,
    uri = undefined,
    onPress = undefined,
}) => {
    const numberInputRef = useRef(null);
    const regionInputRef = useRef(null);

    const marginRight = {
        marginRight: uri ? 40 : null,
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.text1, marginRight]}
                ref={numberInputRef}
                placeholder={'А000АА'}
                value={number}
                onChangeText={(value) =>
                    processInputCarNumber(value, onNumberChange, regionInputRef)
                }
                autoCapitalize={'characters'}
                autoCorrect={false}
                maxLength={6}
                //blurOnSubmit={false}
            />
            <TextInput
                style={[styles.text2, marginRight]}
                ref={regionInputRef}
                placeholder={'777'}
                value={region}
                onChangeText={(value) =>
                    processInputCarRegion(value, onRegionChange)
                }
                autoCapitalize={'characters'}
                autoCorrect={false}
                maxLength={3}
                //keyboardType={'numeric'}
                onKeyPress={(e) => {
                    if (
                        e.nativeEvent.key === 'Backspace' &&
                        region.length === 0
                    ) {
                        numberInputRef.current.focus();
                        onNumberChange(number.slice(0, -1));
                    }
                }}
                //blurOnSubmit={false}
            />
            {uri ? (
                <>
                    <View style={styles.imageContainer}>
                        <SmallImage uri={uri} height={40} width={40} />
                    </View>
                    <View style={styles.cancelContainer}>
                        <CancelCircleButton onPress={onPress} />
                    </View>
                </>
            ) : null}
        </View>
    );
};

const white = 'rgb(255, 255, 255)';
const grey = 'rgb(196, 196, 196)';
const black = 'rgb(69, 69, 69)';

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 240,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: white,
        borderColor: grey,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 30,
    },
    text1: {
        height: '100%',
        width: 118,
        textAlign: 'center',
        color: black,
        fontSize: 23,
        fontWeight: '300',
    },
    text2: {
        height: '100%',
        width: 68,
        textAlign: 'center',
        color: black,
        fontSize: 23,
        fontWeight: '300',
    },
    imageContainer: {
        position: 'absolute',
        top: 4,
        right: 5,
    },
    cancelContainer: {
        position: 'absolute',
        top: '-15%',
        right: '-7%',
        alignSelf: 'center',
    },
});
