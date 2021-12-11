import { serverApi } from '../../../api/serverApi';
import auth from '@react-native-firebase/auth';
import createGuid from 'react-native-create-guid';
import { putReportImage } from '../../../functions/Managers/StorageManager';
import { Location } from '../ui/Map/functions/animateToRegion';

interface Address {
    regionCode: string;
    city: string;
    district: string;
    road: string;
    building: string;
}

export async function submitReport(
    reportType: string,
    carNumber: string,
    carRegion: string,
    address: Address,
    location: Location,
    photo: string,
) {
    try {
        if (
            photo &&
            location &&
            address &&
            carNumber.length === 6 &&
            (carRegion.length === 2 || carRegion.length === 3)
        ) {
            const token = await auth().currentUser.getIdToken(true);
            const imageName = await createGuid();
            const isResult = await putReportImage(
                carNumber + carRegion,
                imageName,
                photo,
            );
            if (isResult) {
                const response = await serverApi.post(
                    '/report',
                    {
                        reportType,
                        carNumber,
                        carRegion,
                        address,
                        location,
                        imageName,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const isReportSent = response.data.result;
                if (isReportSent) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.log('Submit report:\n', err.message);
        return false;
    }
}
