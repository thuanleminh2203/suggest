/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'

const randomNumber = (maxValue = 0) => Math.floor(Math.random() * maxValue)

const randomColor = () => {
  return '#' + randomNumber(16777215).toString(16)
}

const ShipComponent = React.forwardRef(function(props, ref) {
  const { ship } = props
  const { x, y, widthCell, width, height, img } = ship

  console.log('===ship===', ship)

  return (
    // <Draggable
    //   bounds="parent"
    //   grid={[widthCell, widthCell]}
    //   //   onDrag={onDrag}
    //   position={null}
    //   defaultPosition={{ x: x * widthCell, y: y * widthCell }}
    // >
    <div
      ref={ref}
      style={{
        backgroundColor: `${randomColor()}`,
        position: 'absolute',
        zIndex: '3',
        width: `${width}px`,
        height: `${height}px`,
        color: `${randomColor()}`,
      }}
    >
      <img src={img} style={{ width: '100%', height: '100%' }} />
    </div>
    // </Draggable>
  )
})
export default ShipComponent
