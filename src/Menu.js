import React from 'react';
import { connectLean } from 'lean-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import MdBurger from 'react-icons/lib/md/menu';
import MdHome from 'react-icons/lib/md/home';
import MdFavorite from 'react-icons/lib/md/favorite';
import MdAccountCircle from 'react-icons/lib/md/account-circle';

const entries = [
  { id: 'home', name: 'Home', path: '/' },
  { id: 'members', name: 'Members', path: '/members' },
  { id: 'me', name: 'Me', path: '/me' },
];

const iconFor = (id) => ({
  home: <MdHome />,
  members: <MdFavorite />,
  me: <MdAccountCircle />,
}[id])

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

const Icon = styled.div`
  display: inline-block;
  font-size: 25px;
  margin-right: 20px;
`;

const Menu = ({ collapsed, toggleCollapsed, handleClick }) => (
  <Wrapper>
    <ButtonWrapper>
      <Button onClick={toggleCollapsed}>
        <MdBurger />
      </Button>
    </ButtonWrapper>

    <Entries collapsed={collapsed}>
      {entries.map((entry) =>
        <Entry
          key={entry.id}
          onClick={() => handleClick(entry.path)}
        >
          <Icon>{iconFor(entry.id)}</Icon>
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

  handleClick(path) {
    this.dispatch(push(path));
    this.setState({ collapsed: true });
  },
})(Menu);

export default Connected;
