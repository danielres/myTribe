import { connectLean } from 'lean-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

import Entry from './shared/Entry'
import PageTitle from './shared/PageTitle'

const Wrapper = styled.section``

const ObjectView = ({ object }) =>
  <div>
    {object &&
      Object.keys(object).map(key =>
        <dl key={key}>
          <dt>
            {key}:
          </dt>
          <dd>
            {typeof object[key] === 'object'
              ? <ObjectView object={object[key]} />
              : object[key]}
          </dd>
        </dl>
      )}
  </div>
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
            <Entry key={entry.id}>
              <div>
                <b>
                  {entry.type}
                </b>
                <br />
                {entry.createdAt}
              </div>

              <ObjectView object={entry.attrs} />
            </Entry>
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
