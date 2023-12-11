import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin_list.css';

export default function Admin_list({ propertyType }) {

  return (
    <div className="container2">
      <table className="rwd-table">
        <tbody>
          <tr className='Property_name'>
            <th style={{ width: '105px' }}>상품</th>
            <th style={{ width: '200px' }}>매물번호</th>
            <th style={{ width: '140px' }}>매물종류</th>
            <th style={{ width: '250px' }}>지역명/상세주소</th>
            <th style={{ width: '90px' }}>면적(m2)</th>
            <th style={{ width: '170px' }}>거래종류/매물가</th>
            <th style={{ width: '80px' }}>등록기간</th>
            <th style={{ width: '120px' }}>진행상황</th>
            <th style={{ width: '200px' }}> 관리</th>
          </tr>
          {propertyType.length > 0 ? (
            propertyType.map((elem, index) => (
              <tr key={index}>
                <td data-th="Property_name">
                  {elem.building_name}
                </td>
                <td data-th="Property_number" style={{ textAlign: 'left' }}>
                  {elem.product_id}
                </td>
                <td data-th="Property_type">
                  {elem.product_type}
                </td>
                <td data-th="Property_address" style={{ textAlign: 'left' }}>
                  {elem.location}
                </td>
                <td data-th="Property_area">
                  [계]{elem.extent}
                  [전]{elem.extent}
                </td>
                <td data-th="Transaction_type">
                  {elem.transactionType}/
                  {elem.desiredAmount}
                </td>
                <td data-th="Registration_period">
                  {elem.created ? elem.created.slice(0, 10) : 'N/A'}
                </td>
                <td data-th="Progress">
                  {elem.product_state}
                </td>
                <td data-th="management">
                  {elem.product_state}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
