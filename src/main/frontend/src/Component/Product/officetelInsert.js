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
  const [moveable_date, setMoveable_date] = useState('즉시입주');

  const [maintenanceCost, setMaintenanceCost] = useState("");
  const handleMaintenanceCostChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    if (inputValue !== null) {
      const formattedValue = Number(inputValue).toLocaleString();
      setMaintenanceCost(formattedValue);
    } else {
      setMaintenanceCost("0");
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const { sido, sigugun, dong } = hangjungdong;

  const getSidoCodeNm = () => sido.find(el => el.sido === val1)?.codeNm || '';
  const getSigugunCodeNm = () => sigugun.find(el => el.sido === val1 && el.sigugun === val2)?.codeNm || '';
  const getDongCodeNm = () => dong.find(el => el.sido === val1 && el.sigugun === val2 && el.dong === val3)?.codeNm || '';
  const sidoCodeNm = getSidoCodeNm();
  const sigugunCodeNm = getSigugunCodeNm();
  const dongCodeNm = getDongCodeNm();
  const location = sidoCodeNm + ' ' + sigugunCodeNm + ' ' + dongCodeNm;

  const now = new Date();
  const nowYear = now.getFullYear();

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
      months.push("0" + m.toString());
    } else {
      months.push(m.toString());
    }
  }

  let days = [];
  let date = new Date(form.year, form.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  let year = form.year;
  let month = form.month;
  let day = form.day;
  let building_date = year + '-' + month + '-' + day;

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
  let maxDay = new Date(selectedDateForm.year, selectedDateForm.month, 0).getDate();
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

  function upload() {
    const product_type = encodeURIComponent(document.getElementById('product_type').value);
    const building_name = encodeURIComponent(document.getElementById('building_name').value);
    const building_use = encodeURIComponent(document.getElementById('building_use').value);
    const extent = encodeURIComponent(document.getElementById('extent').value);
    const address = encodeURIComponent(document.getElementById('address').value + ' ' + document.getElementById('address_input').value);
    const floor = encodeURIComponent(document.getElementById('floor').value);
    const direction_criteria = encodeURIComponent(document.getElementById('direction_criteria').value);
    const direction = encodeURIComponent(document.getElementById('direction').value);
    const entrance = encodeURIComponent(document.getElementById('entrance').value);
    const rooms = encodeURIComponent(document.getElementById('rooms').value);
    const bathroom = encodeURIComponent(document.getElementById('bathroom').value);

    const managementCost_includ = Array.from(document.querySelectorAll('#managementCost_includ .input_check:checked')).map(checkbox => encodeURIComponent(checkbox.value));
    const building_dateType = encodeURIComponent(document.getElementById('building_dateType').value);
    let desiredAmount = encodeURIComponent(document.getElementById('desiredAmount').value);
    if (desiredAmount == null) {
      desiredAmount = encodeURIComponent(document.getElementById('newDeposit').value + '/' + document.getElementById('newMonthlyRent').value);
    }
    const loan = encodeURIComponent(document.getElementById('loan').value);
    const existingTenant_deposit = encodeURIComponent(document.getElementById('existingTenant_deposit').value);
    const existingTenant_monthlyRent = encodeURIComponent(document.getElementById('existingTenant_monthlyRent').value);
    const total_parking = encodeURIComponent(document.getElementById('total_parking').value);
    const parking_per_room = encodeURIComponent(document.getElementById('parking_per_room').value);
    const heating_method = encodeURIComponent(document.getElementById('heating_method').value);
    const heating_fuel = encodeURIComponent(document.getElementById('heating_fuel').value);
    const airCondition = Array.from(document.querySelectorAll('#airCondition .input_check:checked')).map(checkbox => encodeURIComponent(checkbox.value));
    const living_facilities = Array.from(document.querySelectorAll('#living_facilities .input_check:checked')).map(checkbox => encodeURIComponent(checkbox.value));
    const security_facilities = Array.from(document.querySelectorAll('#security_facilities .input_check:checked')).map(checkbox => encodeURIComponent(checkbox.value));
    const other_facilities = Array.from(document.querySelectorAll('#other_facilities .input_check:checked')).map(checkbox => encodeURIComponent(checkbox.value));
    const balcony = Array.from(document.querySelectorAll('#balcony .input_check:checked')).map(checkbox => encodeURIComponent(checkbox.value));
    const product_title = encodeURIComponent(document.getElementById('product_title').value);
    const product_content = encodeURIComponent(document.getElementById('product_content').value);

    const data = {
      product_type,
      building_name,
      building_use,
      extent,
      address,
      floor,
      direction_criteria,
      direction,
      entrance,
      rooms,
      bathroom,
      managementCost_includ,
      building_dateType,
      desiredAmount,
      loan,
      existingTenant_deposit,
      existingTenant_monthlyRent,
      total_parking,
      parking_per_room,
      heating_method,
      heating_fuel,
      airCondition,
      living_facilities,
      security_facilities,
      other_facilities,
      balcony,
      moveable_date,
      product_title,
      product_content,
    };

    axios.post('/api/officetel_Insert', data)
      .then((res) => {
        if (res.data == 'success') {
          alert('매물등록을 성공하였습니다');
          window.location.href = '/';  // 매물리스트로 수정
        }
      })
      .catch((error) => {
        console.error('매물등록실패: ', error);
        console.error('서버응답:' + JSON.stringify(error.response));
        alert(`에러 발생: ${error.message}`);
      })
  }

 
  // const [floorExposure, setFloorExposure] = useState('노출');
  // const [usage, setUsage] = useState('주거용');
  // const [structure, setStructure] = useState('단층식');
  // const [maintenance, setMaintenance] = useState('없음');
  // const [transactionType, setTransactionType] = useState('매매');
  // const [moveable_date, setMoveable_date] = useState('즉시입주');




  // const [maintenanceCost, setMaintenanceCost] = useState(""); // 관리비 천단위 컴마
  // const handleMaintenanceCostChange = (e) => {
  //   const inputValue = e.target.value.replace(/[^0-9]/g, '');
  //   if (inputValue !== null) {
  //     const formattedValue = Number(inputValue).toLocaleString();
  //     setMaintenanceCost(formattedValue);
  //   } else {
  //     // 값이 null인 경우 0으로 설정
  //     setMaintenanceCost("0");
  //   }
  // };

  // const [selectedFiles, setSelectedFiles] = useState([]);  // 이미지파일 첨부
  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   const filesArray = Array.from(files);
  //   setSelectedFiles(filesArray);
  // };
  // const [val1, setVal1] = useState(""); //지역 state
  // const [val2, setVal2] = useState("");
  // const [val3, setVal3] = useState("");
  // const { sido, sigugun, dong } = hangjungdong;

  // const getSidoCodeNm = () => sido.find(el => el.sido === val1)?.codeNm || '';
  // const getSigugunCodeNm = () => sigugun.find(el => el.sido === val1 && el.sigugun === val2)?.codeNm || '';
  // const getDongCodeNm = () => dong.find(el => el.sido === val1 && el.sigugun === val2 && el.dong === val3)?.codeNm || '';
  // const sidoCodeNm = getSidoCodeNm();
  // const sigugunCodeNm = getSigugunCodeNm();
  // const dongCodeNm = getDongCodeNm();
  // const location = sidoCodeNm + ' ' + sigugunCodeNm + ' ' + dongCodeNm
  // console.log('주소=' + location);
  // console.log('용도=' + usage);
  // console.log('매물종류=' + transactionType);

  // const now = new Date();
  // const nowYear = now.getFullYear();
  // // 건축물 날짜선택 셀렉트
  // const [form, setForm] = useState({
  //   year: nowYear,
  //   month: "01",
  //   day: "01",
  // });

  // let years = [];
  // for (let y = now.getFullYear(); y >= 1930; y -= 1) {
  //   years.push(y);
  // }

  // let months = [];
  // for (let m = 1; m <= 12; m += 1) {
  //   if (m < 10) {
  //     // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
  //     months.push("0" + m.toString());
  //   } else {
  //     months.push(m.toString());
  //   }
  // }
  // let days = [];
  // let date = new Date(form.year, form.month, 0).getDate();
  // for (let d = 1; d <= date; d += 1) {
  //   if (d < 10) {
  //     // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
  //     days.push("0" + d.toString());
  //   } else {
  //     days.push(d.toString());
  //   }
  // }
  // let year = form.years;
  // let month = form.months;
  // let day = form.day;

  // let building_date = year + '-' + month + '-' + day;
  // console.log(building_date);

  // // 입주가능일 선택 셀렉트
  // const [selectedDateForm, setSelectedDateForm] = useState({
  //   year: nowYear,
  //   month: '01',
  //   day: '01',
  // });
  // let availableYears = [];
  // for (let y = now.getFullYear(); y <= now.getFullYear() + 7; y += 1) {
  //   availableYears.push(y);
  // }

  // let availableMonths = [];
  // for (let m = 1; m <= 12; m += 1) {
  //   if (m < 10) {
  //     availableMonths.push('0' + m.toString());
  //   } else {
  //     availableMonths.push(m.toString());
  //   }
  // }
  // let availableDays = [];
  // let maxDay = new Date(
  //   selectedDateForm.year,
  //   selectedDateForm.month,
  //   0
  // ).getDate();
  // for (let d = 1; d <= maxDay; d += 1) {
  //   if (d < 10) {
  //     availableDays.push('0' + d.toString());
  //   } else {
  //     availableDays.push(d.toString());
  //   }
  // }
  // const enterableDate = selectedDateForm.year + '-' + selectedDateForm.month + '-' + selectedDateForm.day;
  // useEffect(() => {
  //   setMoveable_date(enterableDate);
  // }, [enterableDate]);
  // console.log('Selected Value:', moveable_date);
  // console.log('Selected Date Form:', enterableDate);


  // function upload() {
  //   const product_type = document.getElementById('product_type').value;
  //   const building_name = document.getElementById('building_name').value;
  //   const building_use = document.getElementById('building_use').value;
  //   const extent = document.getElementById('extent').value;
  //   const address = document.getElementById('address').value + ' ' + document.getElementById('address_input').value;
  //   const floor = document.getElementById('floor').value;
  //   const direction_criteria = document.getElementById('direction_criteria').value;
  //   const direction = document.getElementById('direction').value;
  //   const entrance = document.getElementById('entrance').value;
  //   const rooms = document.getElementById('rooms').value;
  //   const bathroom = document.getElementById('bathroom').value;

  //   const managementCost_includ = Array.from(document.querySelectorAll('#managementCost_includ .input_check:checked')).map(checkbox => checkbox.value);
  //   const building_dateType = document.getElementById('building_dateType').value;
  //   const desiredAmount = document.getElementById('desiredAmount').value;
  //   if (desiredAmount == null) {
  //     desiredAmount = document.getElementById('newDeposit').value + '/' + document.getElementById('newMonthlyRent').value;
  //   }
  //   const loan = document.getElementById('loan').value;
  //   const existingTenant_deposit = document.getElementById('existingTenant_deposit').value;
  //   const existingTenant_monthlyRent = document.getElementById('existingTenant_monthlyRent').value;
  //   const total_parking = document.getElementById('total_parking').value;
  //   const parking_per_room = document.getElementById('parking_per_room').value;
  //   const heating_method = document.getElementById('heating_method').value;
  //   const heating_fuel = document.getElementById('heating_fuel').value;
  //   const airCondition = Array.from(document.querySelectorAll('#airCondition .input_check:checked')).map(checkbox => checkbox.value);
  //   const living_facilities = Array.from(document.querySelectorAll('#living_facilities .input_check:checked')).map(checkbox => checkbox.value);
  //   const security_facilities = Array.from(document.querySelectorAll('#security_facilities .input_check:checked')).map(checkbox => checkbox.value);
  //   const other_facilities = Array.from(document.querySelectorAll('#other_facilities .input_check:checked')).map(checkbox => checkbox.value);
  //   const balcony = Array.from(document.querySelectorAll('#balcony .input_check:checked')).map(checkbox => checkbox.value);
  //   const product_title = document.getElementById('product_title').value;
  //   const product_content = document.getElementById('product_content').value;

  //   console.log('타입=' + product_type);

  //   axios({
  //     method: 'post',
  //     url: '/api/officetel_Insert',
  //     data: {
  //       product_type: product_type,
  //       location: location,
  //       building_name: building_name,
  //       building_use: building_use,
  //       extent: extent,
  //       address: address,
  //       floor: floor,
  //       floor_open: floorExposure,
  //       direction_criteria: direction_criteria,
  //       direction: direction,
  //       entrance: entrance,
  //       rooms: rooms,
  //       bathroom: bathroom,
  //       roomuse: usage,
  //       inner_structure: structure,
  //       administration_cost: maintenanceCost,
  //       maintenance: maintenance,
  //       managementCost_includ: managementCost_includ,
  //       building_dateType: building_dateType,
  //       building_date: building_date,
  //       transactionType: transactionType,
  //       desiredAmount: desiredAmount,
  //       loan: loan,
  //       existingTenant_deposit: existingTenant_deposit,
  //       existingTenant_monthlyRent: existingTenant_monthlyRent,
  //       total_parking: total_parking,
  //       parking_per_room: parking_per_room,
  //       heating_method: heating_method,
  //       heating_fuel: heating_fuel,
  //       airCondition: airCondition,
  //       living_facilities: living_facilities,
  //       security_facilities: security_facilities,
  //       other_facilities: other_facilities,
  //       balcony: balcony,
  //       moveable_date: moveable_date,
  //       product_title: product_title,
  //       product_content: product_content
  //     },
  //   })
  //     .then((res) => {
  //       if (res.data == 'success') {
  //         alert('매물등록을 성공하였습니다');
  //         window.location.href = '/';  // 매물리스트로 수정
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('매물등록실패: ', error);
  //       console.error('서버응답:'+JSON.stringify(error.response));
  //       alert(`에러 발생: ${error.message}`);
  //     })
  // }

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
          <h5>매물등록</h5>
          <table className='content_insert'>
            <tbody>
              <tr>
                <td>매물종류</td>
                <td colSpan={3}>
                  <select id='product_type'>
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
                  <select id='building_name'>
                    <option value='단지1'>단지1</option>
                    <option value='단지2'>단지2</option>
                    {/* 디비에서 가져와야함 */}
                  </select>
                </td>
              </tr>
              <tr>
                <td>건축물용도</td>
                <td colSpan={3}>
                  <select id='building_use'>
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
                  계약면적<select id='extent'>
                    <option value='44A'>44A(44.59㎡ // 18.56㎡)</option>
                    {/* 디비에서 가져와야. 건물정보들에 타입 업데이트인서트 */}
                  </select>㎡
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td colSpan={3}>
                  <select id='address'>
                    <option value='A동'>A동</option>
                    <option value='B동'>B동</option>
                    {/* 건축물대장에서 가져오기 */}
                  </select>
                  <input type='text' id='address_input' className='ho' />호
                </td>
              </tr>
              <tr>
                <td>층</td>
                <td colSpan={3}>
                  <input type='number' id='floor' className='floor' placeholder='해당층' />층[저/-층] {/* 저/-층 에 건축물대장에서 최고층 가져와야함 */}
                  <input type='radio' value={'노출'} checked={floorExposure == '노출'} onChange={() => setFloorExposure('노출')} />층수노출
                  <input type='radio' value={'노출안함'} checked={floorExposure == '노출안함'} onChange={() => setFloorExposure('노출안함')} />고/중/저
                </td>
              </tr>
              <tr>
                <td>방향</td>
                <td>
                  <select id='direction_criteria'>
                    <option value='거실'>거실</option>
                    <option value='안방'>안방</option>
                    {/* 아파트.오피스텔만 거실안방, 다른매물은 주된출입구 등 */}
                  </select>
                  <select id='direction'>
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
                  <select id='entrance'>
                    <option value="" disabled selected>선택</option>
                    <option value="계단식">계단식</option>
                    <option value="복도식">복도식</option>
                    <option value="복합식">복합식</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>방수</td>
                <td><input type='number' className='rooms' id='rooms' />개</td>
                <td>욕실수</td>
                <td><input type='number' className='bathrooms' id='bathroom' />개</td>
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
                  <select id='building_dateType'>
                    <option value='' disabled selected>유형선택</option>
                    <option value='사용승인'>사용승인</option>
                    <option value='사용검사'>사용검사</option>
                    <option value='준공일자'>준공일자</option>
                  </select>
                  <select id='year'
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
                  <select id='month'
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
                  <select id='day'
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
          <h5>가격</h5>
          <table className='price_insert'>
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
                      보증금<input id='newDeposit' type='text' />만원 / 월세가<input id='newMonthlyRent' type='text' />만원
                    </>
                  ) : (
                    <>
                      <input id='desiredAmount' type='text' />만원 (컴마찍기)
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td>융자금</td><td><input id='loan' type='text' />만원</td>
              </tr>
              <tr>
                <td>기전세금(월세금)</td><td>전세(보증금)<input id='existingTenant_monthlyRent' type='text' />만원 / 월세가<input id='existingTenant_deposit' type='text' />만원</td>
              </tr>
            </tbody>
          </table>
          <h5>주차정보</h5>
          <table>
            <tbody>
              <tr>
                <td>총 주차대수</td>
                <td><input id='total_parking' type='text' />대 총 세대수: (DB)대</td>
                <td>세대당 주차대수</td>
                <td><input id='parking_per_room' type='text' />대 (총 주차대수 입력하면 자동계산되도록)</td>
                {/* 자동계산되도록 */}
              </tr>
            </tbody>
          </table>
          <h5>시설정보</h5>
          <table>
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
          </table>
          <h5>입주일</h5>
          <table>
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
          <h5>상세정보</h5>
          <table>
            <tbody>
              <tr>
                <td>매물특징</td>
                <td><input id='product_title' type='text' placeholder='리스트에 노출되는 문구' /></td>
              </tr>
              <tr>
                <td>상세설명</td>
                <td>
                  <textarea id='product_content' placeholder='매물 상세 페이지에 노출되는 문구입니다.'></textarea>
                </td>
              </tr>
              <tr>
                {/* <td>매물사진</td>
                <td>
                  <input type='file' multiple onChange={handleFileChange} /><br />
                  <div>
                    {selectedFiles.map((file, index) => (
                      <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                    ))}
                  </div>
                </td> */}
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
