import React, { Component } from 'react'
import { Upload } from '../cmps/Upload'

import {userService} from '../services/userService'

export class UserDetails extends Component {
  state = {
    user : null
  }
  async componentDidMount() {
    const user = await userService.getById(this.props.match.params.id)
    this.setState({user})
  }

  render() {
    return (
      <section className="user-details">
        <h1>User Details</h1>
        {this.state.user && <div>
          <h3>
            {this.state.user.fullname}
          </h3>
          <pre>
            {JSON.stringify(this.state.user, null, 2)}
          </pre>
        </div>}
        <Upload />

      </section>
    )
  }
}

