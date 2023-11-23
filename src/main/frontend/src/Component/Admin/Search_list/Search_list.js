import React, { useState } from 'react';
import './Search_list.css';

export default function Search_list() {
    const [buttonStates, setButtonStates] = useState({
        전체: false,
        결제대기: false,
        확인중: false,
        확인실패: false,
        서비스중: false,
        거래완료: false,
        종료예정: false,
      });
    
      // 클릭 이벤트 핸들러 정의

      const handleClick = (buttonName) => {
        setButtonStates((prevState) => ({
          ...prevState,
          [buttonName]: !prevState[buttonName], // 클릭 시 상태를 토글
        }));
      };

        // 버튼 스타일을 반환하는 함수 정의
    const getButtonStyle = (buttonName) => {
        return {
        padding: '10px',
        backgroundColor: 'white',
        color: buttonStates[buttonName] ? '#3cb3c5' : 'black' ,
        border: buttonStates[buttonName] ? '2px solid #3cb3c5' : '2px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s',
        };
    };
  
  return (
    <div className='Search_list'>
      <form action="/search" method="get">
        <table className='styled-table'>
          <tbody>
            <tr>
              <td rowSpan={2} className='header-cell'>조건조회</td>
              <td style={{textAlign:'left'}}>
                <select id="propertyType1" name="propertyType" className='styled-select'>
                  <option value="all">매물종류</option>
                </select>
                <select id="propertyType2" name="propertyType" className='styled-select'>
                  <option value="all">거래종류</option>
                </select>
                <select id="propertyType3" name="propertyType" className='styled-select'>
                  <option value="all">홍보방식</option>
                </select>
                <input type='text' placeholder='매물번호조회' className='styled-input'></input>
              </td>
            </tr>

            <tr>
            <td style={{textAlign:'left'}}>
                <select id="propertyType4" name="propertyType" className='styled-select'>
                  <option value="all">전체</option>
                </select>
                <input type='text' className='styled-input'></input>동
                <input type='text' className='styled-input' style={{marginLeft: "1px"}}></input>호
                <input type='text' className='styled-input'></input>번지
              </td>
            </tr>

            <tr>
              <td className='header-cell'>입력일</td>
              <td className='radio-group' style={{
                borderLeftWidth: '0px',
                borderTopWidth: '0px',
                textAlign: 'left'
                }}>
                <div>
                  <input type="radio" id="all" name="inputDate" value="all" />
                  <label htmlFor="all">전체</label>
                </div>
                <div>
                  <input type="radio" id="1week" name="inputDate" value="1week" />
                  <label htmlFor="1week">1주</label>
                </div>
                <div>
                  <input type="radio" id="1month" name="inputDate" value="1month" />
                  <label htmlFor="1month">1개월</label>
                </div>
                <div>
                  <input type="radio" id="3months" name="inputDate" value="3months" />
                  <label htmlFor="3months">3개월</label>
                </div>
                <div>
                  <input type="radio" id="6months" name="inputDate" value="6months" />
                  <label htmlFor="6months">6개월</label>
                </div>
                <div>
                  <input type="radio" id="custom" name="inputDate" value="custom" />
                  <label htmlFor="custom">기간입력</label>
                </div>
              </td>
            </tr>

            <tr>
              <td className='header-cell'>매물상태</td>
              <td style={{ textAlign: 'left' , borderLeftWidth: '0px',
                borderTopWidth: '0px' }} className="button-container">
              <button
                  type="button"
                  style={getButtonStyle('전체')}
                  onClick={() => handleClick('전체')}
                >
                  전체
                </button>
                <button
                  type="button"
                  style={getButtonStyle('결제대기')}
                  onClick={() => handleClick('결제대기')}
                >
                  결제대기
                </button>
                <button
                  type="button"
                  style={getButtonStyle('확인중')}
                  onClick={() => handleClick('확인중')}
                >
                  확인중
                </button>
                <button
                  type="button"
                  style={getButtonStyle('확인실패')}
                  onClick={() => handleClick('확인실패')}
                >
                  확인실패
                </button>
                <button
                  type="button"
                  style={getButtonStyle('서비스중')}
                  onClick={() => handleClick('서비스중')}
                >
                  서비스중
                </button>
                <button
                  type="button"
                  style={getButtonStyle('거래완료')}
                  onClick={() => handleClick('거래완료')}
                >
                  거래완료
                </button>
                <button
                  type="button"
                  style={getButtonStyle('종료예정')}
                  onClick={() => handleClick('종료예정')}
                >
                  종료예정
                </button>
                </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
