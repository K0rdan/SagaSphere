// Lib imports
import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
// Custom imports
import { CommonComponents } from '@components/index';
import { queries as SagaQueries } from '@gql/Saga/index';

const { Page } = CommonComponents;
const Home = () => {
  const {
    loading,
    error,
    data: { saga },
  } = useQuery(SagaQueries.SAGA_QUERY);
  return (
    <View>
      <Text>Home</Text>
      <TouchableHighlight
        onPress={() => {
        }}
      >
        <Text>Button : {saga.name}</Text>
      </TouchableHighlight>
    </View>
  );
};

export const HomePage = () => (
  <Page>
    <Home />
  </Page>
);

export default HomePage;
