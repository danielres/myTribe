import { connectLean } from 'lean-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

import Entry from './shared/Entry'
import LinkTo from './shared/LinkTo'
import PageTitle from './shared/PageTitle'

const Wrapper = styled.section``

class Logentries extends Component {
  componentDidMount() {
    const { fetchLogentries } = this.props
    fetchLogentries()
  }

  render() {
    const { entries } = this.props

    return (
      <Wrapper>
        <PageTitle>Activity</PageTitle>

        <div className="entries">
          {entries.map(entry =>
            <LinkTo key={entry.id} target={entry.url}>
              <Entry>
                <div>
                  {entry.type} {' - '}
                  {entry.createdAt}
                </div>
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
    return { entries: [] }
  },

  fetchLogentries() {
    fetch('/api/log')
      .then(res => res.json())
      .then(entries => this.setState({ entries }))
  },
})(Logentries)

export default Connected
