import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function Facility_infomation() {

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

  return (
    
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
  )
}
