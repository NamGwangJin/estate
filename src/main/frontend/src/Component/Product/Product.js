import React, { useState } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import Price_Infomation from './Price_Infomation/Price_Infomation.js';
import Parking_Infomation from './Parking_Infomation/Parking_Infomation.js';
import Move_in_date from './Move_in_date/Move_in_date.js';
import Facility_infomation from './Facility_infomation/Facility_infomation.js';
import Officete from './Product_Type/Officete/Officete.js';
import Apartment from './Product_Type/Apartment/Apartment.js';
import Knowledge_Industry from './Product_Type/Knowledge_Industry/Knowledge_Industry.js';

export default function Product() {
  const [selectedProductType, setSelectedProductType] = useState('오피스텔');

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
  };

  return (
    <div className='App'>
      <Header /> 
      <div className='mainSection'>
        <div className='매물타입'>
          <table className='styled-table leftA' >
            <tbody>
              <tr>
                <td>매물등록</td>
                <td colSpan={3}>
                  <select
                    className='styled-select'
                    id='product_type'
                    style={{ width: "20%" }}
                    value={selectedProductType}
                    onChange={handleProductTypeChange}
                  >
                    <option value='오피스텔'>오피스텔</option>
                    <option value='아파트'>아파트</option>
                    <option value='상가'>상가</option>
                    <option value='지식산업센터·사무실'>지식산업센터·사무실</option>
                    <option value='토지'>토지</option>
                    <option value='공장·창고'>공장·창고</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {selectedProductType === '오피스텔' && <Officete />}
        {selectedProductType === '아파트' && <Apartment />}
        {selectedProductType === '공장·창고' && <Knowledge_Industry />}
        {/* {selectedProductType === '상가' && <상가에대한컴포넌트 />}
        {selectedProductType === '지식산업센터·사무실' && <지식산업센터사무실에대한컴포넌트 />}
        {selectedProductType === '토지' && <토지에대한컴포넌트 />} */}
        <Parking_Infomation />
        <Facility_infomation />
        <Move_in_date />
        <Price_Infomation />
      </div>
      <Bottom />
    </div>
  );
}
