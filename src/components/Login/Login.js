/**
 * Created by liorf on 4/8/17.
 */
import React from 'react';
// import LoginHOC from 'react-facebook-login-hoc';

const configureLoginProps = {
  appId: '756445047848860',
  scope: 'public_profile, email',
  xfbml: true,
  cookie: false,
  version: 2.8,
  language: 'en_US'
};

class Login extends React.Component {

  constructor(props) {
    console.log('Login | constructor | props', props);
    super(props);
    this.status = this.props.fb.status;
    this.login = this.props.fb.login;
    this.logout = this.props.fb.logout;
    this.checkFacebookID = this.checkFacebookID.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.responseApi = this.responseApi.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.logoutFacebook = this.logoutFacebook.bind(this);
  }
  addUser() {
    let data = {
      facebook_Id: this.state.facebook_id,
      name: '',
      password: '',
    };
    api.postRequest('addUser', data);
  }

  checkFacebookID() {
    console.log('App | checkFacebookID | facebook_Id', this.state.facebook_id);
    console.log('App | checkFacebookID | facebook_Id', this.state.status);
    let data = {
      facebook_Id: this.state.facebook_id
    };
    api.postRequest('checkFacebookID', data);
  }

  getStatus(response) {
    console.log('App | getStatus | response', response);
    if (response.authResponse) {
      this.responseApi.call(this, response)
    } else {
      console.log('App | getStatus | response', response);
    }
  }

  responseApi(res) {
    console.log('res:', res);
    console.log('token:', res.authResponse.accessToken);
    console.log('status:', res.status);
    console.log('userID:', res.authResponse.userID);
    this.setState({
      status: res.status,
      facebook_id: res.authResponse.userID,
      token: res.authResponse.accessToken,
    });
  }

  checkLoginState() {
    this.status(this.getStatus.bind(this))
  };

  loginFacebook() {
    this.login(this.getStatus.bind(this))
  }

  logoutFacebook() {
    this.logout()
  }

  render() {
    console.log('Login | this.props', this.props);
    const styleDiv = {
      fontSize: 30
    };
    return (
      <div id="rests" className="panel panel-default">
        <div className="panel-heading" style={styleDiv}>Login:</div>
        <div className="panel-body">
          <button onClick={ this.checkLoginState.bind(this) }>Get Facebook Login Status</button>
          <button onClick={ this.loginFacebook.bind(this) }>Facebook Login</button>
          <button onClick={ this.logoutFacebook.bind(this) }>Facebook Logout</button>
          <button onClick={ this.checkFacebookID.bind(this) }>App login</button>
          <button onClick={ this.addUser.bind(this) }>Add User</button>
        </div>
      </div>
    )
  }
}
export default LoginHOC(configureLoginProps)(Login);
// export default Login;
