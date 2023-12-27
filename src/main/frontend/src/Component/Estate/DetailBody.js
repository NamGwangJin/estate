import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DetailBody({ product_id }) {
    const [detail, setDetail] = useState([]);
    const [IMG, setIMG] = useState([]);

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
        axios.get(`/api/estate/detail/img?product_id=${product_id}`)
            .then((res) => {
                setIMG(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
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
        geocoder.addressSearch(detail.location, (result, status) => {   // (detail.locaiton + detail.building_name) 으로 바꾸기
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

    function handleNextButtonClick() {

        // 첫 번째 상황: img_type_text_0인 id의 클래스에 on이 있을 때
        const imgTypeText0 = document.getElementById('img_type_text_0');
        const imgTypeText3 = document.getElementById('img_type_text_3');
        const galleryWrap = document.getElementById('galleryWrap');
        
        if (imgTypeText0.classList.contains('on')) {
          imgTypeText0.classList.remove('on');
          imgTypeText3.classList.add('on');
          
          // id="detail_map_wrap"인 요소를 display none으로 변경
          document.getElementById('detail_map_wrap').style.display = 'none';
          // id="gallery"인 요소의 display none을 제거
          document.getElementById('gallery').style.display = '';
      
          // <div id='galleryWrap'>인 요소에서 img_type이 0인 요소의 class에서 on을 제거하고 img_type이 3인 요소의 class에 on을 추가
          const onElement = galleryWrap.querySelector('.on');
          if (onElement) {
            onElement.classList.remove('on');
            const imgType3Element = galleryWrap.querySelector('[img_type="3"]');
            if (imgType3Element) {
              imgType3Element.classList.add('on');
            }
          }

            // div id="gallery_img"인 요소의 img 태그들 중 첫 번째만 block으로 처리하고 나머지는 display none으로 처리
            const galleryImg = document.getElementById('gallery_img');
            const imgElements = galleryImg.querySelectorAll('img');
            imgElements.forEach((img, index) => {
                img.style.display = index === 0 ? 'block' : 'none';
            });

        } else {
            const imgType3Element = galleryWrap.querySelector('.on');
            if (imgType3Element) {
              // <div id='galleryWrap'>인 요소에서 img_type=3인 요소들 중 on class가 적용되어있는 요소를 찾아서 on class를 제거하고 다음 img_type=3인 요소에 on class를 적용
              imgType3Element.classList.remove('on');
            
              // 모든 img_type=3인 요소들을 가져옴
              const imgType3Elements = galleryWrap.querySelectorAll('[img_type="3"]');
              
              // 현재 요소의 인덱스를 찾음
              const currentIndex = Array.from(imgType3Elements).findIndex(el => el === imgType3Element);
            
              // 다음 img_type=3인 요소에 on class를 적용
              const nextElement = imgType3Elements[(currentIndex + 1) % imgType3Elements.length];
              if (nextElement) {
                nextElement.classList.add('on');
              }
            
              // 나머지 img_type=3인 요소들은 on class를 제거
              imgType3Elements.forEach(el => {
                if (el !== nextElement) {
                  el.classList.remove('on');
                }
              });
      
            // div id="gallery_img"인 요소의 img 태그들 중 display되고 있는 요소를 찾아서 display none을 적용시키고 다음 이미지의 display none을 제거
            const displayedImg = document.getElementById('gallery_img').querySelector('[style*="display: block"]');
            if (displayedImg) {
              displayedImg.style.display = 'none';
              const nextImg = displayedImg.nextElementSibling;
              if (nextImg) {
                nextImg.style.display = '';
              }
            }
          }
        }
      }

      function handlePrevButtonClick() {
        const imgTypeText0 = document.getElementById('img_type_text_0');
        const imgTypeText3 = document.getElementById('img_type_text_3');
        const galleryWrap = document.getElementById('galleryWrap');
        const detailMapWrap = document.getElementById('detail_map_wrap');
        const gallery = document.getElementById('gallery');
        const galleryImg = document.getElementById('gallery_img');
      
        if (imgTypeText3.classList.contains('on')) {
          // img_type_text_3인 id의 클래스에 on이 있을 때
          imgTypeText3.classList.remove('on');
          imgTypeText0.classList.add('on');
      
          // div id='galleryWrap'의 자식 중 img_type이 3인 요소의 class에서 on을 제거하고 img_type이 0인 요소에 on을 추가
          const imgType3Element = galleryWrap.querySelector('.img_type_text.on[data-img-type="3"]');
          if (imgType3Element) {
            imgType3Element.classList.remove('on');
            const imgType0Element = galleryWrap.querySelector('.img_type_text[data-img-type="0"]');
            if (imgType0Element) {
              imgType0Element.classList.add('on');
            }
          }
      
          // div id="detail_map_wrap"의 style을 display: none으로 변경하고 div id="gallery"의 style을 display: block으로 변경
          if (detailMapWrap && gallery) {
            detailMapWrap.style.display = 'none';
            gallery.style.display = 'block';
          }
      
          // div id="gallery_img"의 img 태그들 중 첫 번째를 block으로 처리하고 나머지는 display none으로 처리
          if (galleryImg) {
            const imgElements = galleryImg.querySelectorAll('img');
            imgElements.forEach((img, index) => {
              img.style.display = index === 0 ? 'block' : 'none';
            });
          }
        } else {
          // img_type_text_0인 id의 클래스에 on이 없을 때
          const imgType0Element = galleryWrap.querySelector('.on[data-img-type="0"]');
          if (imgType0Element) {
            // div id='galleryWrap'의 자식 중 img_type이 0인 요소의 class에서 on을 제거하고 img_type이 3인 요소에 on을 추가
            imgType0Element.classList.remove('on');
            const imgType3Element = galleryWrap.querySelector('.img_type_text[data-img-type="3"]');
            if (imgType3Element) {
              imgType3Element.classList.add('on');
            }
      
            // div id="gallery_img"의 img 태그들 중 display되고 있는 요소를 찾아서 display none을 적용시키고 이전 이미지의 display block을 제거
            const displayedImg = galleryImg.querySelector('[style*="display: block"]');
            if (displayedImg) {
              displayedImg.style.display = 'none';
              const prevImg = displayedImg.previousElementSibling;
              if (prevImg) {
                prevImg.style.display = '';
              }
            }
          }
        }
      }
      

    return (
        <div>
            <div className='detail_body'>
                <div id='detail_gallery' className='detail_gallery'>
                    <div id="img_type_id">
                        <div className="img_type_text on" id="img_type_text_0">위치</div>
                        {IMG.length > 0 ?
                        <div className="img_type_text" id="img_type_text_3">매물 사진</div>
                        :
                        <></>
                        }
                    </div>
                    <div className='gallery_wrap'>
                        <div id='galleryWrap'>
                            <div aria-live='polite' style={{ width: '100%', overflow: 'hidden', position: 'relative', height: '70px' }}>
                                <ul id="mm_img_list_id" className="gallery" style={{ width: '1215%', position: 'relative', transitionDuration: '0s', transform: 'translate3d(0px, 0px, 0px)' }}>
                                    <li aria-hidden='false' style={{ float: 'left', listStyle: 'none', position: 'relative', width: '50px', marginRight: '10px' }}>
                                        <img src='/img/detail/prev.png' style={{ width: '50px', height: '50px' ,cursor: 'pointer'}} id='prev' onClick={handlePrevButtonClick} />
                                    </li>
                                    <li aria-hidden='false' style={{ float: 'left', listStyle: 'none', position: 'relative', width: '72px', marginRight: '10px' }}>
                                        <img style={{ width: '70px', height: '70px' }} className='on' img_type="0" src='/img/gallery_pic1.jpg' />
                                    </li>
                                    {IMG.map((list, index) => (
                                        <li aria-hidden='false' style={{ float: 'left', listStyle: 'none', position: 'relative', width: '72px', marginRight: '10px' }}>
                                            <img key={index} src={`/img/${list.img_title}`} style={{ width: '70px', height: '70px' }} name={`mm_img_id_${index}`} title="" img_type="3" />
                                        </li>
                                    ))}
                                    <li aria-hidden='false' style={{ float: 'left', listStyle: 'none', position: 'relative', width: '50px', marginRight: '10px' }}>
                                        <img src='/img/detail/next.png' style={{ width: '50px', height: '50px', cursor: 'pointer'}} id='next' onClick={handleNextButtonClick} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="detail_map_wrap" className="detail_map_wrap">
                    <div id="mm_map_id" className='detail_map'>

                    </div>
                </div>

                <div id="gallery" className="detail_map_wrap" style={{display: 'none'}}>
                    <div id="gallery_img" className='detail_map'>
                        {IMG.map((list, index) => (
                            <img key={index} src={`/img/${list.img_title}`} name={`mm_img_id_${index}`} style={{width: '100%', height: '100%'}}/>
                        ))}
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
                                    <div style={{ display: 'table-cell', width: '200px' }}>{detail.balcony}</div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span style={{ display: 'table-cell', float: 'left' }}>냉방시설</span>
                                    <div style={{ display: 'table-cell', width: '200px' }}>{detail.airCondition} -</div>
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
