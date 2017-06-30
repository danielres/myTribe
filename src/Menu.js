import React, { Component } from 'react';
import { connectLean } from 'lean-redux';
import styled from 'styled-components';

const entries = [
  { id: 1, name: "Home"},
  { id: 2, name: "Something"},
];

const Wrapper = styled.section`
  background: #000;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  padding: 10px;
`;

const Button = styled.button`
  font-size: 18px;
  border: 0;
  background: transparent;
  color: #fff;
  outline: 0;
`;

const Entries = styled.div`
  color: #fff;
  display: ${props => props.collapsed ? 'none' : 'block'};
`;

const Entry = styled.div`
  padding: 20px;
  border-top: 1px solid #aaa;
`;

const Menu = ({ collapsed, toggleCollapsed }) => (
  <Wrapper>
    <ButtonWrapper>
      <Button onClick={toggleCollapsed}>
        ☰
      </Button>
    </ButtonWrapper>

    <Entries collapsed={collapsed}>
      {entries.map((entry) =>
        <Entry key={entry.id}>
          {entry.name}
        </Entry>
      )}
    </Entries>
  </Wrapper>
);

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
