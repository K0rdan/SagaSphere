// Lib imports
import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
// Custom imports
import { CommonComponents } from '@components/index';
import { queries as SagaQueries } from '@gql/Saga/index';

const { Loader, Error } = CommonComponents;

export const Saga = ({ defaultStyles, id }) => {
  const { loading, error, data } = useQuery(SagaQueries.SAGA_QUERY, {
    variables: { id },
  });

  if (loading === true) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (data) {
    return (
      <View style={defaultStyles}>
        <Text>SagaPage</Text>
      </View>
    );
  }

  return null;
};

export default Saga;
