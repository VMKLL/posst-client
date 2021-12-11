import React from 'react';
import {
    View,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';

export const Popup = ({ children, isPopupVisible, onPopupClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isPopupVisible}
            onRequestClose={onPopupClose}>
            <TouchableWithoutFeedback onPress={onPopupClose}>
                <View style={styles.container}>{children}</View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

//const transparentBlack = 'rgba(52, 52, 52, 0.9)';

const styles = StyleSheet.create({
    container: {
        //backgroundColor: transparentBlack,
        flex: 1,
        //alignItems: 'flex-start',
        //justifyContent: 'flex-start',
    },
});
