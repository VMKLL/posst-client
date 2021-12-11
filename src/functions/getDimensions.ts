import { Dimensions } from 'react-native';

export function getDimensions() {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    return {
        screenHeight,
        screenWidth,
    };
}
