import { Component } from 'react';

import './styles.css';

import { Presentation } from '../../components/Presentation/Index';
import { Login } from '../../components/Login/Index';
// import { Register } from '../../components/Register/Index';

export class LoginScreen extends Component{
  render() {
    return(
      <div className="login-screen">
        <Presentation />
        <Login />
        {/* <Register /> */}
      </div>
    );
  }
}
