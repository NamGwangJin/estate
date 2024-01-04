import React, { useState, useEffect } from 'react'
import Header from '../header'
import Bottom from '../bottom'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TourDetail() {

    const [detail, setDetail] = useState([]);

    const query = window.location.search;
    const params = new URLSearchParams(query);
    const no = params.get("no");
  
    useEffect(() => {
      axios({
        method: "get",
        url: '/api/tour/view',
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
    <div className='App'>
        <Header />
        <div className='body'>
            <div className='title'>
                투어 신청내역
            </div>
            <div className='tour'>
              <div className='tour-detail'>투어일자 <input type="text" id="tourDate" value={detail.tour_date} style={{marginLeft: '25px'}} readOnly/> </div>
              <div className='tour-detail'>투어시간
                <input type="text" id="time" style={{marginLeft: '30px'}} value={detail.tour_time} readOnly/>
              </div>
              <div className='tour-detail'>신청지역
                <input type="text" id="local" style={{marginLeft: '30px'}} value={detail.tour_local} readOnly/>
              </div>
              <div className='tour-detail'>이름 <input type="text" id='name' value={detail.tour_name} style={{marginLeft: '55px'}} readOnly/></div>
              <div className='tour-detail'>연락처 <input type="text" id='phone' value={detail.tour_phone} style={{marginLeft: '39px'}} readOnly/></div>
              <div className='tour-detail'>상세내용
              <textarea id='content' value={detail.tour_content} readOnly style={{marginLeft: '26px', width: '500px', height: '200px', verticalAlign: 'top', textAlign: 'left'}} />
              </div>
            </div>
        </div>
        <Link to="/tour">
        <button className="btn btn-white">목록으로</button>&nbsp;
        </Link>
        <Bottom />
    </div>
  )
}
