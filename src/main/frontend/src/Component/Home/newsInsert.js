import React, { useState } from 'react'; 
import Header from '../header.js';
import Bottom from '../bottom.js';
import axios from 'axios'; 
import './newsInsert.css';


export default function NewsInsert() {


  function btnInsert(){

    const news_title = document.getElementById('news_title').value;
    const news_content = document.getElementById('news_content').value;
    let news_link = document.getElementById('news_link').value;

    if (!news_link.startsWith('http://') && !news_link.startsWith('https://')) {
      news_link = 'http://' + news_link;
    }


    console.log(news_title, news_content, news_link);
  
    axios({
      method:'get',
      url:'/api/newsInsert',
      params: {
        news_title: news_title,
        news_content: news_content,
        news_link: news_link
      },
    })
    .then((response) => {
      if(response.data == 'success'){
        alert('뉴스 추가가 완료되었습니다.');
        window.location.href = '/news';
      }
    })
    .catch((error) => {
      console.error('에러',error);
    })
  }

  return (
    <div className='newsInsert'>
      <Header />
      <h2 className='title'>부동산뉴스</h2>
      <div className='insertBox'>
        <input type='text' className='newsInput' id='news_title' placeholder='제목을 입력하시오' />
        <textarea id='news_content' className='newsInput' placeholder='내용을 입력하시오' />
        <input type='text' className='newsInput' id='news_link' placeholder='링크를 입력하시오' />
        <div className='btnDiv'>
          <button className='btnInsert' onClick={btnInsert}>입력완료</button>
          <button className='btnBackList' onClick={() => {window.location.href='/news'}}>목록으로</button>
        </div>
      </div>
      <Bottom />
    </div>
  )
}
