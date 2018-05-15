import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import { firebaseAuth } from '../firebase';



import SignIn from '../Authorization/SignIn/SignIn';
import SignUp from '../Authorization/SignUp/SignUp';
import { logout } from '../Authorization/Auth';
import Game from '../components/Game';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '../Game', state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/Game' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  };
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <h1 className="answerHeader"> Talk Nerdy to Me</h1>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'rounded', background: 'red'}}
                        onClick={() => {
                          logout()
                        }}
                        className="btnLogout">Logout</button>
                    : <span>
                        <Link to="/SignIn" className="navbar-brand">Login</Link>
                        <Link to="/SignUp" className="navbar-brand">Register your Team!</Link>
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/Game' exact component={Game} />
                <PublicRoute authed={this.state.authed} path='/SignIn' component={SignIn} />
                <PublicRoute authed={this.state.authed} path='/Signup' component={SignUp} />
                <PrivateRoute authed={this.state.authed} path='/Game' component={Game} />

              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
