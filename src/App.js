import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import * as yup from 'yup';
import Home from './Home';
import Pizza from './Pizza';
import schema from './formSchema';

const initialFormValues = {
  name: '',
  size: '',
  toppings: {
    pepperoni: false,
    sausage: false,
    onions: false,
    olives: false,
    peppers: false
  },
  instructions: ''
}

const initialFormErrors = {
  name: '',
  size: ''
}

const initialOrders = []
const initialDisabled = true

const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [orders, setOrders] = useState(initialOrders)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/users', newOrder)
    .then(response => {
      setOrders([response.data, ...orders])
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      setFormValues(initialFormValues)
    })
  }

  const validate = (name, value) => {
    //for yup schema
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      .catch(error => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors
        })
      })
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues, 
      [name]: value
    })
  }

  const checkboxChange = (event) => {
    const { name, checked } = event.target
    setFormValues({
      ...formValues, 
      toppings: {
        ...formValues.toppings, 
        [name]: checked
      }
    })
  }

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: formValues.toppings,
      instructions: formValues.instructions.trim()
    }
    postNewOrder(newOrder)
  }

  useEffect (() => {
    console.log(formValues)
  }, [formValues])

  useEffect (() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])


  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
        <div className="navButtons">
          <Link to='/pizza' id='orderForm'>Pizza Order</Link>
          <Link to='/help' id='help'>Help</Link>
          <Link to='/' id='home'>Home</Link>
        </div>
      </nav>
      
      <Switch>
        <Route path='/help'>
          <h1>Hungry? We are here to help!</h1>
        </Route>

        <Route path='/pizza'>
          <Pizza 
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          checkbox={checkboxChange}
          disabled={disabled}
          errors={formErrors}
          />
          {
            orders.map((order, index) => {
              let toppingList = Object.keys(order.toppings);
  let chosenToppings = toppingList.filter(function (picked) {
    return order.toppings[picked];
  });

              return <div key={index}>
                      <h2>{order.name}</h2>
                      <p>{order.size}</p>
                      <p>{chosenToppings}</p>
                      <p>{order.instructions}</p>
                      </div>
            })
          }
        </Route>

        <Route exact path='/'>
          <Home />
        </Route>

        <Redirect to='/' />
      </Switch>
    </>
  );
};
export default App;
