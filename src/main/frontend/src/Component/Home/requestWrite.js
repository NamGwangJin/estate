import React, { useState } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import axios from 'axios';
import './requestWrite.css';
import { hangjungdong } from "./hangjungdong.js";

export default function RequestWrite() {
  const [selectedType, setSelectedType] = useState('buy');

  function btnInsert() {



    axios({
      method: 'post',
      url: '/api/requestInsert',
      params: {
        request_first_type: selectedType
      },
    })
      .then((res) => {
        if (res.data === 'success') {
          alert('매물의뢰가 접수되었습니다.');
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('에러메세지:', error);
      })
  }

  return (
    <div className='requestWrite'>
      <Header />
      <h2 className='title'>매물의뢰 2</h2>
      <div className='requestWriteMain'>
        <div className='firstType_select'>
          <label>
            <input type='radio' value={'buy'} checked={selectedType === 'buy'} onChange={() => setSelectedType('buy')} />구해요
          </label>
          <label>
            <input type='radio' value={'sell'} checked={selectedType === 'sell'} onChange={() => setSelectedType('sell')} />팔아요
          </label>
        </div>
        <div className='request_body'>
          <div className='transactionType'>
            <div className='transactionType_title'>거래종류</div>
            <div className='transactionType_type'>
              <div className='transactionType_group' data-toggle='buttons'>
                <label className='parcel_out' data-type='parcel_out'>
                  <input type='radio' name='item_type' value='parcel_out' />분양
                </label>
                <label className='sell' data-type='sell'>
                  <input type='radio' name='item_type' value='sell' />매매
                </label>
                <label className='full_rent' data-type='full_rent'>
                <input type='radio' name='item_type' value='full_rent' />전세
                </label>
                <label className='month_rent' data-type='month_rent'>
                <input type='radio' name='item_type' value='month_rent' />월세
                </label>
              </div>
            </div>
          </div>
        </div>
        <button onClick={btnInsert}>의뢰하기</button>
        <button onClick={() => { window.location.href = '/' }}>홈으로</button>
      </div>
      <Bottom />
    </div>
  )
}
