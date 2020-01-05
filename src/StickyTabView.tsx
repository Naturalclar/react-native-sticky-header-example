import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
// import Animated from 'react-native-reanimated';

const routes = [
  {key: 'about', title: 'About'},
  {key: 'links', title: 'Links'},
  {key: 'foo', title: 'Foo'},
  {key: 'bar', title: 'Bar'},
];

export const StickyTabView: React.FC<{}> = () => {
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={props => {
        switch (props.route.key) {
          case 'about':
            return (
              <View>
                <Text>This is About Page</Text>
              </View>
            );
          case 'links':
            return (
              <View>
                <Text>This is Links Page</Text>
              </View>
            );
          case 'foo':
            return (
              <View>
                <Text>This is foo Page</Text>
              </View>
            );
          case 'bar':
            return (
              <View>
                <Text>This is bar Page</Text>
              </View>
            );
          default:
            return (
              <View>
                <Text>This is default Page</Text>
              </View>
            );
        }
      }}
      renderTabBar={props => <TabBar {...props} />}
    />
  );
};
