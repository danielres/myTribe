import { connectLean } from 'lean-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

import Entry from './shared/Entry'
import LinkTo from './shared/LinkTo'
import PageTitle from './shared/PageTitle'

const Wrapper = styled.section``

const AddMemberButton = ({ onClick }) =>
  <button onClick={onClick}>add</button>

class Members extends Component {
  componentDidMount() {
    const { fetchMembers } = this.props
    fetchMembers()
  }

  render() {
    const { members, onAddMember } = this.props

    return (
      <Wrapper>
        <PageTitle>Members</PageTitle>

        <AddMemberButton onClick={onAddMember} />

        <div className="entries">
          {members.map(member =>
            <LinkTo key={member.id} target={member.url}>
              <Entry>
                {member.displayName}
              </Entry>
            </LinkTo>
          )}
        </div>
      </Wrapper>
    )
  }
}

const Connected = connectLean({
  getInitialState() {
    return { members: [] }
  },

  fetchMembers() {
    fetch('/api/members')
      .then(res => res.json())
      .then(members => this.setState({ members }))
  },

  onAddMember() {
    fetch('/api/members', { method: 'post' }).then(this.fetchMembers)
  },
})(Members)

export default Connected
