import {takeEvery, put} from 'redux-saga/effects';
import {CHOOSE_FILE, setFilename, resetFilterName} from "../actions";

export function* fileSaga(){
    yield takeEvery(CHOOSE_FILE, chooseFile);
}

function* chooseFile(action) {
    yield put(setFilename(action.value));
    yield put(resetFilterName());
}