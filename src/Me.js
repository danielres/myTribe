import React from 'react';
import styled from 'styled-components';

import PageTitle from './shared/PageTitle';
import Profile from './shared/Profile';

const Wrapper = styled.section`
`;

const Me = (props) => (
  <Wrapper>
    <PageTitle>Me</PageTitle>
    <Profile person={{ name: 'Me' }} />
  </Wrapper>
);

export default Me;
