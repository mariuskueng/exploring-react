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
  TouchableHighlight,
  TouchableOpacity,
  AlertIOS,
  LinkingIOS,
} = React;

var DetailScreen = require('./DetailScreen');

var API_KEY = '750ab22aac78be1c6d4bbe584f0e3477064f646720f327c5464bc127100a1a6d';
var API_URL = 'https://www.designernews.co/api/v1/stories';
var API_URL_LOCAL = 'http://localhost:8888/stories.json';
var PAGE = 1;
var PARAMS = '?client_id=' + API_KEY + '&page=' + PAGE;
var REQUEST_URL = API_URL_LOCAL + PARAMS;

var TopScreen = React.createClass({

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

  _openStory: function(story) {
    this.props.navigator.push({
      title: story.title,
      component: DetailScreen,
      backButtonTitle: 'Top',
      passProps: {
        story: story
      },
    });
  },

  _openStoryUrl: function(url) {
    LinkingIOS.canOpenURL(url, (supported) => {
      if (!supported) {
        AlertIOS.alert('Can\'t handle url: ' + url);
      } else {
        LinkingIOS.openURL(url);
      }
    });
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderStory}
        style={styles.listView} />
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
      <View>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.storyUpvotes}>🔼 {story.vote_count}</Text>
              <TouchableOpacity activeOpacity={1} style={styles.storyUrlButton} onPress={this._openStoryUrl.bind(this, story.url)}>
                <Text style={styles.storyTitle}>{story.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={styles.storyCommentsButton} onPress={this._openStory.bind(this, story)}>
                <Text style={styles.storyComments}>✏️ {story.comment_count}</Text>
              </TouchableOpacity>
            </View>
          </View>

      <View style={styles.separator} />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listView: {
    paddingTop: 64,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  storyUpvotes: {
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    flex: 0.2,
    paddingRight: 5,
    width: 30,
  },
  storyUrlButton: {
    flex: 0.9,
  },
  storyTitle: {
    fontFamily: 'Avenir Next',
    fontSize: 20,
    textAlign: 'left',
  },
  storyCommentsButton: {
    flex: 0.2,
  },
  storyComments: {
    fontFamily: 'Avenir Next',
    paddingRight: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});

module.exports = TopScreen;
