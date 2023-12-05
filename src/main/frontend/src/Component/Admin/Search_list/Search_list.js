// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search_list.css';
// import { getCurrentDateFormatted } from 'path/to/your/utility/file';


export default function Search_list({ propertyType, setPropertyType }) {  // 파라미터추가 *수헌
  const [customDate, setCustomDate] = useState('');

  const handleCustomDateChange = (e) => {
    const inputValue = e.target.value;

    // 숫자만 허용
    const numericValue = inputValue.replace(/\D/g, '');

    // 8자리 제한
    const limitedValue = numericValue.slice(0, 8);

    // yyyy-mm-dd 형식으로 포맷
    const formattedDate = limitedValue.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

    setCustomDate(formattedDate);
  };

  // const handleDateInput = () => {
  //   // 커스텀 날짜 입력과 관련된 작업 수행
  //   console.log('커스텀 날짜:', customDate);
  // };

  const getCurrentDateFormatted = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getPastDateFormatted = (daysAgo) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysAgo);

    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, '0');
    const day = String(pastDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const [buttonStates, setButtonStates] = useState({
    매물종류: {
      전체: true,
      오피스텔: false,
      아파트: false,
      상가: false,
      지식산업센터·사무실: false,
      토지: false,
      공장·창고: false,
    },
    매물상태: {
      전체: true,
      등록중: false,
      // 확인중: false,
      // 확인실패: false,
      // 서비스중: false,
      // 거래완료: false,
      // 종료예정: false,
    },
    거래종류: {
      전체: true,
      매매: false,
      전세: false,
      월세: false,
    },
    입력일: {
      전체: true,
      '1주': false,
      '1개월': false,
      '3개월': false,
      '6개월': false,
    },
  });

  useEffect(() => {
    // 페이지가 로딩될 때 실행될 초기화 함수
    initializePage();
  }, []); // 빈 배열을 두어 컴포넌트가 처음으로 렌더링될 때만 실행

  const initializePage = () => {
    handleButtonChange('매물종류', '전체');
    // handleButtonChange('매물상태', '전체');
    // handleButtonChange('거래종류', '전체');
  };


  const handleButtonChange = (category, buttonName) => {
    console.log(`Button clicked: ${buttonName} in category: ${category}`);

    setButtonStates((prevState) => {
      const newButtonStates = { ...prevState };
      Object.keys(newButtonStates[category]).forEach((key) => {
        newButtonStates[category][key] = false;
      });
      newButtonStates[category][buttonName] = true;
      return newButtonStates;
    });

    // 선택된 매물종류, 매물상태, 거래종류 찾기
    const selectedPropertyType = Object.keys(buttonStates.매물종류).find(
      (btnName) => buttonStates.매물종류[btnName]
    );
    const selectedPropertyState = Object.keys(buttonStates.매물상태).find(
      (btnName) => buttonStates.매물상태[btnName]
    );
    const selectedTransactionType = Object.keys(buttonStates.거래종류).find(
      (btnName) => buttonStates.거래종류[btnName]
    );
    const selectedDate = Object.keys(buttonStates.입력일).find(
      (btnName) => buttonStates.입력일[btnName]
    );

    let dateToQuery;
    const today = getCurrentDateFormatted();

    switch (selectedDate) {
      case '전체':
        dateToQuery = '';
        break;
      case '1주':
        dateToQuery = getPastDateFormatted(7);
        break;
      case '1개월':
        dateToQuery = getPastDateFormatted(30); // 30일은 1개월을 대략적으로 나타냅니다.
        break;
      case '3개월':
        dateToQuery = getPastDateFormatted(90); // 90일은 3개월을 대략적으로 나타냅니다.
        break;
      case '6개월':
        dateToQuery = getPastDateFormatted(180); // 180일은 6개월을 대략적으로 나타냅니다.
        break;
      default:
        dateToQuery = today;
    }
    console.log(`Selected Property Type: ${selectedPropertyType}`);
    console.log(`Selected Property State: ${selectedPropertyState}`);
    console.log(`Selected Transaction Type: ${selectedTransactionType}`);
    console.log(`Selected Date for Query: ${dateToQuery}`);
    console.log(`특정날짜는요: ${customDate}`)

    // 서버에 실시간으로 검색 요청
    axios
      .get('/api/propertyList', {
        params: {
          propertyType: selectedPropertyType,
          propertyState: selectedPropertyState,
          transactionType: selectedTransactionType,
          inputDate: dateToQuery,
          // inputDate: selectedDate,
          // 다른 검색 조건들 추가
        },
      })
      .then((response) => {
        console.log('Search Result:', response.data);
        setPropertyType(response.data);
      })
      .catch((error) => {
        console.error('Error during search:', error);
      });
  };

  const getButtonStyle = (category, buttonName) => {
    return {
      padding: '10px',
      backgroundColor: 'white',
      color: buttonStates[category][buttonName] ? '#3cb3c5' : 'black',
      border: buttonStates[category][buttonName]
        ? '2px solid #3cb3c5'
        : '2px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s',
    };
  };

  const renderButtons = (category) => {
    return Object.keys(buttonStates[category]).map((buttonName) => (
      <button
        key={buttonName}
        type="button"
        style={getButtonStyle(category, buttonName)}
        onClick={() => handleButtonChange(category, buttonName)}
      >
        {buttonName}
      </button>
    ));
  };

  const renderRadios = (category) => {
    return Object.keys(buttonStates[category]).map((buttonName) => (
      <div key={buttonName}>
        <input
          type="radio"
          id={buttonName}
          name="inputDate"
          value={buttonName}
          style={{ verticalAlign: 'middle' }}
          onChange={() => handleButtonChange(category, buttonName)}
          checked={buttonStates[category][buttonName]}  // 추가된 부분
        />
        <span className='input_right_text'>{buttonName}</span>
      </div>
    ));
  };


  return (
    <div className='Search_list'>
      {/* <form action="/search" method="get"> */}
      <table className='styled-table'>
        <tbody>

          {/* 매물종류 */}
          <tr>
            <td className="header-cell">매물종류</td>
            <td
              style={{
                textAlign: 'left',
                borderLeftWidth: '0px',
              }}
              className="button-container"
            >
              {renderButtons('매물종류')}
            </td>
          </tr>

          {/* 매물상태 */}
          <tr>
            <td className="header-cell">매물상태</td>
            <td
              style={{
                textAlign: 'left',
                borderLeftWidth: '0px',
                borderTopWidth: '0px',
              }}
              className="button-container"
            >
              {renderButtons('매물상태')}
            </td>
          </tr>

          {/* 거래종류 */}
          <tr>
            <td className="header-cell">거래종류</td>
            <td
              style={{
                textAlign: 'left',
                borderLeftWidth: '0px',
                borderTopWidth: '0px',
              }}
              className="button-container"
            >
              {renderButtons('거래종류')}
            </td>
          </tr>

          {/* 입력일 */}
          <tr>
            <td className='header-cell'>입력일</td>
            <td className='radio-group' style={{
              borderLeftWidth: '0px',
              borderTopWidth: '0px',
              textAlign: 'left'
            }}>
              {renderRadios('입력일')}
              <input
                type="text"
                id="custom"
                name="inputDate"
                style={{ verticalAlign: 'middle', width: '120px' }}
                className='styled-input'
                placeholder='20xx-xx-xx'
                value={customDate}
                onChange={handleCustomDateChange}
              />
              {/* <button
                type='button'
                className='input-button'
                style={{ marginBottom: "0px" }}
                onClick={() => handleButtonChange('입력일', '특정날짜')}
              >
                날짜입력
              </button> */}
            </td>
          </tr>
          {/* 조건조회 */}
          <tr>
            <td className='header-cell'>조건조회</td>
            <td style={{ textAlign: 'left', borderTopWidth: '0px' }}>
              <input type='text' placeholder='매물번호조회' className='styled-input'></input>
              <button type='button' className='input-button'>조회</button>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type='text' className='styled-input' style={{ width: 'calc(10%)' }}></input>
                <span className='input_right_text'>동</span>
                <input type='text' className='styled-input' style={{ width: 'calc(10%)' }}></input>
                <span className='input_right_text'>호</span>
                <input type='text' className='styled-input' style={{ width: 'calc(10%)' }}></input>
                <span className='input_right_text'>번지</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* </form> */}
    </div>
  );
}
