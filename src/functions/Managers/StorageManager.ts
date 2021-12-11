import storage from '@react-native-firebase/storage';

export async function putReportImage(
    сarNumber: string,
    carImageName: string,
    carPhoto: string,
) {
    try {
        const ref = storage().ref(
            `images/reports/${сarNumber}/${carImageName}.jpg`,
        );
        const result = await ref.putFile(carPhoto);
        if (result.state === 'success') {
            return true;
        } else if (result.state === 'error') {
            return false;
        }
    } catch (err) {
        console.log('Put car report image to storage:\n', err.message);
    }
}

export async function getReportThumbUri(
    сarNumber: string,
    carImageName: string,
) {
    try {
        const ref = storage().ref(
            `images/reports/${сarNumber}/thumbs/${carImageName}_200x200.jpg`,
        );
        const result = await ref.getDownloadURL();
        return result;
    } catch (err) {
        console.log('Get car report image thumb URI:\n', err.message);
    }
}

export async function getReportImageUri(
    сarNumber: string,
    carImageName: string,
) {
    try {
        const ref = storage().ref(
            `images/reports/${сarNumber}/${carImageName}.jpg`,
        );
        const result = await ref.getDownloadURL();
        return result;
    } catch (err) {
        console.log('Get car report image URI:\n', err.message);
    }
}
