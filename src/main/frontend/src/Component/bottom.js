import React from 'react'
import './bottom.css';

export default function bottom() {
  return (
    <div className='bottom'>
      <div className='bottomHeader'>
        <img src="/img/bottomLogo.png" />
        <div className='bottomMenu'>
          <a href='#'>회사소개</a>
          <a href='#'>의뢰하기</a>
          <a href='#'>이용약관</a>
          <a href='#'>개인정보처리방침</a>
        </div>
      </div>
      <div className="bottom_area">
        <ul className="bar_list company_info">
          <li>상호명: 루루공인중개사사무소</li>
          <li>대표: 이민영</li>
          <li>사업자등록번호: 입력</li>
          <li>중개등록번호: 입력하세용</li>
          <li>주소: 경기도 김포시</li>
          <li>이메일:<a href="이메일입력">이메일입력</a></li>
          <li>대표전화: 031.982.3535(월~토 10시 ~ 19시)</li>
          <li>휴대폰: 010.9918.5729</li>
        </ul>
      </div>
    </div>
  )
}