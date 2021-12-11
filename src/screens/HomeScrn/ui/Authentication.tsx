import React from 'react';
import { View, StyleSheet } from 'react-native';
import { noAction } from '../../../functions/noAction';
import { InputCarNumber } from '../../../components/InputCarNumber';
import { SimpleButton } from '../../../components/Button';
import { Header1 } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { Link } from '../ui/Link';
import { DisabledButton } from '../../../components/DisabledButton';

export const Authentication = ({
    isRegistered,
    switchButton,
    carNumber,
    setCarNumber,
    carRegion,
    setCarRegion,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onPressSignIn,
    onPressSignUp,
    onPressRegister,
    onPressAlreadyRegistered,
}) => {
    return (
        <>
            {authPopupHeader(isRegistered)}
            {!isRegistered ? (
                <View style={styles.marginBottom}>
                    <InputCarNumber
                        number={carNumber}
                        region={carRegion}
                        onNumberChange={setCarNumber}
                        onRegionChange={setCarRegion}
                    />
                </View>
            ) : null}
            <View style={styles.marginBottom}>
                <Input
                    label="Электронная почта"
                    value={email}
                    onChange={setEmail}
                    capitalize="none"
                />
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
            {!isRegistered && password.length > 0 ? (
                <View style={styles.marginBottom}>
                    <Input
                        label="Подтвердите пароль"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        capitalize="none"
                        secure={true}
                    />
                </View>
            ) : null}
            {isRegistered ? (
                <View style={styles.marginBottom}>
                    {!switchButton ? (
                        <SimpleButton label="Войти" onPress={onPressSignIn} />
                    ) : (
                        <DisabledButton label="Войти" />
                    )}
                </View>
            ) : (
                <View style={styles.marginBottom}>
                    {!switchButton ? (
                        <SimpleButton
                            label="Зарегистрировать"
                            onPress={onPressSignUp}
                        />
                    ) : (
                        <DisabledButton label="Зарегистрировать" />
                    )}
                </View>
            )}
            {isRegistered ? (
                <View style={styles.marginVeryBottom}>
                    <Link
                        label="Зарегистрироваться"
                        onPress={() => {
                            if (!switchButton) {
                                onPressRegister();
                            } else {
                                noAction();
                            }
                        }}
                    />
                </View>
            ) : (
                <View style={styles.marginVeryBottom}>
                    <Link
                        label="У меня уже есть аккаунт"
                        onPress={() => {
                            if (!switchButton) {
                                onPressAlreadyRegistered();
                            } else {
                                noAction();
                            }
                        }}
                    />
                </View>
            )}
        </>
    );
};

const authPopupHeader = (isRegistered: boolean) => {
    return (
        <View style={[styles.marginBottom, styles.marginTop]}>
            <Header1 label={!isRegistered ? 'Регистрация' : 'Вход'} />
        </View>
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
