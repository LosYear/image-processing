import {takeLatest, put, call} from 'redux-saga/effects';
import {
    CHOOSE_FILE,
    setFilename,
    calculateHistogram,
} from "../actions";
import {getFilePixelData} from "../helpers/canvas";

export function* imageSaga() {
    yield takeLatest(CHOOSE_FILE, chooseFile);
}

function* chooseFile(action) {
    const filename = action.value;
    yield put(setFilename(filename));

    const pixelData = yield call(getFilePixelData, filename);
    yield put(calculateHistogram(pixelData));
}