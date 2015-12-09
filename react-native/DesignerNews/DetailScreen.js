'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} = React;

var DetailScreen = React.createClass({
  componentDidMount: function() {

  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{this.props.story.title}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop: 64,

  },
});

module.exports = DetailScreen;
