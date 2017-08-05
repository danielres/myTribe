import { connectLean } from 'lean-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  > * {
    margin-left: 20px;
    margin-right: 20px;
  }
`
const Form = styled.form`margin-bottom: 10px;`

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

const Button = styled.button`padding: 10px;`

class MemberForm extends Component {
  componentDidMount() {}

  render() {
    const {
      member,
      onFormSubmit,
      setInfoValue,
      setValue,
    } = this.props

    return (
      <Form
        onSubmit={e => {
          e.preventDefault()
          onFormSubmit()
        }}
      >
        <FormRow>
          <label htmlFor="firstname">First name</label>
          <input
            id="firstname"
            type="text"
            value={member.infos.firstname || ''}
            onChange={e =>
              setInfoValue({ firstname: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="lastname">Lastname</label>
          <input
            id="lastname"
            type="text"
            value={member.infos.lastname || ''}
            onChange={e => setInfoValue({ lastname: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            type="text"
            value={member.displayName || ''}
            onChange={e => setValue({ displayName: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            value={member.infos.address || ''}
            onChange={e => setInfoValue({ address: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="fbProfileUrl">FB profile URL</label>
          <input
            id="fbProfileUrl"
            type="text"
            value={member.infos.fbProfileUrl || ''}
            onChange={e =>
              setInfoValue({ fbProfileUrl: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="introUrl">Intro URL</label>
          <input
            id="introUrl"
            type="text"
            value={member.infos.introUrl || ''}
            onChange={e => setInfoValue({ introUrl: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={member.infos.email || ''}
            onChange={e => setInfoValue({ email: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            value={member.infos.phone || ''}
            onChange={e => setInfoValue({ phone: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={member.slug || ''}
            onChange={e => setValue({ slug: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <div />
          <div>
            <Button>Save</Button>
          </div>
        </FormRow>
      </Form>
    )
  }
}

const Connected = connectLean({
  scope: 'MemberForm',

  getInitialState() {
    return { member: { infos: {} } }
  },

  resetState() {
    this.setState(this.getInitialState())
  },

  onFormSubmit() {
    fetch('/api/members', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(this.state.member),
    })
      .then(this.props.onSubmit)
      .then(this.resetState)
  },

  setValue(value) {
    this.setState({ member: { ...this.state.member, ...value } })
  },

  setInfoValue(value) {
    this.setState({
      member: {
        ...this.state.member,
        infos: { ...this.state.member.infos, ...value },
      },
    })
  },
})(MemberForm)

export default Connected
