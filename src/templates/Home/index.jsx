import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles.css';

import { Decks } from '../../components/Decks';
import EditCards from '../../components/EditCards';
import MoreDecks from '../../components/MoreDecks';
import RemoveDeck from '../../components/RemoveDeck';
import Cards from '../../components/Cards';
import { Navbar } from '../../components/NavBar';

import { loadDecks } from '../../utils/load-decks';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDecks = async () => {
      const decksLoaded = await loadDecks();
      setDecks(decksLoaded);
    };

    fetchDecks();
  }, []);

  const handleDelete = async (deckId) => {
    try {
      const response = await fetch(`https://66526823813d78e6d6d57405.mockapi.io/decks/${deckId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
      } else {
        setDecks(decks.filter(deck => deck.id !== parseInt(deckId)));
        setTimeout(() => navigate('/home'), 300);
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(decks)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/deck/:deckid" element={<Cards decks={decks} />} />
        <Route path="/edit-decks/:deckid" element={<EditCards decks={decks} />} />
        <Route path="/remove-deck/:deckid" element={<RemoveDeck decks={decks} handleDelete={handleDelete}/>} />
        <Route path="more-decks" element={<MoreDecks />} />
        <Route path="*" element={<Decks decks={decks} />} />
      </Routes>
    </>
  );
};

export default Home;