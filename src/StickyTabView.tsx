import React, {useState, useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import {Header, LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';

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

  const margin = useRef(new Animated.Value(HEADER_HEIGHT)).current;
  const y = useRef(new Animated.Value(0)).current;

  const AnimatedScrollView = useCallback(
    ({children}) => {
      return (
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y},
              },
            },
          ])}
          style={styles.scrollView}>
          {children}
        </Animated.ScrollView>
      );
    },
    [y],
  );

  const translateY = useRef(
    Animated.interpolate(y, {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: Animated.Extrapolate.CLAMP,
    }),
  ).current;

  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={props => {
        switch (props.route.key) {
          case 'about':
            return (
              <AnimatedScrollView>
                <LearnMoreLinks />
              </AnimatedScrollView>
            );
          case 'links':
            return (
              <AnimatedScrollView>
                <LearnMoreLinks />
              </AnimatedScrollView>
            );
          case 'debug':
            return (
              <AnimatedScrollView>
                <LearnMoreLinks />
              </AnimatedScrollView>
            );
          case 'reload':
            return (
              <AnimatedScrollView>
                <LearnMoreLinks />
              </AnimatedScrollView>
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
