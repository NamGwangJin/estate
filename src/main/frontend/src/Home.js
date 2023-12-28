import { useNavigate } from 'react-router-dom';
import Header from './Component/header.js';
import Bottom from './Component/bottom.js';
import Inquiry from './Component/Home/inquiry.js';
import SearchBar from './Component/SearchBar/SearchBar.js';
import MainBox from './Component/MainBox/MainBox.js';
import './App.css';
import Request_box from './Component/Request_box/Request_box.js';

function Home() { 
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
    return (
        <div className="App">
          <Header />
          <div className='mainSection'>
          <SearchBar/>
          <MainBox />
          <div className='threeBox'>
            <div className='SearchMapbox' onClick={()=> handleNavigate('/Search')}>지도에서 매물검색</div>
            <div className='SearchGridbox'onClick={()=> handleNavigate('/Grid')}>목록에서 매물검색</div>
            <div className='tourbox'onClick={()=> handleNavigate('/tour')}>매물투어시청</div>
          </div>
          <div>여기에 추천매물</div>
          <div className='recentlist'>
      
          </div>
          <Request_box/>
          <div>각종 사이트 링크</div>
          </div>
          <div className='inquiry1'>
            {/* 위치 수정하기 */}
            <Inquiry /> 
          </div>
          <div className='inquiry2'>
            {/* <Inquiry /> */}
          </div>
          <Bottom />
        </div>
      );
}

export default Home;