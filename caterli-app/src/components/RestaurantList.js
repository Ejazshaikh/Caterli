import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import View from './View';
import Text from './Text';
import RestuarantCard from './RestuarantCard';
import { REST_STATUS } from '../utils/constants';

class RestaurantList extends PureComponent {
  onClickRestaurant(id) {
    this.props.history.push(`/restaurants/${id}`);
  }

  render() {
    const { status, data } = this.props.restaurant.restaurantListReq;
    if (status === REST_STATUS.SUCCESS) {
      if (data.length === 0) {
        return <Text>No Restaurant Found</Text>;
      }
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 50 }}>
          {data.map(r => {
            return (
              <RestuarantCard
                name={r.name}
                type={r.type}
                onClick={() => this.onClickRestaurant(r._id)}
                pic={r.profilePicLoc}
              />
            );
          })}
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

export default connect(mapStateToProps, null)(RestaurantList);
