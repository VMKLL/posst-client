import { Region } from 'react-native-maps';

export function getRegionBounds(region: Region) {
    let result = null;
    const scale = 1;
    const calcMaxLatByOffset = (lng: number, offset: number) => {
        const factsValue = lng + offset;
        if (factsValue > 90) {
            return (90 - offset) * -1;
        }
        return factsValue;
    };
    const calcMinLatByOffset = (lng: number, offset: number) => {
        const factsValue = lng - offset;
        if (factsValue < -90) {
            return (90 + offset) * -1;
        }
        return factsValue;
    };
    const calcMaxLngByOffset = (lng: number, offset: number) => {
        const factsValue = lng + offset;
        if (factsValue > 180) {
            return (180 - offset) * -1;
        }
        return factsValue;
    };
    const calcMinLngByOffset = (lng: number, offset: number) => {
        const factsValue = lng - offset;
        if (factsValue < -180) {
            return (180 + offset) * -1;
        }
        return factsValue;
    };
    const latOffset = (region.latitudeDelta / 2) * scale;
    const lngD =
        region.longitudeDelta < -180
            ? 360 + region.longitudeDelta
            : region.longitudeDelta;
    const lngOffset = (lngD / 2) * scale;
    result = {
        maxLat: calcMaxLatByOffset(region.latitude, latOffset),
        minLat: calcMinLatByOffset(region.latitude, latOffset),
        maxLng: calcMaxLngByOffset(region.longitude, lngOffset),
        minLng: calcMinLngByOffset(region.longitude, lngOffset),
    };
    return result;
}
