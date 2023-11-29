import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DetailHead() {

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

      // date 란에 표시될 날짜 추출
      let date = "";

      if (detail.created) {
        const ymdhms = detail.created.split(" ");
        const ymd = ymdhms[0].split("-");
        date = ymd[0].substring(ymd[0].length - 2) + "." + ymd[1] + "." + ymd[2];
      } else {
        // detail.created가 없을 경우 처리할 내용
        date = "날짜 없음";
      }
  return (
    <div>
        <div className='detail_head'>
            <div className='info01'>
                <div className='info_apt'>
                    <dl>
                        <dt>DATE</dt>
                        <dd id="mm_reg_date">{date}</dd>
                    </dl>
                    <h3 id="mm_title_id">{detail.building_name}</h3>
                </div>
                <div className='info_area'>
                    <p id="area_title_id">계약면적 / 전용면적</p>
                    <div id='area01'>
                        77.43
                        <span className='bar'> / </span>
                        45.09 (DB)
                        <span className='unit'> ㎡</span>
                    </div>
                </div>
                <div className='info_price'>
                    <span id="price_title_id">{detail.transactionType}</span>
                    <p>
                        <strong id="price_val_id">{detail.desiredAmount}</strong>
                        <span>만원</span>
                    </p>
                </div>
            </div>
            
            <div className='info02'>
                <ul id="mm_info_id">
                    <li style={{width: '368px'}}>
                        <span>해당 층 / 총 층</span>
                        {detail.floor} / 총 층은 가져올 방법 생각하기
                    </li>
                    <li style={{width: '350px'}}>
                        <span>방 수 / 욕실 수</span>
                        {detail.rooms} / {detail.bathroom}
                    </li>
                    <li style={{width: '350px'}}>
                        <span>융자금</span>
                        {detail.loan} <span className='sub'>만원</span>
                    </li>
                    <li style={{width: '368px'}}>
                        <span>입주 가능일</span>
                        {detail.moveable_date}
                    </li>
                    <li style={{width: '350px'}}>
                        <span>월 관리비</span>
                        {detail.administration_cost} <span className='sub'>원</span>
                    </li>
                    <li style={{width: '350px'}}>
                        <span>기보증금 / 월세</span>
                        {detail.existingTenant_deposit} / {detail.existingTenant_monthlyRent} <span className='sub'>만원</span>
                    </li>
                    <li>
                        <span>용도</span>
                        {detail.roomuse}
                    </li>
                    <li>
                        <span>중개업소</span>
                        <label>
                        루루공인중개사사무소
                        <span>&nbsp;</span>
                        <span>|</span>
                        <span>&nbsp;</span>
                        대표 : 이민영
                        <span>&nbsp;</span>
                        <span>|</span>
                        <span>&nbsp;</span>
                        개설등록번호 :
                        <strong className="tel"> 번호입력 </strong>
                        <span>&nbsp;</span>
                        <span>|</span>
                        <span>&nbsp;</span>
                        대표 연락처 :
                        <strong className="tel"> 번호입력 </strong>
                        </label>
                    </li>
                    <li>
                        <span>중개업소 소재지</span>
                        경기도 김포시 김포한강10로133번길 82 B동 1층 104호
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
