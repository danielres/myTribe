import React, { Component } from 'react';
import styled from 'styled-components';

const entries = [
  { id: 1, name: "Entry 1"},
  { id: 2, name: "Entry 2"},
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

class ActivityLog extends Component {
  render() {
    return (
      <Wrapper>
        <h1>ActivityLog</h1>
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
