import React from 'react';

import Entry from './Entry';
import LinkTo from './LinkTo';

const Profile = ({ handleClickTo, person }) => (
  <div className="entries">
    <LinkTo target={person.addedByMember.url}>
      <Entry>Added by: {person.addedByMember.name}</Entry>
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

