import React, { useState } from 'react';
import './SignIn.css';
import axios from 'axios';

export default function SignIn({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
        method: 'post',
        url: '/api/login',
        params: { email : username, pw : password }
    })
    .then((res) => {
      if ( res.data !== 0 ){
        alert('로그인 완료');
        sessionStorage.setItem("id", res.data);
        close();
      } else {
        alert('아이디와 비밀번호를 확인해주세요.');
      }
    })
    .catch(error => {
        console.log(error);
        alert('error!');
        close();
    })

    function close() {
      setUsername('');
      setPassword('');
      onClose();
    }

  };

  return (    
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>로그인</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">이메일</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}
