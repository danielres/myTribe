import React, { Component } from 'react';
import { connectLean } from 'lean-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import store from './store';

import PageTitle from './shared/PageTitle';
import Entry from './shared/Entry';
import Profile from './shared/Profile';

const Wrapper = styled.section`
`;

class Members extends Component {
  componentDidMount() {
    const { fetchMembers } = this.props;
    this.props.fetchMembers();
  }

  render() {
    const { members } = this.props;

    return (
      <Wrapper>
        <PageTitle>Members</PageTitle>

        <div className='entries'>
          {members.map((member) =>
            <Entry
              key={member.id}
              onClick={() => store.dispatch(push(`/members/${member.slug}`))}
            >
              {member.name}
            </Entry>
          )}
        </div>
      </Wrapper>
    );
  }
}

const Connected = connectLean({
  getInitialState() {
    return { members: [] };
  },

  fetchMembers() {
    fetch('/api/members')
      .then(res => res.json())
      .then(members => this.setState({ members }))
  },
})(Members);

export default Connected;
