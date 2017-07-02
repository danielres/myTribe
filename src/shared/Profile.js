import React, { Component } from 'react';
import styled from 'styled-components';

import PageTitle from './PageTitle';
import Entry from './Entry';

const entries = [
  { id: 2, name: "Email"},
  { id: 3, name: "Phone"},
  { id: 4, name: "Member since"},
  { id: 5, name: "Inviter"},
  { id: 6, name: "FB profile (link)"},
  { id: 7, name: "Intro"},
  { id: 8, name: "Inviter intro"},
];

const Profile = ({ person }) => (
  <div className="entries">
    {entries.map((entry) =>
      <Entry key={entry.id}>
        {entry.name}
      </Entry>
    )}
  </div>
);

export default Profile;
