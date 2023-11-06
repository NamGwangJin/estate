import React from 'react'
import './bottom.css';

export default function bottom() {
  return (
    <div className='footer'>
      <div className='footer_top'>
        <ul className='footer_ul'>
          <li><a href='#'>회사소개</a></li>
          <li><a href='#'>의뢰하기</a></li>
          <li><a href='#'>이용약관</a></li>
          <li><a href='#'>개인정보처리방침</a></li>
        </ul>
      </div>
      <div className='footer_bottom'>
        <div className='wrap_1140'>
          <table>
            <tbody>
              <tr>
                <th>
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
                          <span>경기도 김포시</span>
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
                  {/*  추가해도되고 안해도됨
                    <div className='copyright'>
                      <a href='#' ></a>
                    </div> */}
                  </div>
                </th>
                <th>
                  <div className='footer_right'>
                    <div className='footer_title'>
                      대표전화
                      <span>CALL CENTER</span>
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




    // <div className='bottom_top'>
    //   <div className='bottomHeader'>
    //     <img src="/img/bottomLogo.png" />
    //     <div className='bottomMenu'>
    //       <a href='#'>회사소개</a>
    //       <a href='#'>의뢰하기</a>
    //       <a href='#'>이용약관</a>
    //       <a href='#'>개인정보처리방침</a>
    //     </div>
    //   </div>
    //   <div className="bottom_area">
    //     <ul className="bar_list company_info">
    //       <li>상호명: 루루공인중개사사무소</li>
    //       <li>대표: 이민영</li>
    //       <li>사업자등록번호: 입력</li>
    //       <li>중개등록번호: 입력하세용</li>
    //       <li>주소: 경기도 김포시</li>
    //       <li>이메일:<a href="이메일입력">이메일입력</a></li>
    //       <li>대표전화: 031.982.3535(월~토 10시 ~ 19시)</li>
    //       <li>휴대폰: 010.9918.5729</li>
    //     </ul>
    //   </div>
    // </div>
  )
}