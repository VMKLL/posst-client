export interface Location {
    latitude: number;
    longitude: number;
}

export function animateToRegion(mapRef: any, location: Location) {
    mapRef.current.animateToRegion(
        {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
        },
        300,
    );
}
