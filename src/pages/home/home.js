// Lib imports
import React from 'react';
import { View, Text } from 'react-native';
// Custom imports
import { CommonComponents } from '@components/index';

const { Page } = CommonComponents;
const Home = () => (
  <View>
    <Text>Home</Text>
  </View>
);

export const HomePage = () => (
  <Page>
    <Home />
  </Page>
);

export default HomePage;
