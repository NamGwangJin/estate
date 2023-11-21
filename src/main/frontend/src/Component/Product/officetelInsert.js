import React, { useState } from 'react';
import Header from '../header.js';
import Bottom from '../bottom.js';
import axios from 'axios';
import { hangjungdong } from '../Home/hangjungdong.js';
import './officetelInsert.css';

export default function OfficetelInsert() {
  const [floorExposure, setFloorExposure] = useState('노출');
  const [usage, setUsage] = useState('주거용');
  const [structure, setStructure] = useState('단층식');
  const [maintenance, setMaintenance] = useState('없음');

  const [maintenanceCost, setMaintenanceCost] = useState(""); // 관리비 천단위 컴마
  const handleMaintenanceCostChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    if (inputValue !== null) {
      const formattedValue = Number(inputValue).toLocaleString();
      setMaintenanceCost(formattedValue);
    } else {
      // 값이 null인 경우 0으로 설정
      setMaintenanceCost("0");
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);  // 이미지파일 첨부
  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };
  const [val1, setVal1] = useState(""); //지역 state
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const { sido, sigugun, dong } = hangjungdong;

  const getSidoCodeNm = () => sido.find(el => el.sido === val1)?.codeNm || '';
  const getSigugunCodeNm = () => sigugun.find(el => el.sido === val1 && el.sigugun === val2)?.codeNm || '';
  const getDongCodeNm = () => dong.find(el => el.sido === val1 && el.sigugun === val2 && el.dong === val3)?.codeNm || '';
  const sidoCodeNm = getSidoCodeNm();
  const sigugunCodeNm = getSigugunCodeNm();
  const dongCodeNm = getDongCodeNm();
  const location = sidoCodeNm + ' ' + sigugunCodeNm + ' ' + dongCodeNm
  console.log('주소=' + location);
  console.log('용도=' + usage);

  function upload() {
    let product_type = document.getElementById('product_type').value;
    let building_name = document.getElementById('building_name').value;
    let building_use = document.getElementById('building_use').value;
    let extent = document.getElementById('extent').value;
    let address = document.getElementById('address').value +' '+ document.getElementById('address_input').value;
    let floor = document.getElementById('floor').value;
    let direction_criteria = document.getElementById('direction_criteria').value;
    let direction = document.getElementById('direction').value;
    let entrance = document.getElementById('entrance').value;
    let rooms = document.getElementById('rooms').value;
    let bathroom = document.getElementById('bathroom').value;
    let managementCost_includ = Array.from(document.querySelectorAll('#managementCost_includ .input_check:checked')).map(checkbox => checkbox.value);


    axios({
      method:'post',
      url: '/api/officetell_Insert',
      params:{
        product_type: product_type,
        location: location,
        building_name: building_name,
        building_use: building_use,
        extent: extent,
        address: address,
        floor: floor,
        floor_open: floorExposure,
        direction_criteria: direction_criteria,
        direction: direction,
        entrance: entrance,
        rooms: rooms,
        bathroom: bathroom,
        roomuse: usage,
        inner_structure: structure,
        administration_cost: maintenanceCost,
        maintenance: maintenance,
        managementCost_includ: managementCost_includ
      },
    })
    .then((res) => {
      if(res.data == 'success'){
        alert('매물등록을 성공하였습니다');
        window.location.href ='/';  // 매물리스트로 수정
      }
    })
    .catch((error) => {
      console.error('매물등록실패: ', error);
      alert(`에러 발생: ${error.message}`);
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    upload();
  }
  return (
    <div className='officetelInsertHTML'>
      <Header />
      <div className='InsertDIV'>
        <h3>매물등록</h3>
        <form onSubmit={onSubmit}>
          <h5>매물등록</h5>
          <table className='content_insert'>
            <tbody>
              <tr>
                <td>매물종류</td>
                <td colSpan={3}> 
                  <select id='product_type'>
                    <option value='오피스텔'>오피스텔</option>
                    <option value='아파트'>아파트</option>
                    <option value='상가'>상가</option>
                    <option value='지식산업센터/사무실'>지식산업센터·사무실</option>
                    <option value='토지'>토지</option>
                    <option value='공장/창고'>공장·창고</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>소재지</td>
                <td colSpan={3}>
                  <select onChange={(e) => setVal1(e.target.value)}>
                    <option value="">선택</option>
                    {sido.map((el) => (
                      <option key={el.sido} value={el.sido}>
                        {el.codeNm}
                      </option>
                    ))}
                  </select>
                  <select onChange={(e) => setVal2(e.target.value)}>
                    <option value="">선택</option>
                    {sigugun
                      .filter((el) => el.sido === val1)
                      .map((el) => (
                        <option key={el.sigugun} value={el.sigugun}>
                          {el.codeNm}
                        </option>
                      ))}
                  </select>
                  <select onChange={(e) => setVal3(e.target.value)}>
                    <option value="">선택</option>
                    {dong
                      .filter((el) => el.sido === val1 && el.sigugun === val2)
                      .map((el) => (
                        <option key={el.dong} value={el.dong}>
                          {el.codeNm}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>단지명</td>
                <td colSpan={3}>
                  <select id='building_name'>
                    <option value='단지1'>단지1</option> 
                    <option value='단지2'>단지2</option>
                    {/* 디비에서 가져와야함 */}
                  </select>
                </td>
              </tr>
              <tr>
                <td>건축물용도</td>
                <td colSpan={3}>
                  <select id='building_use'>
                    <option value='단독주택'>단독주택</option>
                    <option value='공동주택'>공동주택</option>
                    <option value='제1종 근린생활시설'>제1종 근린생활시설</option>
                    <option value='제2종 근린생활시설'>제2종 근린생활시설</option>
                    <option value='문화 및 집회시설'>문화 및 집회시설</option>
                    <option value='종교시설'>종교시설</option>
                    <option value='판매시설'>판매시설</option>
                    <option value='운수시설'>운수시설</option>
                    <option value='의료시설'>의료시설</option>
                    <option value='교육연구시설'>교육연구시설</option>
                    <option value='노유자시설'>노유자시설</option>
                    <option value='수련시설'>수련시설</option>
                    <option value='운동시설'>운동시설</option>
                    <option value='업무시설'>업무시설</option>
                    <option value='숙박시설'>숙박시설</option>
                    <option value='위락시설'>위락시설</option>
                    <option value='공장'>공장</option>
                    <option value='창고시설'>창고시설</option>
                    <option value='위험물 저장 및 처리 시설'>위험물 저장 및 처리 시설</option>
                    <option value='자동차 관련 시설'>자동차 관련 시설</option>
                    <option value='동물 및 식물 관련 시설'>동물 및 식물 관련 시설</option>
                    <option value='자원순환 관련 시설'>자원순환 관련 시설</option>
                    <option value='교정 및 군사 시설'>교정 및 군사 시설</option>
                    <option value='방송통신시설'>방송통신시설</option>
                    <option value='발전시설'>발전시설</option>
                    <option value='묘지 관련 시설'>묘지 관련 시설</option>
                    <option value='관광 휴게시설'>관광 휴게시설</option>
                    <option value='장례시설'>장례시설</option>
                    <option value='야영장 시설'>야영장 시설</option>
                    <option value='미등기건물'>미등기건물</option>
                    <option value='그 밖에 토지의 정착물'>그 밖에 토지의 정착물</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>면적</td>
                <td colSpan={3}>
                  계약면적<select id='extent'>
                    <option value='44A'>44A(44.59㎡ // 18.56㎡)</option>
                    {/* 디비에서 가져와야. 건물정보들에 타입 업데이트인서트 */}
                      </select>㎡
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td colSpan={3}>
                  <select id='address'>
                    <option value='A동'>A동</option>
                    <option value='B동'>B동</option>
                    {/* 건축물대장에서 가져오기 */}
                  </select>
                  <input type='text' id='address_input' className='ho' />호
                </td>
              </tr>
              <tr>
                <td>층</td>
                <td colSpan={3}>
                  <input type='number' id='floor' className='floor' placeholder='해당층' />층[저/-층] {/* 저/-층 에 건축물대장에서 최고층 가져와야함 */}
                  <input type='radio' value={'노출'} checked={floorExposure == '노출'} onChange={() => setFloorExposure('노출')} />층수노출
                  <input type='radio' value={'노출안함'} checked={floorExposure == '노출안함'} onChange={() => setFloorExposure('노출안함')} />고/중/저
                </td>
              </tr>
              <tr>
                <td>방향</td>
                <td>
                  <select id='direction_criteria'>
                    <option value='거실'>거실</option>
                    <option value='안방'>안방</option>
                    {/* 아파트.오피스텔만 거실안방, 다른매물은 주된출입구 등 */}
                  </select>
                  <select id='direction'>
                    <option value='' disabled selected>선택</option>
                    <option value='동'>동</option>
                    <option value='서'>서</option>
                    <option value='남'>남</option>
                    <option value='북'>북</option>
                    <option value='북동'>북동</option>
                    <option value='남동'>남동</option>
                    <option value='북서'>북서</option>
                    <option value='남서'>남서</option>
                  </select>
                </td>
                <td>현관구조</td>
                <td>
                  <select id='entrance'>
                    <option value="" disabled selected>선택</option>
                    <option value="계단식">계단식</option>
                    <option value="복도식">복도식</option>
                    <option value="복합식">복합식</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>방수</td>
                <td><input type='number' className='rooms' id='rooms'/>개</td>
                <td>욕실수</td>
                <td><input type='number' className='bathrooms' id='bathroom'/>개</td>
              </tr>
              <tr>
                <td>용도</td>
                <td>
                  <input type='radio' value={'주거용'} checked={usage == '주거용'} onChange={() => setUsage('주거용')} />주거용
                  <input type='radio' value={'업무용'} checked={usage == '업무용'} onChange={() => setUsage('업무용')} />업무용
                  <input type='radio' value={'겸용'} checked={usage == '겸용'} onChange={() => setUsage('겸용')} />겸용
                  <input type='radio' value={'숙박시설'} checked={usage == '숙박시설'} onChange={() => setUsage('숙박시설')} />숙박시설
                </td>
                <td>내부구조</td>
                <td>
                  <input type='radio' value={'단층식'} checked={structure == '단층식'} onChange={() => setStructure('단층식')} />단층식
                  <input type='radio' value={'복층식'} checked={structure == '복층식'} onChange={() => setStructure('복층식')} />복층식
                </td>
              </tr>
              <tr>
                <td>월관리비</td>
                <td>월<input type='text' className='maintenanceCost' value={maintenanceCost} onChange={handleMaintenanceCostChange} />원</td>
                <td>관리비유무</td>
                <td>
                  <input type='radio' value={'있음'} checked={maintenance == '있음'} onChange={() => setMaintenance('있음')} />있음
                  <input type='radio' value={'없음'} checked={maintenance == '없음'} onChange={() => setMaintenance('없음')} />없음
                </td>
              </tr>
              <tr>
                <td>관리비포함내역</td>
                <td colSpan={3} id='managementCost_includ'>
                  <input type='checkbox' className='input_check' value={'전기'} />전기
                  <input type='checkbox' className='input_check' value={'가스'} />가스
                  <input type='checkbox' className='input_check' value={'수도'} />수도
                  <input type='checkbox' className='input_check' value={'인터넷'} />인터넷
                  <input type='checkbox' className='input_check' value={'TV'} />TV
                </td>
              </tr>
              <tr>
                <td>건축물일자</td>
                <td colSpan={3}>
                  <select>
                    <option value='' disabled selected>유형선택</option>
                    <option value='사용승인'>사용승인</option>
                    <option value='사용검사'>사용검사</option>
                    <option value='준공일자'>준공일자</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <h5>가격</h5>
          <table className='price_insert'>
            <tbody>
              <tr>
                <td>거래종류</td>
                <td>라디오로 매매전세월세단기</td>
              </tr>
              <tr>
                <td>매매가</td><td><input type='text' />만원 (컴마찍기)</td>
              </tr>
              <tr>
                <td>융자금</td><td><input type='text' />만원</td>
              </tr>
              <tr>
                <td>기전세금(월세금)</td><td>전세(보종금)<input type='text' />만원 / 월세가<input type='text' />만원</td>
              </tr>
            </tbody>
          </table>
          <h5>주차정보</h5>
          <table>
            <tbody>
              <tr>
                <td>총 주차대수</td>
                <td><input type='text' />대 *총 세대수: ~대</td>
                <td>세대당 주차대수</td>
                <td><input type='text' />대</td>
                {/* 자동계산되도록 */}
              </tr>
            </tbody>
          </table>
          <h5>시설정보</h5>
          <table>
            <tr>
              <td>난방방식</td>
              <td>
                <select>
                  <option>개별난방</option>
                </select>
              </td>
              <td>난방연료</td>
              <td>
                <select>
                  <option>도시가스</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>냉방시설</td>
              <td colspan="3">
                <ul class="optionList">
                  <li><input name="btin_cd" id="btin_cd52" value="52" type="checkbox" class="input_check" /> <label for="btin_cd52">벽걸이에어컨</label></li>
                  <li><input name="btin_cd" id="btin_cd53" value="53" type="checkbox" class="input_check" /> <label for="btin_cd53">스탠드에어컨</label></li>
                  <li><input name="btin_cd" id="btin_cd54" value="54" type="checkbox" class="input_check" /> <label for="btin_cd54">천장에어컨</label></li>

                </ul>
              </td>
            </tr>
            <tr>
              <td>생활시설</td>
              <td colSpan={3}>
                <ul class="optionList">
                  <li><input name="btin_cd" id="btin_cd55" value="55" type="checkbox" class="input_check" /> <label for="btin_cd55">침대</label></li>
                  <li><input name="btin_cd" id="btin_cd56" value="56" type="checkbox" class="input_check" /> <label for="btin_cd56">책상</label></li>
                  <li><input name="btin_cd" id="btin_cd57" value="57" type="checkbox" class="input_check" /> <label for="btin_cd57">옷장</label></li>
                  <li><input name="btin_cd" id="btin_cd58" value="58" type="checkbox" class="input_check" /> <label for="btin_cd58">붙박이장</label></li>
                  <li><input name="btin_cd" id="btin_cd59" value="59" type="checkbox" class="input_check" /> <label for="btin_cd59">식탁</label></li>
                  <li><input name="btin_cd" id="btin_cd60" value="60" type="checkbox" class="input_check" /> <label for="btin_cd60">소파</label></li>
                  <li><input name="btin_cd" id="btin_cd61" value="61" type="checkbox" class="input_check" /> <label for="btin_cd61">신발장</label></li>
                  <li><input name="btin_cd" id="btin_cd62" value="62" type="checkbox" class="input_check" /> <label for="btin_cd62">냉장고</label></li>
                  <li><input name="btin_cd" id="btin_cd63" value="63" type="checkbox" class="input_check" /> <label for="btin_cd63">세탁기</label></li>
                  <li><input name="btin_cd" id="btin_cd64" value="64" type="checkbox" class="input_check" /> <label for="btin_cd64">건조기</label></li>
                  <li><input name="btin_cd" id="btin_cd65" value="65" type="checkbox" class="input_check" /> <label for="btin_cd65">샤워부스</label></li>
                  <li><input name="btin_cd" id="btin_cd66" value="66" type="checkbox" class="input_check" /> <label for="btin_cd66">욕조</label></li>
                  <li><input name="btin_cd" id="btin_cd67" value="67" type="checkbox" class="input_check" /> <label for="btin_cd67">비데</label></li>
                  <li><input name="btin_cd" id="btin_cd68" value="68" type="checkbox" class="input_check" /> <label for="btin_cd68">싱크대</label></li>
                  <li><input name="btin_cd" id="btin_cd69" value="69" type="checkbox" class="input_check" /> <label for="btin_cd69">식기세척기</label></li>
                  <li><input name="btin_cd" id="btin_cd70" value="70" type="checkbox" class="input_check" /> <label for="btin_cd70">가스레인지</label></li>
                  <li><input name="btin_cd" id="btin_cd71" value="71" type="checkbox" class="input_check" /> <label for="btin_cd71">인덕션레인지</label></li>
                  <li><input name="btin_cd" id="btin_cd72" value="72" type="checkbox" class="input_check" /> <label for="btin_cd72">전자레인지</label></li>
                  <li><input name="btin_cd" id="btin_cd73" value="73" type="checkbox" class="input_check" /> <label for="btin_cd73">가스오븐</label></li>
                  <li><input name="btin_cd" id="btin_cd86" value="86" type="checkbox" class="input_check" /> <label for="btin_cd86">TV</label></li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>보안시설</td>
              <td colspan="3">
                <ul class="optionList">
                  <li><input name="btin_cd" id="btin_cd74" value="74" type="checkbox" class="input_check" /> <label for="btin_cd74">경비원</label></li>
                  <li><input name="btin_cd" id="btin_cd75" value="75" type="checkbox" class="input_check" /> <label for="btin_cd75">비디오폰</label></li>
                  <li><input name="btin_cd" id="btin_cd76" value="76" type="checkbox" class="input_check" /> <label for="btin_cd76">인터폰</label></li>
                  <li><input name="btin_cd" id="btin_cd77" value="77" type="checkbox" class="input_check" /> <label for="btin_cd77">카드키</label></li>
                  <li><input name="btin_cd" id="btin_cd78" value="78" type="checkbox" class="input_check" /> <label for="btin_cd78">CCTV</label></li>
                  <li><input name="btin_cd" id="btin_cd79" value="79" type="checkbox" class="input_check" /> <label for="btin_cd79">사설경비</label></li>
                  <li><input name="btin_cd" id="btin_cd80" value="80" type="checkbox" class="input_check" /> <label for="btin_cd80">현관보안</label></li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>기타시설</td>
              <td colspan="3">
                <ul class="optionList">
                  <li><input name="btin_cd" id="btin_cd81" value="81" type="checkbox" class="input_check" /> <label for="btin_cd81">엘리베이터</label></li>
                  <li><input name="btin_cd" id="btin_cd82" value="82" type="checkbox" class="input_check" /> <label for="btin_cd82">화재경보기</label></li>
                  <li><input name="btin_cd" id="btin_cd85" value="85" type="checkbox" class="input_check" /> <label for="btin_cd85">무인택배함</label></li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>방범창/베란다</td>
              <td colspan="3">
                <ul class="optionList">
                  <li><input name="btin_cd" id="btin_cd83" value="83" type="checkbox" class="input_check" /> <label for="btin_cd83">방범창</label></li>
                  <li><input name="btin_cd" id="btin_cd84" value="84" type="checkbox" class="input_check" /> <label for="btin_cd84">베란다</label></li>
                </ul>
              </td>
            </tr>
          </table>
          <h5>입주일</h5>
          <table>
            <tbody>
              <tr>
                <td>입주가능일</td>
                <td>
                  <input type='radio' /><label>즉시입주</label><br />
                  <div><input type='radio' />날짜선택</div>
                  <div>협의가능</div>
                </td>
              </tr>
            </tbody>
          </table>
          <h5>상세정보</h5>
          <table>
            <tbody>
              <tr>
                <td>매물특징</td>
                <td><input type='text' placeholder='리스트에 노출되는 문구' /></td>
              </tr>
              <tr>
                <td>상세설명</td>
                <td>
                  <textarea placeholder='매물 상세 페이지에 노출되는 문구입니다.'></textarea>
                </td>
              </tr>
              <tr>
                <td>매물사진</td>
                <td>
                  <input type='file' multiple onChange={handleFileChange} /><br />
                  <div>
                    {selectedFiles.map((file, index) => (
                      <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button type='submit' className='upload'>등록하기</button>
          <button type='button' className='back' onClick={() => { window.location.href = '/' }}>홈으로</button>
        </form>
      </div>
      <Bottom />
    </div>
  )
}
