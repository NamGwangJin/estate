import React, { useState, useEffect } from 'react'
import Header from '../header'
import Bottom from '../bottom'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Admin_header from '../Admin/Admin_header/Admin_header';

export default function Tour() {
  
  const [tourList, setTourList] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => { // 투어 신청 리스트 불러오는 함수
    axios({
        method: "get",
        url: '/api/tour/list',
    })
    .then((res) => {
        setTourList(res.data);
    })
    .catch(error => {
        console.log(error);
    })
  }, [])

  function detail(tour_no) {
    navigate('/tour/detail?no=' + tour_no);
  }

  return (
    <div className='App'>
        <Header />
        <Admin_header/>
        <div className='body'>
            <div className='title'>
                매물 투어 신청
            </div>
            <table className="tblBoard">
                <thead>
                    <tr>
                    <th>번호</th>
                    <th>투어일자</th>
                    <th>투어시간</th>
                    <th>내용</th>
                    <th>작성자</th>
                    <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {tourList.map((elem, index) => (
                    <tr key={index} onClick={() => detail(elem.tour_no)}>
                        <td>{elem.tour_no}</td>
                        <td>{elem.tour_date}</td>
                        <td>{elem.tour_time}</td>
                        { elem.tour_content === null
                          ? <td>-</td>
                          : <td>{elem.tour_content}</td>
                        }
                        { elem.tour_writer === null
                          ? <td>{elem.tour_name}</td>
                          : <td>{elem.tour_writer}</td>
                        }
                        <td>{elem.tour_created}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Link to='/tour/apliy'>
          <button className="btn btn-ruru">투어 신청하기</button>
        </Link>
    <Bottom />
    </div>
  )
}
