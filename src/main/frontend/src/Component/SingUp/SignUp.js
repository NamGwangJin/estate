import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';

export default function SignUp({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
        method: 'post',
        url: '/api/signup',
        params: { name : name, phone : phone, email : email, pw : password }
    })
    .then((res) => {
        alert(res.data);
        sessionStorage.setItem("id", email);
        close();
    })
    .catch(error => {
        console.log(error);
        alert('error!');
        close();
    })
  }

  function close() {
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    document.getElementById('password_re').value = '';
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content-sign">
        <a id="closeButton" className="signin_close" data-dismiss="modal" aria-hidden="true" onClick={close}>
            <span style={{ fontSize: '30px' }}>×</span>
        </a>
        <div className='login_title'>
          <h2>회원가입</h2>
          <span>루루부동산 방문을 환영합니다.</span>
        </div>
        <form className='login_form' noValidate onSubmit={handleSubmit}>
            <input type="hidden" name="member_type" value="general" />

                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control input-sm" placeholder="이름" />

            <div className="form-group m-t">
                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control input-sm" placeholder="전화번호" />
            </div>

            <div className="form-group m-t">
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control input-sm emailChk" placeholder="이메일" />
            </div>

            <div className="form-group m-t">
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control input-sm" placeholder="비밀번호" />
            </div>

            <div className="form-group m-t m-b">
                <input type="password" className="form-control input-sm" id="password_re" name="signUpValue" placeholder="비밀번호 확인" />
            </div>

            <div className="form-group m-t text-left">

                <div className="check">
                    <small style={{marginRight: '150px', marginLeft: '20px'}}><a href="#modal-privacy" className="text-info">개인보호 정책</a></small>
                    <input id="terms_agree" name="terms_agree" type="checkbox" />
                    <label className="이용약관" htmlFor="terms_agree"><span>이용약관 동의</span></label>
                </div>
            </div>

            <div className="form-group">
                <button type="submit" className='btn btn-ruru'>가입하기</button>
            </div>
        </form>
      </div>
    </div>
  );
}