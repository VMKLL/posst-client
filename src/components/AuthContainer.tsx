import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { clearError } from '../functions/auth/clearError';
import { getDimensions } from '../functions/getDimensions';
import { noAction } from '../functions/noAction';
import { CloseButton } from '../components/IconButton';

const screenHeight = getDimensions().screenHeight;

export const AuthContainer = ({
    children,
    errorMessage,
    containerHeight,
    onPopupClose,
}) => {
    return (
        <>
            <View style={[styles.authContainer, containerHeight]}>
                {screenHeight > 667 ? (
                    <TouchableWithoutFeedback onPress={noAction}>
                        {warning(errorMessage)}
                    </TouchableWithoutFeedback>
                ) : null}
                <View style={[styles.authMainView, withShadow]}>
                    <TouchableWithoutFeedback onPress={noAction}>
                        <View style={styles.childrenContainer}>{children}</View>
                    </TouchableWithoutFeedback>
                    <View style={styles.closeButtonView}>
                        <CloseButton onPress={() => onPopupClose()} />
                    </View>
                </View>
            </View>
            {screenHeight <= 667 ? (
                <TouchableWithoutFeedback onPress={() => clearError()}>
                    {warningSmallScreen(errorMessage)}
                </TouchableWithoutFeedback>
            ) : null}
        </>
    );
};

const warning = (errorMessage: string) => {
    return errorMessage ? (
        <View style={[styles.warningView, warningShadow]}>
            <Text style={styles.warningText}>{errorMessage}</Text>
        </View>
    ) : (
        <></>
    );
};

const warningSmallScreen = (errorMessage: string) => {
    return errorMessage ? (
        <View style={[styles.warningViewSmallScreen, warningShadow]}>
            <Text style={styles.warningText}>{errorMessage}</Text>
        </View>
    ) : (
        <></>
    );
};

const lightGrey = 'rgb(196, 196, 196)';

const withShadow = {
    shadowColor: lightGrey,
    shadowOffset: { width: -7, height: -7 },
    shadowOpacity: 1,
    shadowRadius: 15,
};

const warningShadow = {
    shadowColor: lightGrey,
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 15,
};

const yellow = 'rgb(246, 247, 227)';
const black = 'rgb(69, 69, 69)';
const white = 'rgb(255, 255, 255)';

const styles = StyleSheet.create({
    authContainer: {
        /* borderColor: '#000FFF',
        borderWidth: 2, */
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    authWarningContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    warningView: {
        backgroundColor: yellow,
        width: '95%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 30,
    },
    warningText: {
        alignItems: 'center',
        color: black,
        fontSize: 21,
        fontWeight: '300',
    },
    warningViewSmallScreen: {
        backgroundColor: yellow,
        width: '95%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        position: 'absolute',
        top: screenHeight / 20,
        right: '3%',
    },
    authMainView: {
        backgroundColor: white,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    childrenContainer: {
        alignItems: 'center',
        width: '100%',
    },
    closeButtonView: {
        position: 'absolute',
        top: screenHeight * 0.025,
        right: '3%',
    },
});
