import React from 'react';
import { connectLean } from 'lean-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import Entry from './Entry';

const _LinkTo = connectLean({
  handleClickTo(path) {
    this.props.external
    ? window.open(path, '_blank')
    : this.dispatch(push(path));
  },
})(
  ({ children, className, handleClickTo, target }) => (
    <div
      className={className}
      onClick={() => handleClickTo(target)}
    >
      {children}
    </div>
  )
);

const LinkTo = styled(_LinkTo)`
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

const Profile = ({ handleClickTo, person }) => (
  <div className="entries">
    <LinkTo target={`/members/${person.addedByMember.slug}`}>
      <Entry>Invited by: {person.addedByMember.name}</Entry>
    </LinkTo>

    <Entry>Member since: {person.memberSince}</Entry>

    <LinkTo external target={person.fbProfileUrl}>
      <Entry>FB profile: {person.fbProfileUrl}</Entry>
    </LinkTo>

    <LinkTo external target={person.introUrl}>
      <Entry>Intro: {person.intro}</Entry>
    </LinkTo>

    <LinkTo external target={`mailto:${person.email}`}>
      <Entry>Email: {person.email}</Entry>
    </LinkTo>

    <Entry>Phone: {person.phone}</Entry>

    <Entry>Address: {person.address}</Entry>
  </div>
);

export default Profile;

