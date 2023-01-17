import React, { Component } from 'react';
import './App.css';
import { getOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
      getOrders()
      .then(data => this.setState({ orders: data }))
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
        {!this.state.orders.length && <p>No orders yet!</p>}
        {this.state.orders.length && <Orders orders={this.state} />}
      </main>
    );
  }
}


export default App;
