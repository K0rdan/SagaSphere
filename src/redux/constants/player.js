// Lib imports
import moment from "moment";

const initialPlayerState = {
  playlist: [],
  track: {
    id: 0,
    number: 0,
    name: "",
    time: "00:00:00",
    duration: "00:00:00",
    creation: moment().format("YYYY-MM-DDTHH:mm:ss.SS[Z]"),
    isPlaying: false,
    sound: null,
    url: "",
    saga: {
      id: 0,
      title: "",
      author: "",
      creation: moment().format("YYYY-MM-DDTHH:mm:ss.SS[Z]"),
      duration: "00:00:00",
      image: "",
      tracks: 0,
      url: ""
    },
    intervalID: 0
  },
  isLoading: false,
  loading: {
    state: "",
    percent: 0
  }
};

export const PlayerConsts = {
  initialState: initialPlayerState
};

export default PlayerConsts;
