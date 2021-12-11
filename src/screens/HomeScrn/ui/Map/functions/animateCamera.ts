import { Location } from '../functions/animateToRegion';

export function animateCamera(mapRef: any, location: Location) {
    mapRef.current.animateCamera(
        {
            center: location,
        },
        { duration: 300 },
    );
}
