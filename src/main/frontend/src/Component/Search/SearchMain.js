import React, { useEffect, useState } from 'react';
import Header from '../header.js';
import './SearchMain.css';

export default function SearchMain() {
  useEffect(() => {
    // JavaScript 코드를 이곳에 삽입합니다.

    // 지도를 표시할 div 엘리먼트를 찾습니다.
    const mapContainer = document.getElementById('SearchMap');

    // 지도 옵션 설정
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.6438713, 126.624015), // 지도의 중심좌표
      level: 9, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
  }, []); // useEffect를 빈 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className='SearchMain'>
      <Header />
      <div className='SearchSection'>
        <div className='SearchMap' id='SearchMap'>
          {/* 지도나옴 */}
        </div>
        <div className='SearchList'>
          asd
        </div>
      </div>
    </div>
  )
}
