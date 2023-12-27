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
  const [checkedItems, setCheckedItems] = useState({}); // 변경

  const initializePage = (propertyType) => {
    // propertyType 배열이 비어있지 않으면
    if (propertyType.length > 0) {
      // 각 요소의 recommend 값을 확인
      const checkedItemsCopy = {}; // 변경

      propertyType.forEach((elem, index) => {
        const recommendValue = elem.recommend;

        // 값이 '추천매물'인 경우 특정 로직 수행
        if (recommendValue === '추천매물') {
          checkedItemsCopy[elem.product_id] = true; // 변경
        }
      });

      setCheckedItems(checkedItemsCopy); // 변경
      // 여기서 필요한 초기화 로직 수행
    }
  };

  useEffect(() => {
    // 페이지가 로딩될 때 실행될 초기화 함수
    initializePage(propertyType);
  }, [propertyType]); // propertyType이 업데이트될 때마다 실행

  const maxCheckedCount = 3; // 최대 체크 가능한 개수


  const handleCheckboxChange = (product_id) => {
    // 현재 체크된 개수 확인
    const currentCheckedCount = Object.values(checkedItems).filter((isChecked) => isChecked).length;

    // 체크 상태를 업데이트할 때 최대 개수 미만인 경우에만 업데이트
    if (currentCheckedCount < maxCheckedCount || checkedItems[product_id]) {
      setCheckedItems((prevCheckedItems) => {
        const updatedCheckedItems = {
          ...prevCheckedItems,
          [product_id]: !prevCheckedItems[product_id],
        };

        // 추가 기능을 넣을 수 있습니다.
        if (updatedCheckedItems[product_id]) {
          // 체크된 경우에 수행할 로직 추가
          console.log(`상품 ID ${product_id}이(가) 체크되었습니다.`);
          axios
            .post('/api/recommend_update', null, {
              params: {
                product_id: product_id,
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
          // 체크 해제된 경우에 수행할 로직 추가
          console.log(`상품 ID ${product_id}이(가) 체크 해제되었습니다.`);

          axios
            .post('/api/recommend_clear', null, {
              params: {
                product_id: product_id,
              },
            })
            .then((response) => {
              console.log('서버 응답:', response.data);
            })
            .catch((error) => {
              console.error('서버 요청 중 오류:', error);
            });
        }

        return updatedCheckedItems;
      });
    }
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
                  <br />
                  {elem.building_name}
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
                  <input
                    id={elem.product_id}
                    type="checkbox"
                    checked={checkedItems[elem.product_id] || false}
                    onChange={() => handleCheckboxChange(elem.product_id)}
                    disabled={
                      Object.values(checkedItems).filter((isChecked) => isChecked && isChecked !== checkedItems[elem.product_id]).length >= maxCheckedCount
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
