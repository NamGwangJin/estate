import React, { useState, useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import DetailHead from './DetailHead.js';
import DetailBody from './DetailBody.js';
import '../../App.css';
import axios from 'axios';

export default function EstateDetail({ product_id, onClose }) {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    // productId로 서버에 요청을 보내 상세 정보를 가져옴
    axios.get(`/api/estate/detail?product_id=${product_id}`)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product_id]);

  return (
    <div>
      <div className='container1'>
        <button className='closeButton' onClick={onClose}>X</button>
        {detail && <DetailHead product_id={product_id} detail={detail} />}


        {detail && <DetailBody product_id={product_id} detail={detail} />}
      </div>
    </div>
  )
}
