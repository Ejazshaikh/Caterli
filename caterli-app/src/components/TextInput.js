import React, { PureComponent } from 'react';
import View from './View';
import COLORS from '../utils/colors';

export default class TextInput extends PureComponent {
  render() {
    const { maxLength, style, value, placeholder } = this.props;
    return (
      <input
        type="text"
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={this.props.onChange}
        style={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          height: '50%',
          outline: 'none',
          border: '1px solid #000',
          backgroundColor: COLORS.TRANSPARENT,
          color: COLORS.GREY_900,
          padding: '5px',
          ...style,
        }}
        value={value}
      />
    );
  }
}
