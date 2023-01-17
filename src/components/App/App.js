import React, { Component } from 'react';
import './App.css';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
    this.addNewOrder = this.addNewOrder.bind(this)
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/api/v1/orders')
    const json = await response.json()
    this.setState( {orders: json.orders})
  }

  addNewOrder(newOrder) {
    return fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newOrder)})
        .then(res => res.json())
        .then(data => this.setState({ orders: [...this.state.orders, data]}))
        .catch(err => console.log('ERROR', err))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.addNewOrder}/>
        </header>
          <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;


// {id: 2, name: "Alex", ingredients: ["cheese", "beans"]}