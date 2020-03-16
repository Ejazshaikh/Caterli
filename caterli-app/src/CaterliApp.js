import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import View from './components/View';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import HomePage from './components/HomePage';
import RestaurantPage from './components/RestaurantPage';
import OrderPage from './components/OrderPage';
import { setAuthData } from './actions/authActions';

class CaterliApp extends PureComponent {
  componentDidMount() {
    const authData = localStorage.getItem('auth');
    if (authData) {
      this.props.dispatch(setAuthData(JSON.parse(authData)));
    }
  }

  render() {
    const { showLoginModal } = this.props.ui;
    return (
      <View style={{ flexDirection: 'column', width: '100vw', alignItems: 'center' }}>
        <Navbar />
        {showLoginModal && <LoginModal />}
        <View style={{ paddingTop: 100, justifyContent: 'center', width: '80%' }}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                component={({ history }) => (
                  <HomePage history={history} dispatch={this.props.dispatch} />
                )}
              />
              <Route
                exact
                path="/restaurants/:id"
                component={({ match, history }) => {
                  const id = match && match.params && match.params.id;
                  return <RestaurantPage id={id} history={history} />;
                }}
              />
              <Route
                exact
                path="/restaurants/:id/order"
                component={({ match, history }) => {
                  const id = match && match.params && match.params.id;
                  return <OrderPage id={id} history={history} />;
                }}
              />
              <Route path="/*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </View>
      </View>
    );
  }
}

function mapStateToProps(reduxStore) {
  return {
    auth: reduxStore.auth,
    ui: reduxStore.ui,
  };
}

export default connect(mapStateToProps, null)(CaterliApp);
