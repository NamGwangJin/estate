import React , { useState } from 'react'
import Header from '../header'
import Bottom from '../bottom'
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'
import { hangjungdong } from "./hangjungdong";
import axios from 'axios';

export default function TourApliy() {
  const navigate = useNavigate();

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const { sido, sigugun, dong } = hangjungdong;

  function apliy(){
    const date = document.getElementById('tourDate').value;
    const time = document.querySelector('input[name="time"]:checked').value;

    const sido = document.getElementById('sido');
    const gugun = document.getElementById('gugun');
    const dodong = document.getElementById('dodong');
    const sidoText = sido.options[sido.selectedIndex].text;
    const gugunText = gugun.options[gugun.selectedIndex].text;
    const dodongText = dodong.options[dodong.selectedIndex].text;

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const content = document.getElementById('content').value;
    const local = sidoText + " " + gugunText + " " + dodongText;

    axios({
      method: 'post',
      url: '/api/tour/apliy',
      data: { tour_date : date, tour_time : time, tour_local  : local, tour_name : name, tour_phone : phone, tour_content : content }
    })
    .then((res) => {
      alert(res.data);
      navigate('/tour');
    })
    .catch(error => {
      alert("error!");
      console.log(error);
    })
  }

  return (
    <div className='App'>
        <Header />
        <div className='body'>
            <div className='title'>
                투어 신청하기
            </div>
            <div className='info'>
                <h2>매물투어 서비스</h2>
                <span>원하시는 지역, 원하시는 조건 ! 고객님께 딱 맞는 매물을 함께 여행하듯 확인하는 서비스입니다.</span>
            </div>
            <div className='tour'>
              <div className='tour-detail'>투어일자 <input type="date" id="tourDate" realvalue="" style={{marginLeft: '25px'}} /> </div>
              <div className='tour-detail'>투어시간
                <input type="radio" name="time" defaultChecked style={{marginLeft: '30px'}} value="오전 시간대" />오전시간대 가능
                <input type="radio" name="time" style={{marginLeft: '10px'}} value="오후 시간대" />오후시간대 가능
                <input type="radio" name="time" style={{marginLeft: '10px'}} value="기타" />기타
              </div>
              <div className='tour-detail'>신청지역
              <select onChange={(e) => setVal1(e.target.value)} id='sido'>
                <option value="">시/도</option>
                {sido.map((el) => (
                  <option key={el.sido} value={el.sido} id={el.codeNm}>
                    {el.codeNm}
                  </option>
                ))}
              </select>
              <select onChange={(e) => setVal2(e.target.value)} id='gugun'>
                <option value="">구/군</option>
                {sigugun
                  .filter((el) => el.sido === val1)
                  .map((el) => (
                    <option key={el.sigugun} value={el.sigugun} id={el.codeNm}>
                      {el.codeNm}
                    </option>
                ))}
              </select>
              <select onChange={(e) => setVal3(e.target.value)} id='dodong'>
                <option value="">도/동</option>
                {dong
                  .filter((el) => el.sido === val1 && el.sigugun === val2)
                  .map((el) => (
                    <option key={el.dong} value={el.dong} id={el.codeNm}>
                      {el.codeNm}
                    </option>
                ))}
              </select>
              </div>
              <div className='tour-detail'>이름 <input type="text" id='name' placeholder='이름을 입력해주세요.' style={{marginLeft: '55px'}} /></div>
              <div className='tour-detail'>연락처 <input type="text" id='phone' placeholder='-을 제외하고 입력해주세요.' style={{marginLeft: '39px'}} /></div>
              <div className='tour-detail'>상세내용
              <textarea placeholder='[선택사항] 요청사항을 입력해주세요.' id='content' style={{marginLeft: '26px', width: '500px', height: '200px', verticalAlign: 'top', textAlign: 'left'}} />
              </div>
            </div>
        </div>
        <Link to="/tour">
        <button className="btn btn-white">취소</button>&nbsp;
        </Link>
        <button className="btn btn-ruru" onClick={apliy}>투어 신청하기</button>
        <Bottom />
    </div>
  )
}
