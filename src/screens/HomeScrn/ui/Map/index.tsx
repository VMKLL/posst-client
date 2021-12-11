import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';
import { getDimensions } from '../../../../functions/getDimensions';
import { noAction } from '../../../../functions/noAction';
import {
    requestLocationPermission,
    checkLocationPermission,
    getCurrentLocation,
} from '../../../../functions/Managers/LocationManager';
import { getReportImageUri } from '../../../../functions/Managers/StorageManager';
import { getReports } from './functions/getReports';
import { getReportInfo } from './functions/getReportInfo';
import { animateCamera } from './functions/animateCamera';
import { Popup } from '../../../../components/Popup';
import { CloseButton } from '../../../../components/IconButton';
import { StatusIndicator } from '../../../../components/ActivityIndicator';

const { screenHeight, screenWidth } = getDimensions();

export const Map = ({ children, mapRef, carPhotoUri, carLocation }) => {
    const [locationStatus, setLocationStatus] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState(defaultRegion);
    const [carReports, setCarReports] = useState([]);
    const [reportUri, setReportUri] = useState({ uri: null });
    const [reportLocation, setReportLocation] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        return RNLocation.subscribeToPermissionUpdates((s) => {
            setLocationStatus(s);
        });
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (map && userLocation) {
            const region = {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            };
            map.animateToRegion(region, 300);
        } else if (map && !userLocation) {
            map.animateToRegion(defaultRegion, 300);
        }
    }, [userLocation, mapRef]);

    useEffect(() => {
        const fetchMapRegion = async () => {
            const permission = await checkLocationPermission();
            if (permission) {
                const location = await getCurrentLocation();
                setUserLocation(location);
                setMapRegion({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            } else if (!permission && locationStatus === 'notDetermined') {
                requestLocationPermission();
            } else if (!permission && locationStatus === 'denied') {
                setUserLocation(null);
                setCarReports([]);
            }
        };
        fetchMapRegion();
    }, [locationStatus]);

    useEffect(() => {
        const fetchReports = async () => {
            const reports = await getReports(userLocation, mapRegion);
            setCarReports(reports);
        };
        if (userLocation && !carPhotoUri && !reportLocation) {
            fetchReports();
        }
    }, [carPhotoUri, userLocation, mapRegion, reportLocation]);

    useEffect(() => {
        setReportLocation(carLocation);
    }, [carLocation]);

    useEffect(() => {
        if (carPhotoUri && reportLocation) {
            animateCamera(mapRef, reportLocation);
        } else if (!carPhotoUri && reportLocation) {
            setReportLocation(null);
        }
    }, [carPhotoUri, mapRef, reportLocation]);

    interface Report {
        location: {
            x: number;
            y: number;
        };
        reportid: number;
    }

    async function onPressReport(report: Report) {
        setIsPopupVisible(true);
        const location = {
            latitude: report.location.x,
            longitude: report.location.y,
        };
        animateCamera(mapRef, location);
        const reportInfo = await getReportInfo(report.reportid);
        const number = reportInfo.carNumber + reportInfo.carRegion;
        const uri = await getReportImageUri(number, reportInfo.imageName);
        setReportUri({ uri });
    }

    function onPopupClose() {
        setReportUri({ uri: null });
        setIsPopupVisible(false);
    }

    const FreshReport = (
        <>
            {carPhotoUri && reportLocation ? (
                <Marker
                    pinColor={'rgb(245, 62, 80)'}
                    coordinate={{
                        latitude: reportLocation.latitude,
                        longitude: reportLocation.longitude,
                    }}
                    onPress={(e) => {
                        const location = e.nativeEvent.coordinate;
                        animateCamera(mapRef, location);
                    }}
                />
            ) : null}
        </>
    );

    return (
        <>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.mapView}
                initialRegion={mapRegion}
                onRegionChangeComplete={(region) => {
                    setMapRegion(region);
                }}
                showsUserLocation
                showsMyLocationButton={false}
                maxZoomLevel={19}
                clusterColor={grey}>
                {FreshReport}
                {!carPhotoUri &&
                    carReports &&
                    carReports.map((report, index) => (
                        <Marker
                            key={index}
                            icon={require('../../../../images/Marker.png')}
                            coordinate={{
                                latitude: report.location.x,
                                longitude: report.location.y,
                            }}
                            onPress={() => {
                                onPressReport(report);
                            }}
                        />
                    ))}
            </MapView>
            {children}
            <Popup {...{ isPopupVisible, onPopupClose }}>
                <View style={styles.transparentContainer}>
                    <View style={styles.statusIndicator}>
                        <StatusIndicator color={lightGrey} />
                    </View>
                    <TouchableWithoutFeedback onPress={noAction}>
                        <Image style={styles.image} source={reportUri} />
                    </TouchableWithoutFeedback>
                    <View style={styles.closeButtonView}>
                        <CloseButton onPress={() => onPopupClose()} />
                    </View>
                </View>
            </Popup>
        </>
    );
};

const defaultRegion = {
    latitude: 49,
    longitude: 50,
    latitudeDelta: 40,
    longitudeDelta: 40,
};

const transparentBlack = 'rgba(52, 52, 52, 0.9)';
const lightGrey = 'rgb(173, 173, 173)';
const grey = 'rgb(83, 83, 83)';

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    },
    statusIndicator: {
        position: 'absolute',
        alignSelf: 'center',
    },
    transparentContainer: {
        backgroundColor: transparentBlack,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: screenHeight,
        width: screenWidth,
    },
    closeButtonView: {
        position: 'absolute',
        top: screenHeight * 0.06,
        right: '3%',
    },
});
