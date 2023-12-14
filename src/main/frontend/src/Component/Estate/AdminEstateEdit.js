import React, { useState, useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import '../../App.css';
import axios from 'axios';

export default function AdminEstateEdit() {

  const query = window.location.search;
  const params = new URLSearchParams(query);
  const no = params.get("no"); // 현재 매물의 번호를 쿼리스트링을 통해 가져옴

  const [floorExposure, setFloorExposure] = useState('');
  const [usage, setUsage] = useState('');
  const [structure, setStructure] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [direction_criteria, setDirection_criteria] = useState('');
  const [direction, setDirection] = useState('');
  const [entrance, setEntrance] = useState('');
  const [heating_method, setHeating_method] = useState('');
  const [heating_fuel, setHeating_fuel] = useState('');
  const [building_dateType, setBuilding_dateType] = useState('');
  const [building_dateYear, setBuilding_dateYear] = useState('');
  const [building_dateMonth, setBuilding_dateMonth] = useState('');
  const [building_dateDay, setBuilding_dateDay] = useState('');
  const [rooms, setRooms] = useState(0);
  const [bathroom, setBathroom] = useState(0);

  const [managementCost_include, setManagementCost_include] = useState([]);
  const [airCondition, setAirCondition] = useState([]);
  const [living_facilities, setLiving_facilities] = useState([]);
  const [security_facilities, setSecurity_facilities] = useState([]);
  const [other_facilities, setOther_facilities] = useState([]);
  const [balcony, setBalcony] = useState([]);

  const handleCheckboxChange = (option, state, setState) => {
    // 현재 상태의 복제본을 만들어 수정
    const newManagementCost = [...state];

    // 선택한 옵션이 이미 배열에 있는지 확인
    const index = newManagementCost.indexOf(option);

    // 이미 있다면 제거, 없다면 추가
    if (index !== -1) {
      newManagementCost.splice(index, 1);
    } else {
      newManagementCost.push(option);
    }

    // 변경된 배열을 상태에 반영
    setState(newManagementCost);
  };

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: '/api/estate/detail',
      params: { no: no }
    })
      .then((res) => {
        setDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [no]);

  useEffect(() => {
    axios({
      method: "get",
      url: '/api/estate/detail/img',
      params: { no: no }
    })
      .then((res) => {
        setImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [no]);

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

      const [img, setImg] = useState([]);

      const handleRemoveImg = (index) => {
        // 이미지 목록에서 해당 인덱스의 이미지를 제외한 새로운 목록을 생성
        const newImageList = img.filter((_, i) => i !== index);
      
        // 상태 업데이트
        setImg(newImageList);
      };

  useEffect(() => {
    // detail이 업데이트될 때마다 state를 설정
    if (detail) {
      setTransactionType(detail.transactionType);
      setMoveable_date(detail.moveable_date);
      setMaintenanceCost(detail.administration_cost);
      setDesiredAmount(detail.desiredAmount);
      setNewDeposit(detail.existingTenant_deposit);
      setNewMonthlyRent(detail.existingTenant_monthlyRent);
      setLoan(detail.loan);
      setExistingTenant_deposit(detail.existingTenant_deposit);
      setExistingTenant_monthlyRent(detail.existingTenant_monthlyRent);
      setFloorExposure(detail.floor_open);
      setUsage(detail.roomuse);
      setStructure(detail.inner_structure);
      setMaintenance(detail.maintenance);
      setDirection_criteria(detail.direction_criteria);
      setDirection(detail.direction);
      setEntrance(detail.entrance);
      setHeating_method(detail.heating_method);
      setHeating_fuel(detail.heating_fuel);
      setBuilding_dateType(detail.building_dateType);
      setRooms(detail.rooms);
      setBathroom(detail.bathroom);

      let building_date = detail.building_date;
      if (building_date) {
        setBuilding_dateYear(building_date.split('-')[0]);
        setBuilding_dateMonth(building_date.split('-')[1]);
        setBuilding_dateDay(building_date.split('-')[2]);
      } else {
        console.log(building_date);
      }

      let managementCost_include = detail.managementCost_include;
      if (managementCost_include) {
        setManagementCost_include(managementCost_include.split(','));
      } else {
        console.log(managementCost_include);
      }
      
      let airCondition = detail.airCondition;
      if (airCondition) {
        setAirCondition(airCondition.split(','));
      } else {
        console.log(airCondition);
      }

      let living_facilities = detail.living_facilities;
      if (living_facilities) {
        setLiving_facilities(living_facilities.split(','));
      } else {
        console.log(living_facilities);
      }

      let security_facilities = detail.security_facilities;
      if (security_facilities) {
        setSecurity_facilities(security_facilities.split(','));
      } else {
        console.log(security_facilities);
      }

      let other_facilities = detail.other_facilities;
      if (other_facilities) {
        setOther_facilities(other_facilities.split(','));
      } else {
        console.log(other_facilities);
      }

      let balcony = detail.balcony;
      if (balcony) {
        setBalcony(balcony.split(','));
      } else {
        console.log(balcony);
      }

    }
  }, [detail]);

  useEffect(() => {
      setDesiredAmount('');
      setNewDeposit('');
      setNewMonthlyRent('');
    }, [transactionType]);

  const [moveable_date, setMoveable_date] = useState(detail.moveable_date);

  // 관리비 스크립트
  const [maintenanceCost, setMaintenanceCost] = useState(detail.administration_cost);
  const handleMaintenanceCostChange = (e) => {  // 관리비 천단위 컴마
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setMaintenanceCost(formattedValue);
  };

  // 매매가 스크립트
  const [desiredAmount, setDesiredAmount] = useState('')
  const handledesiredAmountChange = (e) => {  // 매매가 천단위 컴마
      const inputValue = e.target.value.replace(/[^0-9]/g, '');
      const formattedValue = Number(inputValue).toLocaleString();
      setDesiredAmount(formattedValue);
  };

  // 보증금, 월세스크립트
  const [newDeposit, setNewDeposit] = useState(detail.existingTenant_deposit);
  const [newMonthlyRent, setNewMonthlyRent] = useState(detail.existingTenant_monthlyRent);
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

  // 융자금 스크립트
  const [loan, setLoan] = useState(detail.loan);
  const handleLoan = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setLoan(formattedValue);
  }
  // 기존 보증금/월세 스크립트
  const [existingTenant_deposit, setExistingTenant_deposit] = useState(detail.existingTenant_deposit);
  const handleexistingTenant_deposit = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setExistingTenant_deposit(formattedValue);
  }
  const [existingTenant_monthlyRent, setExistingTenant_monthlyRent] = useState(detail.existingTenant_monthlyRent);
  const handleexistingTenant_monthlyRent = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = Number(inputValue).toLocaleString();
    setExistingTenant_monthlyRent(formattedValue);
  }

  // 건축물 날짜선택 셀렉트

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

    function update() {
      const building_use = document.getElementById('building_use').value;
      const direction_criteria = document.getElementById('direction_criteria').value;
      const direction = document.getElementById('direction').value;
      const entrance = document.getElementById('entrance').value;
      const rooms = document.getElementById('rooms').value;
      const bathroom = document.getElementById('bathroom').value;
      const managementCost_include = Array.from(document.querySelectorAll('#managementCost_include .input_check:checked')).map(checkbox => decodeURIComponent(checkbox.value));
      const building_dateType = document.getElementById('building_dateType').value;
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
      formData.append('no', no);
      formData.append('building_use', building_use);
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
      formData.append('managementCost_includ', managementCost_include);
      formData.append('building_dateType', building_dateType);
      formData.append('building_date', building_date);
      formData.append('transactionType', transactionType);
      formData.append('desiredAmount', desiredAmount);
      formData.append('loan', loan);
      formData.append('existingTenant_deposit', existingTenant_deposit);
      formData.append('existingTenant_monthlyRent', existingTenant_monthlyRent);
      formData.append('heating_method', heating_method);
      formData.append('heating_fuel', heating_fuel);
      formData.append('airCondition', airCondition);
      formData.append('living_facilities', living_facilities);
      formData.append('security_facilities', security_facilities);
      formData.append('other_facilities', other_facilities);
      formData.append('balcony', balcony);
      formData.append('moveable_date', moveable_date);
      formData.append('img',img);
      formData.append('product_title', product_title);
      formData.append('product_content', product_content);
  
      // 이미지가 선택되었을 때만 이미지 업로드 처리
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          formData.append('images', file);  // 'images' 파트에 이미지 추가
        });
      } else {
        formData.append('images', new Blob(), 'empty-file');  // 이미지가 없을 경우 빈 파일 추가
      }
  
      axios({
        method: 'post',
        url: '/api/officetel/update',
        data: formData
      })
        .then((res) => {
          alert(res.data);
          window.location.href = '/admin/estate/detail?no=' + no;  // 매물리스트로 수정
        })
        .catch((error) => {
          console.error('매물수정실패: ', error);
          console.error('서버응답:' + JSON.stringify(error.response));
          alert(`에러 발생: ${error.message}`);
        })
    }

  return (
    <div>
        <Header />
        <div className='container1'>

            <div className='detail_body'>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>위치/구조</h3>
                    </div>
                </div>
            </div>

            <table className='styled-table leftA'>
                <tr><td>매물종류</td><td colSpan={3}>{detail.product_type}</td></tr>
                <tr><td>소재지</td><td colSpan={3}>{detail.location}</td></tr>
                <tr><td>단지명</td><td colSpan={3}>{detail.building_name}</td></tr>
                <tr>
                    <td>건축물용도</td>
                    <td colSpan={3}>
                      <select className='styled-select' style={{ width: "60%" }} id='building_use'>
                        <option value='단독주택' selected={transactionType === '단독주택'}>단독주택</option>
                        <option value='공동주택' selected={transactionType === '공동주택'}>공동주택</option>
                        <option value='제1종 근린생활시설' selected={transactionType === '제1종 근린생활시설'}>제1종 근린생활시설</option>
                        <option value='제2종 근린생활시설' selected={transactionType === '제2종 근린생활시설'}>제2종 근린생활시설</option>
                        <option value='문화 및 집회시설' selected={transactionType === '문화 및 집회시설'}>문화 및 집회시설</option>
                        <option value='종교시설' selected={transactionType === '종교시설'}>종교시설</option>
                        <option value='판매시설' selected={transactionType === '판매시설'}>판매시설</option>
                        <option value='운수시설' selected={transactionType === '운수시설'}>운수시설</option>
                        <option value='의료시설' selected={transactionType === '의료시'}>의료시설</option>
                        <option value='교육연구시설' selected={transactionType === '교육연구시설'}>교육연구시설</option>
                        <option value='노유자시설' selected={transactionType === '노유자시설'}>노유자시설</option>
                        <option value='수련시설' selected={transactionType === '수련시설'}>수련시설</option>
                        <option value='운동시설' selected={transactionType === '운동시설'}>운동시설</option>
                        <option value='업무시설' selected={transactionType == '업무시설'}>업무시설</option>
                        <option value='숙박시설' selected={transactionType === '숙박시설'}>숙박시설</option>
                        <option value='위락시설' selected={transactionType === '위락시설'}>위락시설</option>
                        <option value='공장' selected={transactionType === '공장공장'}>공장</option>
                        <option value='창고시설' selected={transactionType === '창고시설'}>창고시설</option>
                        <option value='위험물 저장 및 처리 시설' selected={transactionType === '위험물 저장 및 처리 시설'}>위험물 저장 및 처리 시설</option>
                        <option value='자동차 관련 시설' selected={transactionType === '자동차 관련 시설'}>자동차 관련 시설</option>
                        <option value='동물 및 식물 관련 시설' selected={transactionType === '동물 및 식물 관련 시설'}>동물 및 식물 관련 시설</option>
                        <option value='자원순환 관련 시설' selected={transactionType === '자원순환 관련 시설'}>자원순환 관련 시설</option>
                        <option value='교정 및 군사 시설' selected={transactionType === '교정 및 군사 시설'}>교정 및 군사 시설</option>
                        <option value='방송통신시설' selected={transactionType === '방송통신시설'}>방송통신시설</option>
                        <option value='발전시설' selected={transactionType === '발전시설'}>발전시설</option>
                        <option value='묘지 관련 시설' selected={transactionType === '묘지 관련 시설'}>묘지 관련 시설</option>
                        <option value='관광 휴게시설' selected={transactionType === '관광 휴게시설'}>관광 휴게시설</option>
                        <option value='장례시설' selected={transactionType === '장례시설'}>장례시설</option>
                        <option value='야영장 시설' selected={transactionType === '야영장 시설'}>야영장 시설</option>
                        <option value='미등기건물' selected={transactionType === '미등기건물'}>미등기건물</option>
                        <option value='그 밖에 토지의 정착물' selected={transactionType === '그 밖에 토지의 정착물'}>그 밖에 토지의 정착물</option>
                      </select>
                    </td>
                </tr>
                <tr><td>면적</td><td colSpan={3}>{detail.extent}</td></tr>
                <tr><td>주소</td><td colSpan={3}>{detail.address}</td></tr>
                <tr><td>층</td><td colSpan={3}>{detail.floor} 층 <input type="radio" name="floor" value={'노출'} checked={floorExposure == '노출'} onChange={() => setFloorExposure('노출')}/>층수노출
                                                                <input type="radio" name="floor" value={'노출안함'} checked={floorExposure == '노출안함'} onChange={() => setFloorExposure('노출안함')}/>고/중/저</td></tr>
                <tr>
                    <td>방향</td>
                    <td>
                    <select id='direction_criteria' className='styled-select' style={{ width: "50%", marginRight: "10px" }}>
                      <option value='' selected={direction_criteria == ''}>방향 기준 선택</option>
                      <option value='거실' selected={direction_criteria == '거실'}>거실</option>
                      <option value='안방' selected={direction_criteria == '안방'}>안방</option>
                      {/* 아파트.오피스텔만 거실안방, 다른매물은 주된출입구 등 */}
                    </select>
                    <select id='direction' className='styled-select' style={{ width: "30%" }}>
                      <option value='' selected={direction == ''}>선택</option>
                      <option value='동' selected={direction == '동'}>동</option>
                      <option value='서' selected={direction == '서'}>서</option>
                      <option value='남' selected={direction == '남'}>남</option>
                      <option value='북' selected={direction == '북'}>북</option>
                      <option value='북동' selected={direction == '북동'}>북동</option>
                      <option value='남동' selected={direction == '남동'}>남동</option>
                      <option value='북서' selected={direction == '북서'}>북서</option>
                      <option value='남서' selected={direction == '남서'}>남서</option>
                    </select>
                    </td>
                    <td>현관구조</td>
                    <td>
                        <select id='entrance' className='styled-select' style={{ width: "50%" }}>
                        <option value="" selected={entrance == ''}>선택</option>
                        <option value="계단식" selected={entrance == '계단식'}>계단식</option>
                        <option value="복도식" selected={entrance == '복도식'}>복도식</option>
                        <option value="복합식" selected={entrance == '복합식'}>복합식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                  <td>방수</td>
                  <td><input type='number' className='styled-input' id='rooms' value={rooms} onChange={() => setRooms(document.getElementById('rooms').value)} />개</td>
                  <td>욕실수</td>
                  <td><input type='number' className='styled-input' id='bathroom' value={bathroom} onChange={() => setBathroom(document.getElementById('bathroom').value)} />개</td>
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
                    <td colSpan={3} id='managementCost_include'>
                      <input type='checkbox' className='input_check' checked={managementCost_include.includes('전기')} onChange={() => handleCheckboxChange('전기', managementCost_include, setManagementCost_include)} value={'전기'} />전기
                      <input type='checkbox' className='input_check' checked={managementCost_include.includes('가스')} onChange={() => handleCheckboxChange('가스', managementCost_include, setManagementCost_include)} value={'가스'} />가스
                      <input type='checkbox' className='input_check' checked={managementCost_include.includes('수도')} onChange={() => handleCheckboxChange('수도', managementCost_include, setManagementCost_include)} value={'수도'} />수도
                      <input type='checkbox' className='input_check' checked={managementCost_include.includes('인터넷')} onChange={() => handleCheckboxChange('인터넷', managementCost_include, setManagementCost_include)} value={'인터넷'} />인터넷
                      <input type='checkbox' className='input_check' checked={managementCost_include.includes('TV')} onChange={() => handleCheckboxChange('TV', managementCost_include, setManagementCost_include)} value={'TV'} />TV
                    </td>
                </tr>
                <tr>
                  <td>건축물일자</td>
                  <td colSpan={3}>
                    <select id='building_dateType' className='styled-select' style={{ width: "20%" }}>
                      <option value='' selected={building_dateType == ''}>유형선택</option>
                      <option value='사용승인' selected={building_dateType == '사용승인'}>사용승인</option>
                      <option value='사용검사' selected={building_dateType == '사용검사'}>사용검사</option>
                      <option value='준공일자' selected={building_dateType == '준공일자'}>준공일자</option>
                    </select>
                    <select id='year' className='styled-select' style={{ width: "20%" }}
                      value={form.years}
                      onChange={(e) =>
                        setForm({ ...form, years: e.target.value })
                      }
                    >
                      <option value='' disabled>선택</option>
                      {years.map(item => (
                        <option value={item} key={item} selected={building_dateYear == item}>
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
                      <option value='' disabled>선택</option>
                      {months.map(item => (
                        <option value={item} key={item} selected={building_dateMonth == item}>
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
                      <option value='' disabled>선택</option>
                      {days.map(item => (
                        <option value={item} key={item} selected={building_dateDay == item}>
                          {item}
                        </option>
                      ))}
                    </select>일
                  </td>
                </tr>
            </table>

            <div className='detail_body'>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>가격</h3>
                    </div>
                </div>
            </div>

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
                    <td>전세(보증금)<input id='existingTenant_deposit' type="text" value={existingTenant_deposit} onChange={handleexistingTenant_deposit} />만원 / 월세가
                      <input id='existingTenant_monthlyRent' type='text' value={existingTenant_monthlyRent} onChange={handleexistingTenant_monthlyRent} />만원
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className='detail_body'>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>주차정보</h3>
                    </div>
                </div>
              </div>

              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>총 주차대수</td>
                    <td>
                      {detail.total_parking} 대 총 세대수: 
                    </td>
                    <td>
                      세대당 주차대수
                    </td>
                    <td>
                      {detail.total_parking} 대
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className='detail_body'>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>시설정보</h3>
                    </div>
                </div>
              </div>

              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>난방방식</td>
                    <td>
                      <select id='heating_method'>
                        <option value='' selected={heating_method == ''}>선택</option>
                        <option value='개별난방' selected={heating_method == '개별난방'}>개별난방</option>
                        <option value='중앙난방' selected={heating_method == '중앙난방'}>중앙난방</option>
                        <option value='지역난방' selected={heating_method == '지역난방'}>지역난방</option>
                        <option value='미노출' selected={heating_method == '미노출'}>미노출</option>
                      </select>
                    </td>
                    <td>난방연료</td>
                    <td>
                      <select id='heating_fuel'>
                        <option value='' selected = {heating_fuel == ''}>선택</option>
                        <option value='도시가스' selected = {heating_fuel == '도시가스'}>도시가스</option>
                        <option value='열병합' selected = {heating_fuel == '열병합'}>열병합</option>
                        <option value='기름' selected = {heating_fuel == '기름'}>기름</option>
                        <option value='전기' selected = {heating_fuel == '전기'}>전기</option>
                        <option value='심야전기' selected = {heating_fuel == '심야전기'}>심야전기</option>
                        <option value='태양열' selected = {heating_fuel == '태양열'}>태양열</option>
                        <option value='LPG' selected = {heating_fuel == 'LPG'}>LPG</option>
                        <option value='미노출' selected = {heating_fuel == '미노출'}>미노출</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>냉방시설</td>
                    <td colSpan={3} id='airCondition'>
                      <ul className="optionList">
                        <li><input checked={airCondition.includes('벽걸이에어컨')} onChange={() => handleCheckboxChange('벽걸이에어컨', airCondition, setAirCondition)} value="벽걸이에어컨" type="checkbox" className="input_check" /><label>벽걸이에어컨</label></li>
                        <li><input checked={airCondition.includes('스탠드에어컨')} onChange={() => handleCheckboxChange('스탠드에어컨', airCondition, setAirCondition)} value="스탠드에어컨" type="checkbox" className="input_check" /><label>스탠드에어컨</label></li>
                        <li><input checked={airCondition.includes('천장에어컨')} onChange={() => handleCheckboxChange('천장에어컨', airCondition, setAirCondition)} value="천장에어컨" type="checkbox" className="input_check" /><label>천장에어컨</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>생활시설</td>
                    <td colSpan={3} id='living_facilities'>
                      <ul className="optionList">
                        <li><input checked={living_facilities.includes('침대')} onChange={() => handleCheckboxChange('침대', living_facilities, setLiving_facilities)} value="침대" type="checkbox" className="input_check" /> <label>침대</label></li>
                        <li><input checked={living_facilities.includes('책상')} onChange={() => handleCheckboxChange('책상', living_facilities, setLiving_facilities)} value="책상" type="checkbox" className="input_check" /> <label>책상</label></li>
                        <li><input checked={living_facilities.includes('옷장')} onChange={() => handleCheckboxChange('옷장', living_facilities, setLiving_facilities)} value="옷장" type="checkbox" className="input_check" /> <label>옷장</label></li>
                        <li><input checked={living_facilities.includes('붙박이장')} onChange={() => handleCheckboxChange('붙박이장', living_facilities, setLiving_facilities)} value="붙박이장" type="checkbox" className="input_check" /> <label>붙박이장</label></li>
                        <li><input checked={living_facilities.includes('식탁')} onChange={() => handleCheckboxChange('식탁', living_facilities, setLiving_facilities)} value="식탁" type="checkbox" className="input_check" /> <label>식탁</label></li>
                        <li><input checked={living_facilities.includes('소파')} onChange={() => handleCheckboxChange('소파', living_facilities, setLiving_facilities)} value="소파" type="checkbox" className="input_check" /> <label>소파</label></li>
                        <li><input checked={living_facilities.includes('신발장')} onChange={() => handleCheckboxChange('신발장', living_facilities, setLiving_facilities)} value="신발장" type="checkbox" className="input_check" /> <label>신발장</label></li>
                        <li><input checked={living_facilities.includes('냉장고')} onChange={() => handleCheckboxChange('냉장고', living_facilities, setLiving_facilities)} value="냉장고" type="checkbox" className="input_check" /> <label>냉장고</label></li>
                        <li><input checked={living_facilities.includes('세탁기')} onChange={() => handleCheckboxChange('세탁기', living_facilities, setLiving_facilities)} value="세탁기" type="checkbox" className="input_check" /> <label>세탁기</label></li>
                        <li><input checked={living_facilities.includes('건조기')} onChange={() => handleCheckboxChange('건조기', living_facilities, setLiving_facilities)} value="건조기" type="checkbox" className="input_check" /> <label>건조기</label></li>
                        <li><input checked={living_facilities.includes('샤워부스')} onChange={() => handleCheckboxChange('샤워부스', living_facilities, setLiving_facilities)} value="샤워부스" type="checkbox" className="input_check" /> <label>샤워부스</label></li>
                        <li><input checked={living_facilities.includes('욕조')} onChange={() => handleCheckboxChange('욕조', living_facilities, setLiving_facilities)} value="욕조" type="checkbox" className="input_check" /> <label>욕조</label></li>
                        <li><input checked={living_facilities.includes('비데')} onChange={() => handleCheckboxChange('비데', living_facilities, setLiving_facilities)} value="비데" type="checkbox" className="input_check" /> <label >비데</label></li>
                        <li><input checked={living_facilities.includes('싱크대')} onChange={() => handleCheckboxChange('싱크대', living_facilities, setLiving_facilities)} value="싱크대" type="checkbox" className="input_check" /> <label>싱크대</label></li>
                        <li><input checked={living_facilities.includes('식기세척기')} onChange={() => handleCheckboxChange('식기세척기', living_facilities, setLiving_facilities)} value="식기세척기" type="checkbox" className="input_check" /> <label>식기세척기</label></li>
                        <li><input checked={living_facilities.includes('가스레인지')} onChange={() => handleCheckboxChange('가스레인지', living_facilities, setLiving_facilities)} value="가스레인지" type="checkbox" className="input_check" /> <label>가스레인지</label></li>
                        <li><input checked={living_facilities.includes('인덕션레인지')} onChange={() => handleCheckboxChange('인덕션레인지', living_facilities, setLiving_facilities)} value="인덕션레인지" type="checkbox" className="input_check" /> <label>인덕션레인지</label></li>
                        <li><input checked={living_facilities.includes('전자레인지')} onChange={() => handleCheckboxChange('전자레인지', living_facilities, setLiving_facilities)} value="전자레인지" type="checkbox" className="input_check" /> <label>전자레인지</label></li>
                        <li><input checked={living_facilities.includes('가스오븐')} onChange={() => handleCheckboxChange('가스오븐', living_facilities, setLiving_facilities)} value="가스오븐" type="checkbox" className="input_check" /> <label>가스오븐</label></li>
                        <li><input checked={living_facilities.includes('TV')} onChange={() => handleCheckboxChange('TV', living_facilities, setLiving_facilities)} value="TV" type="checkbox" className="input_check" /> <label>TV</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>보안시설</td>
                    <td colSpan={3} id='security_facilities'>
                      <ul className="optionList">
                        <li><input checked={security_facilities.includes('경비원')} onChange={() => handleCheckboxChange('경비원', security_facilities, setSecurity_facilities)} value="경비원" type="checkbox" className="input_check" /> <label>경비원</label></li>
                        <li><input checked={security_facilities.includes('비디오폰')} onChange={() => handleCheckboxChange('비디오폰', security_facilities, setSecurity_facilities)} value="비디오폰" type="checkbox" className="input_check" /> <label>비디오폰</label></li>
                        <li><input checked={security_facilities.includes('인터폰')} onChange={() => handleCheckboxChange('인터폰', security_facilities, setSecurity_facilities)} value="인터폰" type="checkbox" className="input_check" /> <label>인터폰</label></li>
                        <li><input checked={security_facilities.includes('카드키')} onChange={() => handleCheckboxChange('카드키', security_facilities, setSecurity_facilities)} value="카드키" type="checkbox" className="input_check" /> <label>카드키</label></li>
                        <li><input checked={security_facilities.includes('CCTV')} onChange={() => handleCheckboxChange('CCTV', security_facilities, setSecurity_facilities)} value="CCTV" type="checkbox" className="input_check" /> <label>CCTV</label></li>
                        <li><input checked={security_facilities.includes('사설경비')} onChange={() => handleCheckboxChange('사설경비', security_facilities, setSecurity_facilities)} value="사설경비" type="checkbox" className="input_check" /> <label>사설경비</label></li>
                        <li><input checked={security_facilities.includes('현관보안')} onChange={() => handleCheckboxChange('현관보안', security_facilities, setSecurity_facilities)} value="현관보안" type="checkbox" className="input_check" /> <label>현관보안</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>기타시설</td>
                    <td colSpan={3} id="other_facilities">
                      <ul className="optionList">
                        <li><input checked={other_facilities.includes('엘레베이터')} onChange={() => handleCheckboxChange('엘레베이터', other_facilities, setOther_facilities)} value="엘레베이터" type="checkbox" className="input_check" /> <label>엘리베이터</label></li>
                        <li><input checked={other_facilities.includes('화재경보기')} onChange={() => handleCheckboxChange('화재경보기', other_facilities, setOther_facilities)} value="화재경보기" type="checkbox" className="input_check" /> <label>화재경보기</label></li>
                        <li><input checked={other_facilities.includes('무인택배함')} onChange={() => handleCheckboxChange('무인택배함', other_facilities, setOther_facilities)} value="무인택배함" type="checkbox" className="input_check" /> <label>무인택배함</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>방범창/베란다</td>
                    <td colSpan={3} id="balcony">
                      <ul className="optionList">
                        <li><input checked={balcony.includes('방범창')} onChange={() => handleCheckboxChange('방범창', balcony, setBalcony)} value="방범창" type="checkbox" className="input_check" /> <label>방범창</label></li>
                        <li><input checked={balcony.includes('베란다')} onChange={() => handleCheckboxChange('베란다', balcony, setBalcony)} value="베란다" type="checkbox" className="input_check" /> <label>베란다</label></li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className='detail_body'>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>입주일</h3>
                    </div>
                </div>
              </div>

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

              <div className='detail_body'>
                <div className='info03'>
                    <div className='info03_inr'>
                        <h3>상세정보</h3>
                    </div>
                </div>
              </div>

              <table className='styled-table leftA'>
                <tbody>
                  <tr>
                    <td>매물특징</td>
                    <td>
                      <input id='product_title' type='text' placeholder='리스트에 노출되는 문구' defaultValue={detail.product_title}/>
                    </td>
                  </tr>
                  <tr>
                    <td>상세설명</td>
                    <td>
                      <textarea id='product_content' placeholder='매물 상세 페이지에 노출되는 문구입니다.' defaultValue={detail.product_content}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>매물사진</td>
                    <td>
                      <input type='file' multiple onChange={handleFileChange} accept='image/*' /><br />
                      {/* 선택한 파일명 안나오게 하려면 라벨로 이미지등록 버튼 만들고, input file은 display:none 해놓고 클릭태그연결 */}
                      <div>
                        {(img.length > 0 || selectedFiles.length > 0) && (
                          <p>{img.length + selectedFiles.length}개의 파일이 선택되었습니다.</p>
                        )}
                        {img.map((file, index) => (
                          <div key={index} className="image-container">
                            <img src={`/img/` + file.img_title} alt={`Preview ${index}`} />
                            <button type='button' onClick={() => handleRemoveImg(index)} className="remove-button">
                              X
                            </button>
                          </div>
                        ))}
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="image-container">
                            <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                            <button type='button' onClick={() => handleRemoveImage(index)} className="remove-button">
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            
            <div className='App'>
                <button type='button' onClick={update}>수정</button>&nbsp;
                <button type='button' onClick={() => window.history.back()}>취소</button>
            </div>

        </div>
        <Bottom />
    </div>
  )
}
