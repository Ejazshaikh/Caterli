import React, { PureComponent } from 'react';

export default class Text extends PureComponent {
  render() {
    return (
      <p
        style={{
          margin: 0,
          padding: 0,
          ...this.props.style,
        }}
      >
        {this.props.children}
      </p>
    );
  }
}
