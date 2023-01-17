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
// const App = () => {
//   const [orders, setOrders] = useState([])

//   const getData = () => {
//     getOrders()
//       .then(data => setOrders(data))
//       .catch(err => console.error('Error fetching:', err));
//   }

  // useEffect(() => {
  //   getData()
  //   console.log('DATA', orders)
  // }, [])
  componentDidMount() {
      getOrders()
      // .then(data => this.setState({ orders: data}))
      .catch(err => console.error('Error fetching:', err));
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
