import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 검색 기능을 구현하면 됩니다.
    console.log('검색어:', keyword);
    // 추가적인 로직을 구현할 수 있습니다.
  };

  return (
  <div className="main_slide_search_box main_search_back" style={{ position: 'relative', bottom: 0, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '0' }}>     <div className="mainSlide_search_wrap mainSlide_search_wrap_1140">
      <form onSubmit={handleSubmit} id="form_search">
        {/* input 요소들의 hidden 값들 */}
        <div className="mainSlide_search_big">
          <div className="mainSlide_search_box">
            <img className='search_img' src="./././img/reading_glasses.png" alt="Reading Glasses" />
            <input
              type="text"
              id="keyword"
              name="keyword"
              placeholder="원하는 지역명, 지하철역, 키워드를 입력해주세요."
              className="ui-autocomplete-input"
              autoComplete="off"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn_search">
            매물검색
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

