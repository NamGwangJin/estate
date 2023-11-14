import React from 'react'

export default function AnswerWrite({ onCancel }) {
  return (
    <div className='App'>
        <table className="write">
            <tbody>
                <tr><td>답변내용</td><td><textarea id='content' style={{width:'500px', height:'300px'}}></textarea></td></tr>
            </tbody>
        </table>
        <button className='btn btn-ruru' id='answerOk'>작성완료</button>&nbsp;
        <button className='btn btn-white' onClick={onCancel}>취소</button>
    </div>
  )
}
