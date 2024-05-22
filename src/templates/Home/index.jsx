
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './styles.css';

import { Decks }  from '../../components/Decks';
import EditCards   from '../../components/EditCards';
import  MoreDecks  from '../../components/MoreDecks';
import  Cards  from '../../components/Cards';
import { Navbar } from '../../components/NavBar';
import { loadDecks } from '../../utils/load-decks';

export class Home extends Component {
  state = {
    newDeckName: '',
    decks: []
  }

  async componentDidMount() {
    await this.loadDecks();
  }

  loadDecks = async () => {
    const decksLoaded = await loadDecks();
    this.setState({ decks: decksLoaded});
  }

  handleChange = (e) => {
    const { value } = e.target;
    
    this.setState({ newDeckName: value})
    console.log(value)
  }


//  ESTA FUNÇÃO DEVERA SER MUDADA POR UM FETCH PARA O BACKEND
  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { newDeckName, decks } = this.state;
  //   const newDeck = {
  //     id: decks.length + 1,
  //     name: newDeckName,
  //     cards: []
  //   }
  //   this.setState({ deck: [...decks, newDeck] })
  // }

  render() {
    const { decks } = this.state;

    return (
      <>
          <Navbar/> 
          {/* @todo: mover para componente Decks ↓ */}
          <Routes>
            <Route path="/deck/:deckid" element={<Cards decks={decks} />}/>
            <Route path="/edit-decks/:deckid" element={<EditCards decks={decks} />}/> 
            <Route path="more-decks" element={<MoreDecks />} />
            <Route path='*' element={<Decks decks={decks} />}/>
          </Routes>
        {/* </div> */}
      </> 
      );
  }
}

