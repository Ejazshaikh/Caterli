import React, { PureComponent } from 'react';

export default class Button extends PureComponent {
  render() {
    const { disabled, name, style, onClick } = this.props;
    return (
      <button
        disabled={disabled}
        type="button"
        onClick={onClick}
        style={{
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          borderWidth: 0,
          borderRadius: 3,
          ...style,
        }}
      >
        {name || this.props.children}
      </button>
    );
  }
}
