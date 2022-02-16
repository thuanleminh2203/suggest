import React, { useEffect } from 'react'
import { useRef } from 'react'
import { createjs } from 'createjs/builds/createjs-2015.11.26.combined'

function GameComponent() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    this.stage = new createjs.Stage(canvas)
    var circle = new createjs.Shape()
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50)
    circle.x = 100
    circle.y = 100
    this.stage.addChild(circle)
    this.stage.update()
  }, [])
  return (
    <div>
      <div>a</div>
      <canvas ref={ref} width="500" height="300"></canvas>
    </div>
  )
}

export default GameComponent
