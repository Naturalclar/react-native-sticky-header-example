import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const routes = [
  {key: 'about', title: 'About'},
  {key: 'links', title: 'Links'},
  {key: 'debug', title: 'Debug'},
  {key: 'reload', title: 'Reload'},
];

const HEADER_HEIGHT = 192;

const styles = StyleSheet.create({
  scrollView: {backgroundColor: 'white'},
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_HEIGHT,
  },
});

export const StickyTabView: React.FC<{}> = () => {
  const [index, setIndex] = useState(0);

  const margin = new Animated.Value(HEADER_HEIGHT);
  const y = new Animated.Value(0);

  const translateY = Animated.interpolate(y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={props => {
        switch (props.route.key) {
          case 'about':
            return (
              <Animated.ScrollView
                scrollEventThrottle={1}
                onScroll={Animated.event([
                  {nativeEvent: {contentOffset: {y}, useNativeDriver: true}},
                ])}
                style={styles.scrollView}>
                <LearnMoreLinks />
              </Animated.ScrollView>
            );
          case 'links':
            return (
              <Animated.ScrollView
                scrollEventThrottle={1}
                onScroll={Animated.event([
                  {nativeEvent: {contentOffset: {y}, useNativeDriver: true}},
                ])}
                style={styles.scrollView}>
                <LearnMoreLinks />
              </Animated.ScrollView>
            );
          case 'debug':
            return (
              <ScrollView style={styles.scrollView}>
                <DebugInstructions />
              </ScrollView>
            );
          case 'reload':
            return (
              <ScrollView style={styles.scrollView}>
                <ReloadInstructions />
              </ScrollView>
            );
          default:
            return (
              <View>
                <Text>This is default Page</Text>
              </View>
            );
        }
      }}
      renderTabBar={props => (
        <Animated.View style={{paddingTop: Animated.sub(margin, y)}}>
          <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
            <Header />
          </Animated.View>
          <TabBar {...props} />
        </Animated.View>
      )}
    />
  );
};
