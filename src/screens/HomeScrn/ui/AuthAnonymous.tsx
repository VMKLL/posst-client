import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputCarNumber } from '../../../components/InputCarNumber';
import { SimpleButton } from '../../../components/Button';
import { Header1, Header3 } from '../../../components/Header';
import { DisabledButton } from '../../../components/DisabledButton';

export const AuthAnonymous = ({
    switchButton,
    carNumber,
    setCarNumber,
    carRegion,
    setCarRegion,
    onPressSignUp,
}) => {
    return (
        <>
            <View style={[styles.marginBottom, styles.marginTop]}>
                <Header1 label='Вход' />
            </View>

            <View style={styles.marginBottom}>
                <InputCarNumber
                    number={carNumber}
                    region={carRegion}
                    onNumberChange={setCarNumber}
                    onRegionChange={setCarRegion}
                />
            </View>
            <View>
                {!switchButton ? (
                    <SimpleButton
                        label="Подписаться"
                        onPress={onPressSignUp}
                    />
                ) : (
                    <DisabledButton label="Подписаться" />
                )}
            </View>
            <View
                style={[{
                    width: '90%',
                    paddingTop: 10,
                    paddingBottom: 5,
                    alignSelf: 'center',
                }, styles.marginVeryBottom]}>
                <Text style={styles.descriptionText}>Вы будете получать оповещения по номеру автомобиля</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 30,
    },
    marginBottom: {
        marginBottom: 10,
    },
    marginVeryBottom: {
        marginBottom: 40,
    },
    descriptionText: {
        color: 'rgb(69, 69, 69)',
        fontSize: 17,
        fontWeight: '300',
    },
});
