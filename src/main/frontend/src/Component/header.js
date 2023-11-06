import React from 'react'
import './header.css'
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
      </ul>
    </div>
  </div>
</div>

    



    // <div className='header'>
    //   <div className='upHeader'>
    //       <div className='logoIMG'><img className="logoImg" src="/img/ruruLogo.png" /></div>
    //     <div className='category'>
    //       <a href='#'>오피스텔</a>
    //       <a href='#'>아파트/단독주택/원룸</a>
    //       <a href='#'>상가/사무실</a>
    //       <a href='#'>지식산업센터</a>
    //       <a href='#'>공장창고</a>
    //       <a href='#'>토지</a>
    //     </div>
    //     <div className='rightHeader'>
    //       <span>문의전화</span>
    //       <span>로그인</span>
    //     </div>
    //   </div>
    //   <hr />
    //   <div className='underHeader'>
    //     <a href='#'>매물의뢰</a>
    //     <a href='#'>부동산뉴스</a>
    //     <a href='#'>고객후기</a>
    //     <a href='#'>공지사항</a>
    //     <a href='#'>찾아오시는길</a>
    //     <a href='https://blog.naver.com/youghoa'>네이버블로그</a>
    //   </div>
    // </div>
  )
}

