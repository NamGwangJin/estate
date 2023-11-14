import React from 'react'

export default function QuestionAnswer() {
  return (
    <div>

      <div className='prev'>
        <div className='postTitle'>
          <h2>답변</h2>
        </div>
      </div>

      <div className='showView'>
        <span>작성자 : 관리자</span><br/>
        <span>작성일 : 작성일</span>
      </div>

      <div className='showView'>
        <a>내용</a>
      </div>

    </div>
  )
}
