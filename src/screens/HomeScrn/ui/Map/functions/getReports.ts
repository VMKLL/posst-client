import { Region } from 'react-native-maps';
import { getAddressByLocation } from '../../../../../functions/Managers/LocationManager';
import { getRegionBounds } from './getRegionBounds';
import auth from '@react-native-firebase/auth';
import { serverApi, source } from '../../../../../api/serverApi';
import { Location } from './animateToRegion';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
const date = dayjs
    .utc()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('month', 1)
    .set('year', 2020)
    .format();

export async function getReports(location: Location, mapRegion: Region) {
    try {
        let result = [];
        const address = await getAddressByLocation(location);
        const cityName = address.city;
        const regionBounds = getRegionBounds(mapRegion);
        const maxLat = regionBounds.maxLat;
        const minLat = regionBounds.minLat;
        const maxLng = regionBounds.maxLng;
        const minLng = regionBounds.minLng;
        const token = await auth().currentUser.getIdToken(true);
        const response = await serverApi.get('/reports', {
            headers: { Authorization: `Bearer ${token}` },
            params: { cityName, maxLat, minLat, maxLng, minLng, date },
            cancelToken: source.token,
        });
        result = response.data;
        console.log('Get reports: ', result.length);
        return result;
    } catch (err) {
        console.log('Get reports:\n', err.message);
        return [];
    }
}
