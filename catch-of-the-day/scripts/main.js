import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, History } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import helpers from './helpers';

let history = createBrowserHistory()

/*
  App
  <App/>
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentDidMount = () => {
    let localStorageRef = localStorage.getItem('store-' + this.props.
      params.storeId);

    if (localStorageRef) {
      // update our component state to reflect what is in localStorage
      this.setState(JSON.parse(localStorageRef));
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem('store-' + this.props.params.storeId,
      JSON.stringify(nextState));
  }

  addToOrder = (key) => {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
  }

  addFish = (fish) => {
    let timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state
    this.setState({ fishes: this.state.fishes });
  }

  loadSamples = () => {
    this.setState({
      fishes: require('./sample-fishes')
    });
  }

  renderFish = (key) => {
    return <Fish key={key} index={key} details={this.state.fishes[key]}
      addToOrder={this.addToOrder}/>
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    );
  }
}

/*
  Fish
  <Fish />
*/

class Fish extends React.Component {
  onButtonClick = () => {
    console.log('Going to add the fish: ', this.props.index);
    this.props.addToOrder(this.props.index);
  }

  render() {
    let details = this.props.details;
    let isAvailable = (details.status === 'available' ? true : false);
    let buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');

    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{helpers.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    )
  }
}

/*
  Add Fish Form
  <AddFishForm/>
*/

class AddFishForm extends React.Component {
  createFish = (event) => {
    // 1. Stop the form from submitting
    event.preventDefault();

    // 2. Take the data from the form and create an object
    let fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }

    // 3. Add the fish to the App State
    this.props.addFish(fish);
    this.refs.fishForm.reset();

  }

  render() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price"/>
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image"/>
        <button type="Submit">+ Add Item</button>
      </form>
    )
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
  renderOrder = (key) => {
    let fish = this.props.fishes[key];
    let count = this.props.order[key];

    if (!fish) {
      return <li key={key}>Sorry, fish no longer available!</li>
    }

    return (
      <li key={key}>
        {count}lbs
        {fish.name}
        <span className="price">{helpers.formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    let orderIds = Object.keys(this.props.order);

    let total = orderIds.reduce((prevTotal, key) => {
      let fish = this.props.fishes[key];
      let count = this.props.order[key];
      let isAvailable = fish && fish.status === 'available';

      if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }

      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {helpers.formatPrice(total)}
          </li>
        </ul>
      </div>
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
      <div>
        <h2>Inventory</h2>

        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

/*
  StorePicker
  This will let us make <StorePicker/>

  Using es5 syntax here because ReactRouter 1.x doesn't like es6
*/

class StorePicker extends React.Component {
  goToStore = (event) => {
    event.preventDefault();

    // get the data from the input
    let storeId = this.refs.storeId.value;

    // transition from <StorePicker/> to <App/>
    this.props.history.pushState(null, '/store/' + storeId);
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required/>
        <input type="submit"/>
      </form>
    )
  }
};

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
  <Router history={history}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
