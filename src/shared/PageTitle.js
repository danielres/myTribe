import styled from 'styled-components';
import React from 'react';

const Content = styled.h1`
  padding: 0 20px;
`;

const PageTitle = ({ children }) => (
  <Content>{children}</Content>
);

export default PageTitle;
