import { Component } from 'react';

import './styles.css';

export class Login extends Component {
  render() {
    return(
      <div className="login">
          <div className="title-login">
            <h1>Login</h1>
            <p>Acesse sua conta.</p>
          </div>
          <form action="post">
            <input type="text" name="login" id="login" placeholder="Email:"/>
            <input type="text" name="password" id="password" placeholder="Senha:"/>
            <button>Entrar</button>
          </form>
          <div className="title-register">
            <h3>Cadastro</h3>
            <p>Ainda não possui uma conta? faça seu cadastro agora mesmo.</p>
            <button>Cadastrar</button>
          </div>
        </div>
    );
  }
}