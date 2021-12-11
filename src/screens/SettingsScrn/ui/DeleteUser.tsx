import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActionButton } from '../../../components/Button';
import { DisabledButton } from '../../../components/DisabledButton';
import { Header2 } from '../../../components/Header';
import { Input } from '../../../components/Input';

export const DeleteUser = ({
    password,
    setPassword,
    onPressDeleteAndSignOut,
    switchButton,
}) => {
    return (
        <>
            <View style={[styles.marginBottom, styles.marginTop]}>
                <Header2 label="Подтвердите удаление" />
            </View>
            <View style={styles.marginBottom}>
                <Input
                    label="Пароль"
                    value={password}
                    onChange={setPassword}
                    capitalize="none"
                    secure={true}
                />
            </View>
            <View style={styles.marginBottom}>
                {!switchButton ? (
                    <View style={styles.marginVeryBottom}>
                        <ActionButton
                            label="Удалить аккаунт"
                            onPress={onPressDeleteAndSignOut}
                        />
                    </View>
                ) : (
                    <View style={styles.marginVeryBottom}>
                        <DisabledButton label={'Удалить аккаунт'} />
                    </View>
                )}
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
        marginBottom: 30,
    },
});
