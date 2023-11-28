import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { hangjungdong } from '../Home/hangjungdong.js';
import { v4 as uuidv4 } from 'uuid';

export default function Price_Infomation() {

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
    return (
        <div className='가격'>
            <h4>가격</h4>
            <table className='styled-table leftA'>
                <tbody>
                    <tr>
                        <td>거래종류</td>
                        <td>
                            <input type='radio' value={'매매'} checked={transactionType == 'ㄹㄹ매매'} onChange={() => setTransactionType('매매')} />매매
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
    )
}
