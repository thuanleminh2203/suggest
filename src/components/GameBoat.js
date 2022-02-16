/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react'
import xIcon from '../images/x-icon.png'
import oIcon from '../images/o-icon.png'
import battleShip1 from '../images/battleship-1.png'
import battleShip2 from '../images/battleship-2.png'
import battleShip3 from '../images/battleship-3.png'
import battleShip4 from '../images/battleship-4.png'
import battleShip5 from '../images/battleship-5.png'
import sea from '../images/sea.png'
import Draggable from 'react-draggable'
import seaBackground from '../images/sea-background.png'

const X = 'x'
const O = 'o'
const _ = null
const BATTLE_SHIPS = [battleShip1, battleShip2, battleShip3, battleShip4, battleShip5]
const NUMBER_ROW_BOARD = 6
const NUMBER_BOAT = 10

const createBoardGame = () => {
  const data = []
  for (let rowIndex = 0; rowIndex < NUMBER_ROW_BOARD; rowIndex++) {
    const row = []
    for (let columnIndex = 0; columnIndex < NUMBER_ROW_BOARD; columnIndex++) {
      row.push({
        row: rowIndex,
        colum: columnIndex,
        value: _,
        // img: battleships[Math.floor(Math.random() * 5)],
        img: null,
      })
    }
    row.id = rowIndex
    data.push(row)
  }
  console.log('data', data)
  return data
}

const width = window.innerWidth
const height = window.innerHeight
const scale = width > height ? height : width
const widthCell = (scale * 0.8) / 10

const onControlledDrag = (e, position) => {
  const { x, y } = position
  console.log('===position===',position)
}

const onDrop = (e,data) => {
//   this.setState({ activeDrags: --this.state.activeDrags })
  console.log('Event Type', e.type)
  console.log(e, data)
}
  
const renderValue = (value = null, img = null) => {
  return value === X ? (
    <img src={seaBackground} style={{ width: '100%', height: '100%' }} />
  ) : 
    value === O ? (
      <Draggable bounds="parent">
        <div style={{ width: '100%', height: '100%' }}>
          <img src={img} style={{ width: '100%', height: '100%' }} />
        </div>
      </Draggable>

    ) : (
      _
    )
}

const genCoordinate = () => {
  const coordinateX = Math.floor(Math.random() * NUMBER_ROW_BOARD)
  const coordinateY = Math.floor(Math.random() * NUMBER_ROW_BOARD)
  return '' + coordinateX + coordinateY
}

const genCoordinateWithPreCoordinate = (coordinate = '') => {
  const coorXY = coordinate.split('')
  const coorX = coorXY[0]
  const coorY = coorXY[1]
  return '' + coorX + coorY
}

const randomCoordinatesBoat = (numberBoat = NUMBER_BOAT, data = []) => {
  console.log('dataCurrent', data)
  const dataCurrent = data
  for (let i = 0; i < numberBoat; i++) {
    // if (!dataCurrent.length) {
    const coordinate = genCoordinate()
    dataCurrent.push(coordinate)
    // } else {
    //   const coordinate = genCoordinateWithPreCoordinate(dataCurrent[dataCurrent.length - 1])
    //   console.log('coordinate', coordinate)
    //   dataCurrent.push(coordinate)
    //   //   dataCurrent.includes(coordinate) ? i-- : dataCurrent.push(coordinate)
    //   //   if (dataCurrent.includes(coordinate)) i--
    //   //   else dataCurrent.push(coordinate)
    // }
  }
  console.log('===current coordinate===', data)

  //   console.log([...new Set(data)].length)
  return dataCurrent
}

function GameBoat() {
  const [dataBoard, setDataBoard] = useState([])
  const [coordinatesBoat, setCoordinatesBoat] = useState([])
  //   const coordinatesBoat = randomCoordinatesBoat(10)

  const onClickCell = (rowIndex, columnIndex) => {
    const currentDataCell = dataBoard[rowIndex][columnIndex].value
    const coordinate = '' + rowIndex + columnIndex
    if (!currentDataCell) {
      const newData = [...dataBoard]
      newData[rowIndex][columnIndex].value = coordinatesBoat.includes(coordinate) ? O : X
      newData[rowIndex][columnIndex].img = coordinatesBoat.includes(coordinate)
        ? BATTLE_SHIPS[Math.floor(Math.random() * BATTLE_SHIPS.length) - 1]
        : null

      setDataBoard(newData)
    }
  }

  useEffect(() => {
    setDataBoard(createBoardGame())
    setCoordinatesBoat(randomCoordinatesBoat(NUMBER_BOAT))
  }, [])

  

  return (
    <>
      <div className="box" style={{ height: '500px', width: '1000px', overflow: 'auto', padding: '0' }}>
        {/* <div style={{ height: '1000px', width: '1000px', padding: '10px' }}> */}
        <Draggable bounds="parent">
          <div className="box" style={{ width : '100px', border: '1px solid red' }}>
                I can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
          </div>
        </Draggable>
        <Draggable bounds="parent">
          <div className="box" style={{ width : '100px', border: '1px solid red' }}>
                I also can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
          </div>
        </Draggable>
        {/* </div> */}
      </div>
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ border:'1px solid red', position:'relative', width:'266px', height:'266px' }}>
          {dataBoard.map((rows) => (
            // <Draggable bounds="parent"  key={rows.id}>
            //   <div style={{ width:'55px' }}>
            //   abc
            //   </div>
            // </Draggable>
            <div key={rows.id} style={{ display: 'flex' , border:'1px solid black' }}>
              {rows.map((columnData) => (
                <div
                  style={{
                    width: `${widthCell}px`,
                    height: `${widthCell}px`,
                    backgroundColor: 'skyblue',
                    border: '1px solid #ffffff',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    backgroundImage: '../images/sea-background.png',
                  }}
                  key={columnData.colum}
                  onClick={() => onClickCell(columnData.row, columnData.colum)}
                >
                  <Draggable bounds="parent"  key={columnData.colum}>
                    <div>
                  abc
                    </div>
                  </Draggable>
                </div> 
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default memo(GameBoat)
