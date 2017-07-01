import React, { Component } from 'react';
import styled from 'styled-components';

import PageTitle from './shared/PageTitle';

const entries = [
  { id: 1, name: "Albert"},
  { id: 2, name: "Eve"},
  { id: 3, name: "Ezequiel"},
  { id: 4, name: "Gustavo"},
  { id: 5, name: "Daniel"},
];

const Wrapper = styled.section`
`;

const Entry = styled.div`
  padding: 20px;
  border-bottom: 1px solid gray;
  &:first-child {
    border-top: 1px solid gray;
  }
`;

class Members extends Component {
  render() {
    return (
      <Wrapper>
        <PageTitle>Members</PageTitle>

        <div className="entries">
          {entries.map((entry) =>
            <Entry key={entry.id}>
              {entry.name}
            </Entry>
          )}
        </div>
      </Wrapper>
    );
  }
}

export default Members;
