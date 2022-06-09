
import React, { Component } from 'react';
import axios from 'axios'

/**
 * A quick reminder, the Virtual DOM is one of the core benefits of React and worth knowing about.
Whenever render is called, an object that is a copy of the current DOM is created
React does all of its manipulations on this virtual DOM first
Then, React will compare the updated virtual DOM with a previous snapshot that was taken right before the update - this process is called reconciliation
Finally, React will only update nodes in the physical DOM that are different from its virtual DOM
 */

class App extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      showTime: true
    }
  }

  async getUsers() {
    return axios.get("https://jsonplaceholder.typicode.com/users")
  }

  async componentDidMount() {
    const response = await this.getUsers()
    this.setState({ users: response.data })
  }

  hideTime = () => {
    this.setState({ showTime: false })
  }

  render() {
    console.log(this.state.users)
    let timer = this.state.showTime ? <Timer /> : null
    return (

      <div className="App" id="people">
        {timer}
        <button onClick={this.hideTime}>Hide Time</button>
        {this.state.users.map(u => {
          return <User key={u.id} userData={u} />
        })}
      </div>
    );
  }
}

class User extends Component {
  render() {
    const user = this.props.userData
    return (
      <div className="person"><div className="name">{user.name}</div><div>{user.email}</div></div>
    )
  }
}

class Timer extends Component {

  constructor() {
    super()
    this.state = {
      time: new Date(),
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date() })
      console.log("Updated time")
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return <div> {this.state.time.toLocaleTimeString()}</div>
  }
}

export default App;