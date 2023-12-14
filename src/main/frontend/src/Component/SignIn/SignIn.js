import React, { useState } from 'react';
import './SignIn.css';
import SignUp from '../SingUp/SignUp.js';
import axios from 'axios';

export default function SignIn({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
        method: 'post',
        url: '/api/login',
        params: { email : username, pw : password }
    })
    .then((res) => {
      if ( res.data !== 0 ){
        sessionStorage.setItem("id", res.data);
        return axios({
          method: 'get',
          url: '/api/user',
          params: { id : sessionStorage.getItem("id") }
        })
      } else {
        alert('아이디와 비밀번호를 확인해주세요.');
      }
    })
    .then((userResponse) => {
      if( userResponse.data !== "" ) {
        const userInfo = JSON.stringify(userResponse.data)
        sessionStorage.setItem("user", userInfo);
      }
      close();
      window.location.reload();
    })
    .catch(error => {
        console.log(error);
    })

    function close() {
      setUsername('');
      setPassword('');
      onClose();
    }

  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  return (    
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div>
          <a className="signin_close" onClick={onClose}>&times;</a>
        </div>
        <div className='login_title'>
          <h2>로그인</h2>
          <span>루루부동산 방문을 환영합니다.</span>
        </div>
        <form onSubmit={handleSubmit} className='login_form'>
          <label htmlFor="username"></label>
          <input type="text" id="username" placeholder='이메일' value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
          <label htmlFor="password"></label><br />
          <input type="password" id="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
          <button className='btn btn-ruru' type="submit">로그인</button>
        </form>
        <hr style={{width: '60%'}}/>
        <div className='login_title'>
          <span>아직 회원이 아니신가요?</span> <a onClick={handleSignUpClick}>가입하기</a>
        </div>
      </div>

      {showSignUpModal && <SignUp isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} />}
    </div>
  );
}
