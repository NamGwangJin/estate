import React, { Component } from 'react'
import '../TermsConditions.css'

export default function PrivacyModal({onClose}) {
  return (
    <div>
        <div className="modal-overlay">
            <div className="modal-content">
                    <div className="scrollable-content">
                        <div className='modal-header'>
                            <h2>개인정보 수집 안내</h2>
                            <button className="modal-close" onClick={onClose}>X</button>
                            <hr />
                        </div>
                        <br/>
                        개인정보의 수집 및 이용 동의<br/>
                        본사는 서비스 제공을 위해서 아래와 같이 개인정보를 수집합니다.<br/>
                        정보주체는 본 개인정보의 수집 및 이용에 관한 동의를 거부하실 권리가 있으나,
                        <br/>서비스 제공에 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실 수 있습니다.<br/>
                        <br/>
                        • 수집하려는 개인 정보 항목: 휴대폰 번호<br/>
                        • 개인정보의 수집 목적: 문의신청<br/>
                        • 개인정보의 보유기간: 사용 후 바로 삭제<br/>
                        <br/>
                        개인정보 제3자 제공 동의<br/>
                        <br/>
                        본사는 서비스 제공을 위해서 아래와 같이 개인정보를 수집합니다.
                        <br/>정보주체는 본 개인 정보의 수집 및 이용에 관한 동의를 거부하실 권리가 있으나,
                        <br/>서비스 제공에 필요한 최소한의 개인정보이므로 동의를 해 주셔야 서비스를 이용하실 수 있습니다.<br/>
                        <br/>
                        • 개인정보를 제공받는 자 : 본사 중개사무소<br/>
                        • 개인정보를 제공받는 자의 개인정보 이용 목적 : 매물중개목적<br/>
                        • 제공하는 개인정보의 항목 : 휴대폰 번호<br/>
                        • 개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 5년<br/>
                        • 동의 거부권 및 불이익 : 해당 내용에 동의하지 않을 시, 매물 중개 의뢰가 불가능합니다.<br/>
                </div>
            </div>
        </div>
    </div>    
  )
}
