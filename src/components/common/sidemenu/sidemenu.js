// Lib imports
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Custom imports
import withStyles from '@components/common/sidemenu/withStyles';
import { Lang } from '@utils/index';
import NavigationService from '@utils/services/navigationService';

const SideMenuItem = ({ iconName, label, drawer, styles }) => {
  const { routeName = '' } = NavigationService.getCurrentRoute();
  const isActive = routeName === label;
  const content = (
    <View
      style={{ ...styles.section, ...(isActive ? styles.sectionActive : {}) }}
    >
      {isActive ? <View style={styles.sectionActiveSpan} /> : null}
      <View style={{ marginLeft: 5 }}>
        <Icon
          name={iconName}
          size={styles.sectionIcon.size}
          color={
            isActive ? styles.sectionIconActive.color : styles.sectionIcon.color
          }
        />
      </View>
      <Text style={styles.sectionText}>{Lang.getLabelFromLang(label)}</Text>
    </View>
  );

  if (isActive) {
    return content;
  }

  return (
    <TouchableOpacity
      rippleColor={styles.sectionRipple.color}
      onPress={() => {
        NavigationService.navigate(label);
        drawer.closeDrawer();
      }}
    >
      {content}
    </TouchableOpacity>
  );
};

export const SideMenuComponent = ({ drawer, styles }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.sectionText}>{`${Lang.getLabelFromLang(
        'Greetings',
      )} !`}</Text>
    </View>
    <View style={styles.sectionWrapper}>
      <SideMenuItem
        iconName={'message'}
        label={'Home'}
        drawer={drawer}
        styles={{
          ...styles,
          section: { ...styles.section, ...styles.sectionFirst },
        }}
        active
      />
      <SideMenuItem
        iconName={'library-music'}
        label={'Library'}
        drawer={drawer}
        styles={styles}
      />
      <SideMenuItem
        iconName={'insert-chart'}
        label={'Statistics'}
        drawer={drawer}
        styles={styles}
      />
      <SideMenuItem
        iconName={'settings'}
        label={'Settings'}
        drawer={drawer}
        styles={styles}
      />
    </View>
  </View>
);

export default withStyles(SideMenuComponent);
