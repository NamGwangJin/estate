import React from 'react'

export default function DetailHead() {
  return (
    <div>
        <div className='detail_head'>
            <div className='info01'>
                <div className='info_apt'>
                    <dl>
                        <dt>DATE</dt>
                        <dd id="mm_reg_date">23.11.17</dd>
                    </dl>
                    <h3 id="mm_title_id">더리버스청담 1동(DB)</h3>
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
                    <span id="price_title_id">보증금 / 월세 (DB)</span>
                    <p>
                        <strong id="price_val_id">1억 / 300 (DB)</strong>
                        <span>만원</span>
                    </p>
                </div>
            </div>
            
            <div className='info02'>
                <ul id="mm_info_id">
                    <li style={{width: '368px'}}>
                        <span>해당 층 / 총 층</span>
                        중 / 17 층 (DB) 
                    </li>
                    <li style={{width: '350px'}}>
                        <span>방 수 / 욕실 수</span>
                        2 / 1 (DB) 
                    </li>
                    <li style={{width: '350px'}}>
                        <span>융자금</span>
                        - 만원 (DB) 
                    </li>
                    <li style={{width: '368px'}}>
                        <span>입주 가능일</span>
                        즉시입주 (DB) 
                    </li>
                    <li style={{width: '350px'}}>
                        <span>월 관리비</span>
                        - 원 (DB) 
                    </li>
                    <li style={{width: '350px'}}>
                        <span>기보증금 / 월세</span>
                        0 / 0 만원 (DB) 
                    </li>
                    <li>
                        <span>특징</span>
                        청담동 하이엔드 오피스텔 2룸 월세매물 (DB) 
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
