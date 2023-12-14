import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin_list.css';

export default function Admin_list({ propertyType }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 10; // 페이지당 아이템 개수
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(propertyType.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedItems = propertyType.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const [checkboxStates, setCheckboxStates] = useState({});

  const handleCheckboxChange = (productId) => {
    setCheckboxStates((prevState) => {
      const newState = { ...prevState };
      newState[productId] = !prevState[productId];
  
      if (newState[productId]) {
        console.log(`상품 ID ${productId}의 체크박스가 체크되었습니다. true에 대한 로직을 실행합니다.`);

        axios
        .post('/api/recommend_update', null, {
          params: {
            product_id: productId,
          },
        })
        .then((response) => {
          console.log('서버 응답:', response.data);
          // 서버 응답에 따른 추가 로직을 여기에 추가
        })
        .catch((error) => {
          console.error('서버 요청 중 오류:', error);
        });      
      } else {
        console.log(`상품 ID ${productId}의 체크박스가 체크 해제되었습니다. false에 대한 로직을 실행합니다.`);

        axios
        .post('/api/recommend_clear', null, {
          params: {
            product_id: productId,
          },
        })
        .then((response) => {
          console.log('서버 응답:', response.data);
        })
        .catch((error) => {
          console.error('서버 요청 중 오류:', error);
        });     
      }
      
  
      return newState;
    });
  };
  
  
  return (
    <div className="container2">
      <table className="rwd-table">
        <tbody>
          <tr className='Property_name'>
            <th style={{ width: '105px' }}>상품</th>
            <th style={{ width: '120px' }}>매물번호</th>
            <th style={{ width: '140px' }}>매물종류</th>
            <th style={{ width: '300px' }}>지역명/상세주소</th>
            <th style={{ width: '90px' }}>면적(m2)</th>
            <th style={{ width: '140px' }}>거래종류</th>
            <th style={{ width: '110px' }}>매물가</th>
            <th style={{ width: '110px' }}>등록기간</th>
            <th style={{ width: '120px' }}>진행상황</th>
            <th style={{ width: '200px' }}>관리</th>
            <th style={{ width: '70px' }}>추천매물</th>
          </tr>

          {propertyType.length > 0 ? (
            displayedItems.map((elem, index) => (
              <tr key={index} className="visible"> {/* visible 클래스 추가 */}
                <td data-th="Property_name">
                  {elem.building_name}
                </td>
                <td data-th="Property_number">
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
                  {elem.transactionType}
                </td>
                <td data-th="Desired_amount">
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
                <td data-th="Recommendation">
                {/* <input
                  type="checkbox"
                  checked={checkboxStates[elem.product_id] || (elem.recommend === '추천매물')}
                  onChange={() => handleCheckboxChange(elem.product_id)}
                  disabled={
                    Object.values(checkboxStates).filter((isChecked) => isChecked).length >= 3 &&
                    !checkboxStates[elem.product_id]
                  }
                /> */}
<input
  type="checkbox"
  checked={checkboxStates[elem.product_id] || (elem.recommend === '추천매물')}
  onChange={() => handleCheckboxChange(elem.product_id)}
  disabled={
    Object.values(checkboxStates).filter((isChecked) => isChecked || (isChecked && elem.recommend === '추천매물')).length >= 3 &&
    !checkboxStates[elem.product_id]
  }
/>


                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-button ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
