import React, { Component } from 'react';
import { connectLean } from 'lean-redux';
import styled from 'styled-components';

import PageTitle from './shared/PageTitle';
import Entry from './shared/Entry';
import LinkTo from './shared/LinkTo';

const Wrapper = styled.section`
`;

class Members extends Component {
  componentDidMount() {
    const { fetchMembers } = this.props;
    fetchMembers();
  }

  render() {
    const { members } = this.props;

    return (
      <Wrapper>
        <PageTitle>Members</PageTitle>

        <div className='entries'>
          {members.map((member) =>
            <LinkTo
              key={member.id}
              target={member.url}
            >
              <Entry>
                {member.name}
              </Entry>
            </LinkTo>
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
