import TrackPlayer from 'react-native-track-player';

export const TrackPlayerService = async () => {
  TrackPlayer.addEventListener('playback-state', ({ state }) => {
    console.log('TrackPlayer State changed', state);
  });
  TrackPlayer.addEventListener('playback-error', error => {
    console.log('TrackPlayer Error', error);
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy()
  });

};
export default TrackPlayerService;
