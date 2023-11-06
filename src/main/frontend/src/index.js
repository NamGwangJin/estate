import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home'
import Intro from './Component/Home/intro.js'
import News from './Component/Home/news.js'
import QNA from './Component/QNA/QNA'
import QuestionWrite from './Component/QNA/QuestionWrite'
import QuestionDetail from './Component/QNA/QuestionDetail'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path={"/"} exact element={<Home />}></Route>
      <Route path={"/intro"} exact element={<Intro />}></Route>
      <Route path={"/news"} exact element={<News />}></Route>
      <Route path={"/qna"} exact element={<QNA />}></Route>
      <Route path={"/question/write"} exact element={<QuestionWrite />}></Route>
      <Route path={"/question/detail"} exact element={<QuestionDetail />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();