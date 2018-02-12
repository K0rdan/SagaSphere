// Lib imports
import RNFetchBlob from "react-native-fetch-blob";
import { unzip } from "react-native-zip-archive";
import Sound from "react-native-sound";
import moment from "moment";
// Custom imports
import { PlayerConsts } from "./../constants/player";
import { Date } from "./../../utils/index";

const LOADING_STATE = {
  ERROR: "Error",
  DOWNLOADING: "Downloading",
  BLOBING: "Blobing",
  UNZIPPING: "Unzipping",
  LOADING: "Loading",
  COMPLETED: "Completed"
};

// ...
export const INIT = "INIT";
export const init = playlist => ({
  type: INIT,
  playlist
});

// FETCHING DATA ACTIONS
export const FETCHING_TRACK = "FETCHING_TRACK";
export const fetchingTrack = (track, loadingState, loadingPercent) => ({
  type: FETCHING_TRACK,
  track,
  loadingState,
  loadingPercent
});

export const FETCHED_TRACK = "FETCHED_TRACK";
export const fetchedTrack = track => ({
  type: FETCHED_TRACK,
  track: Object.assign({}, PlayerConsts.initialState.track, track, {
    duration: Date.timeAsHourMinSec(track.duration)
  })
});

export const FETCH_ERROR = "FETCH_ERROR";
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
});

// SOUND ACTIONS
export const SOUND_LOADING = "SOUND_LOADING";
export const SOUND_LOADED = "SOUND_LOADED";
export const SOUND_LOAD_ERROR = "SOUND_LOAD_ERROR";
export const SOUND_ENDED = "SOUND_ENDED";

export const SOUND_UPDATE_CURRENT_TIME = "SOUND_UPDATE_CURRENT_TIME";
export const updateSoundCurrentTime = () => (dispatch, getState) => {
  const { PlayerReducer: { track: { sound, intervalID } } } = getState();
  sound.getCurrentTime((seconds) => {
    const elapsedTime = moment.duration(seconds, "seconds");
    dispatch({
      type: SOUND_UPDATE_CURRENT_TIME,
      time: Date.timeAsHourMinSec(elapsedTime),
      sound,
      intervalID
    });
    // Check if the track is ended
    const soundDuration = moment
      .duration(sound.getDuration(), "seconds")
      .asMilliseconds();
    if (Math.abs(soundDuration - elapsedTime) < 10) {
      clearInterval(intervalID);
      dispatch({ type: SOUND_ENDED });
    }
  });
};

export const SOUND_PLAY = "SOUND_PLAY";
export const play = () => (dispatch, getState) => {
  const { PlayerReducer: { track: { sound } } } = getState();
  const intervalID = setInterval(() => dispatch(updateSoundCurrentTime()), 100);
  sound.play();

  dispatch({
    type: SOUND_PLAY,
    sound,
    intervalID,
    isPlaying: true
  });
};

export const SOUND_PAUSE = "SOUND_PAUSE";
export const pause = () => (dispatch, getState) => {
  const { PlayerReducer: { track: { sound, intervalID } } } = getState();
  clearInterval(intervalID);
  sound.pause();

  dispatch({
    type: SOUND_PAUSE,
    sound,
    intervalID: 0,
    isPlaying: false
  });
};

// MAIN ACTIONS
export const SOUND_LOAD = "SOUND_LOAD";
export const loadSound = soundPath => (dispatch) => {
  dispatch({ type: SOUND_LOAD });
  dispatch({
    type: SOUND_LOADING,
    loadingState: LOADING_STATE.LOADING,
    loadingPercent: 100
  });
  const sound = new Sound(soundPath, Sound.LIBRARY, (error) => {
    if (error) {
      dispatch({ type: SOUND_LOAD_ERROR, error });
    }

    sound.play();

    const intervalID = setInterval(
      () => dispatch(updateSoundCurrentTime(sound)),
      100
    );

    dispatch({
      type: SOUND_LOADED,
      sound,
      intervalID
    });
  });
};

export const FETCH_TRACK = "FETCH_TRACK";
export const fetchTrack = track => (dispatch) => {
  const { number, url, saga } = track;
  const sagaPath = `${RNFetchBlob.fs.dirs.MusicDir}/${saga.title}/${number}`;
  return RNFetchBlob.fs
    .exists(`${sagaPath}/donjon-de-naheulbeuk01.mp3`)
    .then((exists) => {
      if (exists) {
        dispatch(fetchedTrack(track));
        return dispatch(loadSound(`${sagaPath}/donjon-de-naheulbeuk01.mp3`));
      }

      return RNFetchBlob.fetch("GET", url)
        .progress({ interval: 100 }, (received, total) => {
          dispatch(fetchingTrack(
              track,
              LOADING_STATE.DOWNLOADING,
              Math.floor(received / total * 100)
            ));
        })
        .then((res) => {
          dispatch(fetchingTrack(track, LOADING_STATE.BLOBING, 100));
          return res.blob();
        })
        .then((blob) => {
          dispatch(fetchingTrack(track, LOADING_STATE.UNZIPPING, 100));
          return unzip(blob.getRNFetchBlobRef(), sagaPath);
        })
        .then(() => {
          dispatch(fetchedTrack());
          return dispatch(loadSound(`${sagaPath}/donjon-de-naheulbeuk01.mp3`));
        })
        .catch((error) => {
          dispatch(fetchError(error));
        });
    })
    .catch((error) => {
      dispatch(fetchError(error));
    });
};

export const PlayerActions = {
  INIT,
  FETCH_TRACK,
  FETCHING_TRACK,
  FETCHED_TRACK,
  FETCH_ERROR,
  SOUND_LOAD,
  SOUND_LOADING,
  SOUND_LOADED,
  SOUND_UPDATE_CURRENT_TIME,
  SOUND_ENDED,
  SOUND_LOAD_ERROR,
  SOUND_PLAY,
  SOUND_PAUSE,
  init,
  fetchTrack,
  loadSound,
  updateSoundCurrentTime,
  play,
  pause
};

export default PlayerActions;
