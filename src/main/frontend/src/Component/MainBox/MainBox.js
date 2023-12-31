import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './MainBox.css';

export default function MainBox() {
    const categories = [
        { name: '오피스텔', image: './././img/building.png' },
        { name: '아파트', image: './././img/apt2.png' },
        { name: '상가', image: './././img/store.png' },
        { name: '지식산업센터·사무실', image: './././img/industrial.png' },
        { name: '공장·창고', image: "./././img/factory4.png" },
        { name: '토지', image: "./././img/landscape.png" },
      ];

  // return (
  //   <div className="container">
  //   {/* <h2 className='매물종류'>매물종류</h2> */}
  //     {categories.map((category, index) => (
  //       <div className="category-box" key={index}>
  //         <div className="img-box">
  //           <img src={category.image} className="category-image" />
  //         </div>
  //         <p className="category-text">{category.name}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className="container">
      {categories.map((category, index) => (
        <Link to={`/Grid?category=${category.name}`} className="link-no-underline" key={index}>
          <div className="category-box">
            <div className="img-box">
              <img src={category.image} className="category-image" alt={category.name} />
            </div>
            <p className="category-text">{category.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
