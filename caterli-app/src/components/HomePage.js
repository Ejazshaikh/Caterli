import React, { PureComponent } from 'react';
import _ from 'lodash';
import View from './View';
import Text from './Text';
import RestaurantList from './RestaurantList';
import SearchBar from './SearchBar';
import { fetchRestaurantsReq, searchRestaurantsReq } from '../actions/restaurantActions';

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.debounce = _.debounce(this.sendSearchReq, 1000);
    this.state = { searchText: '' };
  }

  componentDidMount() {
    this.props.dispatch(fetchRestaurantsReq());
  }

  sendSearchReq = () => {
    this.props.dispatch(searchRestaurantsReq(this.state.searchText));
  };

  onChangeSearchText = event => {
    this.setState({ searchText: event.target.value }, () => this.debounce());
  };

  render() {
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
        <SearchBar value={this.state.searchText} onChange={this.onChangeSearchText} />
        <Text style={{ padding: '20px 50px', fontSize: 22, fontWeight: 'bold' }}>
          {this.state.searchText ? 'Search Result' : 'Top Picks'}
        </Text>
        <RestaurantList history={this.props.history} />
      </View>
    );
  }
}
