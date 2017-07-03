import React, { Component } from 'react';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import store from './store';

import PageTitle from './shared/PageTitle';
import Entry from './shared/Entry';
import Profile from './shared/Profile';

const Wrapper = styled.section`
`;

class Members extends Component {
  state = { entries: [] }

  componentDidMount() {
    fetch('/api/members')
      .then(res => res.json())
      .then(entries => this.setState({ entries }));
  }

  render() {
    return (
      <Wrapper>
        <PageTitle>Members</PageTitle>

        <div className='entries'>
          {this.state.entries.map((entry) =>
            <Entry
              key={entry.id}
              onClick={() => store.dispatch(push(`/members/${entry.slug}`))}
            >
              {entry.name}
            </Entry>
          )}
        </div>
      </Wrapper>
    );
  }
}

export default Members;
