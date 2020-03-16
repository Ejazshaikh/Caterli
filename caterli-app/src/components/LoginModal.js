import React, { PureComponent } from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import View from './View';
import Text from './Text';
import COLORS from '../utils/colors';
import Button from './Button';
import { sendLoginReq, sendSignupReq } from '../actions/authActions';
import { MdClose } from 'react-icons/md';
import { hideLoginModal } from '../actions/uiActions';
import { REST_STATUS } from '../utils/constants';

class LoginModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inLoginState: true,
      inSignupState: false,
      name: '',
      password: '',
      email: '',
      errorMsg: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { loginReqStatus, signupReqStatus, error } = this.props.auth;
    if (
      (loginReqStatus === REST_STATUS.ERROR &&
        prevProps.auth.loginReqStatus !== REST_STATUS.ERROR) ||
      (signupReqStatus === REST_STATUS.ERROR &&
        prevProps.auth.signupReqStatus !== REST_STATUS.ERROR)
    ) {
      this.setState({ error: error.data });
    }
  }

  selectLogin = () => {
    this.setState({ inLoginState: true, inSignupState: false, name: '', password: '', email: '' });
  };

  selectSignUp = () => {
    this.setState({ inLoginState: false, inSignupState: true, name: '', password: '', email: '' });
  };

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onClickLogin = () => {
    const { email, password } = this.state;
    this.props.dispatch(sendLoginReq(email, password));
  };

  onClickSignUp = () => {
    const { email, password, name } = this.state;
    this.props.dispatch(sendSignupReq(name, email, password));
  };

  render() {
    const { inSignupState, inLoginState, name, email, password, error } = this.state;
    return (
      <View
        style={{
          position: 'fixed',
          zIndex: 2,
          backgroundColor: COLORS.BLACKA,
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: '30%', height: '60%' }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: COLORS.WHITE,
              borderRadius: 5,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', width: '100%', height: '10%' }}>
              <ActionButton name="Login" isActive={inLoginState} onClick={this.selectLogin} />
              <ActionButton name="Sign up" isActive={inSignupState} onClick={this.selectSignUp} />
            </View>
            <View
              style={{
                paddingTop: 50,
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {error && (
                <Text
                  style={{ backgroundColor: COLORS.RED_200, padding: '5px 10px', borderRadius: 5 }}
                >
                  {error}
                </Text>
              )}
              {inSignupState && (
                <InputField label="Name" type="text" value={name} onChange={this.onChangeName} />
              )}
              <InputField label="Email" type="email" value={email} onChange={this.onChangeEmail} />
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={this.onChangePassword}
              />
              <Button
                style={{
                  padding: '15px 50px',
                  backgroundColor: COLORS.DEEP_PURPLE_600,
                  marginTop: 20,
                }}
                onClick={inLoginState ? this.onClickLogin : this.onClickSignUp}
              >
                <Text style={{ color: COLORS.WHITE }}>{inLoginState ? 'Login' : 'Sign up'}</Text>
              </Button>
            </View>
          </View>
          <Button
            style={{ alignSelf: 'flex-start', backgroundColor: COLORS.TRANSPARENT }}
            onClick={() => this.props.dispatch(hideLoginModal())}
          >
            <MdClose style={{ color: COLORS.WHITE, fontSize: 30 }} />
          </Button>
        </View>
      </View>
    );
  }
}

class InputField extends PureComponent {
  render() {
    const { label, type, value, onChange } = this.props;
    return (
      <View style={{ marginTop: 20, width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          type={type}
          label={label}
          size="small"
          onChange={onChange}
          value={value}
        />
      </View>
    );
  }
}

class ActionButton extends PureComponent {
  render() {
    const { isActive, name, onClick } = this.props;
    return (
      <Button
        style={{ flex: 1, borderBottom: isActive ? `5px solid ${COLORS.DEEP_PURPLE_700}` : 0 }}
        onClick={onClick}
      >
        <Text style={{ color: isActive && COLORS.DEEP_PURPLE_700 }}>{name}</Text>
      </Button>
    );
  }
}

function mapStateToProps(reduxStore) {
  return {
    auth: reduxStore.auth,
  };
}

export default connect(mapStateToProps, null)(LoginModal);
