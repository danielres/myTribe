import React, { Component } from 'react';
import { connectLean } from 'lean-redux';
import styled from 'styled-components';

const entries = [
  { id: 1, name: "Home"},
  { id: 2, name: "Something"},
];

const Wrapper = styled.section`
  background: #000;
  color: #fff;
`;

const Entries = styled.div`
  display: ${props => props.collapsed ? 'none' : 'block'};
`;

const Entry = styled.div`
  padding: 20px;
  border-bottom: 1px solid #aaa;
  &:last-child {
    border-bottom: 0;
  }
`;

class Menu extends Component {
  render() {
    return (
      <Wrapper>
        <button onClick={this.props.toggleCollapsed}>
          ☰
        </button>

        <Entries collapsed={this.props.collapsed}>
          {entries.map((entry) =>
            <Entry key={entry.id}>
              {entry.name}
            </Entry>
          )}
        </Entries>
      </Wrapper>
    );
  }
}

const Connected = connectLean({
  getInitialState() {
    return { collapsed: true };
  },

  toggleCollapsed(e) {
    e.preventDefault();
    this.setState({ collapsed: !this.state.collapsed });
  },
})(Menu);

export default Connected;
