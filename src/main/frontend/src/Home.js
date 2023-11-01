import React from 'react';
import Header from './Component/header.js';
import Bottom from './Component/bottom.js';
import './App.css';

function Home() {
    return (
        <div className="App">
          <Header />
          <div className='mainSection'>메인섹션</div>
          <Bottom />
        </div>
      );
}

export default Home;