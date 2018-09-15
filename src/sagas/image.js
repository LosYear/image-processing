import {takeLatest, put} from 'redux-saga/effects';
import {
    CHOOSE_FILE,
    setFilename,
    calculateHistogram,
} from "../actions";

export function* imageSaga() {
    yield takeLatest(CHOOSE_FILE, chooseFile);
}

function* chooseFile(action) {
    const filename = action.value;
    yield put(setFilename(filename));
    yield put(calculateHistogram());
}