import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledView = styled.div`
  position: relative;
  display: flex;
`

export default class View extends PureComponent {
  render() {
    return (
      <StyledView
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </StyledView>
    );
  }
}
