import React, { useState } from 'react';
import axios from 'axios'; 
import './inquiry.css';

export default function InquiryForm() {

  const [isCheckboxChecked, setCheckboxChecked] = useState(false);

  function inquiry_insert() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const message = document.getElementById('message').value;

    if (!isCheckboxChecked) {
      alert('개인정보수집 및 이용에 동의해주세요');
    } else if (!name) {
      alert('이름을 작성해주세요');
    } else if (!contact) {
      alert('연락처를 입력해주세요');
    } else if (!message) {
      alert('내용을 입력해주세요');
    } else {
      axios({
        method: 'get',
        url: '/api/inquiryInsert',
        params: {
          name: name,
          contact: contact,
          message: message,
        },
      })
        .then((response) => {
          if (response.data === 'success') {
            alert('상담문의 남기기 성공했습니다');
            // 여기에서 다른 작업 수행 가능
            document.getElementById('name').value = '';
            document.getElementById('contact').value = '';
            document.getElementById('message').value = '';


          }
        })
        .catch((error) => {
          console.error('에러 발생: ', error);
        });
    }
  }

  function handleCheckboxChange() {
    setCheckboxChecked(!isCheckboxChecked);
  }

  return (
    <div className='inquiry-box'>
      <div className='inquiry-container'>
        <div className='inquiry-title'>상담신청</div>
        <div className='input-container'>
          <input type='text' id='name' placeholder='성함' />
          <input type='text' id='contact' placeholder='연락처' />
          <textarea rows='8' id='message' placeholder='내용입력' />
        </div>
        <div className='checkbox-container'>
          <input type='checkbox' onChange={handleCheckboxChange} />
          <label>개인정보 수집·이용</label>
        </div>
        <button className='insert_button' onClick={inquiry_insert}>상담문의 남기기</button>
      </div>
    </div>
  );
}