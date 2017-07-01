import React from 'react';
import { connectLean } from 'lean-redux';
import styled from 'styled-components';
import MdBurger from 'react-icons/lib/md/menu';
import { push } from 'react-router-redux';

const entries = [
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'Me', path: '/me' },
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

const Menu = ({ collapsed, toggleCollapsed, linkTo }) => (
  <Wrapper>
    <ButtonWrapper>
      <Button onClick={toggleCollapsed}>
        <MdBurger />
      </Button>
    </ButtonWrapper>

    <Entries collapsed={collapsed}>
      {entries.map((entry) =>
        <Entry key={entry.id} onClick={() => linkTo(entry.path)}>
          {entry.name}
        </Entry>
      )}
    </Entries>
  </Wrapper>
);

const Connected = connectLean({
  scope: 'Menu',

  getInitialState() {
    return { collapsed: true };
  },

  toggleCollapsed(e) {
    e.preventDefault();
    this.setState({ collapsed: !this.state.collapsed });
  },

  linkTo(path) {
    this.dispatch(push(path));
  },
})(Menu);

export default Connected;
