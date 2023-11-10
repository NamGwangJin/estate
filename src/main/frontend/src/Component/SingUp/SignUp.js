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
      <div className="modal-content">
        <button type="button" id="closeButton" className="close" data-dismiss="modal" aria-hidden="true" onClick={close}>
            <span style={{ fontSize: '30px' }}>×</span>
        </button>
        <h3 className="text-center m-t-sm" style={{ marginLeft: '25px' }}>회원가입</h3>
        <form className="form-horizontal m-t-lg" noValidate onSubmit={handleSubmit}>
            <input type="hidden" name="member_type" value="general" />

            <div className="form-group m-t">
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control input-sm" placeholder="이름" />
            </div>

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

            {/* <div className="form-group autoSign">
                <div className="title">자동가입방지확인</div>
                <div className="inputbox" id="inputbox">
                    <div className="questionBox" id="questionBox">81+70 = </div>
                    <div className="answerBox" id="answerBox"><input type="text" name="answer" id="answer" /></div>
                </div>
                <div id="chk_stat" style={{ display: 'none' }}></div>
                <input type="hidden" id="sign_statement" name="sign_statement" value="N" />
            </div> */}

            <div className="form-group text-left">
                <div className="check">
                    <input id="terms_agree" name="terms_agree" type="checkbox" />
                    <label htmlFor="terms_agree"><span>이용약관 동의</span></label>
                </div>
                <small><a href="#modal-privacy" className="text-info">개인보호 정책</a></small>
            </div>

            <div className="form-group">
                <button type="submit" style={{ backgroundColor: 'rgb(136, 136, 136)' }}>회원가입</button>
            </div>
        </form>
      </div>
    </div>
  );
}