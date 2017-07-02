import React from 'react';
import { connectLean } from 'lean-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import PageTitle from './shared/PageTitle';
import Profile from './shared/Profile';

const Wrapper = styled.section`
`;

const Member = ({ handleBackClick, title }) => (
  <Wrapper>
    <PageTitle>
      <span
        onClick={handleBackClick}
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

const Connected = connectLean({
  mapState: (state, ownProps) => ({
    title: ownProps.location.pathname.split('/')[2],
  }),

  handleBackClick(path) {
    this.dispatch(push('/members'));
  },
})(Member);


export default Connected;
