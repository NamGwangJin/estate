import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin_list.css';

export default function Admin_list() {
  
      const [propertyList, setPropertyList] = useState([]);

    useEffect(() => { // 매물 리스트 불러오는 함수
      axios({
        method: "get",
        url: '/api/propertyList',
      })
        .then((res) => {
          setPropertyList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
      
  return (    
    <div className="container2">
      <table className="rwd-table">
        <tbody>
          <tr className='Property_name'>
            <th style={{width: '105px'}}>상품</th>
            <th style={{width: '200px'}}>매물번호</th>
            <th style={{width: '140px'}}>매물종류</th>
            <th style={{width: '250px'}}>지역명/상세주소</th>
            <th style={{width: '90px'}}>면적(m2)</th>
            <th style={{width: '170px'}}>거래종류/매물가</th>
            <th style={{width: '80px'}}>등록기간</th>
            <th style={{width: '120px'}}>진행상황</th>
            <th style={{width: '200px'}}> 관리</th>
          </tr>
          {propertyList.map((elem, index) => (
            <tr>
            <td data-th="Property_name"> 
              {elem.building_name}
            </td>
            <td data-th="Property_number" style={{textAlign:'left'}}>
              {elem.product_id}
              {elem.product_id}
              {/* <button class="copy">복사</button>
              <button class="edit">수정</button>
              <button class="print">인쇄</button> */}
            </td>
            <td data-th="Property_type">
              {elem.product_type}
            </td>
            <td data-th="Property_address" style={{textAlign:'left'}}>
              {elem.location}
            </td>
            <td data-th="Property_area">
              [계]{elem.extent}
              [전]{elem.extent}
            </td>
            <td data-th="Transaction_type">
              전세
              {elem.desiredAmount}
            </td>
            <td data-th="Registration_period">
              {elem.moveable_date}
            </td>
            <td data-th="Progress">
              {elem.product_state}
            </td>
            <td data-th="management">
              {elem.product_state}
            </td>
          </tr>
          ))}
        </tbody>
      </table>
  </div>
  );
}