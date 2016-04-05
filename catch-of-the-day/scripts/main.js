import React from 'react';
import ReactDOM from 'react-dom';

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
*/

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId"/>
        <input type="submit"/>
      </form>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#main'));
