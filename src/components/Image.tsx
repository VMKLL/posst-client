import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const win = Dimensions.get('window');

export const SmallImage = ({ uri, height, width }) => {
    return (
        <CustomImage
            uri={uri}
            height={height}
            width={width}
            marginBottom={0}
            borderRadius={10}
        />
    );
};

/* export const ImageBig = ({ uri }) => {
    return (
        <CustomImage
            uri={uri}
            height={win.width - 10}
            width={win.width - 10}
            marginBottom={10}
            borderRadius={15}
        />
    );
}; */

const CustomImage = ({ uri, marginBottom, height, width, borderRadius }) => {
    const container = {
        marginBottom: marginBottom,
        height: height,
        width: width,
    };
    const image = {
        height: height,
        width: width,
        borderRadius: borderRadius,
    };

    return (
        <View style={container}>
            <Image style={image} source={{ uri }} />
        </View>
    );
};
