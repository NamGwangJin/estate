import React, { useState, useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

export default function QNA() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { // 질문 리스트 불러오는 함수
    axios({
      method: "get",
      url: '/api/question/list',
    })
      .then((res) => {
        setBoardList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function detail(question_no) {
    navigate('/question/detail?no=' + question_no);
  }

  return (
    <div className="App">
      <Header />
      <div className='body'>
        <div className='title'>
              질문 / 답변
        </div>
        <table className="tblBoard">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>상태</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((elem, index) => (
              <tr onClick={() => detail(elem.question_no)} key={index}>
                <td>{elem.question_no}</td>
                <td>{elem.question_title}</td>
                {
                  elem.question_answer === "답변대기"
                  ?<td className="status btn-white">{elem.question_answer}</td> // 답변대기 상태면 답변대기 표시, 답변완료 상태면 답변완료 표시
                  :<td className="status btn-ruru">{elem.question_answer}</td>
                }
                <td>{elem.question_created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to='/question/write'>
          <button className="btn btn-ruru">질문 작성하기</button>
      </Link>
      <Bottom />
    </div>
  );
}