import React from 'react'
import Header from '../header.js';
import Bottom from '../bottom.js';
import { useNavigate } from "react-router-dom";
import '../../App.css';
import axios from 'axios';

export default function QuestionWrite() {
    const navigate = useNavigate();
  
    function goBack(){
        navigate('/qna');
    }

    function QuestionWrite(){
        const title = document.getElementById('title');
        const content = document.getElementById('content');
        axios({
            method: "get",
            url: '/api/question/write',
            params: { "title" : title.value,
                    "content" : content.value
            }
        }).then( (res) => {
            console.log(res);
            alert("질문 작성이 완료되었습니다.");
            navigate('/qna');
        }).catch( error => {
            console.log(error);
        })
    } 

  return (
    <div className="App">
        <Header />
        <div className='title'>
            질문 작성하기
        </div>
        <table className="write">
            <tbody>
                <tr><td>제목</td><td><input type="text" placeholder='제목' id='title' style={{width:'500px'}}></input></td></tr>
                <tr><td>내용</td><td><textarea id='content' style={{width:'500px', height:'300px'}}></textarea></td></tr>
            </tbody>
        </table>
        <button className="btn btn-ruru" onClick={QuestionWrite}>작성</button> <button className="btn btn-white" onClick={goBack}>취소</button>
        <Bottom />
    </div>
  )
}
