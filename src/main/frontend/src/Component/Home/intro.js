import React, { useEffect } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import './intro.css';

export default function Intro() {
    useEffect(() => {
        // JavaScript 코드를 이곳에 삽입합니다.

        // 지도를 표시할 div 엘리먼트를 찾습니다.
        var mapContainer = document.getElementById('introMap');

        // 지도 옵션 설정
        var mapOption = {
            center: new window.kakao.maps.LatLng(37.6438713, 126.624015), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
        };

        // 지도를 생성합니다
        var map = new window.kakao.maps.Map(mapContainer, mapOption);

        var imageSrc =
            '/img/marker1.png'; // 마커이미지의 주소입니다
        var imageSize = new window.kakao.maps.Size(24, 42); // 마커이미지의 크기입니다
        var imageOption = { offset: new window.kakao.maps.Point(24, 60) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
        );
        var markerPosition = new window.kakao.maps.LatLng(37.6419582, 126.620275); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, []); // useEffect를 빈 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    
    return (
        <div className='intro'>
            <Header />
            <div className='introMain'>
                <h3>오시는길</h3>
                <div className='introMap' id="introMap">
                    {/* 여기에 맵이 표시될 것입니다. */}
                </div>
                <img src='/img/marker1.png'/>
            </div>
            <Bottom />
        </div>
    );
}
