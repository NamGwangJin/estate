import React, { useState } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import axios from 'axios';
import './requestWrite.css';
import { hangjungdong } from './hangjungdong.js';

export default function RequestWrite() {
  const [selectedType, setSelectedType] = useState('구해요'); //삽니다팝니다 state

  const [val1, setVal1] = useState(""); //지역 state
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");

  const [desiredAmount, setDesiredAmount] = useState(""); //희망가격 state
  const [contact, setContact] = useState(""); //연락처 state
  const [propertyType, setPropertyType] = useState(""); // 매물종류 state
  const [transactionType, setTransactionType] = useState(""); // 거래종류 state

  const { sido, sigugun, dong } = hangjungdong;

  const getSidoCodeNm = () => sido.find(el => el.sido === val1)?.codeNm || '';
  const getSigugunCodeNm = () => sigugun.find(el => el.sido === val1 && el.sigugun === val2)?.codeNm || '';
  const getDongCodeNm = () => dong.find(el => el.sido === val1 && el.sigugun === val2 && el.dong === val3)?.codeNm || '';
  const sidoCodeNm = getSidoCodeNm();
  const sigugunCodeNm = getSigugunCodeNm();
  const dongCodeNm = getDongCodeNm();
  const location = sidoCodeNm + ' ' + sigugunCodeNm + ' ' + dongCodeNm
  console.log('주소=' + location);

  const onInputChange = (e, fieldType) => {
    let value = e.target.value;

    if (fieldType === 'desiredAmount') {
      // 숫자 이외의 문자 제거
      value = value.replace(/[^0-9]/g, '');

      // 콤마로 포맷팅된 값을 가져옴
      const formattedValue = Number(value).toLocaleString();

      // 포맷팅된 값을 설정
      setDesiredAmount(formattedValue);
    } else if (fieldType === 'contact') {
      // 숫자 이외의 문자 제거
      value = value.replace(/[^0-9]/g, '');

      // 연락처 길이를 13자리로 제한
      if (value.length <= 11) {
        // 연락처 형식에 맞게 포맷팅
        if (value.length <= 3) {
          // 3자리까지는 그대로 표시
          setContact(value);
        } else if (value.length <= 7) {
          // 4자리 이상일 때는 하이픈 추가
          setContact(`${value.slice(0, 3)}-${value.slice(3)}`);
        } else {
          // 8자리 이상일 때는 두 번째 하이픈 추가
          setContact(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`);
        }
      }
    }
  };

  function btnInsert() {

    let name = document.getElementById('name').value;
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    console.log('내용들=' + selectedType, transactionType, location, desiredAmount, propertyType, name, contact, title, content);

    axios({
      method: 'post',
      url: '/api/requestInsert',
      params: {
        selectedType: selectedType,  // 이 부분이 반드시 있어야 함
        transactionType: transactionType,
        location: location,
        desiredAmount: desiredAmount,
        propertyType: propertyType,
        name: name,
        contact: contact,
        title: title,
        content: content
      },
    })
      .then((res) => {
        if (res.data === 'success') {
          alert('매물의뢰가 접수되었습니다.');
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('에러메세지:', error);
        alert(`에러 발생: ${error.message}`);
      })
  }

  const onSubmit = (event) => {
    event.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지

    // 여기에 폼 처리 로직을 넣으세요 (예: btnInsert 함수 호출)
    btnInsert();
  };


  return (
    <div className='requestWrite'>
      <Header />
      <h2 className='title'>매물의뢰</h2>
      <div className='requestWriteMain'>
        <form onSubmit={onSubmit}>
          <div className='firstType_select'>
            <label>
              <input type='radio' value={'구해요'} checked={selectedType === '구해요'} onChange={() => setSelectedType('구해요')} />구해요
            </label>
            <label>
              <input type='radio' value={'팔아요'} checked={selectedType === '팔아요'} onChange={() => setSelectedType('팔아요')} />팔아요
            </label>
          </div>
          <div className='request_body'>
            <div className='transactionTypeDIV'>
              <div className='transactionType_title'>거래종류</div>
              <div className='transactionType_type' data-toggle='buttons'>
                <label className='parcel_out' data-type='parcel_out'>
                  <input type='radio' name='transaction_type' value='분양' checked={transactionType === '분양'} onChange={() => setTransactionType('분양')} />분양
                </label>
                <label className='sell' data-type='sell'>
                  <input type='radio' name='transaction_type' value='매매' checked={transactionType === '매매'} onChange={() => setTransactionType('매매')} />매매
                </label>
                <label className='full_rent' data-type='full_rent'>
                  <input type='radio' name='transaction_type' value='전세' checked={transactionType === '전세'} onChange={() => setTransactionType('전세')} />전세
                </label>
                <label className='month_rent' data-type='month_rent'>
                  <input type='radio' name='transaction_type' value='월세' checked={transactionType === '월세'} onChange={() => setTransactionType('월세')} />월세
                </label>
              </div>
            </div>
            <div className='locationDIV'>
              <div className='location_title'>지역선택</div>
              <div className='location_input'>
                <select onChange={(e) => setVal1(e.target.value)}>
                  <option value="">선택</option>
                  {sido.map((el) => (
                    <option key={el.sido} value={el.sido}>
                      {el.codeNm}
                    </option>
                  ))}
                </select>
                <select onChange={(e) => setVal2(e.target.value)}>
                  <option value="">선택</option>
                  {sigugun
                    .filter((el) => el.sido === val1)
                    .map((el) => (
                      <option key={el.sigugun} value={el.sigugun}>
                        {el.codeNm}
                      </option>
                    ))}
                </select>
                <select onChange={(e) => setVal3(e.target.value)}>
                  <option value="">선택</option>
                  {dong
                    .filter((el) => el.sido === val1 && el.sigugun === val2)
                    .map((el) => (
                      <option key={el.dong} value={el.dong}>
                        {el.codeNm}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className='desiredAmountDIV'>
              <div className='desiredAmount_title'>희망금액</div>
              <div className='desiredAmount_inputDIV'>
                <input id='desiredAmount' className='desiredAmountInput' type='text' placeholder='미입력시 가격협의' value={desiredAmount} onChange={(e) => onInputChange(e, 'desiredAmount')} />
              </div>
            </div>
            <div className='propertyTypeDIV'>
              <div className='propertyType_title'>매물종류</div>
              <div className='transactionType_type' data-toggle='buttons'>
                <label className='officetel' data-type='officetel'>
                  <input type='radio' name='item_type' value='오피스텔' checked={propertyType === '오피스텔'} onChange={() => setPropertyType('오피스텔')} />오피스텔
                </label>
                <label className='apartment' data-type='apartment'>
                  <input type='radio' name='item_type' value='아파트' checked={propertyType === '아파트'} onChange={() => setPropertyType('아파트')} />아파트
                </label>
                <label className='office' data-type='office'>
                  <input type='radio' name='item_type' value='지식산업센터/사무실' checked={propertyType === '지식산업센터/사무실'} onChange={() => setPropertyType('지식산업센터/사무실')} />지식산업센터·사무실
                </label>
                <label className='store' data-type='store'>
                  <input type='radio' name='item_type' value='상가' checked={propertyType === '상가'} onChange={() => setPropertyType('상가')} />상가
                </label>
                <label className='factory' data-type='factory'>
                  <input type='radio' name='item_type' value='공장/창고' checked={propertyType === '공장/창고'} onChange={() => setPropertyType('공장/창고')} />공장·창고
                </label>
              </div>
            </div>
            <div className='nameDIV'>
              <div className='name_title'>이름</div>
              <div className='name_inputDIV'>
                <input id='name' className='nameInput' type='text' placeholder='이름' />
              </div>
            </div>
            <div className='contactDIV'>
              <div className='contact_title'>연락처</div>
              <div className='contaact_inputDIV'>
                <input id='contact' className='contactInput' type='text' placeholder='연락처' value={contact} onChange={(e) => onInputChange(e, 'contact')} />
              </div>
            </div>
            <div className='titleDIV'>
              <div className='title_title'>제목</div>
              <div className='title_inputDIV'>
                <input id='title' className='titleInput' type='text' placeholder='제목' />
              </div>
            </div>
            <div className='contentDIV'>
              <div className='content_title'>상세내용</div>
              <div className='content_inputDIV'>
                {/* <input id='content' className='contentInput' type='textarea' placeholder='내용을 입력해주세요'/> */}
                <textarea id='content' className='contentInput' placeholder='내용을 입력해주세요' onChange={(e) => onInputChange(e, 'content')} />
              </div>
            </div>
          </div>
          {/* <button type="button" onClick={btnInsert}>의뢰하기</button> */}
          <button type="submit" className='btnsubmit'>의뢰하기</button>
          <button type="button" className='btnback' onClick={() => { window.location.href = '/' }}>홈으로</button>
        </form>
      </div>
      <Bottom />
    </div>
  )
}
