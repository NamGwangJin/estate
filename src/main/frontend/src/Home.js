import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Component/header.js';
import Bottom from './Component/bottom.js';
import Inquiry from './Component/Home/inquiry.js';
import SearchBar from './Component/SearchBar/SearchBar.js';
import MainBox from './Component/MainBox/MainBox.js';
import Detail from './Component/Estate/EstateDetail.js';
import './App.css';
import Request_box from './Component/Request_box/Request_box.js';

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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



  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  useEffect(() => {
    // 서버에서 최신 매물 데이터를 가져오는 함수
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get('/api/getLatestProduct');
        setLatestProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestProducts();  // 함수 호출

  }, []);
  const openDetailModal = (product_id) => {
    setSelectedProduct(product_id);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };
  return (
    <div className="App">
      <Header />
      <div className='mainSection'>
        <SearchBar />
        <MainBox />
        <div className='threeBox'>
          <div className='SearchMapbox' onClick={() => handleNavigate('/Search')}>지도에서 매물검색</div>
          <div className='SearchGridbox' onClick={() => handleNavigate('/Grid')}>목록에서 매물검색</div>
          <div className='tourbox' onClick={() => handleNavigate('/tour')}>매물투어시청</div>
        </div>
        <div>여기에 추천매물</div>
        <h3>최신매물</h3>
        <div className='getLateArrayList'>
          {latestProducts.map((list) => (
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

        <Request_box />
        <div>각종 사이트 링크</div>
      </div>
      <div className='inquiry1'>
        {/* 위치 수정하기 */}
        <Inquiry />
      </div>
      <div className='inquiry2'>
        {/* <Inquiry /> */}
      </div>
      <Bottom />
      {showDetailModal && (
        <div className='Detail' id='Detail'>
          <Detail product_id={selectedProduct.product_id} onClose={closeDetailModal} />
        </div>
      )}
    </div>
  );
}

export default Home;