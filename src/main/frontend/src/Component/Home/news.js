import React from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import './news.css';

export default function News() {
  return (
    <div className='news'>
      <Header />
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
            <tr className="news_tr" onClick={() => window.open('디비에서 링크 가져오기')}>
              <td className="news_number">디비1</td>
              <td className="news_title">
                <span>디비에서 제목가져와서</span><span>줄바꿈하고 내용. 글자수 제한 둬서 ... 으로 </span>
              </td>
              <td className="more_see_td">
                <div className="more_see">
                  <span>더보기</span>
                  <i className="more_see_i"></i>
                </div>
              </td>
              <td className="news_writeDate">2023.11.06</td>
            </tr>
            <tr className="news_tr" onClick={() => window.open('디비에서 링크 가져오기')}>
              <td className="news_number">2</td>
              <td className="news_title">
                <span>디비에서 제목가져와서</span><span>줄바꿈하고 내용. 글자수 제한 둬서 ... 으로 </span>
              </td>
              <td className="more_see_td">
                <div className="more_see">
                  <span>더보기</span>
                  <i className="more_see_i"></i>
                </div>
              </td>
              <td className="news_writeDate">디비에서 작성일 날짜 가져오기</td>
            </tr><tr className="news_tr" onClick={() => window.open('디비에서 링크 가져오기')}>
              <td className="news_number">3</td>
              <td className="news_title">
                <span>디비에서 제목가져와서</span><span>줄바꿈하고 내용. 글자수 제한 둬서 ... 으로 </span>
              </td>
              <td className="more_see_td">
                <div className="more_see">
                  <span>더보기</span>
                  <i className="more_see_i"></i>
                </div>
              </td>
              <td className="news_writeDate">디비에서 작성일 날짜 가져오기</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Bottom />
    </div>
  );
}
