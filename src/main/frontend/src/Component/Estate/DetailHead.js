import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bottom from '../bottom';

export default function DetailHead({ product_id }) {
    const [detail, setDetail] = useState({});
    const [date, setDate] = useState("날짜 없음");
    

    useEffect(() => {
        // productId로 서버에 요청을 보내 상세 정보를 가져옴
        axios.get(`/api/estate/detail?product_id=${product_id}`)
            .then((res) => {
                setDetail(res.data);
                if (res.data.created) {
                    const ymdhms = res.data.created.split(" ");
                    const ymd = ymdhms[0].split("-");
                    const formattedDate = ymd[0].substring(ymd[0].length - 2) + "." + ymd[1] + "." + ymd[2];
                    setDate(formattedDate);
                }
            })
            .catch((error) => {
                console.error('Error fetching estate detail:', error);
            });
    }, [product_id]);

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
                        <li style={{ width: '368px' }}>
                            <span>해당 층 / 총 층</span>
                            {detail.floor} / 총 층은 가져올 방법 생각하기
                        </li>
                        <li style={{ width: '350px' }}>
                            <span>방 수 / 욕실 수</span>
                            {detail.rooms} / {detail.bathroom} <span className='sub'>개</span>
                        </li>
                        <li style={{ width: '350px' }}>
                            <span>융자금</span>
                            {detail.loan} <span className='sub'>만원</span>
                        </li>
                        <li style={{ width: '368px' }}>
                            <span>입주 가능일</span>
                            {detail.moveable_date}
                        </li>
                        <li style={{ width: '350px' }}>
                            <span>월 관리비</span>
                            {detail.administration_cost} <span className='sub'>원</span>
                        </li>
                        <li style={{ width: '350px' }}>
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
                                <strong className="tel"> 0000-00000-000000 </strong>
                                <span>&nbsp;</span>
                                <span>|</span>
                                <span>&nbsp;</span>
                                대표 연락처 :
                                <strong className="tel"> 031-982-3535 / 010-9918-5729 </strong>
                            </label>
                        </li>
                        <li>
                            <span>중개업소 소재지</span>
                            <a style={{ color: "black", textDecoration: "none" }} href='https://map.kakao.com/link/search/루루공인중개사사무소'>경기도 김포시 김포한강10로133번길 82 B동 1층 104호</a>
                            {/* 카카오맵 링크걸면 좋을듯 */}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
