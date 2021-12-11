import RNLocation from 'react-native-location';
import { nominatimApi } from '../../api/nominatimApi';
import { Location } from '../../screens/HomeScrn/ui/Map/functions/animateToRegion';

/*
Statuses:
- denied
- notDetermined
- authorizedWhenInUse

Permissions android:
- "fine" = GPS, Cell and WiFi
- "coarse" = Cell and WiFi
*/

export const requestLocationPermission = () => {
    RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
            detail: 'coarse',
            rationale: {
                title: 'Разрешите доступ к геоданным',
                message:
                    'Чтобы Вы могли отправлять репорты, пожалуйста, разрешите доступ к геопозиции для Evac в настройках устройства.',
                buttonPositive: 'Разрешить',
                buttonNegative: 'Запретить',
            },
        },
    });
};

export const checkLocationPermission = () => {
    return RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
            detail: 'coarse',
        },
    });
};

export const getCurrentLocation = async () => {
    try {
        let result = null;
        RNLocation.configure({ distanceFilter: 0 });
        const location = await RNLocation.getLatestLocation({ timeout: 60000 });
        if (location) {
            result = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
        }
        return result;
    } catch (err) {
        console.log('Get current location:\n', err.message);
    }
};

export async function getAddressByLocation(location: Location) {
    try {
        let result = {
            state: null,
            city: null,
            district: null,
            road: null,
            building: null,
        };
        const response = await nominatimApi.get(
            `/${location.latitude},${location.longitude}?format=json&addressdetails=1&accept-language=ru&countrycodes=ru`,
        );

        if (response.data[0].address) {
            const address = response.data[0].address;
            let country: string;
            let state: string;
            let city: string;
            let district: string;
            let road: string;
            let building: string;
            address.country ? (country = address.country) : (country = null);
            address.state ? (state = address.state) : (state = null);
            address.city ? (city = address.city) : (city = null);
            address.suburb ? (district = address.suburb) : (district = null);
            address.road ? (road = address.road) : (road = null);
            address.house_number
                ? (building = address.house_number)
                : (building = null);

            if (country === 'Россия') {
                result = {
                    state: state,
                    city: city,
                    district: district,
                    road: road,
                    building: building,
                };
            } else if (country === 'Украина' && state) {
                if (state.includes('Крым')) {
                    state = 'Республика Крым';
                    result = {
                        state: state,
                        city: city,
                        district: district,
                        road: road,
                        building: building,
                    };
                }
            } else if (country === 'Украина' && !state) {
                result = {
                    state: state,
                    city: city,
                    district: district,
                    road: road,
                    building: building,
                };
            }
        }
        return result;
    } catch (err) {
        console.log('Get address by location:\n', err.message);
        return {
            state: null,
            city: null,
            district: null,
            road: null,
            building: null,
        };
    }
}
