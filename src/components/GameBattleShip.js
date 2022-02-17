/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Fragment, memo, useEffect, useState } from 'react'
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
//define with cell(px) for board
const width = window.innerWidth
const height = window.innerHeight
const scale = width > height ? height : width
const widthCell = (scale * 0.8) / 10
const BATTLE_SHIPS = [battleShip1, battleShip2, battleShip3, battleShip4, battleShip5]
const NUMBER_ROW_BOARD = 10
const NUMBER_SHIP = 10

const SHIPS= [
  {
    id: 1,
    name:'ship1',
    img: null,
    distance: 1
  },{
    id: 2,
    name:'ship2',
    img: null,
    distance: 2
  },{
    id: 3,
    name:'ship3',
    img: null,
    distance: 3
  },{
    id: 4,
    name:'ship4',
    img: null,
    distance: 4
  },{
    id: 5,
    name:'ship5',
    img: null,
    distance: 5
  }
]

const createBoardGame = () => {
  const data = []
  for (let rowIndex = 0; rowIndex < NUMBER_ROW_BOARD; rowIndex++) {
    const row = []
    for (let columnIndex = 0; columnIndex < NUMBER_ROW_BOARD; columnIndex++) {
      // row.push({
      //   row: rowIndex,
      //   colum: columnIndex,
      //   value: _,
      //   // img: battleships[Math.floor(Math.random() * 5)],
      //   img: null,
      // })
      data.push({
        id: '' + rowIndex + columnIndex,
        x: rowIndex,
        y: columnIndex,
        value: _,
        // img: battleships[Math.floor(Math.random() * 5)],
        img: null,
      })
    }
    // row.id = rowIndex
    // data.push(row)
  }
  console.log('data', data)
  return data
}



const onControlledDrag = (e, position) => {
  const { x, y } = position
  console.log('===position===',position)
}

const onDrop = (e,data) => {
//   this.setState({ activeDrags: --this.state.activeDrags })
  // console.log('Event Type', e.type)
  // console.log(e, data)
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

const randomCoordinatesShip = (numberShip = NUMBER_SHIP, data = []) => {
  console.log('dataCurrent', data)
  const dataCurrent = data
  for (let i = 0; i < numberShip; i++) {
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

const randomColor = () => {
  return '#' + randomNumber(16777215).toString(16)
}

const genarateCoordinateShip = (curentPositionX,curentPositionY,distance) =>{
  console.log('====x====y==',curentPositionX,curentPositionY)
  // const position = {}
  const x = Math.floor(curentPositionX / NUMBER_ROW_BOARD) //x
  const y = curentPositionY % NUMBER_ROW_BOARD // y
  const slideX = x === 0|| x === NUMBER_ROW_BOARD -1
  const slideY = y ===0 || y === NUMBER_ROW_BOARD -1 

  const coordinateForShip = []
  if(slideX){
    if(x === 0){
      for(let i = 0; i< distance ; i++){
        coordinateForShip.push(curentPositionX  + NUMBER_ROW_BOARD * i)
      }
    }
    if(x === NUMBER_ROW_BOARD - 1){
      for(let i = 0; i< distance ; i++){
        coordinateForShip.push(curentPositionX  - NUMBER_ROW_BOARD * i)
      }
    }
    // return
  }
  if(slideY){
    if(y === 0){
      for(let i = 0; i< distance ; i++){
        coordinateForShip.push(curentPositionY  + i)
      }
    }
    if(y === NUMBER_ROW_BOARD - 1){
      for(let i = 0; i< distance ; i++){
        coordinateForShip.push(curentPositionY  - i)
      }
    }
  }

  const randomDirection = randomNumber(2) // x: 0, y: 1

  const currentDistance  = new Date().getMilliseconds() % 2 === 0 ?( distance -1) : -(distance -1 )

  let width =  widthCell
  let height = widthCell
  if(randomDirection === 0){
    const check = (curentPositionX + currentDistance) / NUMBER_ROW_BOARD === x
    for(let i = 0; i< distance; i++ ){
      coordinateForShip.push(check  ?( currentDistance > 0 ? curentPositionX + i : curentPositionX - i) : ( currentDistance > 0 ? curentPositionX - i : curentPositionX + i))
    }
    width = coordinateForShip.length * width

  }else{
    const check = (curentPositionY + currentDistance * NUMBER_ROW_BOARD) % NUMBER_ROW_BOARD === y
    for(let i = 0; i< distance; i++ ){
      coordinateForShip.push(check  ?
        ( currentDistance > 0 ? curentPositionY + i * NUMBER_ROW_BOARD : curentPositionY - i * NUMBER_ROW_BOARD) 
        : ( currentDistance > 0 ? curentPositionY - i* NUMBER_ROW_BOARD : curentPositionY + i * NUMBER_ROW_BOARD))
    }
    height = coordinateForShip.length * height

  }



  console.log('===coordinateForShip===', coordinateForShip, width , height)
  return { coordinateForShip, width , height  }

}

const randomNumber= (maxValue = 0) => Math.floor(Math.random()*maxValue)

function GameBattleShip() {
  const [dataBoard, setDataBoard] = useState([])
  const [coordinatesShip, setCoordinatesShip] = useState([])
  //   const coordinatesShip = randomCoordinatesShip(10)

  const onClickCell = (rowIndex, columnIndex) => {
    const index = parseInt(rowIndex)*NUMBER_ROW_BOARD + parseInt(columnIndex)
    const currentDataCell = dataBoard[index].value
    const coordinate = '' + rowIndex + columnIndex
    if (!currentDataCell) {
      const newData = [...dataBoard]
      newData[index].value = coordinatesShip.includes(coordinate) ? O : X
      newData[index].img = coordinatesShip.includes(coordinate)
        ? BATTLE_SHIPS[Math.floor(Math.random() * BATTLE_SHIPS.length) - 1]
        : null

      setDataBoard(newData)
    }
  }

  useEffect(() => {
    setDataBoard(createBoardGame())
    setCoordinatesShip(randomCoordinatesShip(NUMBER_SHIP))
  }, [])

  const onDrag = (e , data) => {
    // console.log('Event Type', e.target.outerText)
    console.log( data)
  }


  // }


  const genarateShip = (ship = {}) =>{
    const { distance } = ship
    const randomPositionX = randomNumber(NUMBER_ROW_BOARD)
    const randomPositionY = randomNumber(NUMBER_ROW_BOARD)
    const dataForShip = genarateCoordinateShip(randomPositionX,randomPositionY,distance)
    const { width, height, coordinateForShip } = dataForShip
    // if(randomPosition === 0)
    // if(randomPosition === NUMBER_ROW_BOARD -1)
    return(
      <Draggable bounds="parent" grid={[widthCell,widthCell]} onDrag={onDrag} defaultPosition={{ x: randomPositionX* widthCell, y: randomPositionY*widthCell }}>
        <div style={{ backgroundColor:`${randomColor()}`,position:'absolute',zIndex:'3',width: `${width}px`,
          height: `${height}px`, }}>
            test1
        </div>
      </Draggable>
    )
  }


  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'grid',
          placeContent:'center',         
        }}
      >
        <div style={{ border:'1px solid red',display:'flex',flexFlow:'wrap',
          position:'relative',width:`${widthCell*NUMBER_ROW_BOARD + 2}px`,
          height:`${widthCell*NUMBER_ROW_BOARD + 2}px`,
          // backgroundImage: 'url("../images/sea-background.png")'
        }}
        className="demo-test"
        >
          {/* {SHIPS.map(ship => <Fragment key={ship}> */}

          {genarateShip(SHIPS[4])}
          {/* </Fragment>)} */}
          {/* <Draggable bounds="parent" grid={[widthCell,widthCell]} onDrag={onDrag} defaultPosition={{ x: widthCell, y: widthCell }}>
            <div style={{ backgroundColor:'red',position:'absolute',zIndex:'3',width: `${widthCell}px`,
              height: `${2*widthCell}px`, }}>
                    test1
            </div>
          </Draggable>
          <Draggable bounds="parent" grid={[widthCell,widthCell]} onDrag={onDrag} >
            <div style={{ backgroundColor:'yellow',position:'absolute',zIndex:'3',width: `${widthCell}px`,
              height: `${2*widthCell}px`, }}>
                    test2
            </div>
          </Draggable>
          <Draggable bounds="parent" grid={[widthCell,widthCell]} onDrag={onDrag} >
            <div style={{ backgroundColor:'pink',position:'absolute',zIndex:'3',width: `${widthCell}px`,
              height: `${2*widthCell}px`, }}>
                    test3
            </div>
          </Draggable> */}
          {dataBoard.map((cell) => (
            <>
            
              <div
                key={cell.id}
                style={{
                  width: `${widthCell}px`,
                  height: `${widthCell}px`,
                  backgroundColor: 'skyblue',
                  border: '1px solid #ffffff',
                  display: 'grid',
                  placeContent: 'center',
                  position:'relative',
                  zIndex: '1'
                }}
                onClick={() => onClickCell(cell.x, cell.y)}
              >
                <div style={{ width: '100%',height:'100%' }}>
                  {cell.id}
                </div>
              </div> 
            </>
            
            // </Draggable>
          ))}
        </div>
      </div>
    </>
  )
}

export default memo(GameBattleShip)
