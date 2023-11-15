import React, { useState } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import axios from 'axios';
import { hangjungdong } from '../Home/hangjungdong.js';

export default function OfficetelInsert() {
  const [floorExposure, setFloorExposure] = useState('노출');
  const [usage, setUsage] = useState('주거용');
  const [structure, setStructure] = useState('단층식');
  const [maintenance, setMaintenance] = useState('없음');

  const [maintenanceCost, setMaintenanceCost] = useState(""); // 관리비 천단위 컴마
  const handleMaintenanceCostChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setMaintenanceCost(formattedValue);
  };

  const [val1, setVal1] = useState(""); //지역 state
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const { sido, sigugun, dong } = hangjungdong;

  const getSidoCodeNm = () => sido.find(el => el.sido === val1)?.codeNm || '';
  const getSigugunCodeNm = () => sigugun.find(el => el.sido === val1 && el.sigugun === val2)?.codeNm || '';
  const getDongCodeNm = () => dong.find(el => el.sido === val1 && el.sigugun === val2 && el.dong === val3)?.codeNm || '';
  const sidoCodeNm = getSidoCodeNm();
  const sigugunCodeNm = getSigugunCodeNm();
  const dongCodeNm = getDongCodeNm();
  const location = sidoCodeNm + ' ' + sigugunCodeNm + ' ' + dongCodeNm
  console.log('주소=' + location);
  console.log('용도=' + usage);

  function upload() {

  }

  const onSubmit = (e) => {
    e.preventDefault();

    upload();
  }
  return (
    <div className='officetelInsertHTML'>
      <Header />
      <div className='InsertDIV'>
        <h3>매물등록</h3>
        <form onSubmit={onSubmit}>
          <table className='Insert_table'>
            <tbody>
              <tr>
                <td>매물종류</td>
                <td colSpan={3}>
                  <select><option>오피스텔</option><option>아파트</option></select>
                </td>
              </tr>
              <tr>
                <td>소재지</td>
                <td colSpan={3}>
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
                </td>
              </tr>
              <tr>
                <td>단지명</td>
                <td colSpan={3}>
                  <select><option>여러단지</option></select>
                </td>
              </tr>
              <tr>
                <td>건축물용도</td>
                <td colSpan={3}>
                  <select><option>여러용도</option></select>
                </td>
              </tr>
              <tr>
                <td>면적</td>
                <td colSpan={3}>
                  계약면적<select><option>여러면적</option></select>㎡
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td colSpan={3}>
                  <select><option>동선택</option></select><input type='text' className='ho' />호
                </td>
              </tr>
              <tr>
                <td>층</td>
                <td colSpan={3}><input type='number' className='floor' placeholder='해당층' />층[저/-층]
                  <input type='radio' value={'노출'} checked={floorExposure == '노출'} onChange={() => setFloorExposure('노출')} />층수노출
                  <input type='radio' value={'노출안함'} checked={floorExposure == '노출안함'} onChange={() => setFloorExposure('노출안함')} />고/중/저
                </td>
              </tr>
              <tr>
                <td>방향</td>
                <td>
                  <select><option>방향기준선택</option></select>
                  <select><option>선택</option></select>
                </td>
                <td>현관구조</td>
                <td>
                  <select>
                    <option value="" disabled selected>선택</option>
                    <option value="계단식">계단식</option>
                    <option value="복도식">복도식</option>
                    <option value="복합식">복합식</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>방수</td>
                <td><input type='number' className='rooms' />개</td>
                <td>욕실수</td>
                <td><input type='number' className='bathrooms' />개</td>
              </tr>
              <tr>
                <td>용도</td>
                <td>
                  <input type='radio' value={'주거용'} checked={usage == '주거용'} onChange={() => setUsage('주거용')} />주거용
                  <input type='radio' value={'업무용'} checked={usage == '업무용'} onChange={() => setUsage('업무용')} />업무용
                  <input type='radio' value={'겸용'} checked={usage == '겸용'} onChange={() => setUsage('겸용')} />겸용
                  <input type='radio' value={'숙박시설'} checked={usage == '숙박시설'} onChange={() => setUsage('숙박시설')} />숙박시설
                </td>
                <td>내부구조</td>
                <td>
                  <input type='radio' value={'단층식'} checked={structure == '단층식'} onChange={() => setStructure('단층식')} />단층식
                  <input type='radio' value={'복층식'} checked={structure == '복층식'} onChange={() => setStructure('복층식')} />복층식
                </td>
              </tr>
              <tr>
                <td>월관리비</td>
                <td>월<input type='text' className='maintenanceCost' value={maintenanceCost} onChange={handleMaintenanceCostChange} />원</td>
                <td>관리비유무</td>
                <td>
                  <input type='radio' value={'있음'} checked={maintenance == '있음'} onChange={() => setMaintenance('있음')} />있음
                  <input type='radio' value={'없음'} checked={maintenance == '없음'} onChange={() => setMaintenance('없음')} />없음
                </td>
              </tr>
              <tr>
                <td>관리비포함내역</td>
                <td colSpan={3}>
                  <input type='checkbox' className='input_check' value={'전기'} />전기
                  <input type='checkbox' className='input_check' value={'가스'} />가스
                  <input type='checkbox' className='input_check' value={'수도'} />수도
                  <input type='checkbox' className='input_check' value={'인터넷'} />인터넷
                  <input type='checkbox' className='input_check' value={'TV'} />TV
                </td>
              </tr>
              <tr>
                <td>건축물일자</td>
                <td colSpan={3}>
                  <select>
                    <option value='' disabled selected>유형선택</option>
                    <option value='사용승인'>사용승인</option>
                    <option value='사용검사'>사용검사</option>
                    <option value='준공일자'>준공일자</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button type='submit' className='upload'>등록하기</button>
          <button type='button' className='back' onClick={() => { window.location.href = '/' }}>홈으로</button>
        </form>
      </div>
      <Bottom />
    </div>
  )
}
