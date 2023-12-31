import './Admin_header.css';
import SignIn from '../../SignIn/SignIn.js';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SignUp from '../../SingUp/SignUp.js'
import axios from 'axios';

export default function Admin_header() {

  const [signIn, signInModalOpen] = useState(false);
  const [signUp, signUpModalOpen] = useState(false);
  const [admin, setAdmin] = useState(0);

  const navigate = useNavigate();

  const id = sessionStorage.getItem("id");

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    try {
      if (userString !== null) {
        const user = JSON.parse(userString);
        setAdmin(user.admin);
      }
    } catch (error) {
      console.error("사용자 데이터를 파싱하는 중 오류 발생:", error);
    }
  }, []);

  const signInOpen = () => {
    signInModalOpen(true);
  };

  const signInClose = () => {
    signInModalOpen(false);
  };

  const signUpOpen = () => {
    signUpModalOpen(true);
  }

  const signUpClose = () => {
    signUpModalOpen(false);
  }

  function logout() {
    axios({
      method: 'post',
      url: '/api/logout',
    })
      .then((res) => {
        alert(res.data);
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("user");
        setAdmin(0);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        alert('error!');
      })
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className='header_wrap' style={{ opacity: 1 }}>
      {/* <div className='header_category_wrap'>
        <div className='header_top_wrap'>
          <div className='header_1140'>
            <div className='header_top_left'>
              <div className='header_btn header_btn_call'>
                <span className='title'>
                  <i className='fas fa-phone-rotary'></i>
                  문의전화
                </span>
                <span className='content'>031-982-3535</span>
              </div>
            </div>
            <div className='header_top_right'>
              {admin === 1
                ? <>
                  <button className='sign_btn box' onClick={() => handleNavigate('/admin')}>관리자 페이지</button>
                </>
                : <></>
              }
              {id === null
                ? <>
                  <button className='sign_btn box' onClick={signInOpen}>로그인</button>
                  <SignIn isOpen={signIn} onClose={signInClose} />
                  <button className='sign_btn box' onClick={signUpOpen}>회원가입</button>
                  <SignUp isOpen={signUp} onClose={signUpClose} />
                </>
                : <button className='sign_btn box' onClick={logout}>로그아웃</button>
              }
            </div>
          </div>
        </div>
      </div> */}
      <div className='header_bottom'>
        <div className='header-left'>
          {/* <span className='navbar_logo' style={{ cursor: 'pointer' }} onClick={() => handleNavigate('/')}>
            <img className='logo_header logo' src="/img/bottomLogo.png" alt='푸터 로고' />
          </span> */}
        </div>
        <div className='header_center'>
          <ul className='header_menu_etc_box'>
            <li className='header_list'>
              <a onClick={() => handleNavigate('/admin')}>매물리스트</a>
            </li>
            <li className='header_list'>
              <a onClick={() => handleNavigate('/product/officetelinsert')}>매물 등록하기</a>
            </li>
            <li className='header_list'>
              <a onClick={() => handleNavigate('/newsinsert')}>뉴스 등록하기</a>
            </li>
            <li className='header_list'>
              <a onClick={() => handleNavigate('/tour')}>투어 리스트</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

