import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    // let bjd_code = '';
    // let bun = '';
    // let ji = '';

    // useEffect(() => {
    //     axios({
    //         method: 'post',
    //         url: '/api/get/bjd_code',
    //         params: {location: detail.location}
    //     })
    //     .then((res) => {
    //         bjd_code = String(res.data);
    //         bun = String(detail.building_name.split('-')[0]);
    //         ji = String(detail.building_name.split('-')[1]);
    //         let items = '';
    //           var xhr = new XMLHttpRequest();
    //           var url = 'http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo'; /*URL*/
    //           var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'awBBm0hyTWbKIRKVbFl85MND2xq0q9rJJsqUONeQoaX0ThS%2Bc4R31pxCy4H67wC443%2F2mAkFDnfHrpWXXCalyQ%3D%3D'; /*Service Key*/
    //           queryParams += '&' + encodeURIComponent('sigunguCd') + '=' + encodeURIComponent(bjd_code.substring(0, 5)); /**/
    //           queryParams += '&' + encodeURIComponent('bjdongCd') + '=' + encodeURIComponent(bjd_code.substring(5)); /**/
    //           queryParams += '&' + encodeURIComponent('platGbCd') + '=' + encodeURIComponent('0'); /**/
    //           queryParams += '&' + encodeURIComponent('bun') + '=' + encodeURIComponent(bun); /**/
    //           queryParams += '&' + encodeURIComponent('ji') + '=' + encodeURIComponent(ji); /**/
    //           queryParams += '&' + encodeURIComponent('startDate') + '=' + encodeURIComponent(''); /**/
    //           queryParams += '&' + encodeURIComponent('endDate') + '=' + encodeURIComponent(''); /**/
    //           queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(''); /**/
    //           queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(''); /**/
    //           xhr.open('GET', url + queryParams);
    //           xhr.onreadystatechange = function () {
    //               if (this.readyState == 4) {
    //                   // XML 데이터 파싱
    //                   var xmlDoc = this.responseXML;
      
    //                   // 원하는 데이터 추출
    //                   items = xmlDoc.getElementsByTagName('item'); // 'item' 태그에 있는 데이터 추출
                      
    //                   for (var i = 0; i < items.length; i++) {
    //                       var item = items[i];
    //                       var name = item.getElementsByTagName('bldNm')[0].textContent;
    //                       var main = item.getElementsByTagName('mainPurpsCdNm')[0].textContent;
    //                       var bun = item.getElementsByTagName('bun')[0].textContent;
    //                       var ji = item.getElementsByTagName('ji')[0].textContent;
      
    //                       console.log(name, main, bun, '-', ji);
    //                   }
    //               }
    //           };
          
    //           xhr.send('');
      
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    // }, [detail]);

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
                            45.09
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
