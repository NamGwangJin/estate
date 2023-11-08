import React, { useState } from 'react';
import './SignUp.css'; 

export default function SignUp({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 회원가입 로직을 처리할 수 있습니다.
    console.log('이름:', name);
    console.log('이메일:', email);
    console.log('비밀번호:', password);
    console.log('전화번호:' , phoneNumber )

    // 회원가입 성공 시 다른 동작을 수행할 수 있습니다.

    // 폼 제출 후에 모달 닫기
    onClose();
  };

  return (

    // <div className={`modal ${isOpen ? 'open' : ''}`}>
    //   <div className="modal-content">
    //     <span className="close" onClick={onClose}>&times;</span>
    //     <p>회원가입</p>
    //     <form onSubmit={handleSubmit}>
    //          <label htmlFor="name">이름:</label>
    //   <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
    //      <label htmlFor="email">이메일:</label>
    //      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
    //    <label htmlFor="password">비밀번호:</label>
    //   <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
    //       <label htmlFor='phoneNumber'>전화번호:</label>
    //       <input type="number" id='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required /><br />
    //       <button type="submit">회원가입</button>
    //     </form>
    //   </div>
    //   </div>
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-content">
        <button type="button" id="closeButton" className="close" data-dismiss="modal" aria-hidden="true">
            <span style={{ fontSize: '30px' }}>×</span>
        </button>
        <h3 className="text-center m-t-sm" style={{ marginLeft: '25px' }}>회원가입</h3>
        <form onSubmit={handleSubmit} className="form-horizontal m-t-lg" noValidate>
            <input type="hidden" name="member_type" value="general" />

            <div className="form-group m-t">
                <input type="text" id="signup_name" name="name" className="form-control input-sm" placeholder="이름" />
            </div>

            <div className="form-group m-t">
                <input type="text" className="form-control input-sm emailChk" name="email" id="signup_email" placeholder="이메일" />
            </div>

            <div className="form-group m-t">
                <input type="password" className="form-control input-sm" id="passwords" name="password" placeholder="비밀번호" />
            </div>

            <div className="form-group m-t m-b">
                <input type="password" className="form-control input-sm" id="password_re" name="password_re" placeholder="비밀번호 확인" />
            </div>

            <div className="form-group text-left">
                <div className="check">
                    <input id="terms_agree" name="terms_agree" type="checkbox" />
                    <label htmlFor="terms_agree"><span>이용약관 동의</span></label>
                </div>
                <small><a href="#modal-privacy" className="text-info">개인보호 정책</a></small>
            </div>

            <div className="form-group autoSign">
                <div className="title">자동가입방지확인</div>
                <div className="inputbox" id="inputbox">
                    <div className="questionBox" id="questionBox">81+70 = </div>
                    <div className="answerBox" id="answerBox"><input type="text" name="answer" id="answer" /></div>
                </div>
                <div id="chk_stat" style={{ display: 'none' }}></div>
                <input type="hidden" id="sign_statement" name="sign_statement" value="N" />
            </div>

            <div className="form-group">
                <button type="submit" id="signup_button" className="btn btn-default main_color btn-block" disabled style={{ backgroundColor: 'rgb(136, 136, 136)' }}>회원가입</button>
            </div>
        </form>
    </div>
</div>
  );
}
