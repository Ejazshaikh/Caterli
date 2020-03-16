import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import View from './View';
import Text from './Text';
import COLORS from '../utils/colors';
import Button from './Button';
import { showLoginModal } from '../actions/uiActions';
import { signout } from '../actions/authActions';

class Navbar extends PureComponent {
  showLogin = () => this.props.dispatch(showLoginModal());

  signOutUser = () => this.props.dispatch(signout());

  render() {
    const { isLoggedIn } = this.props.auth;
    return (
      <View
        style={{
          position: 'fixed',
          width: '100%',
          padding: '15px 10px',
          backgroundColor: '#512DA8',
          zIndex: 1,
        }}
      >
        <View style={{ width: '100%', padding: '0 40px' }}>
          <Text style={{ fontSize: 20, color: COLORS.WHITE }}>Caterli</Text>
          <View style={{ width: '100%', padding: '0 40px', justifyContent: 'flex-end' }}>
            <Button
              name={isLoggedIn ? 'Signout' : 'Login / Signup'}
              onClick={isLoggedIn ? this.signOutUser : this.showLogin}
              style={{ backgroundColor: COLORS.TRANSPARENT, fontSize: 16, color: COLORS.WHITE }}
            />
          </View>
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

export default connect(mapStateToProps, null)(Navbar);
