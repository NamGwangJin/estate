import React, { useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import DetailHead from './DetailHead.js';
import DetailBody from './DetailBody.js';
import '../../App.css';

export default function EstateDetail() {
  return (
    <div>
        <Header />
            <div className='container1'>
                <DetailHead />

                <DetailBody />
            </div>
        <Bottom />
    </div>
  )
}
