import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header.js';
import Bottom from '../bottom.js';
import '../../App.css';
import axios from 'axios';

export default function QuestionDetail() {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const no = params.get("no");

  useEffect(() => {
    axios({
      method: "get",
      url: '/api/question/view',
      params: { no: no }
    })
      .then((res) => {
        setDetail(res.data);
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
      });
  }, [no]);

  return (
    <div>
      <Header />
      {loading ? (<div className='App'>Loading....</div>) :
        (<div className='body'>
          <div className='title'>
            질문 상세 보기
          </div>

          <div className='prev'>
            <div className='postTitle'>
              <h2>{detail.question_title}</h2>
            </div>
          </div>

          <div className='showView'>
            <span>작성자 : {detail.question_writer}</span><br/>
            <span>작성일 : {detail.question_created}</span>
          </div>

          <hr className='hr1'/>

          <div className='showView'>
            <a>{detail.question_content}</a>
          </div>
        </div>)
      }
      <Bottom />
    </div>
  )
}
