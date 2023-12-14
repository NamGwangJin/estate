import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DetailBody({ product_id }) {
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        // product_id로 서버에 요청을 보내 상세 정보를 가져옴
        axios.get(`/api/estate/detail?product_id=${product_id}`)
            .then((res) => {
                setDetail(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [product_id]);

    useEffect(() => {
        // 지도를 표시할 div
        const mapContainer = document.getElementById('mm_map_id');

        // 지도의 중심좌표
        const center = new window.kakao.maps.LatLng(33.450701, 126.570667);

        // 지도 옵션 설정
        const mapOption = {
            center,
            level: 3,
        };

        // 지도를 생성합니다
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(detail.location, (result, status) => {   // locaiton + building_name 으로 바꾸기
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new window.kakao.maps.Marker({
                    map,
                    position: coords,
                });


                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    }, [detail.location]); // useEffect를 빈 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    return (
        <div>
            <div className='detail_body'>
                <div id='detail_gallery' className='detail_gallery'>
                    <div id="img_type_id">
                        <div className="img_type_text on" id="img_type_text_0">위치</div>
                        <div className="img_type_text" id="img_type_text_3">매물 사진</div> { /* 3항 연산자로 매물이 있을때만 보여줄것 */}
                    </div>
                    <div className='gallery_wrap'>
                        <div className='bx-wrapper'>

                            <div className='bx-viewport' aria-live='polite' style={{ width: '100%', overflow: 'hidden', position: 'relative', height: '70px' }}>
                                <ul id="mm_img_list_id" className="gallery" style={{ width: '1215%', position: 'relative', transitionDuration: '0s', transform: 'translate3d(0px, 0px, 0px)' }}>

                                    <li aria-hidden='false' style={{ float: 'left', listStyle: 'none', position: 'relative', width: '72px', marginRight: '10px' }}>
                                        <img src='/img/gallery_pic1.jpg' style={{ width: '70px', height: '70px' }} className='on' id="mm_img_id_0" img_type="0" />
                                    </li>

                                    <li aria-hidden='false' style={{ float: 'left', listStyle: 'none', position: 'relative', width: '72px', marginRight: '10px' }}>
                                        <img src="/img/factory4.png" style={{ width: '70px', height: '70px' }} id="mm_img_id_1" title="" img_type="3" />
                                    </li>

                                </ul>
                            </div>

                            <div className='bx-controls bx-has-controls-direction'>
                                <a className='bx-prev disabled'>이전</a>
                                <a className='bx-next disabled'>다음</a>
                            </div>

                        </div>
                    </div>
                </div>

                <div id="detail_map_wrap" className="detail_map_wrap">
                    <div id="mm_map_id" className='detail_map'>
                    </div>
                </div>

                <div className='info03'>
                    <div className='info03_inr'>
                        <h4 id="title_sub_title_1">매물세부정보</h4>
                        {/* 에어컨, 침대 옷장 그런 체크박스 많던것들 나오게해야함. 이미지(아이콘)로???*/}
                        <ul id="mm_detail_info_id">
                            <li>
                                <span>건축물용도</span>
                                {detail.product_type}
                            </li>
                            <li>
                                <span>해당동</span>
                                {detail.address}
                                {/* 여기부분 동은 떠도 되지만 호수가 뜨면 절대안됨 */}
                            </li>
                            <li>
                                <span>용도</span>
                                {detail.building_use}
                            </li>
                            <li>
                                <span>방향기준</span>
                                {detail.direction_criteria}
                            </li>
                            <li>
                                <span>방향</span>
                                {detail.direction}
                            </li>
                            <li>
                                <span>현관구조</span>
                                {detail.entrance}
                            </li>
                            <li>
                                <span>내부구조</span>
                                {detail.inner_structure}
                            </li>
                            <li>
                                <div>
                                    <span style={{ display: 'table-cell', float: 'left' }}>방범창 / 베란다</span>
                                    <div style={{ display: 'table-cell', width: '200px' }}><span>{detail.balcony}</span></div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span style={{ display: 'table-cell', float: 'left' }}>냉방시설</span>
                                    <div style={{ display: 'table-cell', width: '200px' }}>{detail.airCondition}</div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span style={{ display: 'table-cell', float: 'left' }}>생활시설</span>
                                    <div style={{ display: 'table-cell', width: '200px' }}>{detail.living_facilities}</div>
                                </div>
                            </li>
                            <li>
                                <span>매물번호</span>
                                {detail.product_id}
                            </li>
                            <li>
                                <span>관리비포함내역</span>
                                {detail.managementCost_include}
                            </li>
                        </ul>
                    </div>
                    <div className='info03_inr'>
                        <h4 id='title_sub_title_2'>단지정보</h4>
                        <ul id='bld_detail_info_id'>
                            <li>
                                <span>건물명</span>
                                건물이름 (DB) or API
                            </li>
                            <li>
                                <span>매물 소재지</span>
                                서울특별시 강남구 청담동 130-8 (DB) or API
                            </li>
                            <li>
                                <span>총동수</span>
                                1 (DB) or API
                            </li>
                            <li>
                                <span>총세대수</span>
                                36 세대 (DB) or API
                            </li>
                            <li>
                                <span>총주차대수</span>
                                46 대 (세대당 1.3) (DB) or API
                            </li>
                            <li>
                                <span>난방방식</span>
                                개별난방 (DB) or API
                            </li>
                            <li>
                                <span>난방연료</span>
                                도시가스 (DB) or API
                            </li>
                            <li>
                                <div>
                                    <span style={{ display: 'table-cell', float: 'left' }}>보안시설</span>
                                    <div style={{ display: 'table-cell', width: '200px' }}> - (DB) or API</div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span style={{ display: 'table-cell', float: 'left' }}>기타시설</span>
                                    <div style={{ display: 'table-cell', width: '200px' }}> - (DB) or API</div>
                                </div>
                            </li>
                            <li>
                                <dt style={{ float: 'left' }}>건설사명</dt>
                                <dd style={{ paddingLeft: '120px' }}>- (DB) or API</dd>
                            </li>
                            <li>
                                <span>세부 종류</span>
                                오피스텔 (DB) or API
                            </li>
                            <li>
                                <span>사용 승인</span>
                                2019.01.18 (DB) or API
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='info04'>
                    <h4>매물설명</h4>
                    <p id="DTL_DESC_id" style={{ minHeight: '150px', lineHeight: '19px' }}>
                        {detail.product_content}
                    </p>
                </div>
            </div>
        </div>
    )
}
