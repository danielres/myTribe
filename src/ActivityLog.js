import React, { Component } from 'react';
import styled from 'styled-components';

import PageTitle from './shared/PageTitle';
import Entry from './shared/Entry';

const entries = [
  { id: 1, name: "Entry 1"},
  { id: 2, name: "Entry 2"},
];

const Wrapper = styled.section`
`;

class ActivityLog extends Component {
  render() {
    return (
      <Wrapper>
        <PageTitle>Activity</PageTitle>

        <div className="entries">
          {entries.map((entry) =>
            <Entry key={entry.id}>
              {entry.id}
              {' - '}
              {entry.name}
            </Entry>
          )}
        </div>
      </Wrapper>
    );
  }
}

export default ActivityLog;
