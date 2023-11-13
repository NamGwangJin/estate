import React from 'react';
import Header from './Component/header.js';
import Bottom from './Component/bottom.js';
import Inquiry from './Component/Home/inquiry.js';
import SearchBar from './Component/SearchBar/SearchBar.js';
import MainBox from './Component/MainBox/MainBox.js';
import './App.css';

function Home() {
    return (
        <div className="App">
          <Header />
          <div className='mainSection'>
          <SearchBar/>
          </div>
          <MainBox />
          <div className='inquiry1'>
            {/* <Inquiry /> */}
          </div>
          <div className='inquiry2'>
            {/* <Inquiry /> */}
          </div>
          <Bottom />
        </div>
      );
}

export default Home;