import React from 'react'
import Header from '../header.js';
import Bottom from '../bottom.js';
import '../../App.css';

export default function AdminEstateDetail() {
  return (
    <div>
        <Header />
        <div className='container1'>

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
                        <h3>연세Y7두애틱 1동 415호(DB)</h3>
                    </div>
                    <div className='info_area'>
                        <p>계약면적</p>
                        <div>
                            52.05 (DB)
                            <span className='unit'> ㎡</span>
                        </div>
                    </div>
                    <div className='info_price'>
                        <span id="price_title_id">가격 (DB)</span>
                        <p>
                            <strong id="price_val_id">9500 (DB)</strong>
                            <span>만원</span>
                        </p>
                    </div>
                </div>

                <div className='info02'>
                <ul id="mm_info_id">
                    <li style={{width: '500px'}}>
                        <span>매물번호</span>
                        1 (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>등록기간</span>
                        30일 (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>거래/매물종류</span>
                        전세(DB) / 오피스텔(DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매물가격</span>
                        <strong id="price_val_id" style={{color: "#ff3811"}}>9500 (DB)</strong>
                        <span className='sub'>만원</span>
                    </li>
                    <li style={{width: '500px'}}>
                        <span>소재지</span>
                        김포시 구래동 (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>매물명</span>
                        연세Y7두애틱 1동 415호 (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span>해당층</span>
                        4층 (DB) 
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
                        2023-11-15 오후 1:41:25 / (수정일 들어갈 곳) (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>노출종료일</span>
                        - (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>등기부등본</span>
                        - (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>검증참고 파일</span>
                        - (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>기타정보</span>
                        - (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span>원본매물번호</span>
                        - (DB)
                    </li>
                </ul>
                </div>
            </div>

            <div className='detail_body' style={{marginTop: "50px"}}>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>매도/임대 의뢰인 정보</h3>
                    </div>
                </div>
            </div>

            <div className='detail_head'>
                <div className='info02'>
                    <ul id="mm_info_id">
                    <li style={{width: '500px'}}>
                        <span>매물검증방식</span>
                        신홍보확인서 (DB) 
                    </li>
                    <li style={{width: '500px'}}>
                        <span></span>
                        {/* 선 크기를 위해 비워둠 */}
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
                        {/* 선 크기를 위해 비워둠 */ }
                    </li>
                    <li style={{width: '500px'}}>
                        <span>검증 참고란</span>
                        - (DB)
                    </li>
                    <li style={{width: '500px'}}>
                        <span></span>
                        {/* 선 크기를 위해 비워둠 */}
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
            </div>

            <div className='info' style={{marginTop: "100px", width: "1080px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h3 style={{color: "black"}}>매물 등록이 성공적으로 <span style={{color: "red"}}>완료</span>되었습니다.</h3>
            </div>

            <div className='info' style={{marginTop: "100px", width: "1080px", display: "flex", justifyContent: "center", alignItems: "center", border: "0px"}}>
                <span className='link'>리스트로 이동</span> <p> | </p> <span className='link'>등록매물 보기</span> <p> | </p> <span className='link'>매물정보 수정</span>
            </div>
        </div>
        <Bottom />
    </div>
  )
}
