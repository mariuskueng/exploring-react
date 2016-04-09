/*
  StorePicker
  This will let us make <StorePicker/>
*/

import React from 'react';
import { Navigation } from 'react-router';
import h from '../helpers';

var StorePicker = React.createClass({
  mixins : [Navigation],
  goToStore : function(event) {
    event.preventDefault();
    // get the data from the input
    var storeId = this.refs.storeId.value;
    this.transitionTo('/store/' + storeId);
  },
  render : function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  }
});

export default StorePicker;
