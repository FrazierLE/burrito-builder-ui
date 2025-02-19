import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleIngredientChange(event) {
    event.preventDefault()
    if(!this.state.ingredients.includes(event.target.name)) {
      const ingredientsOrder = [...this.state.ingredients, event.target.name]
      this.setState({ ingredients: ingredientsOrder })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      name: this.state.name,
      ingredients: this.state.ingredients
    }
    this.props.addNewOrder(newOrder)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        {(this.state.name && this.state.ingredients.length > 0) && <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>}
        {(!this.state.name && !this.state.ingredients.length > 0) && <h5>Please add a name to the order and select desired ingredients</h5>}
      </form>
    )
  }
}

export default OrderForm;
