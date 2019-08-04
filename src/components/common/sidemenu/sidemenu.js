// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Custom imports
import withStyles from '@components/common/sidemenu/withStyles';
import { Lang } from '@utils/index';

const SideMenuItem = ({ iconName, label, styles }) => (
  <View accessible style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon
      name={iconName}
      size={styles.sectionIcon.size}
      color={styles.sectionIcon.color}
    />
    <Text style={styles.text}>{Lang.getLabelFromLang(label)}</Text>
  </View>
);

export const SideMenuComponent = ({ styles }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.text}>{`${Lang.getLabelFromLang(
        'Greetings',
      )} !`}</Text>
    </View>
    <View style={styles.section}>
      <RectButton
        style={{ flex: 1 }}
        onPress={() => {
          console.log('SideMenu, RectButton');
        }}
      />
      <SideMenuItem
        iconName={'insert-chart'}
        label={'Statistics'}
        styles={styles}
      />
    </View>
  </View>
);

export default compose(withStyles)(SideMenuComponent);
