import React from 'react'
import iconFood from '../images/food-icon.png'

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
          <img src={iconFood} style={{ width: '179px', height: '164px' }} />
        </div>
        <div className="Title" style={{ color: '#FFFFFF' }}>
          Hôm nay ăn gì?
        </div>
        <div className="Decription" style={{ color: '#FFFFFF' }}>
          Không ngại đi xa, chỉ cần lý do
        </div>
        <div className="ProgressContainer">
          <div className="ColorContainer"></div>
        </div>
      </div>
    </>
  )
}
