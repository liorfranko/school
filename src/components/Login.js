/**
 * Created by liorf on 4/1/17.
 */

import React from 'react';
import { FacebookLogin } from 'react-facebook-login';

class Login extends React.Component{

  constructor (props, context) {
    super(props, context);
  }

  responseFacebook (response) {
    console.log(response);
    //anything else you want to do(save to localStorage)...
  }

  render () {
    return (
      <div>
        <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.responseFacebook}
          callback={this.responseFacebook} />
      </div>
    );
  }

}

export default Login;
