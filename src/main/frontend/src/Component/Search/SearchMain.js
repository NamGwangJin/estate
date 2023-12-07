import React, { useEffect, useState } from 'react';
import Header from '../header.js';
import axios from 'axios';
import './SearchMain.css';

export default function SearchMain() {

  const [searchList, setSearchList] = useState([]);

  const [transactionType, setTransactionType] = useState('');
  const [productType, setProductType] = useState('');


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

  useEffect(() => {
    // 서버에서 데이터를 가져오는 코드
    const fetchData = async () => {
      try {
        let params = {};

        // transactionType이나 productType 중 하나라도 선택되었을 경우에만 해당 필드를 추가
        if (transactionType) {
          params.transactionType = transactionType;
        }
        if (productType) {
          params.productType = productType;
        }

        const response = await axios.get('api/getProducts', { params });
        console.log(response.data);
        setSearchList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // 함수 호출

  }, [transactionType, productType]); // useEffect를 [transactionType, productType]로 설정하여 해당 상태가 변경될 때마다 실행

  // 초기화 버튼 클릭 시 상태를 초기화하고 전체 목록을 불러옴
  const handleReset = () => {
    setTransactionType('');
    const transactionTypeSelect = document.getElementById('transactionTypeSelect');
    transactionTypeSelect.value = '';
    setProductType('');
    const productTypeSelect = document.getElementById('productTypeSelect');
    productTypeSelect.value = '';
  };

  return (
    <div className='SearchMain'>
      <Header />
      <div className='SearchSection'>
        <div>
          <button onClick={handleReset}>초기화</button>
          {/* <select> */}
          <select id='transactionTypeSelect' onChange={(e) => setTransactionType(e.target.value)}>
            <option value='' disabled selected>거래유형</option>
            <option value='매매'>매매</option>
            <option value='전세'>전세</option>
            <option value='월세'>월세</option>
          </select>
          {/* <select> */}
          <select id='productTypeSelect' onChange={(e) => setProductType(e.target.value)}>
            <option value='' disabled selected>매물유형</option>
            <option value='오피스텔'>오피스텔</option>
            <option value='아파트'>아파트</option>
            <option value='상가'>상가</option>
            <option value='지식산업센터/사무실'>지식산업센터·사무실</option>
            <option value='토지'>토지</option>
            <option value='공장/창고'>공장·창고</option>
          </select>
        </div>
        <div className='MapandList'>
          <div className='SearchMap' id='SearchMap'>
            {/* 지도나옴 */}
          </div>
          <div className='SearchList'>
            {searchList.map((list) => (
              // <div className='productBox'>
              <div className='productBox' key={list.product_id}>
                <div className='productIMG'>
                  {/* <img className="ImgOne" src={`/img/${list.img_title}`} alt={list.img_title} /> */}
                  <img className="ImgOne" src={`/img/${list.img_title || '이미지준비중.png'}`} alt={list.img_title} />
                </div>
                <div className='productWord'>
                  <div className='product_id_box'>매물번호 {list.product_id}</div>
                  <p>{list.transactionType} {list.desiredAmount} 원</p>
                  <h4>{list.product_title}</h4>
                  <p>{list.location}</p>
                  <hr />
                  <div className='product_type'>
                    {list.product_type === "오피스텔" || list.product_type === "아파트" ? (   // 인서트될때 업무시설로 되어있음. 광진 확인
                      <><span>{list.product_type}</span><hr /><span>{list.building_name}</span><hr /><span>{list.extent}</span></>
                    ) : list.product_type === "토지" ? (
                      <><span>{list.product_type}</span><hr /><span>{list.extent}</span><hr /><span>{list.location}</span></>
                    ) : <><span>{list.product_type}</span><hr /><span>{list.extent}</span></>
                    }
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
