import React from 'react';
import './header.css';
import Signin from './signin';
import { Link } from 'react-router-dom';

export default function header() {
  
  return (
<div className='header_wrap' style={{ opacity: 1 }}>
  <div className='header_category_wrap'>
    <div className='header_top_wrap'>
      <div className='header_1140'>
        <div className='header_top_left'>
          <div className='header_btn header_btn_call'>
            <span className='title'>
              <i className='fas fa-phone-rotary'></i>
              문의전화
            </span>
            <span className='content'>041-579-6100</span>
          </div>
        </div>
        <div className='header_top_right'>
        <ul>
          <li className='sign_btn_box'>
            <a className="sign_list" herf="#">로그인</a>
            <a className="sign_list" href="#">회원가입</a>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
  <div className='header_bottom'>
    <div className='header-left'>
      <span className='navbar_logo'>
        <img className='logo_header logo' src="/img/bottomLogo.png" alt='푸터 로고' />
      </span>
    </div>
    <div className='header_center'>
      <ul className='header_menu_etc_box'>
        <li className='header_list'>
        <a herf="#" >매물검색</a>
        </li>
        <li className='header_list'>
        <a herf="#" >매물 의뢰하기</a>
        </li>
        <li className='header_list'>
        <a herf="#" >매물투어 신청</a>
        </li>
        <li className='header_list'>
        <a herf="#" >부동산 소식</a>
        </li>
        <li className='header_list'>
        <a herf="#" >질문과 답변</a>
        </li>
        <li className='header_list'>
        <a herf="#" >공지사항</a>
        </li>
        <li className='header_list'>
        <a herf="#" >회사소개</a>
        </li>
        <li className='header_list'>
        <Signin />
        </li>
      </ul>
    </div>
  </div>
</div>
  )
}

