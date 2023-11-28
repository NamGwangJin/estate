import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { hangjungdong } from '../Home/hangjungdong.js';
import { v4 as uuidv4 } from 'uuid';

export default function Move_in_date() {

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
	const handleMaintenanceCostChange = (e) => {
			const inputValue = e.target.value.replace(/[^0-9]/g, '');
			const formattedValue = Number(inputValue).toLocaleString();
			setMaintenanceCost(formattedValue);
	};

	// 매매가 스크립트
	const [desiredAmount, setDesiredAmount] = useState("")
	const handledesiredAmountChange = (e) => {
			const inputValue = e.target.value.replace(/[^0-9]/g, '');
			const formattedValue = Number(inputValue).toLocaleString();
			setDesiredAmount(formattedValue);
	};

	// 보증금, 월세 스크립트
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

  return (
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
  )
}
