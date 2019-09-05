// Lib imports
import TrackPlayer from 'react-native-track-player';
import TrackPlayerService from '@utils/services/trackplayerService';

export { TrackPlayerService };

export const TrackPlayerOptions = {
  stopWithApp: true,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_STOP,
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
};

export const TrackPlayerUtils = {
  playerService: TrackPlayerService,
  playerOptions: TrackPlayerOptions,
};

export default TrackPlayerUtils;
