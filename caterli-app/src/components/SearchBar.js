import React, { PureComponent } from 'react';
import View from './View';
import TextInput from './TextInput';
import COLORS from '../utils/colors';
import { MdSearch } from 'react-icons/md';

export default class SearchBar extends PureComponent {
  render() {
    return (
      <View style={{ justifyContent: 'center', width: '100%' }}>
        <View
          style={{
            width: '50%',
            border: `1px solid ${COLORS.GREY_500}`,
            padding: 10,
            alignItems: 'center',
          }}
        >
          <MdSearch style={{ fontSize: 30 }} />
          <TextInput
            style={{ border: 'none', fontSize: 20 }}
            placeholder="Search Restaurant..."
            onChange={this.props.onChange}
          />
        </View>
      </View>
    );
  }
}
