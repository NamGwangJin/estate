import React, { useEffect, useState } from 'react';
import Header from '../header.js';
import './SearchMain.css';

export default function SearchMain() {

  const [searchList, setSearchList] = useState([]);

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
        <div>하이</div>
        <div className='MapandList'>
          <div className='SearchMap' id='SearchMap'>
            {/* 지도나옴 */}
          </div>
          <div className='SearchList'>
            {searchList.map((list)=> (
              <div className='productBox'>
                <div className='productIMG'>{list.productIMG}</div>
                <div className='productWord'>
                  <div>{list.product_id}</div>
                  <p>{list.desiredAmount}</p>
                  <h5>{list.product_content}</h5>
                  <p>{list.location}</p>
                  <hr/>
                  <div className='product_type'>
                    {/* <span>{list.product_type}</span><hr/><span>{list.building_name}</span><span>{list.extend}</span> */}
                    {list.product_type == "오피스텔" || list.product_type == "아파트" ? (
                      <><span>{list.product_type}</span><hr/><span>{list.building_name}</span><hr/><span>{list.extend}</span></> 
                    ) :  list.product_type == "상가" ? (
                      <><span>{list.product_type}</span><hr/><span>{list.extend}</span><hr/><span>{list.building_use}</span></>
                    ) : null }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
