import React, { useEffect, useState } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import axios from 'axios';
import Detail from '../Estate/EstateDetail.js';
import './SearchGrid.css';



export default function SearchGrid() {

  const [searchList, setSearchList] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [productType, setProductType] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // 서버에서 데이터를 가져오는 코드
    const fetchData = async () => {
      try {
        let params = {};

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

  }, [transactionType, productType]);

  // 초기화 버튼 클릭 시 상태를 초기화하고 전체 목록을 불러옴
  const handleReset = () => {
    setTransactionType('');
    const transactionTypeSelect = document.getElementById('transactionTypeSelect');
    transactionTypeSelect.value = '';
    setProductType('');
    const productTypeSelect = document.getElementById('productTypeSelect');
    productTypeSelect.value = '';
  };


  const openDetailModal = (product_id) => {
    setSelectedProduct(product_id);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };
  useEffect(() => {
    const loadKakaoMapScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=73dfe3bf43bd31398ab2de67c59cad97&libraries=services,clusterer&autoload=false`;

      script.onload = () => {
        window.kakao.maps.load(() => {
          // Kakao Map script has loaded
        });
      };

      document.head.appendChild(script);
    };

    loadKakaoMapScript();
  }, []);


  return (
    <div>
      <Header />
      <div className='SearchSection'>
        <div>  {/* 버튼 css */}
          <button onClick={handleReset}>초기화</button>
          <select id='transactionTypeSelect' onChange={(e) => setTransactionType(e.target.value)}>
            <option value='' disabled selected>거래유형</option>
            <option value='매매'>매매</option>
            <option value='전세'>전세</option>
            <option value='월세'>월세</option>
          </select>
          <select id='productTypeSelect' onChange={(e) => setProductType(e.target.value)}>
            <option value='' disabled selected>매물유형</option>
            <option value='오피스텔'>오피스텔</option>
            <option value='아파트'>아파트</option>
            <option value='상가'>상가</option>
            <option value='지식산업센터/사무실'>지식산업센터·사무실</option>
            {/* 지식산업센터·사무실 로 바꾸기 ---------------------*/}
            <option value='토지'>토지</option>
            <option value='공장/창고'>공장·창고</option>
          </select>
        </div>
        <div className='GridList'>
          {searchList.map((list) => (
            <div className='GridBox' key={list.product_id} onClick={() => openDetailModal(list)}>
              <div className='GridproductIMG'>
                <img className="GridImgOne" src={`/img/${list.img_title || '이미지준비중.png'}`} alt={list.img_title} />
              </div>
              <div className='GridproductWord'>
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
                <h3>{list.product_title.length > 20 ? `${list.product_title.slice(0, 20)}...` : list.product_title}</h3>
                <p>{list.location}</p>
                <hr style={{ width: "250px" }} />
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
            <Detail product_id={selectedProduct.product_id} onClose={closeDetailModal} />
          </div>
        )}
      </div>
      <Bottom />
    </div>
  )
}
