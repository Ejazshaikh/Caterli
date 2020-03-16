import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import View from './View';
import Text from './Text';
import Button from './Button';
import { IoMdAdd, IoIosRemove } from 'react-icons/io';
import COLORS from '../utils/colors';
import { fetchRestaurantReq } from '../actions/restaurantActions';
import { REST_STATUS } from '../utils/constants';

class RestaurantPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { itemsSelected: {} };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.props.dispatch(fetchRestaurantReq(id));
    }
  }

  onClickContinue = () => {
    const { id } = this.props;
    this.props.history.push({
      pathname: `/restaurants/${id}/order`,
      state: { cart: this.state.itemsSelected },
    });
  };

  totalAmount() {
    const { itemsSelected } = this.state;
    const { menu } = this.props.restaurant.restaurantReq.data;
    const selectedItemKeys = Object.keys(this.state.itemsSelected);
    let totalAmount = 0;
    selectedItemKeys.forEach(i => {
      const item = menu.find(m => m._id === i);
      totalAmount = totalAmount + item.price * itemsSelected[i];
    });
    return totalAmount;
  }

  incrementFoodItem = id => {
    const { itemsSelected } = this.state;
    let count = 1;
    if (itemsSelected[id]) {
      count = itemsSelected[id] + 1;
    }
    this.setState({ itemsSelected: { ...itemsSelected, [id]: count } });
  };

  decrementFoodItem = id => {
    const { itemsSelected } = this.state;
    if (itemsSelected[id]) {
      if (itemsSelected[id] === 1) {
        delete itemsSelected[id];
        this.setState({ itemsSelected: { ...itemsSelected } });
      } else {
        const count = itemsSelected[id] - 1;
        this.setState({ itemsSelected: { ...itemsSelected, [id]: count } });
      }
    }
  };

  render() {
    const { itemsSelected } = this.state;
    const { status, data } = this.props.restaurant.restaurantReq;
    if (status === REST_STATUS.SUCCESS) {
      return (
        <View style={{ flexDirection: 'column', width: '100%', paddingTop: 50 }}>
          <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>{data.name}</Text>
            <Text>{data.type}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>Menu</Text>
          <View
            style={{
              flexDirection: 'column',
              border: `1px solid ${COLORS.GREY_400}`,
              width: '70%',
              alignSelf: 'center',
              borderRadius: 5,
            }}
          >
            {data.menu.map(f => {
              return (
                <View
                  key={f._id}
                  style={{
                    padding: '10px 10px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flexDirection: 'column' }}>
                    <Text>{f.name}</Text>
                    <Text>₹{f.price}</Text>
                  </View>
                  <View>
                    {itemsSelected[f._id] && (
                      <Fragment>
                        <Button
                          style={{ border: `1px solid ${COLORS.GREY_500}` }}
                          onClick={() => this.decrementFoodItem(f._id)}
                        >
                          <IoIosRemove />
                        </Button>
                        <Text style={{ padding: '0 5px' }}>{itemsSelected[f._id]}</Text>
                      </Fragment>
                    )}
                    <Button
                      style={{ border: `1px solid ${COLORS.GREY_500}` }}
                      onClick={() => this.incrementFoodItem(f._id)}
                    >
                      <IoMdAdd />
                    </Button>
                  </View>
                </View>
              );
            })}
            {Object.keys(itemsSelected).length > 0 && (
              <Button
                style={{
                  padding: '20px 30px',
                  position: 'fixed',
                  bottom: 20,
                  alignSelf: 'flex-end',
                  backgroundColor: COLORS.DEEP_PURPLE_700,
                }}
                onClick={this.onClickContinue}
              >
                <Text style={{ color: COLORS.WHITE }}>View Cart {`(₹${this.totalAmount()})`}</Text>
              </Button>
            )}
          </View>
        </View>
      );
    }
    return <div></div>;
  }
}

function mapStateToProps(reduxStore) {
  return {
    restaurant: reduxStore.restaurant,
  };
}

export default connect(mapStateToProps, null)(RestaurantPage);
