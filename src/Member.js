import React from 'react';
import { connectLean } from 'lean-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import store from './store';

import PageTitle from './shared/PageTitle';
import Profile from './shared/Profile';

const Wrapper = styled.section`
`;

const Member = ({ title }) => (
  <Wrapper>
    <PageTitle>
      <span
        onClick={() => store.dispatch(push('/members'))}
        style={{ textDecoration: 'underline' }}
      >
        Members
      </span>
      {' '}/{' '}
      { title }
    </PageTitle>

    <Profile person={{ name: '/' }} />
  </Wrapper>
);

const toLink = (str) => (
  <a href={ str }>{ str }</a>
);

const Connected = connectLean({
  mapState: (state, ownProps) => ({
    title: ownProps.location.pathname.split('/')[2],
  }),
})(Member);


export default Connected;

