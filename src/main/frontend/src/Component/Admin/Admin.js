import React, { useState } from 'react';
import Admin_header from './Admin_header/Admin_header.js';
import Bottom from '../bottom.js';
import Admin_list from './Admin_list/Admin_list.js';
import Search_list from './Search_list/Search_list.js'
import Header from '../header.js';

export default function Admin() {

  const [propertyType, setPropertyType] = useState('');  // 추가 * 수헌

  return (
    <div className='App'>
      <Header/>
      <Admin_header />
      <div className='mainSection'>
        {/* <Search_list />
          
          <Admin_list /> */}
          {/* 추가 *수헌 */}
        <Search_list propertyType={propertyType} setPropertyType={setPropertyType} />     

        <Admin_list propertyType={propertyType} />
      </div>
      <Bottom />
    </div>
  )
}
