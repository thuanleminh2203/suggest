import React from 'react'
import iconHome from '../images/home-icon.png'

function HomeComponent() {
  return (
    <div style={{ height: '100%' }}>
      <div className="HomeContainer">
        <div>
          <img src={iconHome} style={{ width: '243px', height: '179px' }} />
        </div>
        <div className="Title">Hôm nay ăn gì?</div>
        <div className="Decription">Không ngại đi xa, chỉ cần lý do</div>
      </div>
      <div style={{ position: 'absolute', bottom: '5%', width: '100%' }}>
        <div className="ButtonContainer">Bắt đầu ngay</div>
      </div>
    </div>
  )
}

export default HomeComponent
