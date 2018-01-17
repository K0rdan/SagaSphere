// Custom imports
import { PlayerActions } from "./../actions/player";
import { PlayerConsts } from "./../constants/player";

export const PlayerReducer = (state = PlayerConsts.initialState, action) => {
  const {
    error,
    type,
    playlist,
    loadingState,
    loadingPercent,
    track,
    sound,
    intervalID,
    time,
    isPlaying
  } = action;

  switch (type) {
    case PlayerActions.INIT:
      return { ...state, playlist };
    case PlayerActions.FETCHING_TRACK:
    case PlayerActions.SOUND_LOADING:
      return {
        ...state,
        isLoading: true,
        loading: {
          state: loadingState,
          percent: loadingPercent
        }
      };
    case PlayerActions.FETCHED_TRACK:
      return { ...state, track };
    case PlayerActions.SOUND_LOADED:
      return {
        ...state,
        isLoading: PlayerConsts.initialState.isLoading,
        loading: PlayerConsts.initialState.loading,
        track: Object.assign({}, state.track, {
          isPlaying: true,
          sound,
          intervalID
        })
      };
    case PlayerActions.SOUND_UPDATE_CURRENT_TIME:
      // Rerend component only when something related with 'time' have to.
      if (time !== state.track.time) {
        return {
          ...state,
          track: Object.assign({}, state.track, {
            time,
            sound,
            intervalID
          })
        };
      }

      return state || PlayerConsts.initialState;
    case PlayerActions.SOUND_PLAY:
    case PlayerActions.SOUND_PAUSE:
      return {
        ...state,
        track: Object.assign({}, state.track, {
          isPlaying,
          sound,
          intervalID
        })
      };
    case PlayerActions.SOUND_ENDED:
      return {
        ...state,
        track: Object.assign({}, state.track, {
          isPlaying: false,
          intervalID: 0,
          time: PlayerConsts.initialState.track.time
        })
      };
    case PlayerActions.FETCH_ERROR:
    case PlayerActions.SOUND_LOAD_ERROR:
      return { ...state, error };
    default:
      return state;
  }
};

export default PlayerReducer;
