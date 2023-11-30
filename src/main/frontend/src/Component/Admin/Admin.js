import React from 'react'
import Header from '../header.js';
import Bottom from '../bottom.js';
import Admin_list from './Admin_list/Admin_list.js';
import Search_list from './Search_list/Search_list.js'

export default function admin() {
  return (
    <div className='App'>
        <Header />
        <div className='mainSection'>
          <Search_list />
          
          <Admin_list />
        </div>
        <Bottom />
    </div>
  )
}
