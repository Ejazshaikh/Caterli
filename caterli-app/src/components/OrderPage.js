import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField, Radio } from '@material-ui/core';
import View from './View';
import Text from './Text';
import Button from './Button';
import COLORS from '../utils/colors';
import { showLoginModal } from '../actions/uiActions';
import { sendOrderRequest, initOrderReq } from '../actions/orderActions';
import { REST_STATUS } from '../utils/constants';
import qs from 'querystring';

class OrderPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.order.orderReq.status === REST_STATUS.SUCCESS &&
      prevProps.order.orderReq.status !== REST_STATUS.SUCCESS
    ) {
      alert('Order placed');
    }
  }

  onChangeAddress = event => this.setState({ address: event.target.value });

  placeOrder = () => {
    const { user } = this.props.auth;
    const { cart } = this.props.history.location.state;
    const food = Object.keys(cart).map(c => {
      return { item: c, count: cart[c] };
    });
    const params = {
      food: JSON.stringify(food),
      customer: user._id,
      address: this.state.address,
      restaurant: this.props.id,
      amount: this.totalAmount(),
    };
    console.log('qs', qs.stringify(food));
    this.props.dispatch(sendOrderRequest(params));
  };

  totalAmount() {
    const { cart } = this.props.history.location.state;
    const { menu } = this.props.restaurant.restaurantReq.data;
    const selectedItemKeys = Object.keys(cart);
    let totalAmount = 0;
    selectedItemKeys.forEach(i => {
      const item = menu.find(m => m._id === i);
      totalAmount = totalAmount + item.price * cart[i];
    });
    return totalAmount;
  }

  orderDetails() {
    const { data } = this.props.restaurant.restaurantReq;
    const { cart } = this.props.history.location.state;
    if (data) {
      const { menu } = data;
      return (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            border: `1px solid ${COLORS.GREY_500}`,
            padding: 10,
            marginBottom: 30,
          }}
        >
          {Object.keys(cart).map(i => {
            const item = menu.find(m => m._id === i);
            return (
              <View style={{ padding: 10, justifyContent: 'space-between' }}>
                <Text>{item.name}</Text>
                <Text>x {cart[i]}</Text>
                <Text>{item.price * cart[i]}</Text>
              </View>
            );
          })}
          <View style={{ padding: 10, justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>Total</Text>
            <Text style={{ fontWeight: 'bold' }}>₹ {this.totalAmount()}</Text>
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const { address } = this.state;
    const { isLoggedIn } = this.props.auth;
    const { data } = this.props.restaurant.restaurantReq;
    const { cart } = this.props.history.location.state;
    if (!data || !cart || this.props.order.orderReq.status === REST_STATUS.SUCCESS) {
      this.props.dispatch(initOrderReq());
      return <Redirect to="/" />;
    }
    return (
      <View style={{ flexDirection: 'column', width: '50%', alignItems: 'center' }}>
        {this.orderDetails()}
        {!isLoggedIn ? (
          <Button
            style={{
              backgroundColor: COLORS.DEEP_PURPLE_700,
              padding: '10px 30px',
              width: '200px',
            }}
            onClick={() => this.props.dispatch(showLoginModal())}
          >
            <Text style={{ color: COLORS.WHITE }}>Login or Signup</Text>
          </Button>
        ) : (
          <Fragment>
            <View style={{ width: '100%', paddingTop: 40 }}>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                label="Address"
                onChange={this.onChangeAddress}
              />
            </View>
            <Text>Payment Method</Text>
            <View style={{ alignItem: 'center' }}>
              <Radio checked color="primary" />
              <Text style={{ alignSelf: 'center' }}>Cash on Delivery</Text>
            </View>
            <Button
              disabled={!address}
              style={{
                backgroundColor: address ? COLORS.DEEP_PURPLE_700 : COLORS.GREY_500,
                padding: '10px 30px',
                width: '200px',
              }}
              onClick={this.placeOrder}
            >
              <Text style={{ color: COLORS.WHITE }}>Place Order</Text>
            </Button>
          </Fragment>
        )}
      </View>
    );
  }
}

function mapStateToProps(reduxStore) {
  return {
    auth: reduxStore.auth,
    ui: reduxStore.ui,
    restaurant: reduxStore.restaurant,
    order: reduxStore.order,
  };
}

export default connect(mapStateToProps, null)(OrderPage);
