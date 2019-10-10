// Lib imports
import React, { createRef, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { get } from 'lodash';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// Custom imports
import { CommonComponents } from '@components/index';
import { queries as SagaListQueries } from '@gql/SagaList/index';
import { withStyles } from '@pages/library/withStyles';

const { Loader, Error } = CommonComponents;

const renderSagaList = () => {
  const { loading, error, data } = useQuery(SagaListQueries.SAGALIST_QUERY);

  if (loading === true) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (data) {
    const carouselRef = createRef();
    const [{ carouselActiveSlide }, setState] = useState({
      carouselActiveSlide: 0,
    });
    const carouselData = get(data, 'sagas', []);
    return (
      <View>
        <Carousel
          ref={carouselRef}
          data={carouselData}
          renderItem={({ index, item }) => (
            <View style={{ backgroundColor: 'red' }}>
              <Text>
                {index}
                {item.name}
                TEST
              </Text>
            </View>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width / 2}
          inactiveSlideOpacity={0.1}
          inactiveSlideScale={1}
          loop={true}
          loopClonesPerSide={2}
          // Event handlers
          onSnapToItem={index => setState({ carouselActiveSlide: index })}
        />
        <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={carouselActiveSlide}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={carouselRef}
          tappableDots={!!carouselRef}
        />
      </View>
    );
  }

  return null;
};

export const Library = ({ styles }) => (
  <View style={styles.container}>
    <Text>Dernières sorties</Text>
    {renderSagaList()}
  </View>
);

export default withStyles(Library);
