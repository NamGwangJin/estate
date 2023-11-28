import React, { useState, useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import DetailHead from './DetailHead.js';
import DetailBody from './DetailBody.js';
import '../../App.css';
import axios from 'axios';

export default function EstateDetail() {

  const query = window.location.search;
  const params = new URLSearchParams(query);
  const no = params.get("no"); // 현재 매물의 번호를 쿼리스트링을 통해 가져옴

  const [detail, setDetail] = useState([]);

  useEffect(() => {
      axios({
        method: "get",
        url: '/api/estate/detail',
        params: { no: no }
      })
        .then((res) => {
          setDetail(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [no]);

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
