import React from 'react'
import resultBackground from '../images/result-background.png'

export default function ResultComponent(props) {
  const { value } = props
  return (
    <>
      <div
        className="HomeContainer"
        style={{
          backgroundColor: '#AD0000',
          paddingTop: '0px',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <div>
          <img src={resultBackground} style={{ width: '343px', height: '344px' }} />
        </div>
        <div className="Title" style={{ color: '#FFFFFF', marginTop: '0px' }}>
          Xin chúc mừng
        </div>
        <div className="Decription" style={{ color: '#FFFFFF' }}>
          Đáp án được lựa chọn là
        </div>
        <div className="Decription" style={{ color: '#FFFFFF' }}>
          {`"${value}"`}
        </div>
      </div>
    </>
  )
}
