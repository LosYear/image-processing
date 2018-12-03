import { takeLatest, put, call } from 'redux-saga/effects';
import {
  CHOOSE_FILE,
  UPDATE_IMAGE_DATA,
  setFilename,
  calculateHistogram,
  chooseFile as chooseFileAction,
  setDimensions,
  hideLoader
} from '../actions';
import { getFilePixelData, savePixelData } from '../helpers/canvas';

export function* imageSaga() {
  yield takeLatest(CHOOSE_FILE, chooseFile);
  yield takeLatest(UPDATE_IMAGE_DATA, updateImageData);
}

function* chooseFile(action) {
  const filename = action.value;
  yield put(setFilename(filename));

  const pixelData = yield call(getFilePixelData, filename);
  yield put(setDimensions(pixelData.width, pixelData.height));
  yield put(calculateHistogram(pixelData.data));
  yield put(hideLoader());
}

function* updateImageData(action) {
  const { data, width, height } = action;
  const filename = yield call(savePixelData, data, width, height);

  yield put(chooseFileAction(filename));
}
