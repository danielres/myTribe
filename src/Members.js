import React, { Component } from 'react';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import store from './store';

import PageTitle from './shared/PageTitle';
import Entry from './shared/Entry';
import Profile from './shared/Profile';

const entries = [
  { id: 1, slug: 'Albert',   name: 'Albert'   },
  { id: 2, slug: 'Eve',      name: 'Eve'      },
  { id: 3, slug: 'Ezequiel', name: 'Ezequiel' },
  { id: 4, slug: 'Gustavo',  name: 'Gustavo'  },
  { id: 5, slug: 'Daniel',   name: 'Daniel'   },
];

const Wrapper = styled.section`
`;

const Members = (props) => (
  <Wrapper>
    <PageTitle>Members</PageTitle>

    <div className="entries">
      {entries.map((entry) =>
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

export default Members;
