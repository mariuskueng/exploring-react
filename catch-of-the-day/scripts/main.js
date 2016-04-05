import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, History } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import helpers from './helpers';

/*
  App
  <App/>
*/

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    );
  }
}

/*
  Header
  <Header/>
*/

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
}

/*
  Order
  <Order/>
*/

class Order extends React.Component {
  render() {
    return (
      <p>Order</p>
    )
  }
}

/*
  Inventory
  <Inventory/>
*/

class Inventory extends React.Component {
  render() {
    return (
      <p>Inventory</p>
    )
  }
}

/*
  StorePicker
  This will let us make <StorePicker/>

  Using es5 syntax here because ReactRouter 1.x doesn't like es6
*/

var StorePicker = React.createClass({
  mixins: [History],
  goToStore: function(event) {
    event.preventDefault();

    // get the data from the input
    var storeId = this.refs.storeId.value;

    // transition from <StorePicker/> to <App/>
    this.history.pushState(null, '/store/' + storeId);
  },
  render: function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required/>
        <input type="submit"/>
      </form>
    )
  }
});

/*
  Not Found
*/

class NotFound extends React.Component {
  render() {
    return <h1>Not Found!</h1>
  }
}

/*
  Routes
*/

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
