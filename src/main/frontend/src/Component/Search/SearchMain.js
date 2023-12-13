/* global kakao */
import React, { useEffect, useState } from 'react';
import Header from '../header.js';
import axios from 'axios';
import './SearchMain.css';
import Detail from '../Estate/EstateDetail.js';

// 여기까지
export default function SearchMain() {

  const [searchList, setSearchList] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [productType, setProductType] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Kakao 맵 스크립트 로드 여부 확인
    if (!window.kakao) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=73dfe3bf43bd31398ab2de67c59cad97&libraries=services,clusterer&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        // 스크립트 로드 완료 후 실행
        window.kakao.maps.load(() => {
          initializeMap();
        })
      };
    } else {
      // 이미 스크립트 로드되어 있을 때 바로 실행
      initializeMap();
    }
  }, [[searchList]]);

  const initializeMap = () => {
    const mapContainer = document.getElementById('SearchMap');
    if (mapContainer && searchList.length > 0) {
      const mapOption = {
        center: new kakao.maps.LatLng(37.6438713, 126.624015),
        level: 11,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const geocoder = new window.kakao.maps.services.Geocoder();
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4,
      });

      searchList.map((list) => {
        geocoder.addressSearch(list.location, function (result, status) {   // 나중에 location + address 로 수정
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });
            clusterer.addMarker(marker);
            map.setCenter(coords);
          }
        });
        return null;
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


  const openDetailModal = (product) => {
    alert("asd");
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
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
              <div className='productBox' key={list.product_id} onClick={() => openDetailModal(list)}>
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
          {showDetailModal && (
            <div className='Detail' id='Detail'>
              <Detail product={selectedProduct} onClose={closeDetailModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


