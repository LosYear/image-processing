import {takeEvery, put} from 'redux-saga/effects';
import {CHOOSE_FILE, setFilename} from "../actions";

export function* imageSaga() {
    yield takeEvery(CHOOSE_FILE, chooseFile);
}

function* chooseFile(action) {
    const filename = action.value;
    yield put(setFilename(filename));
}