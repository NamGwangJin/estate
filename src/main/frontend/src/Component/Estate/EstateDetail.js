import React, { useState, useEffect } from 'react';
import DetailHead from './DetailHead.js';
import DetailBody from './DetailBody.js';
import '../../App.css';
import axios from 'axios';

export default function EstateDetail({ product_id, onClose }) {
  const [detail, setDetail] = useState([]);
  const [headItem, setHeadItem] = useState(null);
  const [bodyItem, setBodyItem] = useState(null);

  useEffect(() => {
    // productId로 서버에 요청을 보내 상세 정보를 가져옴
    axios.get(`/api/estate/detail?product_id=${product_id}`)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product_id]);

  let bjd_code = '';
  let bun = '';
  let ji = '';

  useEffect(() => {
    if (detail.location) {
      axios({
          method: 'post',
          url: '/api/get/bjd_code',
          params: {location: detail.location}
      })
      .then((res) => {
          bjd_code = String(res.data);
          bun = String(detail.building_name.split('-')[0]);
          ji = String(detail.building_name.split('-')[1]);
          let items = '';
            var xhr = new XMLHttpRequest();
            var url = 'http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo'; /*URL*/
            var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'awBBm0hyTWbKIRKVbFl85MND2xq0q9rJJsqUONeQoaX0ThS%2Bc4R31pxCy4H67wC443%2F2mAkFDnfHrpWXXCalyQ%3D%3D'; /*Service Key*/
            queryParams += '&' + encodeURIComponent('sigunguCd') + '=' + encodeURIComponent(bjd_code.substring(0, 5)); /**/
            queryParams += '&' + encodeURIComponent('bjdongCd') + '=' + encodeURIComponent(bjd_code.substring(5)); /**/
            queryParams += '&' + encodeURIComponent('platGbCd') + '=' + encodeURIComponent('0'); /**/
            queryParams += '&' + encodeURIComponent('bun') + '=' + encodeURIComponent(bun); /**/
            queryParams += '&' + encodeURIComponent('ji') + '=' + encodeURIComponent(ji); /**/
            queryParams += '&' + encodeURIComponent('startDate') + '=' + encodeURIComponent(''); /**/
            queryParams += '&' + encodeURIComponent('endDate') + '=' + encodeURIComponent(''); /**/
            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(''); /**/
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(''); /**/
            xhr.open('GET', url + queryParams);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    // XML 데이터 파싱
                    var xmlDoc = this.responseXML;
    
                    // 원하는 데이터 추출
                    items = xmlDoc.getElementsByTagName('item'); // 'item' 태그에 있는 데이터 추출
                    
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var name = item.getElementsByTagName('bldNm')[0].textContent;
                        var main = item.getElementsByTagName('mainPurpsCdNm')[0].textContent;
                        var bun = item.getElementsByTagName('bun')[0].textContent;
                        var ji = item.getElementsByTagName('ji')[0].textContent;
    
                        console.log(name, main, bun, '-', ji);

                        var indrMechUtcnt = item.getElementsByTagName('indrMechUtcnt')[0].textContent;
                        var oudrMechUtcnt = item.getElementsByTagName('oudrMechUtcnt')[0].textContent;
                        var indrAutoUtcnt = item.getElementsByTagName('indrAutoUtcnt')[0].textContent;
                        var oudrAutoUtcnt = item.getElementsByTagName('oudrAutoUtcnt')[0].textContent;

                        var parking = parseInt(indrAutoUtcnt + indrMechUtcnt + oudrAutoUtcnt + oudrMechUtcnt);

                        setHeadItem({
                          grndFlrCnt: item.getElementsByTagName('grndFlrCnt')[0].textContent
                        });

                        setBodyItem({
                          name: name,
                          platPlc: item.getElementsByTagName('platPlc')[0].textContent,
                          dongNm: item.getElementsByTagName('dongNm')[0].textContent,
                          hhldCnt: item.getElementsByTagName('hhldCnt')[0].textContent,
                          parking: parking
                        });
                    }
                }
            };
        
            xhr.send('');
    
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [detail.location]);

  return (
    <div>
      <div className='container1'>
        <button className='closeButton' onClick={onClose}>X</button>
        {detail && <DetailHead product_id={product_id} detail={detail} headItem={headItem} />}


        {detail && <DetailBody product_id={product_id} detail={detail} bodyItem={bodyItem} />}
      </div>
    </div>
  )
}
