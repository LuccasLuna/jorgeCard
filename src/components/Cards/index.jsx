import React, { useState, useEffect } from 'react';
import './styles.css';
import '../../styles/globalStyles.css';
import background from '../../assets/img/ondas-verde2.svg';
import Lottie from 'lottie-react';
import confetti from '../../assets/img/confetti.json';
import Facil from '../../assets/img/facil-img.svg';
import Dificil from '../../assets/img/dificil-img.svg';
import Virar from '../../assets/img/virar-img.svg';
import { useParams } from 'react-router-dom';
import { loadDecks } from '../../utils/load-decks';

const Cards = () => {
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { deckid: deckId } = useParams();
  
  useEffect(() => {
    const fetchDecks = async () => {
      const decksLoaded = await loadDecks();
      const deckOfId = decksLoaded.find(d => d.id === deckId);
      setDeck(deckOfId);
    };
    fetchDecks();
  }, [deckId]);

  if (!deck) {
    return (
      <div className="container-cards">
        <div className='cards' >Deck não encontrado!</div>
      </div>
    )
  }

  const cards = deck.cards;

  return (
    <div className='main-container' style={{ backgroundImage: `url(${background})` }}>
      <div className="container-cards">
        <div className='cards'>
          {flipped ? (
            <div className={`card ${animated ? 'animation' : 'fliped-card'}`}>
              <div key={cards[cardIndex].id}>
                <p>{cards[cardIndex].answer}</p>
              </div>
            </div>
          ) : (
            <div className='card'>
              <div key={cards[cardIndex].id}>
                <p>{cards[cardIndex].question}</p>
              </div>
            </div>
          )}
        </div>
        <div className='buttons-container'>
          {!flipped ? (
            <button className='flip-button' onClick={() => setFlipped(!flipped)}>
              <img src={Virar} alt="flip-button" width={25} height={25}/>
            </button>
          ) : buttonClicked ? (
            <>
              <button className='hard-button' onClick={() => handleNextButton(cards.length)}>
                <img src={Dificil} alt="hard-button" width={25} height={25}/>
              </button>
              <button className='easy-button' onClick={() => handleNextButton(cards.length)}>
                <img src={Facil} alt="easy-button" width={25} height={25}/>
              </button>
              <div className='button-animation'>
                <Lottie animationData={confetti}/>
              </div>
            </>
          ) : (
            <>
              <button className='hard-button' onClick={() => handleNextButton(cards.length)}>
                <img src={Dificil} alt="hard-button" width={25} height={25}/>
              </button>
              <button className='easy-button' onClick={() => handleNextButton(cards.length)}>
                <img src={Facil} alt="easy-button" width={25} height={25}/>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  function handleNextButton(deckLength) {
    let nextIndex = cardIndex + 1;
    if (nextIndex === deckLength) {
      nextIndex = 0;
    }
    setButtonClicked(true);
    setTimeout(() => {
      setAnimated(true);
      setTimeout(() => {
        setCardIndex(nextIndex);
        setFlipped(false);
        setAnimated(false);
        setButtonClicked(false);
      }, 1000);
    }, 700);
  }
};

export default Cards;
