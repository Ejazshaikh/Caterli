import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
  margin: 0;
  padding: 0;
`

export default class Text extends PureComponent {
  render() {
    return (
      <StyledText
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </StyledText>
    );
  }
}
