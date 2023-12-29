import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { hangjungdong } from '../../../Home/hangjungdong.js'
import { v4 as uuidv4 } from 'uuid';

export default function Knowledge_Industry() {

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
    const managementCost_includ = encodeURIComponent(Array.from(document.querySelectorAll('#managementCost_includ .input_check:checked')).map(checkbox => checkbox.value));
    const building_dateType = document.getElementById('building_dateType').value;
    const total_parking = document.getElementById('total_parking').value;
    const parking_per_room = document.getElementById('parking_per_room').value;
    const heating_method = document.getElementById('heating_method').value;
    const heating_fuel = document.getElementById('heating_fuel').value;
    const airCondition = encodeURIComponent(Array.from(document.querySelectorAll('#airCondition .input_check:checked')).map(checkbox => checkbox.value));
    const living_facilities = encodeURIComponent(Array.from(document.querySelectorAll('#living_facilities .input_check:checked')).map(checkbox => checkbox.value));
    const security_facilities = encodeURIComponent(Array.from(document.querySelectorAll('#security_facilities .input_check:checked')).map(checkbox => checkbox.value));
    const other_facilities = encodeURIComponent(Array.from(document.querySelectorAll('#other_facilities .input_check:checked')).map(checkbox => checkbox.value));
    const balcony = encodeURIComponent(Array.from(document.querySelectorAll('#balcony .input_check:checked')).map(checkbox => checkbox.value));
    const product_title = encodeURIComponent(document.getElementById('product_title').value);
    const product_content = encodeURIComponent(document.getElementById('product_content').value);

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
    formData.append('managementCost_includ', managementCost_includ);  // 수정된 부분
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
    formData.append('airCondition', airCondition);  // 수정된 부분
    formData.append('living_facilities', living_facilities);  // 수정된 부분
    formData.append('security_facilities', security_facilities);  // 수정된 부분
    formData.append('other_facilities', other_facilities);  // 수정된 부분
    formData.append('balcony', balcony);  // 수정된 부분
    formData.append('moveable_date', moveable_date);  // 수정된 부분
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
    <div className='Apartment'>
      <table className='styled-table leftA' >
        <tbody>
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
            <td>상세 주소</td>
            <td colSpan={3} style={{ borderLeft: '1px solid' }}>
              <input type='radio' name='addressType' /> 일반
                <input type='radio' name='addressType' /> 산
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> -
              <input type='text' id='address_input2' className='styled-input' style={{ width: "20%" }} /> 번지
              <br/>
              <div style={{marginTop: '20px'}}>
              상세주소 : <input type='text' className='styled-input' ></input> <button>위치확인</button>
              </div>
              <br/>
              <div style={{ marginTop: '20px' }}>
              <span style={{ marginRight: '10px' }}>기타정보 :</span>
                <input type='checkbox'  style={{marginTop: '8px'}}/> 미등기
                <input type='checkbox'  style={{marginTop: '8px'}}/> 일부
                <input type='checkbox'  style={{marginTop: '8px'}}/>  건축물대장 면적 확인
            </div>
            </td>
          </tr>
          <tr>
            <td>연면적</td>
            <td colSpan={3}>
              <input type='text' className='styled-input' style={{ width: "20%" }} /> m2 | 면적계산기
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> 평= 
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> m2
            </td>
          </tr>
          <tr>
            <td>대지면적</td>
            <td colSpan={3}>
              <input type='text' className='styled-input' style={{ width: "20%" }} /> m2 | 면적계산기
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> 평= 
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> m2
            </td>
          </tr>
          <tr>
            <td>건축면적</td>
            <td colSpan={3}>
              <input type='text' className='styled-input' style={{ width: "20%" }} /> m2 | 면적계산기
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> 평= 
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> m2
            </td>
          </tr>
          <tr>
            <td>전용면적</td>
            <td colSpan={3}>
              <input type='text' className='styled-input' style={{ width: "20%" }} /> m2 | 면적계산기
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> 평= 
              <input type='text' id='address_input1' className='styled-input' style={{ width: "20%" }} /> m2
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
          <td>건축구조</td>
            <td>
            <select className='styled-select' style={{ width: "40%" }}>
                <option value=''>선택</option>
              </select>
            </td>
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
          </tr>


          <tr>
            <td>용도</td>
            <td>
            <select className='styled-select' style={{ width: "40%" }}>
                <option value=''>선택</option>
              </select>
            </td>
            <td>사용전력</td>
            <td>
            <select className='styled-select' style={{ width: "40%" }}>
                <option value=''>선택</option>
              </select>
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
    </div>
  )
}
