import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home'
import Intro from './Component/Home/intro.js'
import News from './Component/Home/news.js'
import NewsInsert from './Component/Home/newsInsert.js'
import RequestWrite from './Component/Home/requestWrite.js'
import QNA from './Component/QNA/QNA.js'
import QuestionWrite from './Component/QNA/QuestionWrite.js'
import QuestionDetail from './Component/QNA/QuestionDetail.js'
import Tour from './Component/Tour/Tour.js'
import TourApliy from './Component/Tour/TourApliy.js'
import Admin from './Component/Admin/Admin.js'
import EstateDetail from './Component/Estate/EstateDetail.js';
import OfficetelInsert from './Component/Product/officetelInsert.js'
import AdminEstateDetail from './Component/Estate/AdminEstateDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path={"/"} exact element={<Home />}></Route>
      <Route path={"/intro"} exact element={<Intro />}></Route>
      <Route path={"/news"} exact element={<News />}></Route>
      <Route path={"/newsinsert"} exact element={<NewsInsert />}></Route>
      <Route path={"/requestWrite"} exact element={<RequestWrite />}></Route>
      <Route path={"/qna"} exact element={<QNA />}></Route>
      <Route path={"/question/write"} exact element={<QuestionWrite />}></Route>
      <Route path={"/question/detail"} exact element={<QuestionDetail />}></Route>
      <Route path={"/tour"} exact element={<Tour />}></Route>
      <Route path={"/tour/apliy"} exact element={<TourApliy />}></Route>
      <Route path={"/admin"} exact element={<Admin />}></Route>
      <Route path={"/estate/detail"} exact element={<EstateDetail />}></Route>
      <Route path={"admin/estate/detail"} exact element={<AdminEstateDetail />}></Route>
      <Route path={"/product/officetelInsert"} exact element={<OfficetelInsert />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();