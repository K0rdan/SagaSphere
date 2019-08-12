// Lib imports
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useQuery } from '@apollo/react-hooks';
import { map, get } from 'lodash';
// Custom imports
import { CommonComponents } from '@components/index';
import { queries as SagaListQueries } from '@gql/SagaList/index';
import { TrackPlayerOptions } from '@utils/trackPlayer';

const { Page, Loader, Error } = CommonComponents;

const renderSagaList = ({ navigate }) => {
  const { loading, error, data } = useQuery(SagaListQueries.SAGALIST_QUERY);

  if (loading === true) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (data) {
    return map(get(data, 'sagas', []), ({ id, name }, index) => (
      <View key={'Home-SagaList-Saga-' + index}>
        <TouchableHighlight onPress={() => navigate('Saga', { sagaId: id })}>
          <Text>
            Sagas[{index}] : {name}
          </Text>
        </TouchableHighlight>
      </View>
    ));
  }

  return null;
};

const Home = ({ navigation }) => (
  <View>
    {renderSagaList(navigation)}
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

export const HomePage = ({ navigation }) => (
  <Page>
    <Home navigation={navigation} />
  </Page>
);

export default HomePage;
