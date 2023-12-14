// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search_list.css';
// import { getCurrentDateFormatted } from 'path/to/your/utility/file';


export default function Search_list({ propertyType, setPropertyType }) {  // 파라미터추가 *수헌
  
  const [customDate, setCustomDate] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');

  const handlePriceChange = (e, setterFunction) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // 숫자만 남기기
  
    // 값이 비어 있다면 빈 문자열로 설정
    // 값이 있을 경우 parseInt 및 toLocaleString 적용
    const formattedValue = value ? parseInt(value, 10).toLocaleString() : '';
  
    setterFunction(formattedValue);
  };

const priceSearch = () => {
  // 여기에서 시작가격과 종료가격이 모두 입력되었는지 확인
  if (!startPrice || !endPrice) {
    alert('시작가격과 종료가격을 모두 입력하세요.');
    return;
  }

  // 시작가격이 종료가격보다 작은지 확인
  if (parseInt(startPrice.replace(/,/g, '')) >= parseInt(endPrice.replace(/,/g, ''))) {
    alert('시작가격은 종료가격보다 작아야 합니다.');
    return;
  }

  // 여기에서 조회 로직을 추가하세요.
  console.log(`시작가격: ${startPrice}`);
  console.log(`종료가격: ${endPrice}`);

  axios
    .get('/api/propertyList', {
      params: {
        startPrice: startPrice,
        endPrice: endPrice,
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


  const ProductIdChange = (e) => {
    // 숫자만 허용
    const numericValue = e.target.value.replace(/\D/g, '');
    setPropertyNumber(numericValue);
  };

  const productIdSearch = () => {
    // 검색 기능 추가
    if (propertyNumber) {
      // 여기에서 매물 번호에 대한 검색 로직을 구현
      console.log(`매물 번호 조회: ${propertyNumber}`);
      // axios 등을 사용하여 서버에 매물 번호에 대한 조회 요청을 보낼 수 있습니다.
      axios
      .get('/api/propertyList', {
        params: {
          propertyNumber: propertyNumber,
        },
      })
      .then((response) => {
        console.log('Search Result:', response.data);
        setPropertyType(response.data);
      })
      .catch((error) => {
        console.error('Error during search:', error);
      });
      
    } else {
      alert('매물 번호를 입력하세요.');
    }
  };
  
  const [buttonStates, setButtonStates] = useState({ //버튼종류
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

  //날짜인풋 입력제한기능
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

  const getCurrentDateFormatted = () => { //현재날짜 구하기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getPastDateFormatted = (daysAgo) => { //현재날짜 - 선택한날짜
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysAgo);

    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, '0');
    const day = String(pastDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const initializePage = () => {
    handleButtonChange('매물종류', '전체');
    // handleButtonChange('매물상태', '전체');
    // handleButtonChange('거래종류', '전체');
  };

  useEffect(() => {
    // 페이지가 로딩될 때 실행될 초기화 함수
    initializePage();
  }, []); // 빈 배열을 두어 컴포넌트가 처음으로 렌더링될 때만 실행

  // 유효한 날짜인지 확인하는 함수
  const isValidCustomDate = (date) => {
    // 간단한 예시로 YYYY-MM-DD 형식을 가정
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const aaa_date = (customDate) => {
    if (!isValidCustomDate(customDate)) {
      alert('올바른 날짜 형식을 입력해주세요.'); // 유효성 검사 실패 시 알림
      return;
    }
    console.log(customDate);
  
    axios
      .get('/api/propertyList', {
        params: {
          customDate: customDate,
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
  
  // 필터를 바꿀때마다 결과를 바꿔주는 기능
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
              <button
                type='button'
                className='input-button'
                style={{ marginBottom: "0px" }}
                onClick={() => aaa_date(customDate)}
              >
                날짜입력
              </button>
            </td>
          </tr>
          {/* 조건조회 */}
          <tr>
            <td className='header-cell'>조건조회</td>
            <td style={{ textAlign: 'left', borderTopWidth: '0px' }}>
                <input
                type='text'
                placeholder='매물번호조회'
                className='styled-input'
                value={propertyNumber}
                onChange={ProductIdChange}
              />
              <button type='button' className='input-button' onClick={productIdSearch}>
                조회
              </button>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
              type='text'
              placeholder='매물가 검색'
              className='styled-input'
              style={{ width: 'calc(10% - 6px)' }}
              value={startPrice}
              onChange={(e) => handlePriceChange(e, setStartPrice)}
            />
            <span style={{ marginRight: '8px' }}>~</span>
            <input
              type='text'
              placeholder='매물가 검색'
              className='styled-input'
              style={{ width: 'calc(10% - 6px)' }}
              value={endPrice}
              onChange={(e) => handlePriceChange(e, setEndPrice)}
            />
              <button type='button' className='input-button' style={{ marginBottom: '0px' }} onClick={priceSearch}>
              조회
             </button>
                {/* <input type='text' className='styled-input' style={{ width: 'calc(10%)' }}></input>
                <span className='input_right_text'>동</span>
                <input type='text' className='styled-input' style={{ width: 'calc(10%)' }}></input>
                <span className='input_right_text'>호</span>
                <input type='text' className='styled-input' style={{ width: 'calc(10%)' }}></input>
                <span className='input_right_text'>번지</span> */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* </form> */}
    </div>
  );
}
