import React from 'react'
// import './Product.css';
import Header from '../header.js';
import Bottom from '../bottom.js';
import Price_Infomation from './Price_Infomation/Price_Infomation.js';
import Parking_Infomation from './Parking_Infomation/Parking_Infomation.js'
import Move_in_date from './Move_in_date/Move_in_date.js'
import Facility_infomation from './Facility_infomation/Facility_infomation.js'
import Officete from './Product_Type/Officete/Officete.js'
import Apartment from './Product_Type/Apartment/Apartment.js'

export default function Product() {
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
                  <select className='styled-select' id='product_type' style={{ width: "20%" }}>
                    <option value='오피스텔'>오피스텔</option>
                    <option value='아파트'>아파트</option>
                    <option value='상가'>상가</option>
                    <option value='지식산업센터/사무실'>지식산업센터·사무실</option>
                    <option value='토지'>토지</option>
                    <option value='공장/창고'>공장·창고</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>  
        <Officete />
        <Apartment />
        <Price_Infomation />
        <Parking_Infomation />
        <Facility_infomation />
        <Move_in_date />
      </div>
      <Bottom />
    </div>
  )
}