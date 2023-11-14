import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header.js';
import Bottom from '../bottom.js';
import Answer from './QuestionAnswer.js';
import AnswerWrite from './AnswerWrite.js';
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

  const [isAnswerWriteVisible, setAnswerWriteVisible] = useState(false);
  const answer = document.getElementById('answerOpen');

  const handleButtonClick = () => {
    if (!isAnswerWriteVisible) {
      setAnswerWriteVisible(true);
      answer.style.visibility = 'hidden';
    } else {
      setAnswerWriteVisible(false);
    }
  };

  const handleAnswerWriteCancel = () => {
    answer.style.visibility = 'visible';
    setAnswerWriteVisible(false); // AnswerWrite 컴포넌트는 숨기도록 상태 변경
  };


  return (
    <div>
      <Header />
      {loading ? (<div>Loading....</div>) :
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

            <div className='showView'>
              <a>{detail.question_content}</a>
            </div>
          </div>)
      }
        <hr className='hr1'/>
        {isAnswerWriteVisible && <AnswerWrite onCancel={handleAnswerWriteCancel} />}
        {/* <Answer /> */}
          <div style={{textAlign:'center'}}>
            <button className='btn btn-ruru' id='answerOpen' onClick={handleButtonClick}>답변작성</button>
            <Link to="/qna">
            <button className='btn btn-white'>목록으로</button>
            </Link>
          </div>
      <Bottom />
    </div>
  )
}
