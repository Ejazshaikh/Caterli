import React, { PureComponent } from 'react';
import View from './View';
import Text from './Text';
import Button from './Button';
import COLORS from '../utils/colors';

const RImage = require('../assets/restaurant.jpg');

export default class RestuarantCard extends PureComponent {
  render() {
    const { name, type, onClick, pic } = this.props;
    return (
      <Button style={{ margin: '10px 40px' }} onClick={onClick}>
        <View
          style={{
            flexDirection: 'column',
            width: 300,
            border: `1px solid ${COLORS.GREY_300}`,
          }}
        >
          <View style={{ width: '100%', height: 200 }}>
            <img src={pic} style={{ width: '100%', objectFit: 'cover' }} />
          </View>
          <View
            style={{ flexDirection: 'column', padding: 10, backgroundColor: COLORS.DEEP_PURPLE_50 }}
          >
            <Text style={{ fontSize: 18 }}>{name}</Text>
            <Text style={{ fontSize: 14, color: COLORS.GREY_500 }}>{type}</Text>
          </View>
        </View>
      </Button>
    );
  }
}
