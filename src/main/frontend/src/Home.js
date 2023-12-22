import React from 'react';
import Header from './Component/header.js';
import Bottom from './Component/bottom.js';
import Inquiry from './Component/Home/inquiry.js';
import SearchBar from './Component/SearchBar/SearchBar.js';
import MainBox from './Component/MainBox/MainBox.js';
import './App.css';
import Request_box from './Component/Request_box/Request_box.js';

function Home() {
    return (
        <div className="App">
          <Header />
          <div className='mainSection'>
          <SearchBar/>
          <MainBox />
          <Request_box/>
          </div>
          <div className='inquiry1'>
            <Inquiry />
          </div>
          <div className='inquiry2'>
            {/* <Inquiry /> */}
          </div>
          <Bottom />
        </div>
      );
}

export default Home;