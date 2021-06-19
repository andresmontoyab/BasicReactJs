import './App.css';
import Header from './Header'
import Home from './Home';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from './Checkout'
import Login from './Login';
import { useEffect } from 'react';
import {auth} from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe} from '@stripe/stripe-js'
import { Elements} from '@stripe/react-stripe-js'

const promise = loadStripe(
  'pk_test_51J3pi0IxX3vLdReG5mESF3qTmXDQY2l8Oi0iiWbjxEFGnZVCN5YiQAf91xyxxOQ5u5nJKzLmSyF1jObPyrlG8t0u00MPKMAMmk'
  );


function App() {
  const [{}, dispatch] = useStateValue()
  useEffect(() => {
      // WIll only run once when the app component loads
      auth.onAuthStateChanged(authUser => {
        console.log('The user is >>>', authUser)
        if (authUser) {
          // The user just logged in / the user was logged in
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        } else {
          dispatch({
            type: 'SET_USER',
            user: null
          })
          // The user is logged out
        }
      })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
