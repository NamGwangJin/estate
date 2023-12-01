// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    // const [propertyList, setPropertyList] = useState([]);

    // useEffect(() => { // 질문 리스트 불러오는 함수
    //   axios({
    //     method: "get",
    //     url: '/api/mamul_propertyList',
    //   })
    //     .then((res) => {
    //       setPropertyList(res.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);

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
        color: buttonStates[buttonName] ? '#3cb3c5' : 'black',
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
                <td style={{ textAlign: 'left' }}>
                  <select id="propertyType1" name="propertyType" className='styled-select'>
                    <option value="">매물종류</option>
                    <option value='오피'>오피스텔</option>
                    <option value='아파트'>아파트</option>
                    <option value='상가'>상가</option>
                    <option value='지산'>지식산업센터·사무실</option>
                    <option value='토지'>토지</option>
                    <option value='공장창고'>공장·창고</option>
                  </select>
                  <select id="propertyType2" name="propertyType" className='styled-select'>
                    <option value="all">거래종류</option>
                    <option value="">매매</option>
                    <option value="">전세</option>
                    <option value="">월세</option>
                  </select>
                  {/* <select id="propertyType3" name="propertyType" className='styled-select'>
                  <option value="all">홍보방식</option>
                </select> */}
                  <input type='text' placeholder='매물번호조회' className='styled-input'></input>
                  {/*  버튼을 넣을까?????????????? */}
                </td>
              </tr>

              <tr>
                <td style={{ textAlign: 'left' }}>
                  <select id="propertyType4" name="propertyType" className='styled-select'>
                    <option value="all">전체</option>
                  </select>
                  <input type='text' className='styled-input'></input><span className='input_right_text'>동</span>
                  <input type='text' className='styled-input' style={{ marginLeft: "1px" }}></input><span className='input_right_text'>호</span>
                  <input type='text' className='styled-input'></input><span className='input_right_text'>번지</span>
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
                    <input type="radio" id="all" name="inputDate" value="all" style={{ verticalAlign: 'middle' }} />
                    <span className='input_right_text'>전체</span>
                  </div>
                  <div>
                    <input type="radio" id="1week" name="inputDate" value="1week" style={{ verticalAlign: 'middle' }} />
                    <span className='input_right_text' >1주</span>
                  </div>
                  <div>
                    <input type="radio" id="1month" name="inputDate" value="1month" style={{ verticalAlign: 'middle' }} />
                    <span className='input_right_text'>1개월</span>
                  </div>
                  <div>
                    <input type="radio" id="3months" name="inputDate" value="3months" style={{ verticalAlign: 'middle' }} />
                    <span className='input_right_text'>3개월</span>
                  </div>
                  <div>
                    <input type="radio" id="6months" name="inputDate" value="6months" style={{ verticalAlign: 'middle' }} />
                    <span className='input_right_text'>6개월</span>
                  </div>
                  {/* <div> */}
                  <input type="text" id="custom" name="inputDate" style={{ verticalAlign: 'middle', width: '120px' }} className='styled-input' placeholder='20xx-xx-xx' />
                  <button type='button' className='input-button'>날짜입력</button>
                  {/* </div> */}
                </td>
              </tr>

              <tr>
                <td className='header-cell'>매물상태</td>
                <td style={{
                  textAlign: 'left', borderLeftWidth: '0px',
                  borderTopWidth: '0px'
                }} className="button-container">
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
