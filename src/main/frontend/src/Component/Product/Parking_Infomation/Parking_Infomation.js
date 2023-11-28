import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { hangjungdong } from '../Home/hangjungdong.js';
import { v4 as uuidv4 } from 'uuid';

export default function Parking_Infomation() {

  return (
    <div className='주차정보'>
    <table className='styled-table leftA'>
      <tbody>
        <tr>
          <td>총 주차대수</td>
          <td>
            <input id='total_parking' type='text' />대 총 세대수: (DB)대
          </td>
          <td>
            세대당 주차대수
          </td>
          <td>
            <input id='parking_per_room' type='text' />대 (총 주차대수 입력하면 자동계산되도록)
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
