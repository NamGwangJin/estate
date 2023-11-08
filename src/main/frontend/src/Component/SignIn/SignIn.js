import React, { useState } from 'react';
import './SignIn.css';

export default function SignIn({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('사용자 이름:', username);
    console.log('비밀번호:', password);

  };

  return (    
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>로그인</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">사용자 이름:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}
