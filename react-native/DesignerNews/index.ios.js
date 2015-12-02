/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

var API_KEY = '750ab22aac78be1c6d4bbe584f0e3477064f646720f327c5464bc127100a1a6d';
var API_URL = 'https://www.designernews.co/api/v1/stories';
var API_URL_LOCAL = 'http://localhost:8888/stories.json'
var PAGE = 1;
var PARAMS = '?client_id=' + API_KEY + '&page=' + PAGE;
var REQUEST_URL = API_URL_LOCAL + PARAMS;

var DesignerNews = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderStory}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading stories...
        </Text>
      </View>
    );
  },

  renderStory: function(story) {
    return (
      <View style={styles.story}>
        <View style={styles.rightContainer}>
          <Text style={styles.upvotes}>{story.vote_count}</Text>
          <Text style={styles.title}>{story.title}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  upvotes: {
    width: 53,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

AppRegistry.registerComponent('DesignerNews', () => DesignerNews);
