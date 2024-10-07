import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from '../slices/snackbar';
import { getUserProfileDetailsService, updateUserProfileDetailsService, getUserProfileLogoService, updateUserProfileLogoService, getStatesDataService, getCitiesByStateDataService} from './userProfileManagementService';
import { setUpdatedUserProfileLogo, setUserProfileDetails, setUserProfileLogo, setStatesData, setCitiesData, setProfileID, setIsProfileUpdated } from './userProfileManagementSlice';

function* getUserProfileDetails() {
    try {
        const response = yield call(getUserProfileDetailsService);
        yield put(setUserProfileDetails(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

// function* getUserProfileLogo() {
//     try {
//         let response = yield call(getUserProfileLogoService);
//         yield put(setUserProfileLogo(URL.createObjectURL(response)));
//     } catch (error) {
//         yield put(setUserProfileLogo(null));
//     }
// }
function* getUserProfileLogo(data) {
    const { payload } = data;
    try {
        // let profileId = localStorage.getItem('profileId');
        let response = yield call(getUserProfileLogoService, payload );
        yield put(setUserProfileLogo(URL.createObjectURL(response)));
    } catch (error) {
        yield put(setUserProfileLogo(null));
    }
}

function* updateUserProfileDetails(data) {
    try {
        const { payload, isProfileUpdated } = data;
        const response = yield call(updateUserProfileDetailsService, payload);
        yield put(SNACKBAR_SUCCESS(response.message));
        yield put(setIsProfileUpdated(isProfileUpdated))
        yield call(getUserProfileDetails);
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

// function* updateUserProfileLogo(payload) {
//     try {
//         const { file } = payload;
//         let response = yield call(updateUserProfileLogoService, file);
//         yield put(SNACKBAR_SUCCESS(response.message));
//         yield put(setUpdatedUserProfileLogo(response));
//     } catch (error) {
//         yield put(SNACKBAR_ERROR(error.message));
//     }
// }
function* updateUserProfileLogo(payload) {
    try {
        const { file } = payload;
        let response = yield call(updateUserProfileLogoService, file);
        localStorage.setItem('profileId', response.id);
        yield put(SNACKBAR_SUCCESS(response.message));
        yield put(setUpdatedUserProfileLogo(response));
        yield put(setProfileID(response.id));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* getStatesData() {
    try {
        let response = yield call(getStatesDataService);
        yield put(setStatesData(response.data));
    } catch (error) {
        yield put(setUserProfileLogo(null));
    }
}

function* getCitiesByStateData(data) {
    try {
        let response = yield call(getCitiesByStateDataService, data.payload);
        yield put(setCitiesData(response.data));
    } catch (error) {
        yield put(setUserProfileLogo(null));
    }
}

function* watchGetUserProfileDetails() {
    yield takeEvery('getUserProfileDetailsAction', getUserProfileDetails);
}

function* watchUpdateUserProfileDetails() {
    yield takeEvery('updateUserProfileDetailsAction', updateUserProfileDetails);
}

function* watchGetUserProfileLogo() {
    yield takeEvery('getUserProfileLogoAction', getUserProfileLogo)
}

function* watchUpdateUserProfileLogo() {
    yield takeEvery('updateUserProfileLogoAction', updateUserProfileLogo);
}

function* watchGetStatesData() {
    yield takeEvery('getStatesDataAction', getStatesData)
}

function* watchGetCitiesByStateData() {
    yield takeEvery('getCitiesByStateDataAction', getCitiesByStateData);
}
// Actions
export default function* userProfileSaga() {
    yield all([
        watchGetUserProfileDetails(),
        watchUpdateUserProfileDetails(),
        watchGetUserProfileLogo(),
        watchUpdateUserProfileLogo(),
        watchGetStatesData(),
        watchGetCitiesByStateData()
    ])

}