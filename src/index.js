import React from 'react';
import '../src/styles/globalStyles.css';
import * as ReactDOM from "react-dom/client";
import { Home } from '../src/templates/Home';
import Cards from '../src/components/Cards';

import  MoreDecks  from '../src/components/MoreDecks';
import  EditCards  from '../src/components/EditCards';
import { LoginScreen } from '../src/templates/LoginScreen';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<LoginScreen />}/>
            {/* <Route path="more-decks" element={<MoreDecks />}/> */}
            {/* <Route path="edit-decks/:deckid" element={<EditCards />}/> */}
          </Route>
          <Route path='/home' element={<Home />}/>
          <Route path='*' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);


// reportWebVitals();
