import React from 'react'
import './header.css'
import { Link } from 'react-router-dom';

export default function header() {

  return (
    <div className='header'>
      <div className='upHeader'>
          <div className='logoIMG'><img className="logoImg" src="/img/ruruLogo.png" /></div>
        <div className='category'>
          <a href='#'>오피스텔123</a>
          <a href='#'>아파트/단독주택/원룸</a>
          <a href='#'>상가/사무실</a>
          <a href='#'>지식산업센터</a>
          <a href='#'>공장창고</a>
          <a href='#'>토지</a>
        </div>
        <div className='rightHeader'>
          <span>문의전화</span>
          <span>로그인</span>
        </div>
      </div>
      <hr />
      <div className='underHeader'>
        <Link to='/qna'><a>질문/답변</a></Link>
        <a href='#'>매물의뢰</a>
        <a href='#'>부동산뉴스</a>
        <a href='#'>고객후기</a>
        <a href='#'>공지사항</a>
        <a href='/intro'>찾아오시는길</a>
        <a href='https://blog.naver.com/youghoa'>네이버블로그</a>
      </div>
    </div>
  )
}
