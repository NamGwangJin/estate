import React, { useState, useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import '../../App.css';
import axios from 'axios';

export default function AdminEstateDetail() {

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

      console.log(detail);


  return (
    <div>
        <Header />
        <div className='container1' style={{minHeight: "1000px"}}>

            <div className='detail_body'>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>등록매물 정보</h3>
                    </div>
                </div>
            </div>

            <div className='detail_head'>
                <div className='info01'>
                    <div className='info_apt'>
                        <h3>{detail.building_name}</h3>
                    </div>
                    <div className='info_area'>
                        <p>계약면적</p>
                        <div>
                            52.05 (DB)
                            <span className='unit'> ㎡</span>
                        </div>
                    </div>
                    <div className='info_price'>
                        <span id="price_title_id">가격</span>
                        <p>
                            <strong id="price_val_id">{detail.desiredAmount}</strong>
                            <span>만원</span>
                        </p>
                    </div>
                </div>

                <div className='info02'>
                <ul id="mm_info_id">
                    <li style={{width: '500px'}}>
                        <span>매물번호</span>
                        {detail.product_id}
                    </li>
                    <li style={{width: '500px'}}>
                        <span>등록상태</span>
                        {detail.product_state} 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>거래/매물종류</span>
                        {detail.transactionType} / {detail.product_type} 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매물가격</span>
                        <strong id="price_val_id" style={{color: "#ff3811"}}>{detail.desiredAmount}</strong>
                        <span className='sub'>만원</span>
                    </li>
                    <li style={{width: '500px'}}>
                        <span>소재지</span>
                        {detail.location}
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매물명</span>
                        {detail.building_name}
                    </li>
                    <li style={{width: '500px'}}>
                        <span>해당층</span>
                        {detail.floor} 층
                    </li>
                    <li style={{width: '500px'}}>
                        <span></span>
                        {/* 선 크기를 위해 비워둠 */}
                    </li>
                    <li style={{width: '500px'}}>
                        <span>계약면적</span>
                        52.05 (DB)
                        <span className='unit'> ㎡</span>
                    </li>
                    <li style={{width: '500px'}}>
                        <span>전용면적</span>
                        20.81 (DB)
                        <span className='unit'> ㎡</span>
                    </li>
                    <li style={{width: '500px'}}>
                        <span>입력일 / 수정일</span>
                        {detail.created} / {detail.updated}
                    </li>
                    <li style={{width: '500px'}}>
                        <span>노출종료일</span>
                        -
                    </li>
                    <li style={{width: '500px'}}>
                        <span>등기부등본</span>
                        -
                    </li>
                    <li style={{width: '500px'}}>
                        <span>검증참고 파일</span>
                        -
                    </li>
                    <li style={{width: '500px'}}>
                        <span>기타정보</span>
                        -
                    </li>
                    <li style={{width: '500px'}}>
                        <span>원본매물번호</span>
                        -
                    </li>
                </ul>
                </div>
            </div>

            {/* <div className='detail_body' style={{marginTop: "50px"}}>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>매도/임대 의뢰인 정보</h3>
                    </div>
                </div>
            </div> */}

            {/* <div className='detail_head'>
                <div className='info02'>
                    <ul id="mm_info_id">
                    <li style={{width: '500px'}}>
                        <span>매물검증방식</span>
                        신홍보확인서 (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span></span>
                        { 선 크기를 위해 비워둠 }
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매물 소유자 구분</span>
                        개인매물(DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>미등기검증요청 여부</span>
                        등기검증(DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매도자명</span>
                        아무개 (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매도자 연락처</span>
                        010-1234-5678 (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매도자 아이디</span>
                        test (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>소유자명</span>
                        아무개 (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span style={{width: "auto", marginRight: "50px"}}>건축물대장기준 면적검증요청 여부</span>
                        미요청 (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span></span>
                        { 선 크기를 위해 비워둠  }
                    </li>
                    <li style={{width: '500px'}}>
                        <span>검증 참고란</span>
                        - (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span></span>
                        { 선 크기를 위해 비워둠 }
                    </li>
                    <li style={{width: '500px'}}>
                        <span>등기부등본</span>
                        - (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>검증참고 파일 첨부</span>
                        - (DB)
                    </li>
                </ul>
                </div>
            </div> */}

            <div className='info' style={{marginTop: "100px", width: "1080px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h3 style={{color: "black"}}>매물 등록이 성공적으로 <span style={{color: "red"}}>완료</span>되었습니다.</h3>
            </div>

            <div className='info' style={{marginTop: "100px", width: "1080px", display: "flex", justifyContent: "center", alignItems: "center", border: "0px"}}>
                <span className='link' onClick={() => {window.location.href="/admin"}}>리스트로 이동</span> <p> | </p>
                <span className='link' onClick={() => {window.location.href="/estate/detail?no="+detail.product_id}}>등록매물 보기</span> <p> | </p>
                <span className='link'>매물정보 수정</span>
            </div>
        </div>
        <Bottom />
    </div>
  )
}
