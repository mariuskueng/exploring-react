'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator,
  StyleSheet,
} = React;

var TopScreen = require('./TopScreen');

var DesignerNews = React.createClass({
  render: function() {
    return (
      <Navigator
    initialRoute={{name: 'My First Scene', index: 0}}
    renderScene={(route, navigator) =>
      <TopScreen
        name={route.name}
      />
    }
  />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('DesignerNews', () => DesignerNews);

module.exports = DesignerNews;
