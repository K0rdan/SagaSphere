// Lib imports
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import TrackPlayer from 'react-native-track-player';
// Custom imports
import { TrackPlayerOptions } from '@utils/trackPlayer';
import withStyles from '@pages/home/withStyles';

export const Home = ({ styles }) => (
  <View style={styles.container}>
    <Text>Home</Text>
    <TouchableHighlight
      onPress={() => {
        TrackPlayer.setupPlayer().then(async () => {
          await TrackPlayer.updateOptions(TrackPlayerOptions);
          await TrackPlayer.add({
            id: 'local-track',
            url: 'http://pconsole.free.fr/miroirs/POC/ogg/donjon-episode01.ogg',
            title: 'DDN Ep.01',
            artist: 'POC',
            artwork: 'https://picsum.photos/200',
          });
          await TrackPlayer.play();
        });
      }}
    >
      <Text>Button</Text>
    </TouchableHighlight>
  </View>
);

export default withStyles(Home);
