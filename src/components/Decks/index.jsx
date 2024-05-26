import { Component } from 'react';
import { FaPlus, FaEdit, FaTimes} from 'react-icons/fa';
import './styles.css';
import '../../styles/globalStyles.css';
import background from '../../assets/img/ondas-pato.svg';

import { Link } from "react-router-dom";

export class Decks extends Component {
  
  render() {
    const { decks,  handleMoreDecks} = this.props;
    
    const deckCards = [...decks];
    
    return(
      <div className='main-container' style={{backgroundImage: `url(${background})`}}>
        {/* {console.log('moreDecks', moreDecks)} */}
        <div className='decks-container'>
          {
              <div className='decks'>
                {deckCards.map(deck => (
                  <Link to={`/deck/${deck.id}`} className='deck' key={deck.id} id={deck.id}>
                    {/* abre a tela para editar deck  */}
                    <span><Link to={`/remove-deck/${deck.id}`}><FaTimes size={20}  className='hover-edit first-span' title='Remover baralho'/></Link></span> 
                    {/* abre a tela para excluir deck  */}
                    <span><Link to={`/edit-decks/${deck.id}`}><FaEdit size={20}  className='hover-edit second-span' title='Editar baralho'/></Link></span>
                    {deck.name}
                  </Link>
                ))}
                {/* onClick={handleEdit}  */}
                <Link to={'/more-decks'} className='deck-plus deck' onClick={handleMoreDecks}>
                  <FaPlus size={60} color='#15AA73' />
                </Link>
              </div>
          }       
        </div>
      </div> 
    );
  }
}