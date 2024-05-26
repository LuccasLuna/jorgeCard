import React, { useState, useEffect } from 'react';
import '../../styles/globalStyles.css';
import './styles.css';
import background from '../../assets/img/ondas-verde2.svg';

import { useParams } from 'react-router-dom';

const RemoveDeck = ({ handleDelete, decks}) => {
  const { deckid: deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const deckOfId = decks.find(d => d.id === deckId)
    if (deckOfId) {
      const { name } = deckOfId;
      setName(name);
      setDeck(deckOfId);
    }
  }, [decks, deckId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleDelete(deckId); 
  };
  
  return (
    <div className='main-container' style={{ backgroundImage: `url(${background})` }}>
      <div className='remove-deck-container'>
        <form onSubmit={handleSubmit} className='removeDeck'>
          {deck && <h2>{name.toUpperCase()}</h2>}
          <h3>Deseja remover este baralho?</h3>
          <button type='submit'>Remover</button>
        </form>
      </div>
    </div>
  );
};
export default RemoveDeck;