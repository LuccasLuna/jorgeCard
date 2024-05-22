import { Component } from 'react';
import './styles.css';
import '../../styles/globalStyles.css';
import background from '../../assets/img/ondas-verde2.svg';
import Lottie from 'lottie-react';
import confetti from '../../assets/img/confetti.json';
// import badConfetti from '../../assets/img/bad-confetti.json';
// import { Buttons } from '../Buttons';

import Facil from '../../assets/img/facil-img.svg';
import Dificil from '../../assets/img/dificil-img.svg';
import Virar from '../../assets/img/virar-img.svg';

export class Cards extends Component{
  state = {
    cardIndex: 0, 
    fliped: false,
    animated: false,
    buttonClicked: false
  }

  handleNextButton = () => {
    const { cardIndex} = this.state;
    const { decks, deckId } = this.props;
    const deck  = decks[deckId -1];
    const card = deck.cards;
    let nextIndex = cardIndex + 1;
    if(nextIndex === card.length) {
      nextIndex = 0;
    }
    this.setState({ buttonClicked: true }, () => {
      setTimeout(() => {
         // Ativar a animação antes de atualizar o índice do cartão
        this.setState({ animated: true }, () => {
          // Aguardar um breve período antes de atualizar o índice e desativar a animação
          setTimeout(() => {
            this.setState({ cardIndex: nextIndex, fliped: false, animated: false, buttonClicked: false });
          }, 1000); // Tempo de duração da animação em milissegundos
        });
      }, 700)
     
    })
    
  }

  // handleHardButton = () => {
  //   const { cardIndex } = this.state;
  //   const nextIndex = cardIndex + 1;
  //   console.log(nextIndex);
  //   this.setState({ cardIndex: nextIndex, fliped: false});
  // }

  handleFlipButton = () => {
    const { fliped } = this.state;
    if(fliped === false) {
      this.setState({ fliped: true});
    } else {
      this.setState({ fliped: false});
    }
  }

  render() {
    const { cardIndex, fliped, animated, buttonClicked} = this.state;
    const { decks, deckId } = this.props;
    const deck  = decks[deckId -1];
    const card = deck.cards[cardIndex];
    
  
    return(
      
      <div className='main-container' style={{backgroundImage: `url(${background})`}} > 
        {/* {console.log('fliped: ', fliped, 'animated: ', animated)} */}
        {console.log('card: ', card)}
        <div className="container-cards">
          
          <div className='cards'>
            {
              fliped ? 
                <div className={`card ${animated ? 'animation' : 'fliped-card'}`}>
                  <div key={card.id}>
                    <p>{card.answer}</p>
                  </div>
                </div>
              : 
                <div className='card'>
                  <div key={card.id}>
                    <p>{card.question}</p>
                  </div>
                </div>
            }
          </div>
          {/* Criar os botoes como componentes  */}
          <div className='buttons-container'> 

            {
            !fliped ? 
              <button className='flip-button' onClick={this.handleFlipButton}><img src={Virar} alt="flip-button" width={25} height={25}/></button>
            : 

              buttonClicked ?
                <>
                  <button  className='hard-button' onClick={this.handleNextButton}><img src={Dificil} alt="hard-button" width={25} height={25}/></button>
                  <button  className='easy-button' onClick={this.handleNextButton}><img src={Facil} alt="easy-button" width={25} height={25}/></button>
                  <div className='button-animation'>
                    <Lottie animationData={confetti}/>
                  </div>
                </>
                
              :
              <>
                <button  className='hard-button' onClick={this.handleNextButton}><img src={Dificil} alt="hard-button" width={25} height={25}/></button>
                <button  className='easy-button' onClick={this.handleNextButton}><img src={Facil} alt="easy-button" width={25} height={25}/></button>
              </>
              
            }
            
          </div>
              
        </div>
      </div>
    );
  }
}