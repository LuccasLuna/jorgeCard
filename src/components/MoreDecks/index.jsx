import React, { useState, useEffect } from 'react';
import '../../styles/globalStyles.css';
import './styles.css';
import background from '../../assets/img/ondas-verde2.svg';

import { loadDecks } from '../../utils/load-decks';
import { useNavigate } from 'react-router-dom';

const MoreDecks = () => {
  const [newDeckName, setNewDeckName] = useState('');
  const [deck, setDeck] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      const decksLoaded = await loadDecks();
      setDeck(decksLoaded);
    };
    fetchDecks();
  }, []);

  const handleChange = (e) => {
    setNewDeckName(e.target.value);
    console.log(e.target.value);
  };

  const handleMoreCards = async (e) => {
    e.preventDefault();
    if(newDeckName) {
      const newDeck = {
        id: deck.length +1,
        name: newDeckName,
        cards: []
      };
  
      try {
        const response = await fetch(`https://66526823813d78e6d6d57405.mockapi.io/decks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDeck),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
        } else {
          const savedDeck = await response.json();
          setDeck({...deck, savedDeck});
          setNewDeckName('');
          console.log('Success:', savedDeck);
          navigate('/home');
        }
  
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  };
  console.log(deck)
  return (
    
    <div className='main-container' style={{ backgroundImage: `url(${background})` }}>
      <div className='more-decks-container'>
        <form onSubmit={handleMoreCards} className='moreDecks'>
          <h2>Adicione novo baralho à sua coleção</h2>
          <input
            type="text"
            placeholder='Nome do baralho'
            value={newDeckName}
            onChange={handleChange}
          />
          <button type='submit'>Adicionar</button>
          <p>Baralho adicionado com sucesso!</p>
        </form>
      </div>
    </div>
  );
};
export default MoreDecks;