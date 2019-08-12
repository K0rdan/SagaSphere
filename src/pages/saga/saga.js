// Lib imports
import React from 'react';
import { View, Text } from 'react-native';
// Custom imports
import { CommonComponents } from '@components/index';

const { Page } = CommonComponents;

const Saga = () => (
  <View>
    <Text>SagaPage</Text>
  </View>
);

export const SagaPage = () => (
  <Page>
    <Saga />
  </Page>
);

export default SagaPage;
