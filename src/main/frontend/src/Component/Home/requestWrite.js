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

  const [buttonStates, setButtonStates] = useState({
    transactionType: {
      분양: false,
      매매: false,
      월세: false,
      전세: false,
    },
    propertyType: {
      오피스텔: false,
      아파트: false,
      지식산업센터: false,
      상가: false,
      공장: false,
    },
    Search_or_Sell: {
      구해요: false,
      팔아요: false,
    }
  });

  const handleButtonClick = (group, buttonName) => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [group]: {
        ...Object.fromEntries(
          Object.entries(prevStates[group]).map(([name, value]) => [name, name === buttonName])
        ),
      },
    }));
  };

  // 버튼 스타일을 반환하는 함수 정의
  const getButtonStyle = (group, buttonName) => {
    return {
      padding: '10px',
      backgroundColor: 'white',
      color: buttonStates[group][buttonName] ? '#3cb3c5' : 'black',
      border: buttonStates[group][buttonName] ? '2px solid #3cb3c5' : '2px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s',
    };
  };

  return (
    <div className='requestWrite'>
      <Header />
      <h2 className='title'>매물의뢰</h2>
      <div className='requestWriteMain'>
        <form onSubmit={onSubmit}>
          <div className='firstType_select'>
          {Object.keys(buttonStates.Search_or_Sell).map((buttonName) => (
                <button
                  key={buttonName}
                  type="button"
                  style={{
                    padding: '10px',
                    backgroundColor: buttonStates['Search_or_Sell'][buttonName] ? '#3cb3c5' : 'white',
                    color: buttonStates['Search_or_Sell'][buttonName] ? 'white' : 'gray',
                    border: `2px solid ${buttonStates['Search_or_Sell'][buttonName] ? '#3cb3c5' : '#ddd'}`,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s',
                    width: '40%',
                  }}
                  onClick={() => handleButtonClick('Search_or_Sell', buttonName)}
                >
                  {buttonName}
                </button>
              ))}
          </div>
          <div className='request_body'>
            <div className='transactionTypeDIV'>
              <div className='transactionType_title'>거래종류</div>
              <div className='transactionType_type' data-toggle='buttons'>
              {Object.keys(buttonStates.transactionType).map((buttonName) => (
                <button
                  key={buttonName}
                  type="button"
                  style={getButtonStyle('transactionType', buttonName)}
                  onClick={() => handleButtonClick('transactionType', buttonName)}
                >
                  {buttonName}
                </button>
              ))}
            </div>

            </div>
            <div className='locationDIV'>
              <div className='location_title'>지역선택</div>
              <div className='location_input'>
                <select className='styled-select2' style={{width : '30%'}} onChange={(e) => setVal1(e.target.value)}>
                  <option value="">선택</option>
                  {sido.map((el) => (
                    <option key={el.sido} value={el.sido}>
                      {el.codeNm}
                    </option>
                  ))}
                </select>
                <select className='styled-select2' style={{width : '20%'}} onChange={(e) => setVal2(e.target.value)}>
                  <option value="">선택</option>
                  {sigugun
                    .filter((el) => el.sido === val1)
                    .map((el) => (
                      <option key={el.sigugun} value={el.sigugun}>
                        {el.codeNm}
                      </option>
                    ))}
                </select>
                <select className='styled-select2' style={{width : '20%'}} onChange={(e) => setVal3(e.target.value)}>
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
                <input id='desiredAmount' className='styled-input' type='text' placeholder='미입력시 가격협의' value={desiredAmount} onChange={(e) => onInputChange(e, 'desiredAmount')} />
              </div>
            </div>
            <div className='propertyTypeDIV'>
              <div className='propertyType_title'>매물종류</div>
              <div className='propertyType_type' data-toggle='buttons'>
                {Object.keys(buttonStates.propertyType).map((buttonName) => (
                <button
                  key={buttonName}
                  type="button"
                  style={getButtonStyle('propertyType', buttonName)}
                  onClick={() => handleButtonClick('propertyType', buttonName)}
                >
                  {buttonName}
                </button>
              ))}
                

              </div>
            </div>
            <div className='nameDIV'>
              <div className='name_title'>이름</div>
              <div className='name_inputDIV'>
                <input id='name' className='styled-input' type='text' placeholder='이름' />
              </div>
            </div>
            <div className='contactDIV'>
              <div className='contact_title'>연락처</div>
              <div className='contaact_inputDIV'>
                <input id='contact' className='styled-input' type='text' placeholder='연락처' value={contact} onChange={(e) => onInputChange(e, 'contact')} />
              </div>
            </div>
            <div className='titleDIV'>
              <div className='title_title'>제목</div>
              <div className='title_inputDIV'>
                <input id='title' className='styled-input' type='text' placeholder='제목' />
              </div>
            </div>
            <div className='contentDIV'>
              <div className='content_title'>상세내용</div>
              <div className='content_inputDIV'>
                {/* <input id='content' className='contentInput' type='textarea' placeholder='내용을 입력해주세요'/> */}
                <textarea id='content' className='styled-input' style={{resize : 'none', width : '650px' , height : '200px'}} placeholder='내용을 입력해주세요' onChange={(e) => onInputChange(e, 'content')} />
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
