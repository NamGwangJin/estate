/* global kakao */
import React, { useEffect, useState } from 'react';
import Header from '../header.js';
import axios from 'axios';
import './SearchMain.css';

export default function SearchMain() {

  const [searchList, setSearchList] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [productType, setProductType] = useState('');

  useEffect(() => {
    //   console.log('window.kakao:', window.kakao);

    //   // 지도를 표시할 div 엘리먼트를 찾습니다.
    //   const mapContainer = document.getElementById('SearchMap');

    //   // 지도 옵션 설정
    //   const mapOption = {
    //     center: new window.kakao.maps.LatLng(37.6438713, 126.624015), // 지도의 중심좌표
    //     level: 13, // 지도의 확대 레벨
    //   };

    //   // 지도를 생성합니다
    //   const map = new window.kakao.maps.Map(mapContainer, mapOption);

    //   const geocoder = new window.kakao.maps.services.Geocoder();
    //   geocoder.addressSearch('경기도 김포시 구래동 6872-2', function(result, status) {
    //     if(status === window.kakao.maps.services.Status.OK){
    //       var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

    //       var marker = new window.kakao.maps.Marker({
    //         map: map,
    //         position: coords
    //       });
    //       // var infowindow = new window.kakao.maps.InfoWindow({
    //       //   content: '<div style="width:150px;text-align:center;padding:6px 0;">우리집</div>'
    //       // });
    //       // infowindow.open(map, marker);
    //       map.setCenter(coords);
    //     }
    //   })

    // }, []); // useEffect를 빈 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    // Kakao 맵 스크립트 로드 여부 확인
    if (!window.kakao) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=73dfe3bf43bd31398ab2de67c59cad97&libraries=services,clusterer&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        // 스크립트 로드 완료 후 실행
        initializeMap();
      };
    } else {
      // 이미 스크립트 로드되어 있을 때 바로 실행
      initializeMap();
    }
  }, []); // useEffect를 빈 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const initializeMap = () => {
    console.log('window.kakao:', window.kakao);

    // 지도를 표시할 div 엘리먼트를 찾습니다.
    const mapContainer = document.getElementById('SearchMap');

    console.log('mapContainer:', mapContainer);


    if (mapContainer) {
      // 지도 옵션 설정
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.6438713, 126.624015), // 지도의 중심좌표
        level: 8, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch('경기도 김포시 구래동 6872-2', function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          // var coords = new kakao.maps.Point(result[0].x, result[0].y); // x와 y 좌표를 반대로 사용


          var marker = new window.kakao.maps.Marker({
            map: map,
            position: coords
          });

          map.setCenter(coords);
        }
      });
    }
  };

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
              <div className='productBox' key={list.product_id}>
                <div className='productIMG'>
                  <img className="ImgOne" src={`/img/${list.img_title || '이미지준비중.png'}`} alt={list.img_title} />
                </div>
                <div className='productWord'>
                  <div className='product_id_box'>매물번호 {list.product_id}</div>
                  {list.transactionType === "월세" ? (
                    <p className='transaction'>
                      <>
                        <span className="circleMonth">보</span> {list.desiredAmount.split('/')[0]} 만원 &nbsp;&nbsp;
                        <span className="circleMonth">월</span> {list.desiredAmount.split('/')[1]} 만원
                      </>
                    </p>
                  ) : list.transactionType === "전세" ? (
                    <><p className='transaction'><span className="circleCharter">전</span> {list.desiredAmount ? `${list.desiredAmount} 만원` : <span style={{ fontWeight: "700" }}>가격협의</span>}</p></>
                  ) : list.transactionType === "매매" ? (
                    <><p className='transaction'><span className="circleSale">매</span> {list.desiredAmount ? `${list.desiredAmount} 만원` : <span style={{ fontWeight: "700" }}>가격협의</span>}</p></>
                  ) : null}
                  {/* 글자수가 길어지면 ... 로 바뀌는 로직. 나중에 글자수 사이즈 체크해서 글자수 수정 */}
                  <h4>{list.product_title.length > 20 ? `${list.product_title.slice(0, 20)}...` : list.product_title}</h4>
                  <p>{list.location}</p>
                  <hr style={{ width: "200px" }} />
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
