import React, { Component } from 'react';
import { connectLean } from 'lean-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import PageTitle from './shared/PageTitle';
import Profile from './shared/Profile';

const Wrapper = styled.section`
`;

class Member extends Component {
  componentDidMount() {
    const { fetchMember, slug } = this.props;
    fetchMember(slug);
  }

  componentWillReceiveProps() {
    const { fetchMember, slug } = this.props;
    fetchMember(slug);
  }

  render() {
    const { handleBackClick, member } = this.props;
    return (
      <Wrapper>
        <PageTitle>
          <span
            onClick={handleBackClick}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Members
          </span>
          {' '}/{' '}
          {member.name}
        </PageTitle>

        <Profile person={member} />
      </Wrapper>
    );
  }
}

const Connected = connectLean({
  getInitialState() {
    return { member: { addedByMember: {} } };
  },

  mapState: (state, ownProps) => ({
    member: state.member,
    slug: ownProps.location.pathname.split('/')[2],
  }),

  fetchMember(slug) {
    fetch(`/api/members/${slug}`)
      .then(res => res.json())
      .then(member => this.setState({ member }));
  },

  handleBackClick(path) {
    this.dispatch(push('/members'));
  },
})(Member);

export default Connected;
