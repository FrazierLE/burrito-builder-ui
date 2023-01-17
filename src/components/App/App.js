import React, { Component } from 'react';
import './App.css';
// import { getOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/api/v1/orders')
    const json = await response.json()
    console.log('JSON', json.orders)
    this.setState( {orders: json.orders})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
          <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
