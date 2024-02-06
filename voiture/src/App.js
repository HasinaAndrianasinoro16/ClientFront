import React from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './assets/fontawesome-5/css/all.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './Header';
import Body from './Body';
// import Messagerie from './Messagerie';
import Favoris from './Favoris';
import Historique from './Historique';
import LogSign from './LogSign';
import Sign from './Sign';
import Detail from './Detail';
import Message from './Message';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Body/>} />
        <Route path='/favoris' element={<Favoris/>} />
        <Route path='/messagerie' element={<Message/>} />
        <Route path='/historique' element={<Historique/>} />
        <Route path='/log' element={<LogSign/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/detail' element={<Detail/>}/>
      </Routes>
    </Router>
    // <>
    //   <Header />
    //   <div className='py-2'></div>
    //   <Messagerie/>
    // </>
  );
}

export default App;
