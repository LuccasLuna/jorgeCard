import React, { useState, useEffect } from 'react';
import '../../styles/globalStyles.css';
import './styles.css';
import background from '../../assets/img/ondas-verde2.svg';
import { loadDecks } from '../../utils/load-decks';
import { useParams, useNavigate } from 'react-router-dom';


const EditCards = () => {
  const [deck, setDeck] = useState([]);
  const { deckid: deckId } = useParams();
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [editedDeck, setEditedDeck] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      const decksLoaded = await loadDecks();
      setDeck(decksLoaded);
    };
    fetchDecks();
  }, []);

  useEffect(() => {
    if (deck[deckId -1]) {
      setEditedDeck(deck[deckId -1]);
    }
  }, [deck, deckId]);

  if (!deck.length) {
    return <div> Deck não encontrado </div>;
  }

  if (!editedDeck) {
    return <div>Deck não encontrado</div>;
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedDeck = {
      ...editedDeck,
      cards: [...editedDeck.cards, { ...newCard, id: editedDeck.cards.length + 1 }]
    };
    setEditedDeck(updatedDeck);
    
    const deckToUpdate = newCard.question && newCard.answer ? updatedDeck : editedDeck;

    try {
      const response = await fetch(`http://localhost:3000/decks?id=${deckId}`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deckToUpdate),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const handleCardChange = (index, field, value) => {
    const updatedCards = editedDeck.cards.map((card, i) =>
      i === index ? { ...card, [field]: value } : card
    );
    setEditedDeck({ ...editedDeck, cards: updatedCards });
  };

  const handleNewCardChange = (field, value) => {
    setNewCard({ ...newCard, [field]: value });
  };

  const handleRemoveCard = (index) => {
    const updatedCards = editedDeck.cards.filter((_, i) => i !== index);
    setEditedDeck({ ...editedDeck, cards: updatedCards });
  };


  return (
    <div className='main-container' style={{ backgroundImage: `url(${background})` }}>
      <div className='edit-cards-container'>
        <form onSubmit={handleEditSubmit}>
          <h2>{editedDeck.name.toUpperCase()}</h2>
          <h3>Edite as cartas do baralho</h3>
          <div className='card-container'>
            {editedDeck.cards.map((card, index) => (
              <div key={card.id} className='question-answer-container'>
                <p>card: {card.id} <button type="button" onClick={() => handleRemoveCard(index)}>excluir</button></p>
                <input
                  type="text"
                  className='question'
                  value={card.question}
                  onChange={(e) => handleCardChange(index, 'question', e.target.value)}
                />
                <input
                  type="text"
                  className='answer'
                  value={card.answer}
                  onChange={(e) => handleCardChange(index, 'answer', e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className='add-card'>
            <p>Adicione cartas ao baralho</p>
            <input
              type="text"
              placeholder='frente da carta'
              name='question'
              value={newCard.question}
              onChange={(e) => handleNewCardChange('question', e.target.value)}
            />
            <input
              type="text"
              placeholder='atrás da carta'
              name='answer'
              value={newCard.answer}
              onChange={(e) => handleNewCardChange('answer', e.target.value)}
            />
          </div>
          <button type="submit">Salvar</button>
          <p>Baralho editado com sucesso</p>
        </form>
      </div>
    </div>
  );
}

export default EditCards;
