import Footer from './components/Footer'
import './App.css';
import React from 'react'
import { useSelector } from 'react-redux'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import router from './routers'
import PrivateRoute from './routers/privateRoute'
import Scroll from './components/ScrollToTop/scroll'
import { ToastContainer } from 'react-toastify';

function App() {

  const check = useSelector(state => state.cart.checkCart);
  const useSelect = useSelector(state => state.user.list)

  let item = null
  let loginPrivate = null
  let signupPrivate = null
  if (check === false) {
    item = "/thanh-toan"
  }
  if (useSelect !== null) {
    loginPrivate = '/login'
    signupPrivate = '/sign-up'
  }
  const showPage = (routers) => {

    let result = null
    result = routers.map((value, index) => {
      if (value.path === loginPrivate || value.path === signupPrivate || value.path === item) {
        return <PrivateRoute key={index} path={value.path} exact={value.exact} component={value.main} />
      }
      else {
        return (
          <Route key={index} path={value.path} exact={value.exact} component={value.main} />
        )
      }

    })
    return result
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch >
          {showPage(router)}
        </Switch>
        <Footer />
        <Scroll />
      </div>
      <ToastContainer />
    </Router>

  );
}

export default App;
