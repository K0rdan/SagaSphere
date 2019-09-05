import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import SagaSphere from './src/app';
import TrackPlayerService from '@utils/services/trackplayerService';

AppRegistry.registerComponent('sagasphere', () => SagaSphere);
TrackPlayer.registerPlaybackService(() => TrackPlayerService);
