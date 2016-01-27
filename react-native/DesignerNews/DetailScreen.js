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
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  componentDidMount: function() {

  },

  renderComments:function(comment) {
    return (
      <View style={styles.comment}>
        <Text>{comment.body}</Text>
      </View>
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{this.props.story.title}</Text>
        <Text>{this.props.story.comment}</Text>
        <ListView
          dataSource={this.props.comments}
          renderRow={this.renderComment}
          style={styles.listView} />
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
