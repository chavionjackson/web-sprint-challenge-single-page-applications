import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';

function App() {
  return (
    <div>
      <div>
        <div>
          <Link id='order-pizza' to='/'>Home</Link>
        </div>

        <div>
          <Link to='/Form'>Order Now</Link>
        </div>
      </div>
      <h1>Chevy's Pie</h1>
      <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=980:*' alt='pizza'/>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/Form'>
        <Form />
      </Route>
    </Switch>
    </div>
  )
}

export default App;