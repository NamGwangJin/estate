import React, { useState } from 'react';
import './bottom.css';
import TermsConditions from './TermsConditions';
import PrivacyPolicy from './PrivacyPolicy';

export default function Bottom() {

  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);

  const openTermsModal = () => {
    setTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setTermsModalOpen(false);
  };

  const openPrivacyModal = () => {
    setPrivacyModalOpen(true);
  };
  
  const closePrivacyModal = () => {
    setPrivacyModalOpen(false);
  };

  return (
    <div className='footer'>
      <div className='footer_top'>
        <div className='wrap_1140'>
          <ul className='footer_ul'>
            <li><a href='/intro'>회사소개</a></li>
            <li><a href='/requestWrite'>의뢰하기</a></li>
            <li><a href='#' onClick={openTermsModal}>이용약관</a></li>
            {/* 이용약관 모달 */}
            {isTermsModalOpen && <TermsConditions onClose={closeTermsModal} />}
            <li><a href='#' onClick={openPrivacyModal}>개인정보처리방침</a></li>
            {/* 개인정보처리방침 모달 */}
            {isPrivacyModalOpen && <PrivacyPolicy onClose={closePrivacyModal} />}
          </ul>
        </div>
      </div>
      <div className='footer_bottom'>
        <div className='wrap_1140'>
          <table className='table_style'>
            <tbody>
              <tr>
                <th className='th_style'>
                  <div className='footer_left'>
                    <div className='footer_logo' onClick={() => { window.location.reload(); }}>
                      <img className='logo_footer' src="/img/bottomLogo.png" alt='푸터 로고' />
                    </div>
                    <div className='company_wrap'>
                      <span className='company_box company_box_name'>
                        <span className='footer_company_name'>
                          <span>상호</span>
                          <span>루루공인중개사사무소</span>
                        </span>
                        <span className='footer_ceo'>
                          <span>대표자</span>
                          <span>이민영</span>
                        </span>
                        <span className='footer_address'>
                          <span>주소</span>
                          <span>경기도 김포시 김포한강10로133번길 82 B동 1층 104호</span>
                        </span>
                      </span>

                      <span className='company_box company_biz_ceo'>
                        <span className='footer_biz_num'>
                          <span>사업자등록번호</span>
                          <span>1234-1231-123</span>
                        </span>
                        <span className='real_estate_num'>
                          <span>부동산등록번호</span>
                          <span>12345-1234-12345</span>
                        </span>
                      </span>

                      <span className='company_box company_box_tel'>
                        <span className='footer_tel'>
                          <span>전화</span>
                          <span>010-1234-5678</span>
                        </span>
                        <span className='footer_fax'>
                          <span>팩스</span>
                          <span>123-123-1234</span>
                        </span>
                        <span className='footer_email'>
                          <span>이메일</span>
                          <span>email@naver.com</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </th>
                <th className='th_style'>
                  <div className='footer_right'>
                    <div className='footer_title'>
                      대표전화
                      <span className='footer_title_span'>CALL CENTER</span>
                    </div>
                    <div className='call_number'>
                      123-1234-5678
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}