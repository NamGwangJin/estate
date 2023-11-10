import React, { useEffect, useState } from 'react';
import Bottom from '../bottom.js';
import Header from '../header.js';
import axios from 'axios';
import './news.css';

export default function News() {

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: '/api/newslist',
    })
      .then((res) => {
        console.log('받아온데이터'+res.data);
        setNewsList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  }

  return (
    <div className='news'>
      <Header />
      <h2 className='title'>부동산 뉴스</h2>
      <div className="newsTableDiv">
        <table className="newTable">
          <thead>
            <tr className="tableHeader">
              <th className="text-center" width="6%" nowrap="">번호</th>
              <th className="text-center_title" width="">제목</th>
              <th className="text-center_thead_see">더보기</th>
              <th className="text-center" width="14%" nowrap="">등록일</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr className='news_tr' onClick={() => window.open(news.news_link)}>
                <td className='news_number'>{news.news_id}</td>
                <td className='news_title'>
                  <span className='newsTitle'>{news.news_title}</span><span className='newsContent'>{truncateText(news.news_content, 100)}</span>
                </td>
                <td className="more_see_td">
                  <div className="more_see">
                    <span>더보기</span>
                    <i className="more_see_i"></i>
                  </div>
                </td>
                <td className='news_writeDate' style={{ color: '#999' }}>{news.news_writeDate.split(' ')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Bottom />
    </div>
  );
}
