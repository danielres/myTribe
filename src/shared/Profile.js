import React from 'react';
import { connectLean } from 'lean-redux';
import { push } from 'react-router-redux';

import Entry from './Entry';

const LinkTo = connectLean({
  handleClickTo(path) {
    this.dispatch(push(path));
  },
})(
  ({ children, handleClickTo, target }) => (
    <span
      onClick={() => handleClickTo(target)}
    >
      {children}
    </span>
  )
);

const Profile = ({ handleClickTo, person }) => (
  <div className="entries">
    <Entry>
      Invited by: {' '}
      {person.addedByMember &&
        <LinkTo target={`/members/${person.addedByMember.slug}`}>
          {person.addedByMember.name}
        </LinkTo>
      }
    </Entry>
    <Entry>Member since: {person.memberSince}</Entry>
    <Entry>FB profile: {person.fbProfile}</Entry>
    <Entry>Intro: {person.intro}</Entry>
    <Entry>Email: {person.email}</Entry>
    <Entry>Phone: {person.phone}</Entry>
    <Entry>Address: {person.address}</Entry>
  </div>
);

export default Profile;

