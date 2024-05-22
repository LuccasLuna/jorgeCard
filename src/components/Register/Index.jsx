import { Component } from 'react';

import './styles.css';

export class Register extends Component {
  render() {
     return( 
      <div className="register">
        <div className="title-register">
            <h1>Cadastro</h1>
            <p>Crie sua conta.</p>
          </div>
          <form action="post">
            <input type="text" name="name" id="name" placeholder="Nome:"/>
            <input type="text" name="login" id="login" placeholder="Email:"/>
            <input type="text" name="password" id="password" placeholder="Senha:"/>
            <input type="text" name="password" id="password" placeholder="Repita a senha:"/>
            <button>Enviar</button>
          </form>
      </div>
    );
  }
}