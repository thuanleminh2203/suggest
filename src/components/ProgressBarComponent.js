import React from 'react'
import iconHome from '../images/home-icon.png'

export default function ProgressBarComponent() {
  return (
    <>
      <div
        className="HomeContainer"
        style={{
          backgroundColor: '#FFA70C',
          paddingTop: '0px',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <div>
          <img src={iconHome} style={{ width: '179px', height: '164px' }} />
        </div>
        <div className="Title" style={{ color: '#FFFFFF' }}>
          Random Question
        </div>
        <div className="Decription" style={{ color: '#FFFFFF' }}>
          đưa ra giải pháp
        </div>
        <div className="Decription" style={{ color: '#FFFFFF' }}>
          một cách nhanh chóng
        </div>
        <div className="ProgressContainer">
          <div className="ColorContainer"></div>
        </div>
      </div>
    </>
  )
}
