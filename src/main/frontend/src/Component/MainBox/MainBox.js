import React, { useState } from 'react';
import './MainBox.css';

export default function MainBox() {
    const categories = [
        { name: '공장,창고', image: 'path/to/your/factory-warehouse-image.jpg' },
        { name: '토지', image: 'path/to/your/land-image.jpg' },
        { name: '아파트', image: 'path/to/your/apartment-image.jpg' },
        { name: '오피스텔', image: 'path/to/your/officetel-image.jpg' },
      ];
      
  return (
    <div className="container">
      {categories.map((category, index) => (
        <div className="category-box" key={index}>
          <div className="img-box">
            {/* <img src={category.image} className="category-image" /> */}
          </div>
          <p className="category-text">{category.name}</p>
        </div>
      ))}
    </div>
  );
}

