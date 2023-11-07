import React from 'react';
import Header from './Component/header.js';
import Bottom from './Component/bottom.js';
import Inquiry from './Component/Home/inquiry.js';
import './App.css';

function Home() {
    return (
        <div className="App">
          <Header />
          <div className='mainSection'>메인섹션123123</div>
          <div className='inquiry1'>
            <Inquiry />
          </div>
          <div className='inquiry2'>
            <Inquiry />
          </div>
          <Bottom />
        </div>
      );
}

export default Home;