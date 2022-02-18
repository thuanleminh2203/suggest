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
import ShipComponent from './ShipComponent'

const X = 'x'
const O = 'o'
const _ = null
//define with cell(px) for board
const width = window.innerWidth
const height = window.innerHeight
const scale = width > height ? height : width
const widthCell = Math.floor((scale * 0.8) / 10)
const BATTLE_SHIPS = [battleShip1, battleShip2, battleShip3, battleShip4, battleShip5]
const NUMBER_ROW_BOARD = 10
const NUMBER_SHIP = 10

const SHIPS= [
  // {
  //   id: 1,
  //   name:'ship1',
  //   img: battleShip1,
  //   distance: 5
  // },{
  //   id: 2,
  //   name:'ship2',
  //   img: battleShip2,
  //   distance: 4
  // },{
  //   id: 3,
  //   name:'ship3',
  //   img: battleShip3,
  //   distance: 3
  // },
  {
    id: 4,
    name:'ship4',
    img: battleShip4,
    distance: 2
  },{
    id: 5,
    name:'ship5',
    img: battleShip5,
    distance: 1
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
        id: ''  + columnIndex + '-'+ rowIndex,
        x: columnIndex,
        y: rowIndex,
        value: _,
        // img: battleships[Math.floor(Math.random() * 5)],
        img: null,
      })
    }
    // row.id = rowIndex
    // data.push(row)
  }
  // console.log('data', data)
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

const genarateCoordinateShip = (distance) =>{
  // const curentPositionX = 5
  // const curentPositionY = 5
  const curentPositionX = randomNumber(NUMBER_ROW_BOARD)
  const curentPositionY = randomNumber(NUMBER_ROW_BOARD)
  // console.log('====x====y==',curentPositionX,curentPositionY)
  //coor = x + 10*y
  const valueBaseCoordinate = curentPositionX + curentPositionY * 10
  // const position = {}
  // const x = Math.floor(curentPositionX / NUMBER_ROW_BOARD) //x
  // const y = curentPositionY % NUMBER_ROW_BOARD // y
  const slideX = curentPositionX === 0|| curentPositionX === NUMBER_ROW_BOARD -1
  const slideY = curentPositionY ===0 || curentPositionY === NUMBER_ROW_BOARD -1 

  let coordinateForShip = []

  const randomDirection = randomNumber(2) // x: 0, y: 1

  const currentDistance  = new Date().getMilliseconds() % 2 === 0 ? distance  : -distance 

  let width =  widthCell
  let height = widthCell
  // console.log('===valueBaseCoordinate===',valueBaseCoordinate)

  if(randomDirection === 0){
    // console.log('===tang=XXXXXX===',currentDistance/distance)
    // console.log('===checkkkk===',(curentPositionX + currentDistance))

    // const check = (valueBaseCoordinate + currentDistance) / NUMBER_ROW_BOARD === curentPositionY
    const check = (curentPositionX + currentDistance) < NUMBER_ROW_BOARD && (curentPositionX + currentDistance) >= 0
    let preCoordinateX = 0
    for(let i = 0; i< distance; i++ ){
      const newPositionX = check? curentPositionX + i*(currentDistance/distance) : curentPositionX - i*(currentDistance/distance)

      coordinateForShip =  preCoordinateX < newPositionX
        ? [...coordinateForShip, ''+ newPositionX + curentPositionY]
        : [''+ newPositionX + curentPositionY, ...coordinateForShip]

      preCoordinateX = newPositionX
    }
    width = coordinateForShip.length * width

  }else{
    // console.log('===tang=YYYYYYY===',currentDistance/distance)
    // console.log('===checkkkk===',(curentPositionY + currentDistance))
    let preCoordinateY = 0

    const check = (curentPositionY + currentDistance) < NUMBER_ROW_BOARD && (curentPositionY + currentDistance) >=0
    for(let i = 0; i< distance; i++ ){
      const newPositionY = check? curentPositionY + i*(currentDistance/distance) : curentPositionY - i*(currentDistance/distance)

      coordinateForShip = preCoordinateY < newPositionY
        ? [...coordinateForShip, ''+ curentPositionX + newPositionY] 
        : [''+ curentPositionX + newPositionY,...coordinateForShip]
      preCoordinateY = newPositionY
    }
    height = coordinateForShip.length * height

  }



  // console.log('===coordinateForShip===', coordinateForShip, width , height)
  return { coordinateForShip, width , height  }

}

const randomNumber= (maxValue = 0) => Math.floor(Math.random()*maxValue)

let preCoordinatesForShipUsed = []
let newCoordinatesForShipUsed = []
let preCoordinates = {}
let newCoordinates = {}
let idShip = 0
function GameBattleShip() {
  const [dataBoard, setDataBoard] = useState([])
  const [coordinatesShip, setCoordinatesShip] = useState([])
  const [coordinatesUsed,setCoordinatesUsed] = useState([])
  const [currentShipDrag,setCurrentShipDrag] = useState(null)
  const nodeRef = React.useRef(null)
  const onClickCell = (rowIndex, columnIndex) => {
    // const index = parseInt(rowIndex)*NUMBER_ROW_BOARD + parseInt(columnIndex)
    // const currentDataCell = dataBoard[index].value
    // const coordinate = '' + rowIndex + columnIndex
    // if (!currentDataCell) {
    //   const newData = [...dataBoard]
    //   newData[index].value = coordinatesShip.includes(coordinate) ? O : X
    //   newData[index].img = coordinatesShip.includes(coordinate)
    //     ? BATTLE_SHIPS[Math.floor(Math.random() * BATTLE_SHIPS.length) - 1]
    //     : null

    //   setDataBoard(newData)
    // }
  }

  useEffect(() => {
    setDataBoard(createBoardGame())
    setCoordinatesShip(genarateShip())

  }, [])

  const onDrag = (e , data, coordinates = [] , distance = 1, preX, preY, id) => {
    preCoordinatesForShipUsed.length = 0
    newCoordinatesForShipUsed.length = 0
    preCoordinates = {}
    newCoordinates= {}
    let { x,y } = data
    x = x/widthCell
    y = y/widthCell
    // console.log('========xx=====yyy', coordinates)
    newCoordinates = { x,y }
    preCoordinates = { x: preX, y: preY }
    // const coordinateX = data.x
    // const coordinateY = data.y

    // newCoordinatesForShipUsed.length = 0
    preCoordinatesForShipUsed = [...coordinates]
    // newCoordinatesForShipUsed = []
    if (distance < 1 ){//tang y
      console.log('======yyyyyyyyyyy=====')
      for(let i = 0; i < coordinates.length; i++){
        newCoordinatesForShipUsed = [...newCoordinatesForShipUsed,''+x + (y + i)]
      }
    }else if(distance > 1){
      console.log('======xxxxxxxxxxxxxxxxx=====')

      for(let i = 0; i < coordinates.length; i++){
        newCoordinatesForShipUsed = [...newCoordinatesForShipUsed,''+(x + i) + y ]
      }
    }else{
      console.log('======1111111111111111=====')

      newCoordinatesForShipUsed = [...newCoordinatesForShipUsed,''+x+y]
    }
    setCurrentShipDrag(id)
    idShip = id
    // console.log( '=====newCoordinatesForShipUsed===',newCoordinatesForShipUsed)
    // nodeRef.current.x=0
    // nodeRef.current.y=0

  }

  const onStop = (e , data) => {
    // console.log('===coordinatesUsed===',coordinatesUsed)

    // console.log('===newCoordinatesForShipUsed===',newCoordinatesForShipUsed)

    const arr = newCoordinatesForShipUsed.filter((value) => coordinatesUsed.includes(value))
    // console.log('===arr===',arr)

    if(arr.length === 0){
      // xóa những thằng ở tọa độ cũ của ship
      const newCoordinatesUsed = coordinatesUsed.filter((value) => !preCoordinatesForShipUsed.includes(value))
      // console.log('===newCoordinatesUsed-------',newCoordinatesUsed)
      // console.log( 'newCoordinatesForCurrentShip=======',newCoordinatesForCurrentShip)
      // console.log( 'preCoordinatesForShipUsed=======',preCoordinatesForShipUsed)
      // const test = [...coordinatesShip]
      const index = coordinatesShip.findIndex((item) => item.id === currentShipDrag)
      coordinatesShip[index].x = newCoordinates.x
      coordinatesShip[index].y = newCoordinates.y
      coordinatesShip[index].coordinates = [...newCoordinatesForShipUsed]

      // console.log('===coordinatesShip =====', coordinatesShip[index])
      setCoordinatesShip(coordinatesShip)

      setCoordinatesUsed([...newCoordinatesUsed, ...newCoordinatesForShipUsed])
      // setCurrentShipDrag()
    }else{
      const index = coordinatesShip.findIndex((item) => item.id === currentShipDrag)
      console.log('===rolllbac=====',coordinatesShip[index])
      // coordinatesShip[index].x = preCoordinates.x
      // coordinatesShip[index].y = preCoordinates.y
      // coordinatesShip[index].coordinates = [...preCoordinatesForShipUsed]
      // setCoordinatesShip(coordinatesShip)
      console.log('===rolllbac= sauuuu====',coordinatesShip[index])

    }

    // console.log( 'arr=======',arr)
  }

  const onStart = (e,data,id, coordinates) => {
    // nodeRef.current.focus()
    // console.log('===onStart===')
    
    // console.log(e)
  }

  const genarateShip = () =>{
    let coordinates = []
    let data = []
    for(let i =0; i < SHIPS.length; i++){
      const { distance, id, img } = SHIPS[i]
      const dataForShip = genarateCoordinateShip(distance)

      const { width, height, coordinateForShip } = dataForShip

      const set = new Set([...coordinates, ...coordinateForShip])

      if(set.size !== [...coordinates, ...coordinateForShip].length){
        // console.log('====de quy------')
        i--   
      }else{
        const coordinate = coordinateForShip[0].split('')
        const x = parseInt(coordinate[0])
        const y = parseInt(coordinate[1])
        coordinates = [...coordinates, ...coordinateForShip]
        data = [...data, { id, width, height, x, y, img,distance, coordinates:coordinateForShip }]
      }
      setCoordinatesUsed(coordinates)
    }
    // console.log('===data===',data)
    return data

    // return(
    //   <>
      
    //     {data.map((item) => 
    //       (
    //         <Draggable onStart={onStart} nodeRef={nodeRef}  key={item.id} bounds="parent" grid={[widthCell,widthCell]} onDrag={onDrag} position={null} defaultPosition={{ x: item.x* widthCell, y: item.y*widthCell }}>
    //           <div style={{ backgroundColor:`${randomColor()}`,position:'absolute',zIndex:'3',width: `${item.width}px`,
    //             height: `${item.height}px`, color:`${randomColor()}` }}>
    //             <img src={item.img} style={{ width: '100%', height: '100%' }} />
    //             {/* test */}

    //           </div>
    //         </Draggable>)
    //     )
    //     }
          
    //   </>
    // )
  }
  console.log('===coordinatesUsed===',coordinatesUsed)


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

          {coordinatesShip.map((ship ) => 
            (
              <Draggable 
                onStop={(e) => onStop(e)} 
                onStart={(e,data) => onStart(e,data,ship.id, ship.coordinates)} 
                onDrag={(e,data) =>onDrag(e,data,ship.coordinates, ship.distance,ship.x,ship.y,ship.id)}  
                // ref={nodeRef} 
                key={ship.id} 
                bounds="parent" 
                grid={[widthCell,widthCell]}  
                position={{ x: ship.x* widthCell, y: ship.y*widthCell }}>
                <div style={{ backgroundColor:`${randomColor()}`,position:'absolute',zIndex:'3',width: `${ship.width}px`,
                  height: `${ship.height}px`, color:`${randomColor()}` }}>
                  <img src={ship.img} style={{ width: '100%', height: '100%' }} />
                </div>
              </Draggable>)
          )
          }
          {/* </Fragment>)} */}
          {dataBoard.map((cell) => (

            
            <div
              key={cell.id}
              style={{
                width: `${widthCell}px`,
                height: `${widthCell}px`,
                backgroundColor: '#ffffff',
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

          ))}
        </div>
      </div>
    </>
  )
}

export default memo(GameBattleShip)
