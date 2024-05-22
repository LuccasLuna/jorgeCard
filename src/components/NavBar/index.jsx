import { Component } from 'react';

import './styles.css';

export class Navbar extends Component {

  render () {
    return(
      <nav className='navegation'>
        <div className='user'>
          <div className='avatar'>
            <div className='avatar-img'>
            </div> 
          </div>
          <p>Jorge</p>
        </div>
        <ul className='nav-list'>
          {/* FAZER UMA ITERAÇÃO PRA NAO DEIXAR VARIAS LI IGUAIS */}
          <li className='item-list'>
            <a href="/home"><img src={require("../../assets/img/card-cinza.png")} alt="decks" width={45} height={45} title='Baralhos'/></a>
          </li>
          <li className='item-list'>
            <a href="/"><img src={require("../../assets/img/edit-cinza.png")} alt="decks" width={40} height={40} title='Edite'/></a>
          </li>
          <li className='item-list'>
            <a href="/"><img src={require("../../assets/img/stats-cinza.png")} alt="decks" width={40} height={40} title='Estatísticas'/></a>
          </li>
          <li className='item-list'>
            <a href="/"><img src={require("../../assets/img/config-cinza.png")} alt="decks" width={40} height={40} title='Configurações'/></a>
          </li>
          <li className='item-list'>
            <a href="/"><img src={require("../../assets/img/out-cinza.png")} alt="decks" width={40} height={40} title='Sair'/></a>
          </li>
        </ul>
      </nav>
    );
  }

}