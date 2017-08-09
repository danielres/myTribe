import { Control, LocalForm, actions } from 'react-redux-form'
import React, { Component } from 'react'
import styled from 'styled-components'

const Button = styled.button`padding: 10px;`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  > * {
    margin-left: 20px;
    margin-right: 20px;
  }
`
const FormRow = styled(({ children, className }) =>
  <Grid className={className}>
    {children}
  </Grid>
)`
  margin-bottom: 5px;
  input,
  textarea {
    width: 50%;
    box-sizing: border-box;
  }
  label:after {content: ':'}
`

const initialState = { infos: {} }

export default class extends Component {
  constructor(props) {
    super(props)
    this.resetForm = this.resetForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  resetForm() {
    this.formDispatch(actions.change('member', initialState))
  }

  onSubmit(values) {
    fetch('/api/members', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(values),
    })
      .then(this.props.onSubmit)
      .then(this.resetForm)
  }

  render() {
    return (
      <LocalForm
        getDispatch={dispatch => (this.formDispatch = dispatch)}
        initialState={initialState}
        model="member"
        onSubmit={this.onSubmit}
      >
        <FormRow>
          <label htmlFor="firstname">First name</label>
          <Control.text model=".infos.firstname" />
        </FormRow>
        <FormRow>
          <label htmlFor="lastname">Lastname</label>
          <Control.text model=".infos.lastname" />
        </FormRow>
        <FormRow>
          <label htmlFor="displayName">Display name</label>
          <Control.text model=".displayName" />
        </FormRow>
        <FormRow>
          <label htmlFor="slug">Slug</label>
          <Control.text model=".slug" />
        </FormRow>
        <FormRow>
          <label htmlFor="address">Address</label>
          <Control.textarea model=".infos.address" />
        </FormRow>
        <FormRow>
          <label htmlFor="fbProfileUrl">FB profile URL</label>
          <Control.text model=".infos.fbProfileUrl" />
        </FormRow>
        <FormRow>
          <label htmlFor="introUrl">Intro URL</label>
          <Control.text model=".infos.introUrl" />
        </FormRow>
        <FormRow>
          <label htmlFor="email">Email</label>
          <Control.text model=".infos.email" />
        </FormRow>
        <FormRow>
          <label htmlFor="phone">Phone</label>
          <Control.text model=".infos.phone" />
        </FormRow>
        <FormRow>
          <div />
          <div>
            <Button>Save</Button>
          </div>
        </FormRow>
      </LocalForm>
    )
  }
}
