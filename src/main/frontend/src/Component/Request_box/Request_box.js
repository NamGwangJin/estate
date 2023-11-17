import React, { useState } from 'react';
import './Request_box.css';

export default function Request_box() {
      
  return (
    <div className="container" style={{ display: 'block' }}>
      <div className="row main_realtime_zone" style={{ position: 'relative' }}>
        <div className="request_box" style={{ display: 'inline-block', width: '100%', margin: '20px 0', position: 'relative', zIndex: 1 }}>
          <div className="leftBox">
            <form id="quickCallForm" method="post" onSubmit={() => false}>
              <h2>간편 상담 문의</h2>
              <p>보다 쉽고 빠르게 문의를 남겨보세요!</p>
              <div className="table">
                <div className="tr">
                  <div className="td">
                    <div>이름</div>
                    <div className="inputBox">
                      <input type="text" name="name" placeholder="이름" />
                    </div>
                  </div>
                  <div className="td">
                    <div>연락처</div>
                    <div className="inputBox">
                      <input type="text" name="contact" placeholder="연락처" />
                    </div>
                  </div>
                </div>
                <div className="tr">
                  <div className="td" style={{ width: '100%' }}>
                    <div>내용</div>
                    <div className="inputBox">
                      <textarea className='content_area' name="content" rows="3" placeholder="내용을 입력해주세요." style={{ display: 'inline-block', width: '96%', marginTop: '2px', padding: '10px', border: 'none', background: 'transparent', resize: 'none' }}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="terms_agree" style={{ display: 'inline-block', marginBottom: '-3px' }}>
                <div className="check" style={{ display: 'inline-block', float: 'left' }}>
                  <input type="checkbox" id="item_tosAgree_quickCallForm" className="item_tosAgree chk" value="1" style={{ width: '20px', height: '20px', margin: '0', marginRight: '5px', float: 'left' }} />
                  <label htmlFor="item_tosAgree_quickCallForm" className="pointer" style={{ margin: '0', float: 'left' }}>개인정보 수집·이용 동의</label>
                </div>
                {/* <span className="terms_btn btn btn-xs btn-default" data-toggle="modal" href="#modal-privacy_terms" style={{ float: 'left' }}>내용 보기</span> */}
              </div>
            </form>
            <div className="btn" id="requestSubmit">상담문의 남기기</div>
          </div>
          <div id="layout3_vticker" className="rightBox main_rightBox">
            <ul className="slick-initialized slick-slider slick-vertical">
              {/* Your list items go here */}
            </ul>
          </div>
          <script type="text/javascript">
            {/* Your script goes here */}
          </script>
        </div>
      </div>
    </div>
  );
}