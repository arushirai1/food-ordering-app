import React, { Component } from 'react'

class CustomerLanding extends React.Component {
  render() {
    return (<div>
        <h1> Login </h1>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label> <br/>
          <label>
            Password:
            <input type="password" name="password" />
          </label> <br/>
            <input type="submit" value="Sign Up" />

          <input type="submit" value="Sign In" />
        </form>
    </div>);
  }
}

class StaffLanding extends React.Component {
  render() {
    return (<div>
        <h1> Login </h1>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label> <br/>
          <label>
            Password:
            <input type="password" name="password" />
          </label> <br/>
            <input type="submit" value="Sign Up" />

          <input type="submit" value="Sign In" />
        </form>
    </div>);
  }
}

class AdminLanding extends React.Component {
  render() {
    return (<div>
        <h1> Login </h1>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label> <br/>
          <label>
            Password:
            <input type="password" name="password" />
          </label> <br/>
            <input type="submit" value="Sign Up" />

          <input type="submit" value="Sign In" />
        </form>
    </div>);
  }
}