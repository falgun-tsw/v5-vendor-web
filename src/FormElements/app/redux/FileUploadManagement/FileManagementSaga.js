import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from '../slices/snackbar';
import { uploadService } from './FileManagementService'
import { setResponseId } from './FileManagementSlice';

function* Upload(data) {
    try {
        const response = yield call(uploadService, data.file, data.fileType);
        yield put(SNACKBAR_SUCCESS(response.message));
        yield put(setResponseId({id: response.id, name: data.name}))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* watchUpload() {
    yield takeEvery('setUploadAction', Upload);
}

export default function* fileManagementSaga() {
    yield all([
        watchUpload()
    ]);
}