import React, { useState, useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import axios from 'axios';
import { hangjungdong } from '../Home/hangjungdong.js';
import './officetelInsert.css';

export default function OfficetelInsert() {

  const [floorExposure, setFloorExposure] = useState('노출');
  const [usage, setUsage] = useState('주거용');
  const [structure, setStructure] = useState('단층식');
  const [maintenance, setMaintenance] = useState('없음');
  const [transactionType, setTransactionType] = useState('매매');
  useEffect(() => {
    setDesiredAmount('');
    setNewDeposit('');
    setNewMonthlyRent('');
  }, [transactionType]);
  const [moveable_date, setMoveable_date] = useState('즉시입주');

  // 관리비 스크립트
  const [maintenanceCost, setMaintenanceCost] = useState("0");
  const handleMaintenanceCostChange = (e) => {  // 관리비 천단위 컴마
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setMaintenanceCost(formattedValue);
  };
  // 매매가 스크립트
  const [desiredAmount, setDesiredAmount] = useState("")
  const handledesiredAmountChange = (e) => {  // 매매가 천단위 컴마
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setDesiredAmount(formattedValue);
  };
  // 보증금, 월세스크립트
  const [newDeposit, setNewDeposit] = useState("");
  const [newMonthlyRent, setNewMonthlyRent] = useState("");
  const handleDepositChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setNewDeposit(formattedValue);
  };
  const handleMonthlyRentChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setNewMonthlyRent(formattedValue);
  };
  useEffect(() => {
    if (newDeposit || newMonthlyRent) {
      setDesiredAmount(`${newDeposit}/${newMonthlyRent}`);
    }
  }, [newDeposit, newMonthlyRent]);
  console.log("가격=" + desiredAmount);
  // 융자금 스크립트
  const [loan, setLoan] = useState('0');
  const handleLoan = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setLoan(formattedValue);
  }
  // 기존 보증금/월세 스크립트
  const [existingTenant_deposit, setExistingTenant_deposit] = useState("0");
  const handleexistingTenant_deposit = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setExistingTenant_deposit(formattedValue);
  }
  const [existingTenant_monthlyRent, setExistingTenant_monthlyRent] = useState("0");
  const handleexistingTenant_monthlyRent = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setExistingTenant_monthlyRent(formattedValue);
  }


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
  console.log('매물종류=' + transactionType);

  const now = new Date();
  const nowYear = now.getFullYear();
  // 건축물 날짜선택 셀렉트
  const [form, setForm] = useState({
    year: nowYear,
    month: "01",
    day: "01",
  });

  let years = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let months = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      months.push("0" + m.toString());
    } else {
      months.push(m.toString());
    }
  }
  let days = [];
  let date = new Date(form.year, form.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }
  let year = form.years;
  let month = form.months;
  let day = form.day;

  const building_date = year + '-' + month + '-' + day;
  console.log(building_date);


  // 입주가능일 선택 셀렉트
  const [selectedDateForm, setSelectedDateForm] = useState({
    year: nowYear,
    month: '01',
    day: '01',
  });
  let availableYears = [];
  for (let y = now.getFullYear(); y <= now.getFullYear() + 7; y += 1) {
    availableYears.push(y);
  }
  let availableMonths = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      availableMonths.push('0' + m.toString());
    } else {
      availableMonths.push(m.toString());
    }
  }
  let availableDays = [];
  let maxDay = new Date(
    selectedDateForm.year,
    selectedDateForm.month,
    0
  ).getDate();
  for (let d = 1; d <= maxDay; d += 1) {
    if (d < 10) {
      availableDays.push('0' + d.toString());
    } else {
      availableDays.push(d.toString());
    }
  }
  const enterableDate = selectedDateForm.year + '-' + selectedDateForm.month + '-' + selectedDateForm.day;
  useEffect(() => {
    setMoveable_date(enterableDate);
  }, [enterableDate]);
  console.log('Selected Value:', moveable_date);
  console.log('Selected Date Form:', enterableDate);

  // 이미지 스크립트
  const [selectedFiles, setSelectedFiles] = useState([]);  // 이미지파일 첨부

  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };




  function upload() {
    const product_type = document.getElementById('product_type').value;
    const building_name = document.getElementById('building_name').value;
    const building_use = document.getElementById('building_use').value;
    const extent = document.getElementById('extent').value;
    const address = document.getElementById('address').value + ' ' + document.getElementById('address_input').value;
    const floor = document.getElementById('floor').value;
    const direction_criteria = document.getElementById('direction_criteria').value;
    const direction = document.getElementById('direction').value;
    const entrance = document.getElementById('entrance').value;
    const rooms = document.getElementById('rooms').value;
    const bathroom = document.getElementById('bathroom').value;
    const managementCost_includ = Array.from(document.querySelectorAll('#managementCost_includ .input_check:checked')).map(checkbox => decodeURIComponent(checkbox.value));
    const building_dateType = document.getElementById('building_dateType').value;
    const total_parking = document.getElementById('total_parking').value;
    const parking_per_room = document.getElementById('parking_per_room').value;
    const heating_method = document.getElementById('heating_method').value;
    const heating_fuel = document.getElementById('heating_fuel').value;
    const airCondition = Array.from(document.querySelectorAll('#airCondition .input_check:checked')).map(checkbox => decodeURIComponent(checkbox.value));
    const living_facilities = Array.from(document.querySelectorAll('#living_facilities .input_check:checked')).map(checkbox => decodeURIComponent(checkbox.value));
    const security_facilities = Array.from(document.querySelectorAll('#security_facilities .input_check:checked')).map(checkbox => decodeURIComponent(checkbox.value));
    const other_facilities = Array.from(document.querySelectorAll('#other_facilities .input_check:checked')).map(checkbox => decodeURIComponent(checkbox.value));
    const balcony = Array.from(document.querySelectorAll('#balcony .input_check:checked')).map(checkbox => decodeURIComponent(checkbox.value));
    const product_title = decodeURIComponent(document.getElementById('product_title').value);
    const product_content = decodeURIComponent(document.getElementById('product_content').value);
        

    const formData = new FormData();
    formData.append('product_type', product_type);
    formData.append('location', location);
    formData.append('building_name', building_name);
    formData.append('building_use', building_use);
    formData.append('extent', extent);
    formData.append('address', address);
    formData.append('floor', floor);
    formData.append('floor_open', floorExposure);
    formData.append('direction_criteria', direction_criteria);
    formData.append('direction', direction);
    formData.append('entrance', entrance);
    formData.append('rooms', rooms);
    formData.append('bathroom', bathroom);
    formData.append('roomuse', usage);
    formData.append('inner_structure', structure);
    formData.append('administration_cost', maintenanceCost);
    formData.append('maintenance', maintenance);
    formData.append('managementCost_includ', managementCost_includ); 
    formData.append('building_dateType', building_dateType);
    formData.append('building_date', building_date);
    formData.append('transactionType', transactionType);
    formData.append('desiredAmount', desiredAmount);
    formData.append('loan', loan);
    formData.append('existingTenant_deposit', existingTenant_deposit);
    formData.append('existingTenant_monthlyRent', existingTenant_monthlyRent);
    formData.append('total_parking', total_parking);
    formData.append('parking_per_room', parking_per_room);
    formData.append('heating_method', heating_method);
    formData.append('heating_fuel', heating_fuel);
    formData.append('airCondition', airCondition);  
    formData.append('living_facilities', living_facilities);  
    formData.append('security_facilities', security_facilities);  
    formData.append('other_facilities', other_facilities);  
    formData.append('balcony', balcony);  
    formData.append('moveable_date', moveable_date);  
    formData.append('product_title', product_title);
    formData.append('product_content', product_content);

    // 이미지 파일 추가
    selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    axios({
      method: 'post',
      url: '/api/officetel/insert',
      data: formData
    })
      .then((res) => {
        alert("매물등록에 성공하였습니다");
        window.location.href = '/admin';  // 매물리스트로 수정
      })
      .catch((error) => {
        console.error('매물등록실패: ', error);
        console.error('서버응답:' + JSON.stringify(error.response));
        alert(`에러 발생: ${error.message}`);
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    upload();
  }
  return (
    <div className='kkk'>
      <Header />
      <div className='mainSection'>
        <form action="/api/officetel/insert" method="post" enctype="multipart/form-data">
          <div className='매물등록'>
            <table className='styled-table leftA' >
              <tbody>
                <tr>
                  <td>매물등록</td>
                  <td colSpan={3}>
                    <select className='styled-select' id='product_type' style={{ width: "20%" }}>
                      <option value='오피스텔'>오피스텔</option>
                      <option value='아파트'>아파트</option>
                      <option value='상가'>상가</option>
                      <option value='지식산업센터/사무실'>지식산업센터·사무실</option>
                      <option value='토지'>토지</option>
                      <option value='공장/창고'>공장·창고</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>소재지</td>
                  <td colSpan={3}>
                    <select className='styled-select' style={{ width: "20%" }} onChange={(e) => setVal1(e.target.value)}>
                      <option value="">선택</option>
                      {sido.map((el) => (
                        <option key={el.sido} value={el.sido}>
                          {el.codeNm}
                        </option>
                      ))}
                    </select>
                    <select className='styled-select' style={{ width: "20%" }} onChange={(e) => setVal2(e.target.value)}>
                      <option value="">선택</option>
                      {sigugun
                        .filter((el) => el.sido === val1)
                        .map((el) => (
                          <option key={el.sigugun} value={el.sigugun}>
                            {el.codeNm}
                          </option>
                        ))}
                    </select>
                    <select className='styled-select' style={{ width: "20%" }} onChange={(e) => setVal3(e.target.value)}>
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
                    <select className='styled-select' style={{ width: "30%" }} id='building_name'>
                      <option value='단지1'>단지1</option>
                      <option value='단지2'>단지2</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>건축물용도</td>
                  <td colSpan={3}>
                    <select className='styled-select' id='building_use' style={{ width: "20%" }}>
                      <option value='단독주택'>단독주택</option>
                      <option value='공동주택'>공동주택</option>
                      <option value='제1종 근린생활시설'>제1종 근린생활시설</option>
                      <option value='제2종 근린생활시설'>제2종 근린생활시설</option>
                      <option value='문화 및 집회시설'>문화 및 집회시설</option>
                      <option value='종교시설'>종교시설</option>
                      <option value='판매시설'>판매시설</option>
                      <option value='운수시설'>운수시설</option>
                      <option value='의료시설'>의료시설</option>
                      <option value='교육연구시설'>교육연구시설</option>
                      <option value='노유자시설'>노유자시설</option>
                      <option value='수련시설'>수련시설</option>
                      <option value='운동시설'>운동시설</option>
                      <option value='업무시설'>업무시설</option>
                      <option value='숙박시설'>숙박시설</option>
                      <option value='위락시설'>위락시설</option>
                      <option value='공장'>공장</option>
                      <option value='창고시설'>창고시설</option>
                      <option value='위험물 저장 및 처리 시설'>위험물 저장 및 처리 시설</option>
                      <option value='자동차 관련 시설'>자동차 관련 시설</option>
                      <option value='동물 및 식물 관련 시설'>동물 및 식물 관련 시설</option>
                      <option value='자원순환 관련 시설'>자원순환 관련 시설</option>
                      <option value='교정 및 군사 시설'>교정 및 군사 시설</option>
                      <option value='방송통신시설'>방송통신시설</option>
                      <option value='발전시설'>발전시설</option>
                      <option value='묘지 관련 시설'>묘지 관련 시설</option>
                      <option value='관광 휴게시설'>관광 휴게시설</option>
                      <option value='장례시설'>장례시설</option>
                      <option value='야영장 시설'>야영장 시설</option>
                      <option value='미등기건물'>미등기건물</option>
                      <option value='그 밖에 토지의 정착물'>그 밖에 토지의 정착물</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>면적</td>
                  <td colSpan={3}>
                    계약면적<select className='styled-select' style={{ width: "20%" }} id='extent'>
                      <option value='44A'>44A(44.59㎡ // 18.56㎡)</option>
                      {/* 디비에서 가져와야. 건물정보들에 타입 업데이트인서트 */}
                    </select>㎡
                  </td>
                </tr>
                <tr>
                  <td>주소</td>
                  <td colSpan={3}>
                    <select className='styled-select' id='address' style={{ width: "20%" }}>
                      <option value='A동'>A동</option>
                      <option value='B동'>B동</option>
                      {/* 건축물대장에서 가져오기 */}
                    </select>
                    <input type='text' id='address_input' className='styled-input' style={{ width: "20%" }} />호
                  </td>
                </tr>
                <tr>
                  <td>층</td>
                  <td colSpan={3}>
                    <input type='number' id='floor' className='styled-input' placeholder='해당층' />층[저/-층] {/* 저/-층 에 건축물대장에서 최고층 가져와야함 */}
                    <input type='radio' value={'노출'} checked={floorExposure == '노출'} onChange={() => setFloorExposure('노출')} />층수노출
                    <input type='radio' value={'노출안함'} checked={floorExposure == '노출안함'} onChange={() => setFloorExposure('노출안함')} />고/중/저
                  </td>
                </tr>
                <tr>
                  <td>방향</td>
                  <td>
                    <select id='direction_criteria' className='styled-select' style={{ width: "20%" }}>
                      <option value='거실'>거실</option>
                      <option value='안방'>안방</option>
                      {/* 아파트.오피스텔만 거실안방, 다른매물은 주된출입구 등 */}
                    </select>
                    <select id='direction' className='styled-select' style={{ width: "20%" }}>
                      <option value='' disabled selected>선택</option>
                      <option value='동'>동</option>
                      <option value='서'>서</option>
                      <option value='남'>남</option>
                      <option value='북'>북</option>
                      <option value='북동'>북동</option>
                      <option value='남동'>남동</option>
                      <option value='북서'>북서</option>
                      <option value='남서'>남서</option>
                    </select>
                  </td>
                  <td>현관구조</td>
                  <td>
                    <select id='entrance' className='styled-select' style={{ width: "20%" }}>
                      <option value="" disabled selected>선택</option>
                      <option value="계단식">계단식</option>
                      <option value="복도식">복도식</option>
                      <option value="복합식">복합식</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>방수</td>
                  <td><input type='number' className='styled-input' id='rooms' value={1}/>개</td>
                  <td>욕실수</td>
                  <td><input type='number' className='styled-input' id='bathroom' value={1}/>개</td>
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
                  <td>월<input type='text' className='styled-input' value={maintenanceCost} onChange={handleMaintenanceCostChange} />원</td>
                  <td>관리비유무</td>
                  <td>
                    <input type='radio' value={'있음'} checked={maintenance == '있음'} onChange={() => setMaintenance('있음')} />있음
                    <input type='radio' value={'없음'} checked={maintenance == '없음'} onChange={() => setMaintenance('없음')} />없음
                  </td>
                </tr>
                <tr>
                  <td>관리비포함내역</td>
                  <td colSpan={3} id='managementCost_includ'>
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
                    <select id='building_dateType' className='styled-select' style={{ width: "20%" }}>
                      <option value='' disabled selected>유형선택</option>
                      <option value='사용승인'>사용승인</option>
                      <option value='사용검사'>사용검사</option>
                      <option value='준공일자'>준공일자</option>
                    </select>
                    <select id='year' className='styled-select' style={{ width: "20%" }}
                      value={form.years}
                      onChange={(e) =>
                        setForm({ ...form, years: e.target.value })
                      }
                    >
                      <option value='' disabled selected>선택</option>
                      {years.map(item => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>년
                    <select id='month' className='styled-select' style={{ width: "20%" }}
                      value={form.months}
                      onChange={(e) =>
                        setForm({ ...form, months: e.target.value })
                      }
                    >
                      <option value='' disabled selected>선택</option>
                      {months.map(item => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>월
                    <select id='day' className='styled-select' style={{ width: "20%" }}
                      value={form.day}
                      onChange={(e) =>
                        setForm({ ...form, day: e.target.value })
                      }
                    >
                      <option value='' disabled selected>선택</option>
                      {days.map(item => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>일
                  </td>
                </tr>
              </tbody>
            </table>


            <div className='가격'>
              <h4>가격  </h4>
              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>거래종류</td>
                    <td>
                      <input type='radio' value={'매매'} checked={transactionType == '매매'} onChange={() => setTransactionType('매매')} />매매
                      <input type='radio' value={'전세'} checked={transactionType == '전세'} onChange={() => setTransactionType('전세')} />전세
                      <input type='radio' value={'웰세'} checked={transactionType == '월세'} onChange={() => setTransactionType('월세')} />월세
                    </td>
                  </tr>
                  <tr>
                    <td>{transactionType}가</td>
                    <td>
                      {transactionType == '월세' ? (
                        <>
                          <input id="newDeposit" type="text" value={newDeposit} onChange={handleDepositChange} />만원 / 월세가<input id="newMonthlyRent" type="text" value={newMonthlyRent} onChange={handleMonthlyRentChange} />만원
                        </>
                      ) : (
                        <>
                          <input id='desiredAmount' type='text' value={desiredAmount} onChange={handledesiredAmountChange} />만원
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>융자금</td>
                    <td>
                      <input id='loan' type='text' value={loan} onChange={handleLoan} />만원
                    </td>
                  </tr>
                  <tr>
                    <td>기전세금(월세금)</td>
                    <td>전세(보증금)<input id='existingTenant_deposit' value={existingTenant_deposit} onChange={handleexistingTenant_deposit} />만원 / 월세가
                      <input id='existingTenant_monthlyRent' type='text' value={existingTenant_monthlyRent} onChange={handleexistingTenant_monthlyRent} />만원
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='주차정보'>
              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>총 주차대수</td>
                    <td>
                      <input id='total_parking' type='text' />대 총 세대수: (DB)대
                    </td>
                    <td>
                      세대당 주차대수
                    </td>
                    <td>
                      <input id='parking_per_room' type='text' />대 (총 주차대수 입력하면 자동계산되도록)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='시설정보'>
              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>난방방식</td>
                    <td>
                      <select id='heating_method'>
                        <option value='' disabled selected>선택</option>
                        <option value='개별난방'>개별난방</option>
                        <option value='중앙난방'>중앙난방</option>
                        <option value='지역난방'>지역난방</option>
                        <option value='미노출'>미노출</option>
                      </select>
                    </td>
                    <td>난방연료</td>
                    <td>
                      <select id='heating_fuel'>
                        <option value='' disabled selected>선택</option>
                        <option value='도시가스'>도시가스</option>
                        <option value='열병합'>열병합</option>
                        <option value='기름'>기름</option>
                        <option value='전기'>전기</option>
                        <option value='심야전기'>심야전기</option>
                        <option value='태양열'>태양열</option>
                        <option value='LPG'>LPG</option>
                        <option value='미노출'>미노출</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>냉방시설</td>
                    <td colspan="3" id='airCondition'>
                      <ul class="optionList">
                        <li><input value="벽걸이에어컨" type="checkbox" class="input_check" /><label>벽걸이에어컨</label></li>
                        <li><input value="스탠드에어컨" type="checkbox" class="input_check" /><label>스탠드에어컨</label></li>
                        <li><input value="천장에어컨" type="checkbox" class="input_check" /><label>천장에어컨</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>생활시설</td>
                    <td colSpan="3" id='living_facilities'>
                      <ul class="optionList">
                        <li><input value="침대" type="checkbox" class="input_check" /> <label>침대</label></li>
                        <li><input value="책상" type="checkbox" class="input_check" /> <label>책상</label></li>
                        <li><input value="옷장" type="checkbox" class="input_check" /> <label>옷장</label></li>
                        <li><input value="붙박이장" type="checkbox" class="input_check" /> <label>붙박이장</label></li>
                        <li><input value="식탁" type="checkbox" class="input_check" /> <label>식탁</label></li>
                        <li><input value="소파" type="checkbox" class="input_check" /> <label>소파</label></li>
                        <li><input value="신발장" type="checkbox" class="input_check" /> <label>신발장</label></li>
                        <li><input value="냉장고" type="checkbox" class="input_check" /> <label>냉장고</label></li>
                        <li><input value="세탁기" type="checkbox" class="input_check" /> <label>세탁기</label></li>
                        <li><input value="건조기" type="checkbox" class="input_check" /> <label>건조기</label></li>
                        <li><input value="샤워부스" type="checkbox" class="input_check" /> <label>샤워부스</label></li>
                        <li><input value="욕조" type="checkbox" class="input_check" /> <label>욕조</label></li>
                        <li><input value="비데" type="checkbox" class="input_check" /> <label >비데</label></li>
                        <li><input value="싱크대" type="checkbox" class="input_check" /> <label>싱크대</label></li>
                        <li><input value="식기세척기" type="checkbox" class="input_check" /> <label>식기세척기</label></li>
                        <li><input value="가스레인지" type="checkbox" class="input_check" /> <label>가스레인지</label></li>
                        <li><input value="인덕션레인지" type="checkbox" class="input_check" /> <label>인덕션레인지</label></li>
                        <li><input value="전자레인지" type="checkbox" class="input_check" /> <label>전자레인지</label></li>
                        <li><input value="가스오븐" type="checkbox" class="input_check" /> <label>가스오븐</label></li>
                        <li><input value="TV" type="checkbox" class="input_check" /> <label>TV</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>보안시설</td>
                    <td colspan="3" id='security_facilities'>
                      <ul class="optionList">
                        <li><input value="경비원" type="checkbox" class="input_check" /> <label>경비원</label></li>
                        <li><input value="비디오폰" type="checkbox" class="input_check" /> <label>비디오폰</label></li>
                        <li><input value="인터폰" type="checkbox" class="input_check" /> <label>인터폰</label></li>
                        <li><input value="카드키" type="checkbox" class="input_check" /> <label>카드키</label></li>
                        <li><input value="CCTV" type="checkbox" class="input_check" /> <label>CCTV</label></li>
                        <li><input value="사설경비" type="checkbox" class="input_check" /> <label>사설경비</label></li>
                        <li><input value="현관보안" type="checkbox" class="input_check" /> <label>현관보안</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>기타시설</td>
                    <td colspan="3" id="other_facilities">
                      <ul class="optionList">
                        <li><input value="엘레베이터" type="checkbox" class="input_check" /> <label>엘리베이터</label></li>
                        <li><input value="화재경보기" type="checkbox" class="input_check" /> <label>화재경보기</label></li>
                        <li><input value="무인택배함" type="checkbox" class="input_check" /> <label>무인택배함</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>방범창/베란다</td>
                    <td colspan="3" id="balcony">
                      <ul class="optionList">
                        <li><input value="방범창" type="checkbox" class="input_check" /> <label>방범창</label></li>
                        <li><input value="베란다" type="checkbox" class="input_check" /> <label>베란다</label></li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='입주일'>
              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>입주가능일</td>
                    <td>
                      <input type='radio' value={'즉시입주'} checked={moveable_date == '즉시입주'} onChange={() => setMoveable_date('즉시입주')} />즉시입주<br />
                      <input type='radio' value={enterableDate} checked={moveable_date === enterableDate} onChange={() => setMoveable_date(enterableDate)} />
                      {/* 연/월/일 선택 */}
                      <select
                        id='year'
                        value={selectedDateForm.year}
                        onChange={(e) =>
                          setSelectedDateForm({ ...selectedDateForm, year: e.target.value })
                        }
                      >
                        {availableYears.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      년
                      <select
                        id='month'
                        value={selectedDateForm.month}
                        onChange={(e) =>
                          setSelectedDateForm({ ...selectedDateForm, month: e.target.value })
                        }
                      >
                        {availableMonths.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      월
                      <select
                        id='day'
                        value={selectedDateForm.day}
                        onChange={(e) =>
                          setSelectedDateForm({ ...selectedDateForm, day: e.target.value })
                        }
                      >
                        {availableDays.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      일 이후
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='상세정보'>
              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>매물특징</td>
                    <td>
                      <input id='product_title' type='text' placeholder='리스트에 노출되는 문구' />
                    </td>
                  </tr>
                  <tr>
                    <td>상세설명</td>
                    <td>
                      <textarea id='product_content' placeholder='매물 상세 페이지에 노출되는 문구입니다.'></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>매물사진</td>
                    <td>
                      <input type='file' multiple onChange={handleFileChange} /><br />
                      <div>
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="image-container">
                            <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                            <button onClick={() => handleRemoveImage(index)} className="remove-button">
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <button type='button' onClick={onSubmit} className='upload'>등록하기</button>
            <button type='button' className='back' onClick={() => { window.location.href = '/' }}>홈으로</button>
          </div>
        </form>
      </div>
      <Bottom />
    </div>
  )
}
